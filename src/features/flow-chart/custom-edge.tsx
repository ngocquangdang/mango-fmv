// import { Play } from "lucide-react";
import type { EdgeProps } from "@xyflow/react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
} from "@xyflow/react";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onEdgeClick = () => {
    // setEdges((edges) => edges.filter((edge) => edge.id !== id));
    console.log("🚀 ~ onEdgeClick ~ id:", id);
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          className="button-edge__label nodrag nopan absolute"
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
          onClick={onEdgeClick}
        >
          {/* {id?.includes("unlocked") && (
            <div className="w-4 h-4 rounded-full bg-gray-500 relative">
              <button className="absolute -top-6 left-1/2 -translate-x-1/2">
                <Play className="w-4 h-4 text-black" onClick={onEdgeClick} />
              </button>
            </div>
          )} */}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
