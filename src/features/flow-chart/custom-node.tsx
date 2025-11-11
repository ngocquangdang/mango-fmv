import { memo } from "react";
import { Handle, Position } from "reactflow";

interface CustomNodeProps {
  data?: any;
  selected?: boolean;
  isActive?: boolean;
}

const CustomNode = memo(({ data }: CustomNodeProps) => {
  const { selected, isActive } = data;

  return (
    <div
      className={`w-[300px] rounded-xl border bg-white p-3 shadow transition
        ${
          isActive
            ? "border-indigo-600 ring-2 ring-indigo-400"
            : "border-gray-200"
        }
        ${selected ? "ring-2 ring-indigo-300" : ""}`}
      aria-label={`Story node: ${data?.title ?? ""}`}
      tabIndex={0}
    >
      <Handle
        type="target"
        position={Position.Left}
        id="in"
        className="bg-transparent! border-0!"
      />
      <div className="flex items-center gap-3">
        {data?.thumbnail ? (
          <img
            src={data.thumbnail}
            alt="thumbnail"
            className="h-10 w-16 rounded object-cover"
          />
        ) : (
          <div className="h-10 w-16 rounded bg-gray-100" />
        )}
        <div className="flex-1">
          <p className="line-clamp-2 text-sm font-medium text-gray-900">
            {data?.title ?? "Untitled"}
          </p>
          <p className="mt-0.5 text-[11px] text-gray-500">
            {isActive ? "Now Playing" : data?.subtitle ?? ""}
          </p>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id="out"
        className="bg-transparent! border-0!"
      />
    </div>
  );
});

export default CustomNode;
