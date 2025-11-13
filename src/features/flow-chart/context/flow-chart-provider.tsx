import React from "react";
import { FlowChartContext } from ".";
import { type Scene } from "../../../data/storyData";
import type { Edge, Node as ReactFlowNode } from "@xyflow/react";
import { useUserContext } from "../../user/context";
import type { BranchOption } from "../../../types/chapter";

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
        scene.branch.options.forEach((c: any, cIdx: number) => {
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
    // if (
    //   edgeList.length &&
    //   !scenes[edgeList[edgeList.length - 1].target]?.status
    // ) {
    //   edgeList.push({
    //     id: "unlocked",
    //     source: edgeList[edgeList.length - 1].source,
    //     target: "unlocked",
    //     type: "customEdge",
    //   });
    //   // edgeList[edgeList.length - 1].target = "unlocked";
    //   // edgeList[edgeList.length - 1].id = "unlocked";
    // }
    // if (
    //   edgeList.length &&
    //   !scenes[edgeList[edgeList.length - 1].target]?.status
    // ) {
    //   nodeList.push({
    //     id: "unlocked",
    //     position: {
    //       x: (nodeList.length % 4) * 220,
    //       y: Math.floor(nodeList.length / 4) * 260,
    //     },
    //     data: {},
    //     type: "customNode",
    //     sourcePosition: "right",
    //     targetPosition: "left",
    //   });
    // }

    return { nodes: nodeList, edges: edgeList };
  }, [scenes]);

  // const { nodes: nodes2, edges: edges2 } = React.useMemo(() => {
  //   const nodeList: any[] = [];
  //   const edgeList: any[] = [];

  //   const startNode = scenes[data?.startSceneId];
  //   const addUnlockNode = (id: string) => {
  //     nodeList.push({
  //       id: "unlocked_" + id,
  //       position: {
  //         x: (nodeList.length % 4) * 220,
  //         y: Math.floor(nodeList.length / 4) * 260,
  //       },
  //       data: {},
  //       type: "customNode",
  //     });
  //   };
  //   const addUnlockEdge = (id: string, sourceId: string) => {
  //     edgeList.push({
  //       id: "unlocked_" + id,
  //       source: sourceId,
  //       target: "unlocked_" + id,
  //       type: "customEdge",
  //     });
  //   };

  //   const addNode = (id: string, data: any) => {
  //     nodeList.push({
  //       id,
  //       position: {
  //         x: (nodeList.length % 4) * 220,
  //         y: Math.floor(nodeList.length / 4) * 260,
  //       },
  //       data,
  //       type: "customNode",
  //     });
  //   };
  //   const addEdge = (id: string, sourceId: string, targetId: string) => {
  //     edgeList.push({
  //       id,
  //       source: sourceId,
  //       target: targetId,
  //       animated: false,
  //       type: "customEdge",
  //     });
  //   };

  //   const nodes = (id: string, options: BranchOption[] = []) => {
  //     const prevNode = scenes[id];
  //     if (options.some((option) => scenes[option.targetSceneId].status)) {
  //       options.forEach((option, index) => {
  //         if (scenes[option.targetSceneId]?.status) {
  //           addNode(option.targetSceneId, {
  //             ...scenes[option.targetSceneId],
  //             ...option,
  //           });
  //           addEdge(
  //             `${id}->${option.targetSceneId}-${index}`,
  //             id,
  //             option.targetSceneId
  //           );
  //           const nextNode = scenes[option.targetSceneId];
  //           if (nextNode && nextNode.branch) {
  //             nodes(option.targetSceneId, nextNode.branch?.options || []);
  //           } else if (
  //             nextNode &&
  //             !(nextNode.hotspots?.length || 0) &&
  //             !nextNode.branch
  //           ) {
  //             if (!nextNode.status) {
  //               addUnlockNode(option.targetSceneId);
  //               addUnlockEdge(option.targetSceneId, prevNode.id);
  //             } else {
  //               addNode(option.targetSceneId, { ...nextNode });
  //               addEdge(
  //                 `${id}->${option.targetSceneId}`,
  //                 id,
  //                 option.targetSceneId
  //               );
  //             }
  //           }
  //         }
  //       });
  //     } else {
  //       addUnlockNode(id);
  //       addUnlockEdge(id, id);
  //     }
  //   };

  //   // DONOT CHECK THIS
  //   if (startNode && startNode.branch) {
  //     const options: BranchOption[] = startNode.branch.options;
  //     addNode(startNode.id, { ...startNode });
  //     nodes(startNode.id, options);
  //   }

  //   return { nodes: nodeList, edges: edgeList };
  // }, [scenes, data?.startSceneId]);

  const value: FlowChartContextType = {
    nodes: nodes,
    edges: edges,
    data,
    thumbnailUrls,
  };

  return (
    <FlowChartContext.Provider value={value}>
      {children}
    </FlowChartContext.Provider>
  );
};
