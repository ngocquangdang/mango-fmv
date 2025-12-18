import dagre from "dagre";
import { type Node, type Edge, Position } from "@xyflow/react";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 500;
const nodeHeight = 200;

export const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  direction = "LR"
) => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction, ranksep: 0, nodesep: 100 });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target, {
      weight: 2,
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
        x: nodeWithPosition.x - nodeWidth / 2 + 100,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };

    return newNode;
  });

  const nodeMap = new Map(layoutedNodes.map((n) => [n.id, n]));
  const processedChildren = new Set<string>();

  // B1: Với node có N parent -> 1 child, căn child theo trung bình các parent trước
  const childToParentIds = new Map<string, string[]>();

  edges.forEach((edge) => {
    const parents = childToParentIds.get(edge.target) || [];
    parents.push(edge.source);
    childToParentIds.set(edge.target, parents);
  });

  childToParentIds.forEach((parentIds, childId) => {
    if (parentIds.length < 2) return;

    const childNode = nodeMap.get(childId);
    if (!childNode || !childNode.position) return;

    const parentNodes = parentIds
      .map((pid) => nodeMap.get(pid))
      .filter((n): n is (typeof layoutedNodes)[0] => n !== undefined);

    if (parentNodes.length < 2) return;

    const parentCentersY = parentNodes.map(
      (parent) => parent.position.y + nodeHeight / 2
    );
    const avgParentCenterY =
      parentCentersY.reduce((sum, y) => sum + y, 0) / parentCentersY.length;

    childNode.position.y = avgParentCenterY - nodeHeight / 2;
    // Đánh dấu để bước B2 không ghi đè lại vị trí đã cân giữa N parent
    processedChildren.add(childId);
  });

  // B2: Sau khi đã cố định node N->1, căn lại children quanh parent (1 parent -> N children)
  layoutedNodes.forEach((parentNode) => {
    const childEdges = edges.filter((e) => e.source === parentNode.id);
    const children = childEdges
      .map((e) => nodeMap.get(e.target))
      .filter(
        (n): n is (typeof layoutedNodes)[0] =>
          n !== undefined && !processedChildren.has(n.id)
      );

    if (children.length === 0) return;

    children.sort((a, b) => (a?.position?.y || 0) - (b?.position?.y || 0));

    const parentCenterY = parentNode.position.y + nodeHeight / 2;

    if (children.length === 1) {
      const child = children[0];
      if (child?.position) {
        child.position.y = parentCenterY - nodeHeight / 2;
        processedChildren.add(child.id);
      }
    } else {
      const verticalSpacing = 250;
      const totalSpan = verticalSpacing * (children.length - 1);
      const firstChildCenterY = parentCenterY - totalSpan / 2;

      children.forEach((child, index) => {
        if (child?.position) {
          const childCenterY = firstChildCenterY + index * verticalSpacing;
          child.position.y = childCenterY - nodeHeight / 2;
          processedChildren.add(child.id);
        }
      });
    }
  });

  return { nodes: layoutedNodes, edges };
};
