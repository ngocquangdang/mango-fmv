
import { getLayoutedElements } from "../../features/pixel-flow/layout";
import type { Scene } from "../../types/chapter"; // Removed BranchOption as unused
import type { Edge, Node } from "@xyflow/react";

export const getOrderedScenes = (scenes: Record<string, Scene>, startSceneId: string): string[] => {
  if (!scenes || !startSceneId) return [];

  // 1. Traverse graph to build nodes and edges (BFS/DFS) to discover all reachable scenes
  const discoveredNodeIds = new Set<string>();
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const traverse = (sceneId: string) => {
    if (discoveredNodeIds.has(sceneId)) return;
    discoveredNodeIds.add(sceneId);

    const scene = scenes[sceneId];
    if (!scene) return;

    // Add Node
    nodes.push({
      id: sceneId,
      position: { x: 0, y: 0 }, // Initial position
      data: { ...scene },
      type: "customNode",
    });

    // Get Children
    const children: { targetSceneId: string; option?: any; index?: number }[] = [];
    
    // Branch Options
    if (scene.branch?.options) {
      scene.branch.options.forEach((opt, idx) => {
        if (opt.targetSceneId) {
          children.push({ targetSceneId: opt.targetSceneId, option: opt, index: idx });
        }
      });
    }

    // Investigate Hotspots
    if (scene.hotspots) {
      scene.hotspots.forEach(h => {
        if (h.type === 'investigate') {
          h.items.forEach(item => {
            if (item.targetSceneId && !item.returnToSource) {
              children.push({ targetSceneId: item.targetSceneId, option: item });
            }
          });
        }
      });
    }

    // Direct Target (Fallback if no branches/hotspots)
    if (children.length === 0 && scene.targetSceneId) {
       children.push({ targetSceneId: scene.targetSceneId });
    }

    // Add Edges and Traverse Children
    children.forEach((child) => { // Removed idx
       const edgeId = `${sceneId}->${child.targetSceneId}${child.index !== undefined ? '-' + child.index : ''}`;
       // Check duplicate edges if graph has cycles or multi-edges
       if (!edges.some(e => e.id === edgeId)) {
         edges.push({
           id: edgeId,
           source: sceneId,
           target: child.targetSceneId,
           type: 'customEdge'
         });
       }
       traverse(child.targetSceneId);
    });
  };

  traverse(startSceneId);

  // 2. Apply Layout
  const { nodes: layoutedNodes } = getLayoutedElements(nodes, edges);

  // 3. Sort by Layout (X then Y or just X flow)
  // LogicFlow layout usually sorts by Rank (X in LR mode)
  // We sort by X primarily, then Y
  layoutedNodes.sort((a, b) => {
    if (Math.abs(a.position.x - b.position.x) > 10) { // Tolerance
      return a.position.x - b.position.x;
    }
    return a.position.y - b.position.y;
  });

  return layoutedNodes.map(n => n.id);
};
