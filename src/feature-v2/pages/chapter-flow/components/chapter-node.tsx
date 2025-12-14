import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import LockIcon from "../../../../components/icon/lock-icon";

const ChapterNode = ({ data }: NodeProps) => {
  const isLocked = data.status === "locked";
  // const isCompleted = data.status === "completed";
  // const isUnlocked = data.status === "unlocked";

  // Styles based on the image analysis
  const frameColor = isLocked ? "border-blue-300" : "border-yellow-400";
  const bgColor = isLocked ? "bg-blue-100" : "bg-white";

  return (
    <div className="relative group">
      <Handle
        type="target"
        position={Position.Left}
        className="opacity-0 w-2 h-2"
        isConnectable={false}
      />
      {isLocked ? (
        <div className="text-blue-500 scale-75">
          <LockIcon />
        </div>
      ) : (
        <div
          className={`
          w-[200px] h-[120px] 
          border-4 ${frameColor} 
          ${bgColor}
          flex items-center justify-center
          relative
          shadow-lg
          transition-transform hover:scale-105
          cursor-pointer
          rounded-sm
        `}
          style={{
            // Add a slight rotation to mimic "hand drawn" or imperfect placement if desired,
            // but for now keep it straight as per React Flow standard.
            borderStyle: "solid",
            // Simulate brush stroke slightly with box-shadow or irregular border if possible
            // For now standard border.
          }}
        >
          <div className="w-full h-full p-1">
            <img
              src={
                (data.thumbUrl as string) || "https://picsum.photos/200/120"
              }
              alt={data.title as string}
              className="w-full h-full object-cover"
            />
          </div>

          {((data.label || data.title) as string) && (
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 shadow-md border border-gray-200 rounded-sm whitespace-nowrap z-10">
              <span className="text-xs font-bold text-blue-900 font-handwriting">
                {(data.label || data.title) as string}
              </span>
            </div>
          )}
        </div>
      )}
      <Handle
        type="source"
        position={Position.Right}
        className="opacity-0 w-2 h-2"
        isConnectable={false}
      />
    </div>
  );
};

export default memo(ChapterNode);
