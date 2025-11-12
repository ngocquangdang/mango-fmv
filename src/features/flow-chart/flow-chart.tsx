import React, { memo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  Panel,
  ReactFlowProvider,
  type Node,
  type Edge,
} from "@xyflow/react";
import CustomNode from "./custom-node";
import { useFlowChart } from "./context";
import { FlowChartContextProvider } from "./context/flow-chart-provider";
import { useVideoPlayerContext } from "../../contexts";
import CustomEdge from "./custom-edge";

const nodeTypes = { customNode: CustomNode };
const edgeTypes = { customEdge: CustomEdge };

const FlowChartInner: React.FC = () => {
  const { nodes = [], edges = [], data, thumbnailUrls } = useFlowChart();
  const { currentSceneId, setCurrentStatus, setPauseType, onPlayPlayer } =
    useVideoPlayerContext();

  const layout = React.useMemo(() => {
    const startId = data?.startSceneId;
    const idToNode = new Map(nodes.map((n: Node) => [n.id, { ...n }]));
    const outMap = new Map(nodes.map((n: Node) => [n.id, [] as string[]]));
    edges.forEach((e: Edge) => {
      if (outMap.has(e.source))
        (outMap.get(e.source) as string[]).push(e.target as string);
    });

    const depth = new Map<string, number>();
    const queue: string[] = [];
    if (startId && idToNode.has(startId)) {
      depth.set(startId, 0);
      queue.push(startId);
    } else {
      if (nodes[0]) {
        depth.set((nodes[0] as Node).id as string, 0);
        queue.push((nodes[0] as Node).id as string);
      }
    }
    while (queue.length) {
      const id = queue.shift() as string;
      const d = depth.get(id) ?? 0;
      const outs = outMap.get(id) || [];
      outs.forEach((tid) => {
        if (!depth.has(tid)) {
          depth.set(tid, d + 1);
          queue.push(tid);
        }
      });
    }

    const laneOffsets: Record<number, number> = {};
    const positioned = nodes.map((n: Node) => {
      const d = depth.get(n.id as string) ?? 0;
      const laneIndex = (laneOffsets[d] = (laneOffsets[d] ?? 0) + 1);
      const stepY = 200;
      const sign = laneIndex % 2 === 0 ? -1 : 1;
      const magnitude = Math.floor(laneIndex / 2);
      const y = sign * magnitude * stepY;
      const x = 500 * d;
      return { ...n, position: { x, y } };
    });
    return { positioned };
  }, [nodes, edges, data]);

  const decoratedNodes = React.useMemo(() => {
    return (layout.positioned || nodes).map((node: any) => ({
      ...node,
      data: {
        ...node.data,
        isActive: currentSceneId == node.id,
        selected: currentSceneId == node.id,
      },
      type: node.type ?? "customNode",
    }));
  }, [layout, nodes, currentSceneId]);
  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={decoratedNodes}
        edges={edges.map((e: any) => ({
          ...e,
          style: { stroke: "#c7d2fe" },
        }))}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={{
          type: "smoothstep",
        }}
        minZoom={0.5}
        maxZoom={1.25}
        defaultViewport={{
          x: 100,
          y: 350,
          zoom: 1.25,
        }}
        onNodeClick={(_, node) => {
          setCurrentStatus(null);
          setPauseType(null);
          onPlayPlayer(node.id);
        }}
        proOptions={{ hideAttribution: true }}
      >
        <Panel
          position="top-left"
          className="rounded-md bg-white/80 px-2 py-1 text-[11px] shadow"
        >
          {data?.title || "Story Flow"}
        </Panel>
        {/* <MiniMap pannable zoomable className="bg-gray-50!" /> */}
        <Controls position="bottom-right" />
        <Background gap={24} size={1} color="#e5e7eb" />
      </ReactFlow>
      <ImagePreloader imageUrls={thumbnailUrls || []} />
    </div>
  );
};

const ImagePreloader = memo(({ imageUrls }: { imageUrls: string[] }) => {
  React.useEffect(() => {
    imageUrls.forEach((url: string) => {
      const img = new Image();
      img.src = url;
    });
  }, [imageUrls]);

  return null; // This component doesn't render anything visible
});

const FlowChart: React.FC = () => {
  return (
    <FlowChartContextProvider>
      <ReactFlowProvider>
        <FlowChartInner />
      </ReactFlowProvider>
    </FlowChartContextProvider>
  );
};

export default FlowChart;
