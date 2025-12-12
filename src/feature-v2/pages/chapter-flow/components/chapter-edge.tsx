import { BaseEdge, type EdgeProps, getBezierPath, getSmoothStepPath  } from "@xyflow/react";
import { memo } from "react";

const ChapterEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data
}: EdgeProps) => {
  // Fix for horizontal edges disappearing with filters (due to 0 height bounding box)
  // We apply a tiny offset to targetY if it's practically equal to sourceY
  const isHorizontal = Math.abs(sourceY - targetY) < 1;
  const adjustedTargetY = isHorizontal ? targetY + 1 : targetY;

  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY: adjustedTargetY,
    targetPosition,
    // curvature: 0.1,
    borderRadius: 50,
  });

  const isLocked = data?.status === 'locked';
  const color = isLocked ? '#3b82f6' : '#f97316';

  return (
    <>
        {/* Invisible path for hit detection */}
        <BaseEdge
            path={edgePath}
            style={{ strokeWidth: 30, stroke: 'transparent', fill: 'none', cursor: 'pointer' }}
            // className="react-flow__edge-interaction"
        />
        {/* Visible "Scribble" Path */}
        <BaseEdge
            path={edgePath}
            markerEnd={markerEnd}
            style={{
                ...style,
                strokeWidth: isLocked ? 3 : 4,
                stroke: color,
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                fill: 'none',
                filter: 'url(#scribble-filter)', // Apply the scribble filter
                opacity: 1,
            }}
            className="react-flow__edge-path"
        />
    </>
  );
};

export default memo(ChapterEdge);
