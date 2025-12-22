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

    const addEdge = (
      sourceId: string,
      targetId: string,
      index?: number,
      edgeData?: any
    ) => {
      const edgeId =
        index !== undefined
          ? `${sourceId}->${targetId}-${index}`
          : `${sourceId}->${targetId}`;
      if (
        edgeList.some(
          (e) =>
            e.id === edgeId || (e.source === sourceId && e.target === targetId)
        )
      ) {
        return;
      }
      edgeList.push({
        id: edgeId,
        source: sourceId,
        target: targetId,
        animated: false,
        type: "customEdge",
        data: edgeData,
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

    const getSceneChildren = (scene: Scene) => {
      const branchOptions = scene.branch?.options || [];
      const investigateOptions = convertHotspotItemsToBranchOptions(scene);
      const allOptions = [...branchOptions, ...investigateOptions];

      const children: {
        targetSceneId: string;
        option?: BranchOption;
        index?: number;
      }[] = [];

      if (allOptions.length > 0) {
        allOptions.forEach((option, index) => {
          if (option.targetSceneId) {
            children.push({
              targetSceneId: option.targetSceneId,
              option,
              index,
            });
          }
        });
      } else if (scene.targetSceneId) {
        children.push({ targetSceneId: scene.targetSceneId });
      }

      return children;
    };

    /**
     * Cách 1: Duyệt đệ quy đơn giản.
     * Nếu node hiện tại chưa xem (no status), chỉ hiển thị chính nó rồi dừng (không hiện con).
     */
    const traverseSceneClassic = (sceneId: string, visited = new Set<string>()) => {
      if (!sceneId || visited.has(sceneId)) return;
      visited.add(sceneId);

      const scene = scenes[sceneId];
      if (!scene) return;

      addNode(sceneId, { ...scene });

      // Nếu chưa xem thì không hiện tiếp các con
      if (!scene.status) return;

      const children = getSceneChildren(scene);
      children.forEach((child) => {
        const targetScene = scenes[child.targetSceneId];
        addEdge(sceneId, child.targetSceneId, child.index, {
          ...child.option,
          status: targetScene?.status,
        });
        traverseSceneClassic(child.targetSceneId, visited);
      });
    };

    /**
     * Cách 2: Duyệt 2 bước (Discovery).
     * Tìm tất cả các node 'lộ diện' rồi vẽ mọi edge nối giữa chúng.
     * Xử lý tốt trường hợp nhiều parent cùng dẫn tới 1 node con.
     */
    // const traverseSceneDiscovery = (startId: string) => {
    //   const revealedNodes = new Set<string>();

    //   const discover = (id: string) => {
    //     if (!id || revealedNodes.has(id)) return;
    //     revealedNodes.add(id);

    //     const scene = scenes[id];
    //     if (!scene || !scene.status) return;

    //     getSceneChildren(scene).forEach((child) => discover(child.targetSceneId));
    //   };

    //   discover(startId);

    //   // Bước 1: Thêm Nodes
    //   revealedNodes.forEach((id) => {
    //     const scene = scenes[id];
    //     if (scene) addNode(id, { ...scene });
    //   });

    //   // Bước 2: Thêm Edges
    //   revealedNodes.forEach((id) => {
    //     const scene = scenes[id];
    //     if (!scene) return;

    //     getSceneChildren(scene).forEach((child) => {
    //       if (revealedNodes.has(child.targetSceneId)) {
    //         const targetScene = scenes[child.targetSceneId];
    //         addEdge(id, child.targetSceneId, child.index, {
    //           ...child.option,
    //           status: targetScene?.status,
    //         });
    //       }
    //     });
    //   });
    // };

    if (data?.startSceneId) {
      // Bạn có thể đổi sang traverseSceneClassic(data.startSceneId) nếu muốn dùng cách 1
      traverseSceneClassic(data.startSceneId);
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
