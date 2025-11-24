import React, { useCallback, useMemo } from "react";
import {
  ReactFlow,
  addEdge,
  type Connection,
  type Node,
  useNodesState,
  useEdgesState,
  Background,
} from "@xyflow/react";

import PixelNode from "./pixel-node";
import PixelEdge from "./pixel-edge";
import { initialNodes, initialEdges } from "./mock-data";
import { getLayoutedElements } from "./layout";
import ImagePreloader from "../image-preload";

const nodeTypes = {
  pixel: PixelNode,
};

const edgeTypes = {
  pixel: PixelEdge,
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges
);

const PixelFlow = () => {
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
    []
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(nodesWithOriginalY);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        minZoom={0.75}
        maxZoom={0.75}
        defaultViewport={{
          x: 60,
          y: 0,
          zoom: 0.75,
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
