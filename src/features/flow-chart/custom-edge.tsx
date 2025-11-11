import React from "react";
import type { EdgeProps } from "reactflow";
import { BaseEdge } from "reactflow";

// Hotspot edge: vertical down from parent, then horizontal to child (L-shaped)
const HotspotEdge: React.FC<EdgeProps> = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  markerEnd,
  style,
}) => {
  // L-shaped path: vertical first, then horizontal
  const path = `M ${sourceX} ${sourceY} L ${sourceX} ${targetY} L ${targetX} ${targetY}`;

  return (
    <BaseEdge
      path={path}
      markerEnd={markerEnd}
      style={{
        stroke: "#94a3b8",
        strokeWidth: 1.5,
        strokeDasharray: 6,
        ...(style as any),
      }}
    />
  );
};

export default HotspotEdge;

