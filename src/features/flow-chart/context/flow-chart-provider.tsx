import React from "react";
import { FlowChartContext } from ".";
import { storyData, type StoryData } from "../../../data/storyData";
import type { Edge, Node as ReactFlowNode } from "reactflow";

export interface FlowChartContextType {
  nodes: ReactFlowNode[];
  edges: Edge[];
  data: StoryData;
}
export const FlowChartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const data = React.useMemo(() => storyData(), []);
  const clips = data?.clips;

  const { nodes = [], edges = [] } = React.useMemo(() => {
    const nodeList: any[] = [];
    const edgeList: any[] = [];
    const ids = Object.keys(clips);

    ids.forEach((id, index) => {
      const clip = clips[id];
      if (!clip) return;
      nodeList.push({
        id,
        position: { x: (index % 4) * 220, y: Math.floor(index / 4) * 160 },
        data: { title: clip.title },
        type: "customNode",
        sourcePosition: "right",
        targetPosition: "left",
      });
      if (clip.isDecisionPoint && Array.isArray(clip.choices)) {
        clip.choices.forEach((c: any, cIdx: number) => {
          if (c.nextClipId)
            edgeList.push({
              id: `${id}->${c.nextClipId}-${cIdx}`,
              source: id,
              target: c.nextClipId,
              animated: false,
            });
        });
      } else if (clip.nextClipId) {
        edgeList.push({
          id: `${id}->${clip.nextClipId}`,
          source: id,
          target: clip.nextClipId,
        });
      }
    });
    return { nodes: nodeList, edges: edgeList };
  }, [clips]);

  const value: FlowChartContextType = {
    nodes,
    edges,
    data,
  };

  return (
    <FlowChartContext.Provider value={value}>
      {children}
    </FlowChartContext.Provider>
  );
};
