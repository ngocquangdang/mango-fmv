import React from "react";
import { FlowChartContext } from ".";
import { type Scene } from "../../../data/storyData";
import type { Edge, Node as ReactFlowNode } from "reactflow";
import { useUserContext } from "../../user/context";

export interface FlowChartContextType {
  nodes: ReactFlowNode[];
  edges: Edge[];
  data: any;
}
export const FlowChartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { chapter: data } = useUserContext();

  const scenes = React.useMemo(() => {
    return data?.scenes || {} as Scene;
  }, [data]);

  const { nodes = [], edges = [] } = React.useMemo(() => {
    const nodeList: any[] = [];
    const edgeList: any[] = [];
    const ids = Object.keys(scenes);

    ids.forEach((id, index) => {
      const scene: any = scenes[id];
      const isScene =
        !!scene &&
        !!scene?.status &&
        (!!scene?.branch || !!scene?.hotspots?.length);

      if (!isScene) return;

      nodeList.push({
        id,
        position: { x: (index % 4) * 220, y: Math.floor(index / 4) * 260 },
        data: { id, title: scene.title, status: scene.status },
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
            });
        });
      } else if (scene.nextSceneId) {
        edgeList.push({
          id: `${id}->${scene.nextSceneId}`,
          source: id,
          target: scene.nextSceneId,
        });
      }
    });
    return { nodes: nodeList, edges: edgeList };
  }, [scenes]);

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
