import { useEffect, useRef, useMemo } from "react";
import LogicFlow from "@logicflow/core";
import CustomChapterNode from "./components/logic-flow/custom-node";
import SafariChapterNode from "./components/logic-flow/custom-node-safari";
import CustomChapterEdge from "./components/logic-flow/custom-edge";
import { useFlowChart } from "./context";
import { getLayoutedElements } from "../../../features/pixel-flow/layout";
import { useVideoPlayerContext } from "../../../contexts";
import { useToast } from "../../../components/ui/toast-v2/use-toast";

const ChapterFlowV2 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lfRef = useRef<LogicFlow | null>(null);
  const { nodes: contextNodes, edges: contextEdges, data } = useFlowChart();
  const videoPlayerContext = useVideoPlayerContext();
  const { showToast } = useToast();
  const interactionRef = useRef({ hasMoved: false, startX: 0, startY: 0 });


  // Ref để handler click node luôn đọc được context mới nhất
  const clickContextRef = useRef({
    data,
    currentStatus: videoPlayerContext.currentStatus,
    setCurrentStatus: videoPlayerContext.setCurrentStatus,
    setPauseType: videoPlayerContext.setPauseType,
    onPlayPlayer: videoPlayerContext.onPlayPlayer,
    setReviewScene: videoPlayerContext.setReviewScene,
    showToast,
  });

  useEffect(() => {
    clickContextRef.current = {
      data,
      currentStatus: videoPlayerContext.currentStatus,
      setCurrentStatus: videoPlayerContext.setCurrentStatus,
      setPauseType: videoPlayerContext.setPauseType,
      onPlayPlayer: videoPlayerContext.onPlayPlayer,
      setReviewScene: videoPlayerContext.setReviewScene,
      showToast,
    };
  }, [
    data,
    videoPlayerContext.currentStatus,
    videoPlayerContext.setCurrentStatus,
    videoPlayerContext.setPauseType,
    videoPlayerContext.onPlayPlayer,
    videoPlayerContext.setReviewScene,
    showToast,
  ]);

  // Prepare Data (Reuse layout logic from V1)
  const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(() => {
    // Map to format expected by layout.ts (ReactFlow format)
    const mappedNodes = contextNodes.map((node) => ({
      ...node,
      type: "chapter", // V1 type name, doesn't matter for layout calc
      data: {
        ...node.data,
        title: node.data.name || node.data.text || node.data.title,
      },
    }));
    const mappedEdges = contextEdges.map((edge) => ({
      ...edge,
      type: "chapter",
    }));

    return getLayoutedElements(mappedNodes, mappedEdges);
  }, [contextNodes, contextEdges]);

  // Init Logic Flow
  useEffect(() => {
    if (!containerRef.current) return;

    const isSafari =
      typeof navigator !== "undefined" &&
      /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isIOS =
      typeof navigator !== "undefined" &&
      /iP(ad|hone|od)/i.test(navigator.userAgent);
    const isSafariLike = isSafari || isIOS;

    const lf = new LogicFlow({
      container: containerRef.current,
      grid: false,
      isSilentMode: true, // Only view
      stopScrollGraph: true, // Disable native pan, use custom handler
      stopZoomGraph: false, // Allow zoom
      // stopMoveGraph: false, // deprecated? check docs. Default pan is allowed if not invalid.
      // key mappings? default matches constraints.
      width: window.innerHeight, // Rotating, so swap? No, container dimensions.
      // Wait, if we use CSS rotation on container, the logicflow internal canvas is normal size relative to container div.
      // But user says: "x_logicflow = clientY - top_container"

      nodeTextDraggable: false,
      edgeTextDraggable: false,
    });

    // Register Custom Elements
    // Safari có vấn đề với HtmlNode/foreignObject, nên dùng SVG node fallback
    if (isSafariLike) {
      lf.register(SafariChapterNode);
    } else {
      lf.register(CustomChapterNode);
    }
    lf.register(CustomChapterEdge);

    // CRITICAL: Override getPointByClient for 90deg Rotated UI
    // The touch/mouse events come in screen coordinates (Portrait).
    // The container is rotated 90deg.
    // LogicFlow needs coordinates relative to its top-left (which is visually top-right of screen?).
    // User formula:
    // x_metric = clientY - top_container
    // y_metric = width_container - (clientX - left_container)

    // LogicFlow internals use getPointByClient to map event => canvas graph point.
    lf.graphModel.getPointByClient = (point: { x: number; y: number }) => {
      const { x: clientX, y: clientY } = point;
      const { top, left, height } =
        containerRef.current!.getBoundingClientRect();

      // Calculate 'DOM' position relative to rotated container
      // Based on user formula:
      const x = height - (clientY - top);
      const y = clientX - left;

      // Map this DOM point to Graph Space (taking zoom/pan into account)
      // transformModel.HtmlPointToCanvasPoint takes [x, y] and returns [x, y]
      const [canvasX, canvasY] =
        lf.graphModel.transformModel.HtmlPointToCanvasPoint([x, y]);

      // Return ClientPosition structure
      return {
        domOverlayPosition: { x, y },
        canvasOverlayPosition: { x: canvasX, y: canvasY },
      };
    };

    lf.on("node:click", ({ data: nodeData }: any) => {
      if (interactionRef.current.hasMoved) return;

      const nodeId = nodeData?.id;

      if (!nodeId) return;

      const {
        data: chapterData,
        currentStatus,
        setCurrentStatus,
        setPauseType,
        onPlayPlayer,
        setReviewScene,
        showToast: showToastFn,
      } = clickContextRef.current;

      const scene = chapterData?.scenes?.[nodeId];
      setReviewScene(false);

      if (!scene?.videoUrl) {
        showToastFn({ description: "Scene chưa sẵn sàng" });
        return;
      }

      if (!scene.status) return;

      if (nodeId !== currentStatus?.currentSceneId) {
        setCurrentStatus(null);
        setPauseType(null);
      }

      if (scene.status === "COMPLETED") {
        setReviewScene(true);
        onPlayPlayer(nodeId, true);
        return;
      }

      onPlayPlayer(nodeId);
    });

    lfRef.current = lf;

    return () => {
      // Cleanup
      // lf.destroy(); // LogicFlow doesn't strictly require destroy, but good practice if supported
    };
  }, []);

  // Render Data
  useEffect(() => {
    if (!lfRef.current || layoutedNodes.length === 0) return;
    const lf = lfRef.current;

    // Transform ReactFlow Layout Data -> LogicFlow Data
    const lfData = {
      nodes: layoutedNodes.map((node) => {
        // ReactFlow layout (layout.ts) produced Top-Left coordinates?
        // Let's verify layout.ts output. It iterates and sets position.x/y.
        // It uses dagre which centers, but then subtracts nodeWidth/2. So yes, Top-Left.
        // LogicFlow nodes are centered by default.
        // We need to shift back to center.

        // Custom Node size defined in model: 240x150
        const w = 240;
        const h = 150;

        return {
          id: node.id,
          type: "chapter-node",
          x: node.position.x + w / 2,
          y: node.position.y + h / 2,
          properties: {
            ...node.data,
            // Pass original properties
          },
        };
      }),
      edges: layoutedEdges.map((edge: any) => ({
        id: edge.id,
        type: "chapter-edge",
        sourceNodeId: edge.source,
        targetNodeId: edge.target,
        sourceAnchorId: `${edge.source}_right`,
        targetAnchorId: `${edge.target}_left`,
        properties: {
          // Mirror ReactFlow ChapterEdge: use status to determine locked/completed style
          status: edge.data?.status,
        },
      })),
    };

    lf.render(lfData);
    // Thiết lập mức zoom mặc định nhỏ hơn 1 để toàn bộ flow nhỏ lại một chút
    lf.setZoomMiniSize(0.7);
    lf.setZoomMaxSize(0.7);
    lf.zoom(0.7);
    lf.translate(0, 0);
  }, [layoutedNodes, layoutedEdges]);

  // Handle Custom Pan (Drag) for Rotated Container
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !lfRef.current) return;

    let isDragging = false;
    let startX = 0;
    let startY = 0;

    const onPointerDown = (e: PointerEvent) => {
      // Prevent default/propagation
      e.preventDefault();
      e.stopPropagation();

      // Strict Single Touch: Ignore 2nd finger
      if (!e.isPrimary) return;

      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      interactionRef.current.hasMoved = false;
      interactionRef.current.startX = e.clientX;
      interactionRef.current.startY = e.clientY;
      container.setPointerCapture(e.pointerId);

    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging || !lfRef.current || !e.isPrimary) return;
      e.preventDefault();
      e.stopPropagation();

      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      // Update movement status
      if (!interactionRef.current.hasMoved) {
        const dist = Math.sqrt(
          Math.pow(e.clientX - interactionRef.current.startX, 2) +
          Math.pow(e.clientY - interactionRef.current.startY, 2)
        );
        if (dist > 10) {
          interactionRef.current.hasMoved = true;
        }
      }

      // Update start positions for next delta

      startX = e.clientX;
      startY = e.clientY;

      // Map Screen Delta to Graph Delta (90deg Rotated)
      // Visual Down (Screen +Y) -> Graph +X (Visual Down)
      // Visual Right (Screen +X) -> Graph -Y (Visual Right, since Graph Y is Visual
      const { SCALE_X } = lfRef.current.graphModel.transformModel;

      // Match User's New Coordinate Formula:
      // x = height - (clientY - top)  => dx = -deltaY
      // y = clientX - left            => dy = deltaX

      const dx_graph = -deltaY / SCALE_X;
      const dy_graph = deltaX / SCALE_X;

      // Update Debug Info
      const debugEl = document.getElementById("lf-debug-overlay");
      if (debugEl) {
        debugEl.innerText = `
        Dragging: ${isDragging}
        Screen: ${Math.round(e.clientX)}, ${Math.round(e.clientY)}
        Delta: ${Math.round(deltaX)}, ${Math.round(deltaY)}
        GraphDelta: ${Math.round(dx_graph)}, ${Math.round(dy_graph)}
        Scale: ${SCALE_X.toFixed(2)}
        `;
      }

      // Apply translation
      const lf = lfRef.current;
      lf.translate(dx_graph, dy_graph);
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!e.isPrimary) return;
      isDragging = false;
      container.releasePointerCapture(e.pointerId);

      // Clear debug
      const debugEl = document.getElementById("lf-debug-overlay");
      if (debugEl) debugEl.innerText = "Idle";
    };

    // Force chặn các gesture mặc định của trình duyệt (back/forward)
    const handleTouchExplicit = (e: TouchEvent) => {
      // Chặn mọi hành vi mặc định khi thao tác trong vùng này
      if (e.cancelable) {
        e.preventDefault();
      }
    };

    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointercancel", onPointerUp);

    // Safari đôi khi bỏ qua touch-action: none, nên cần chặn manual với passive: false
    container.addEventListener("touchstart", handleTouchExplicit, { passive: false });
    container.addEventListener("touchmove", handleTouchExplicit, { passive: false });

    return () => {
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointercancel", onPointerUp);
      container.removeEventListener("touchstart", handleTouchExplicit);
      container.removeEventListener("touchmove", handleTouchExplicit);
    };
  }, []);

  // CSS for container 90deg rotation
  // const containerStyle = {
  //   width: "100vh", // Swapped for rotation
  //   height: "100vw",
  //   transform: "rotate(90deg)",
  //   transformOrigin: "top left",
  //   position: "absolute" as const,
  //   top: 0,
  //   left: "100%", // Push to right edge to rotate back in?

  // };

  return (
    // Added touch-action: none to prevent browser panning
    <div
      className="w-full h-[calc(100%-100px)] relative flow-v2 select-none"
      ref={containerRef}
      id="logic-flow-container"
      style={{ touchAction: "none" }}
    >
      {/* SVG defs for scribble edge filter, shared by LogicFlow edges */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter
            id="scribble-filter"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            filterUnits="objectBoundingBox"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.5"
              numOctaves="1"
              result="noise"
            />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
          </filter>
        </defs>
      </svg>

    </div>
  );
};

export default ChapterFlowV2;
