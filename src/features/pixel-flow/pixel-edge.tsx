import { type EdgeProps, getSmoothStepPath } from "@xyflow/react";

const PixelEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) => {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 0, // Sharp corners for pixel look
  });

  return (
    <>
      <path
        id={id}
        style={{
          ...style,
          strokeWidth: 3,
          stroke: "black",
          strokeDasharray: "8 8", // Dashed effect
        }}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
    </>
  );
};

export default PixelEdge;
