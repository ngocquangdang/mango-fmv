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
  // Giảm khoảng cách giữa các node một chút (nodesep nhỏ hơn)
  dagreGraph.setGraph({ rankdir: direction, ranksep: 0, nodesep: 70 });

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
      targetPosition: !isHorizontal ? Position.Left : Position.Top,
      sourcePosition: !isHorizontal ? Position.Right : Position.Bottom,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2 + 100,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };

    return newNode;
  });

  // Center child nodes vertically around their parent
  const nodeMap = new Map(layoutedNodes.map((n) => [n.id, n]));
  const processedChildren = new Set<string>();

  layoutedNodes.forEach((parentNode) => {
    // Find all children of this node
    const childEdges = edges.filter((e) => e.source === parentNode.id);
    const children = childEdges
      .map((e) => nodeMap.get(e.target))
      .filter(
        (n): n is (typeof layoutedNodes)[0] =>
          n !== undefined && !processedChildren.has(n.id)
      );

    if (children.length === 0) return;

    // Sort children by their original Y position to maintain order
    children.sort((a, b) => (a?.position?.y || 0) - (b?.position?.y || 0));

    // Calculate parent's vertical center (middle of the node)
    const parentCenterY = parentNode.position.y + nodeHeight / 2;

    if (children.length === 1) {
      // Single child: center it with parent
      const child = children[0];
      if (child?.position) {
        child.position.y = parentCenterY - nodeHeight / 2;
        processedChildren.add(child.id);
      }
    } else {
      // Multiple children: distribute evenly around parent center
      // Giảm khoảng cách dọc giữa các child node
      const verticalSpacing = 180; // Space between children centers

      // Calculate total vertical span of all children
      const totalSpan = verticalSpacing * (children.length - 1);

      // Start position: parent center minus half the total span
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
