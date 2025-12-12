import React from "react";
import { FlowChartContext } from ".";

import type { Edge, Node as ReactFlowNode } from "@xyflow/react";
import { useUserContext } from "../../../../features/user/context";
import type { BranchOption, Scene } from "../../../../types/chapter";

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
  // const isPreview = React.useMemo(() => {
  //   const params = new URLSearchParams(window.location.search);
  //   const isPreview = params.get("isPreview");
  //   return isPreview === "true";
  // }, []);

  const scenes = React.useMemo(() => {
    return data?.scenes || ({} as Record<string, Scene>);
  }, [data]);

  const thumbnailUrls = React.useMemo(() => {
    return Object.values(scenes).map((scene: any) => scene.thumbUrl);
  }, [scenes]);

  // const { nodes = [], edges = [] } = React.useMemo(() => {
  //   const nodeList: any[] = [];
  //   const edgeList: any[] = [];
  //   const ids = Object.keys(scenes);

  //   ids.forEach((id, index) => {
  //     const scene: any = scenes[id];
  //     const isNodeScene =
  //       (scene && !scene?.status) || data?.hotspotScenes?.includes(id);

  //     if (isNodeScene) return;

  //     nodeList.push({
  //       id,
  //       position: { x: (index % 4) * 220, y: Math.floor(index / 4) * 260 },
  //       data: { ...scene },
  //       type: "customNode",
  //       sourcePosition: "right",
  //       targetPosition: "left",
  //     });

  //     if (scene.branch) {
  //       scene.branch.options.forEach((c: any, cIdx: number) => {
  //         if (c.targetSceneId)
  //           edgeList.push({
  //             id: `${id}->${c.targetSceneId}-${cIdx}`,
  //             source: id,
  //             target: c.targetSceneId,
  //             animated: false,
  //             type: "customEdge",
  //           });
  //       });
  //     } else if (scene.targetSceneId) {
  //       edgeList.push({
  //         id: `${id}->${scene.targetSceneId}`,
  //         source: id,
  //         target: scene.targetSceneId,
  //         type: "customEdge",
  //       });
  //     }
  //   });
  //   // if (
  //   //   edgeList.length &&
  //   //   !scenes[edgeList[edgeList.length - 1].target]?.status
  //   // ) {
  //   //   edgeList.push({
  //   //     id: "unlocked",
  //   //     source: edgeList[edgeList.length - 1].source,
  //   //     target: "unlocked",
  //   //     type: "customEdge",
  //   //   });
  //   //   // edgeList[edgeList.length - 1].target = "unlocked";
  //   //   // edgeList[edgeList.length - 1].id = "unlocked";
  //   // }
  //   // if (
  //   //   edgeList.length &&
  //   //   !scenes[edgeList[edgeList.length - 1].target]?.status
  //   // ) {
  //   //   nodeList.push({
  //   //     id: "unlocked",
  //   //     position: {
  //   //       x: (nodeList.length % 4) * 220,
  //   //       y: Math.floor(nodeList.length / 4) * 260,
  //   //     },
  //   //     data: {},
  //   //     type: "customNode",
  //   //     sourcePosition: "right",
  //   //     targetPosition: "left",
  //   //   });
  //   // }

  //   return { nodes: nodeList, edges: edgeList };
  // }, [scenes]);

  const { nodes: nodes2, edges: edges2 } = React.useMemo(() => {
    const nodeList: any[] = [];
    const edgeList: any[] = [];
    const processedNodes = new Set<string>();

    const startNode = scenes[data?.startSceneId];

    const addNode = (id: string, data: any) => {
      if (processedNodes.has(id)) return;
      processedNodes.add(id);
      nodeList.push({
        id,
        position: {
          x: (nodeList.length % 4) * 220,
          y: Math.floor(nodeList.length / 4) * 260,
        },
        data,
        type: "customNode",
      });
    };
    
    const addEdge = (sourceId: string, targetId: string, index?: number) => {
      const edgeId = index !== undefined 
        ? `${sourceId}->${targetId}-${index}` 
        : `${sourceId}->${targetId}`;
      if (edgeList.some((e) => e.id === edgeId || (e.source === sourceId && e.target === targetId))) {
        return;
      }
      edgeList.push({
        id: edgeId,
        source: sourceId,
        target: targetId,
        animated: false,
        type: "customEdge",
      });
    };

    const convertHotspotItemsToBranchOptions = (
      scene: Scene
    ): BranchOption[] => {
      if (!scene.hotspots) return [];
      
      const investigateHotspots = scene.hotspots.filter(
        (hotspot) => hotspot.type === "investigate"
      );
      
      const branchOptions: BranchOption[] = [];
      investigateHotspots.forEach((hotspot) => {
        hotspot.items.forEach((item) => {
          if (item.returnToSource) return;
          branchOptions.push({
            id: item.id,
            text: item.title || item.description || "",
            targetSceneId: item.targetSceneId,
          });
        });
      });
      
      return branchOptions;
    };

    const nodes = (parentId: string, options: BranchOption[] = []) => {
      const allOptions = options.filter((option) => {
        const targetScene = scenes[option.targetSceneId];
        return targetScene && !processedNodes.has(option.targetSceneId);
      });

      allOptions.forEach((option, index) => {
        const targetScene = scenes[option.targetSceneId];
        if (!targetScene || processedNodes.has(option.targetSceneId)) return;

        addNode(option.targetSceneId, {
          ...targetScene,
          ...option,
        });
        addEdge(parentId, option.targetSceneId, index);
        
        // Get branch options and investigate hotspots for next node
        const nextBranchOptions = targetScene.branch?.options || [];
        const nextInvestigateOptions = convertHotspotItemsToBranchOptions(targetScene);
        const nextAllOptions = [...nextBranchOptions, ...nextInvestigateOptions];
        
        if (nextAllOptions.length > 0) {
          nodes(option.targetSceneId, nextAllOptions);
        }
      });
    };

    // DONOT CHECK THIS
    if (startNode) {
      const branchOptions: BranchOption[] = startNode.branch?.options || [];
      const investigateOptions = convertHotspotItemsToBranchOptions(startNode);
      const allOptions = [...branchOptions, ...investigateOptions];
      addNode(startNode.id, { ...startNode });
      nodes(startNode.id, allOptions);
    }
    return { nodes: nodeList, edges: edgeList };
  }, [scenes, data?.startSceneId]);

  const value: FlowChartContextType = {
    nodes: nodes2,
    edges: edges2,
    data,
    thumbnailUrls,
  };

  return (
    <FlowChartContext.Provider value={value}>
      {children}
    </FlowChartContext.Provider>
  );
};
