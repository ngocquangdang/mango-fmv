import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import LockIcon from "../../components/icon/lock-icon";
import NodeCard from "../../components/node-card";

const PixelNode = ({ data }: NodeProps) => {
  return (
    <div aria-label={`Story node: ${data?.title ?? ""}`} tabIndex={0}>
      <Handle
        type="target"
        position={Position.Left}
        id="in"
        className="bg-transparent! border-0!"
      />
      {!data.status ? (
        <LockIcon />
      ) : (
        <div className="flex items-center gap-3 flex-col">
          <NodeCard
            src={
              (data?.thumbUrl as string) ||
              "https://picsum.photos/seed/picsum/200/300"
            }
          />
        </div>
      )}
      <Handle
        type="source"
        position={Position.Right}
        id="out"
        className="bg-transparent! border-0!"
      />
    </div>
  );
};

export default memo(PixelNode);
