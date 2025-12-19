import { useMemo, useEffect } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Background,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import ChapterNode from "./components/chapter-node";
import ChapterEdge from "./components/chapter-edge";
import { getLayoutedElements } from "../../../features/pixel-flow/layout";
import { useFlowChart } from "./context";
import { useVideoPlayerContext } from "../../../contexts";
import { useToast } from "../../../components/ui/toast-v2/use-toast";

const nodeTypes = {
  chapter: ChapterNode,
};

const edgeTypes = {
  chapter: ChapterEdge,
};

const ChapterFlow = () => {
  const { nodes: contextNodes, edges: contextEdges, data } = useFlowChart();
  const {
    setCurrentStatus,
    setPauseType,
    onPlayPlayer,
    currentStatus,
    setReviewScene,
  } = useVideoPlayerContext();
  const { showToast } = useToast();

  const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(() => {
    const mappedNodes = contextNodes.map((node) => ({
      ...node,
      type: "chapter",
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

  // Save original Y positions into node data (copied from PixelFlow logic)
  const nodesWithOriginalY = useMemo(
    () =>
      layoutedNodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          originalY: node.position.y,
        },
      })),
    [layoutedNodes]
  );

  const [nodes, setNodes] = useNodesState(nodesWithOriginalY);
  const [edges, setEdges] = useEdgesState(layoutedEdges);

  useEffect(() => {
    setNodes(nodesWithOriginalY);
    setEdges(layoutedEdges);
  }, [nodesWithOriginalY, layoutedEdges, setNodes, setEdges]);

  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;
  const zoomLevel = isDesktop ? 0.8 : 0.5;

  return (
    <div className="w-full h-[calc(100vh-100px)] flow-v1">
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="scribble-filter">
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
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        minZoom={zoomLevel}
        maxZoom={zoomLevel}
        defaultViewport={{
          x: isDesktop ? 250 : 170,
          y: isDesktop ? 150 : 0,
          zoom: zoomLevel,
        }}

        onNodeClick={(_, node) => {
          const scene = data?.scenes[node.id];
          setReviewScene(false);

          if (!scene?.videoUrl) {
            showToast({ description: "Scene chưa sẵn sàng" });
            return;
          }
          // Assuming we want to allow playing any node for now, or check status
          if (!scene.status) return;

          if (node.id !== currentStatus?.currentSceneId) {
            setCurrentStatus(null);
            setPauseType(null);
          }
          if (scene.status === "COMPLETED") {
            setReviewScene(true);
            onPlayPlayer(node.id, true);
            return;
          }
          onPlayPlayer(node.id);
        }}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="transparent" />
      </ReactFlow>
    </div>
  );
};

export default ChapterFlow;
