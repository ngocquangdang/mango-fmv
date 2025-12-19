import dagre from "dagre";
import { type Node, type Edge, Position } from "@xyflow/react";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 240;
const nodeHeight = 150;

export const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  direction = "LR"
) => {
  const isHorizontal = direction === "LR";
  // Giảm khoảng cách giữa các node một chút (nodesep nhỏ hơn)
  dagreGraph.setGraph({ rankdir: direction, ranksep: 120, nodesep: 100 });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target, {
      weight: 1,
      label: "custom",
    });
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const newNode = {
      ...node,
      targetPosition: isHorizontal ? Position.Left : Position.Top,
      sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };

    return newNode;
  });

  // Create a map for easy access
  const nodeMap = new Map(layoutedNodes.map((n) => [n.id, n]));
  const processedNodes = new Set<string>();

  // Sort nodes by X to process them in rank order (flow direction)
  // This ensures that Y-position adjustments propagate correctly through chains.
  const sortedNodes = [...layoutedNodes].sort((a, b) => a.position.x - b.position.x);

  // B1: Handle converging paths (N -> 1 or N -> M groups)
  // Find parents for each node
  const childToParentIds = new Map<string, string[]>();
  edges.forEach((edge) => {
    const parents = childToParentIds.get(edge.target) || [];
    parents.push(edge.source);
    childToParentIds.set(edge.target, parents);
  });

  // Group children by their exact set of parents to prevent overlap in diamond patterns.
  const parentSetToChildren = new Map<string, string[]>();

  childToParentIds.forEach((parentIds, childId) => {
    if (parentIds.length < 2) return;
    const key = [...parentIds].sort().join(",");
    const siblingIds = parentSetToChildren.get(key) || [];
    siblingIds.push(childId);
    parentSetToChildren.set(key, siblingIds);
  });

  parentSetToChildren.forEach((childIds, parentSetKey) => {
    const parentIds = parentSetKey.split(",");
    const parentNodes = parentIds
      .map((pid) => nodeMap.get(pid))
      .filter((n): n is (typeof layoutedNodes)[0] => n !== undefined);

    if (parentNodes.length < 1) return;

    const parentCentersY = parentNodes.map(
      (parent) => parent.position.y + nodeHeight / 2
    );
    const avgParentCenterY =
      parentCentersY.reduce((sum, y) => sum + y, 0) / parentCentersY.length;

    if (childIds.length === 1) {
      const childNode = nodeMap.get(childIds[0]);
      if (childNode?.position) {
        childNode.position.y = avgParentCenterY - nodeHeight / 2;
        processedNodes.add(childIds[0]);
      }
    } else {
      // Multiple children sharing the same parents (e.g., diamond pattern)
      // Spread them around the average center
      const verticalSpacing = 200;
      const totalSpan = verticalSpacing * (childIds.length - 1);
      const firstChildCenterY = avgParentCenterY - totalSpan / 2;

      childIds.forEach((childId, index) => {
        const childNode = nodeMap.get(childId);
        if (childNode?.position) {
          const childCenterY = firstChildCenterY + index * verticalSpacing;
          childNode.position.y = childCenterY - nodeHeight / 2;
          processedNodes.add(childId);
        }
      });
    }
  });

  // B2: Handle diverging paths (1 -> N) and simple chains (1 -> 1)
  sortedNodes.forEach((parentNode) => {
    const childEdges = edges.filter((e) => e.source === parentNode.id);
    const children = childEdges
      .map((e) => nodeMap.get(e.target))
      .filter((n): n is (typeof layoutedNodes)[0] => n !== undefined && !processedNodes.has(n.id));

    if (children.length === 0) return;

    const parentCenterY = parentNode.position.y + nodeHeight / 2;

    if (children.length === 1) {
      // Single child: Align perfectly with parent
      const child = children[0];
      if (child?.position) {
        child.position.y = parentCenterY - nodeHeight / 2;
        processedNodes.add(child.id);
      }
    } else {
      // Multiple children: Spread them around parent's Y
      children.sort((a, b) => (a?.position?.y || 0) - (b?.position?.y || 0));
      const verticalSpacing = 200; // Increased spacing
      const totalSpan = verticalSpacing * (children.length - 1);
      const firstChildCenterY = parentCenterY - totalSpan / 2;

      children.forEach((child, index) => {
        if (child?.position) {
          const childCenterY = firstChildCenterY + index * verticalSpacing;
          child.position.y = childCenterY - nodeHeight / 2;
          processedNodes.add(child.id);
        }
      });
    }
  });

  return { nodes: layoutedNodes, edges };
};
