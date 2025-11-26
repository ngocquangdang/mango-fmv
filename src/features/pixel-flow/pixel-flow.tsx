import { useMemo, useEffect } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Background,
} from "@xyflow/react";

import PixelNode from "./pixel-node";
import PixelEdge from "./pixel-edge";
import { getLayoutedElements } from "./layout";
import ImagePreloader from "../image-preload";
import { useFlowChart } from "../flow-chart/context";
import { useVideoPlayerContext } from '../../contexts';

const nodeTypes = {
  pixel: PixelNode,
};

const edgeTypes = {
  pixel: PixelEdge,
};

const PixelFlow = () => {
  const { nodes: contextNodes, edges: contextEdges, data } = useFlowChart();
  const {
    setCurrentStatus,
    setPauseType,
    onPlayPlayer,
    currentStatus,
    setReviewScene
  } = useVideoPlayerContext();

  const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(() => {
    const mappedNodes = contextNodes.map((node) => ({
      ...node,
      type: "pixel",
    }));
    const mappedEdges = contextEdges.map((edge) => ({
      ...edge,
      type: "pixel",
    }));
    return getLayoutedElements(mappedNodes, mappedEdges);
  }, [contextNodes, contextEdges]);

  // Lưu original Y positions vào node data
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

  const [nodes, setNodes,] = useNodesState(nodesWithOriginalY);
  const [edges, setEdges,] = useEdgesState(layoutedEdges);

  useEffect(() => {
    setNodes(nodesWithOriginalY);
    setEdges(layoutedEdges);
  }, [nodesWithOriginalY, layoutedEdges, setNodes, setEdges]);

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        minZoom={0.5}
        maxZoom={0.5}
        defaultViewport={{
          x: 60,
          y: 0,
          zoom: 0.5,
        }}
        onNodeClick={(_, node) => {
          const scene = data?.scenes[node.id];
          setReviewScene(false);

          if (!scene.videoUrl) return;
          if (node.id.includes("unlocked")) return;
          if (node.id !== currentStatus?.currentSceneId) {
            setCurrentStatus(null);
            setPauseType(null);
          }
          if (scene.status === "COMPLETED") {
            setReviewScene(true);
          }
          onPlayPlayer(node.id);
        }}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="transparent" />
      </ReactFlow>

      <ImagePreloader imageUrls={[]} />
    </div>
  );
};

export default PixelFlow;
