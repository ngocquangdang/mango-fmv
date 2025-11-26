import { type EdgeProps, getSmoothStepPath } from "@xyflow/react";
import { useFlowChart } from "../flow-chart/context";

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
  target,
}: EdgeProps) => {
  const { data } = useFlowChart();
  const targetSceneStatus = target ? data?.scenes?.[target]?.status : undefined;
  const isCompleted = Boolean(targetSceneStatus);
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 1, // Sharp corners for pixel look
  });

  return (
    <>
      <path
        id={id}
        style={{
          ...style,
          strokeWidth: 6,
          stroke: "#FA7036",
          strokeDasharray: isCompleted ? undefined : "8 8",
        }}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
    </>
  );
};

export default PixelEdge;
