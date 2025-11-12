import React from "react";
import { FlowChartContext } from ".";
import { type Scene } from "../../../data/storyData";
import type { Edge, Node as ReactFlowNode } from "@xyflow/react";
import { useUserContext } from "../../user/context";

export interface FlowChartContextType {
  nodes: ReactFlowNode[];
  edges: Edge[];
  data: any;
  thumbnailUrls: string[];
}
export const FlowChartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { chapter: data } = useUserContext();

  const scenes = React.useMemo(() => {
    return data?.scenes || ({} as Scene);
  }, [data]);

  const thumbnailUrls = React.useMemo(() => {
    return Object.values(scenes).map((scene: any) => scene.thumbnail);
  }, [scenes]);

  const { nodes = [], edges = [] } = React.useMemo(() => {
    const nodeList: any[] = [];
    const edgeList: any[] = [];
    const ids = Object.keys(scenes);

    ids.forEach((id, index) => {
      const scene: any = scenes[id];
      const isNodeScene = (scene && !scene?.status) || scene.type === "hotspot";

      if (isNodeScene) return;

      nodeList.push({
        id,
        position: { x: (index % 4) * 220, y: Math.floor(index / 4) * 260 },
        data: { ...scene },
        type: "customNode",
        sourcePosition: "right",
        targetPosition: "left",
      });

      if (scene.branch) {

        scene.branch.config.options.forEach((c: any, cIdx: number) => {
          if (c.targetSceneId)
            edgeList.push({
              id: `${id}->${c.targetSceneId}-${cIdx}`,
              source: id,
              target: c.targetSceneId,
              animated: false,
              type: "customEdge",
            });
        });
      } else if (scene.targetSceneId) {
        edgeList.push({
          id: `${id}->${scene.targetSceneId}`,
          source: id,
          target: scene.targetSceneId,
          type: "customEdge",
        });
      }
    });
    if (
      edgeList.length &&
      !scenes[edgeList[edgeList.length - 1].target]?.status
    ) {
      edgeList.push({
        id: "unlocked",
        source: edgeList[edgeList.length - 1].source,
        target: "unlocked",
        type: "customEdge",
      });
      // edgeList[edgeList.length - 1].target = "unlocked";
      // edgeList[edgeList.length - 1].id = "unlocked";
    }
    if (
      edgeList.length &&
      !scenes[edgeList[edgeList.length - 1].target]?.status
    ) {
      nodeList.push({
        id: "unlocked",
        position: {
          x: (nodeList.length % 4) * 220,
          y: Math.floor(nodeList.length / 4) * 260,
        },
        data: {},
        type: "customNode",
        sourcePosition: "right",
        targetPosition: "left",
      });
    }
    return { nodes: nodeList, edges: edgeList };
  }, [scenes]);

  const value: FlowChartContextType = {
    nodes,
    edges,
    data,
    thumbnailUrls,
  };

  return (
    <FlowChartContext.Provider value={value}>
      {children}
    </FlowChartContext.Provider>
  );
};
