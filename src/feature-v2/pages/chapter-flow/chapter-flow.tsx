import { useCallback, useMemo } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
  Position,
  type Edge,
  type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import ChapterNode from "./components/chapter-node";
import ChapterEdge from "./components/chapter-edge";

// Node and Edge Types
const nodeTypes = {
  chapter: ChapterNode,
};

const edgeTypes = {
  chapter: ChapterEdge,
};

// Initial Data based on the image
// Structure: Start -> [Split] -> Top/Bottom -> End
const initialNodes: Node[] = [
  {
    id: "1",
    type: "chapter",
    position: { x: 0, y: 150 },
    data: {
      title: "01. Gặp gỡ",
      status: "unlocked",
      thumbnail: "https://picsum.photos/id/10/200/120", // Placeholder
    },
  },
  {
    id: "2",
    type: "chapter",
    position: { x: 300, y: 150 },
    data: {
      title: "02. Title title",
      status: "unlocked",
      thumbnail: "https://picsum.photos/id/20/200/120",
    },
  },
  {
    id: "3", // Top Locked
    type: "chapter",
    position: { x: 700, y: 0 },
    data: {
      title: "Locked Chapter",
      status: "locked",
    },
  },
  {
    id: "4", // Bottom Locked
    type: "chapter",
    position: { x: 700, y: 300 },
    data: {
      title: "Locked Chapter",
      status: "locked",
    },
  },
  {
    id: "5", // Final
    type: "chapter",
    position: { x: 1000, y: 150 },
    data: {
      title: "Final Chapter",
      status: "locked",
      thumbnail: "https://picsum.photos/id/30/200/120",
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "chapter",
    data: { status: "unlocked" },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    type: "chapter",
    data: { status: "unlocked" },
  },
  {
    id: "e2-4",
    source: "2",
    target: "4",
    type: "chapter",
    data: { status: "locked" },
  },
  {
    id: "e3-5",
    source: "3",
    target: "5",
    type: "chapter",
    data: { status: "unlocked" },
  },
  {
    id: "e4-5",
    source: "4",
    target: "5",
    type: "chapter",
    data: { status: "locked" },
  },
];

const ChapterFlow = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  console.log("🚀 ~ ChapterFlow ~ nodes:", nodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  // Background style from image (Blue sky/clouds)
  // We can use a CSS class or inline style on the container

  return (
    <div className="w-full h-[270px]">
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="scribble-filter">
            <feTurbulence 
                type="fractalNoise" 
                baseFrequency="0.5" 
                numOctaves="1" 
                result="noise" 
            />
            <feDisplacementMap 
                in="SourceGraphic" 
                in2="noise" 
                scale="3" 
            />
          </filter>
        </defs>
      </svg>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        // onNodesChange={onNodesChange}
        // onEdgesChange={onEdgesChange}
        // fitView
        defaultViewport={{ x: 22, y: 35, zoom: 0.5 }}
        className="z-10"
        minZoom={0.5}
        maxZoom={0.5}
      >
        <Background color="transparent" />
      </ReactFlow>

    </div>
  );
};

export default ChapterFlow;
