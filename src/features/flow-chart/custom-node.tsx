import { UnlockIcon } from "lucide-react";
import { memo } from "react";
import { Handle, Position } from "@xyflow/react";

interface CustomNodeProps {
  data?: any;
  selected?: boolean;
  isActive?: boolean;
}

const CustomNode = memo(({ data }: CustomNodeProps) => {
  const { selected, isActive } = data;

  return (
    <div
      className={`w-[200px] h-[140px] rounded-xl border bg-white shadow transition cursor-pointer
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
      <div className="flex items-center gap-3 flex-col">
        {data?.thumbnail ? (
          <img
            src={data.thumbnail}
            alt="thumbnail"
            className="w-[198px] h-[138px] rounded-xl object-cover"
          />
        ) : !data?.id ? (
          <div className="w-[200px] h-[138px] flex items-center justify-center">
            <UnlockIcon className="w-6 h-6 text-gray-500" />
          </div>
        ) : (
          <div className="h-[200px] w-[138px] rounded-xl bg-gray-100" />
        )}
        <div className="flex flex-col flex-1 items-center justify-center h-auto">
          <p className="line-clamp-2 text-sm font-medium text-blue-900 bg-amber-50 px-5 py-1 rounded">
            {data?.name ?? ""}
          </p>
          <p className="mt-0.5 text-[11px] text-blue-500">
            {isActive ? "Đang phát" : data?.subtitle ?? ""}
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
