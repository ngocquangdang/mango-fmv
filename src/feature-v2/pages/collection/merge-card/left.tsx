
import type { CollectionItem } from "../right-side";
import RightSide, { ItemCard } from "../right-side";

interface MergeCardLeftProps {
  onToggle: (item: CollectionItem) => void;
  selectedIds: string[];
}

const MergeCardLeft = ({ onToggle, selectedIds }: MergeCardLeftProps) => {
  return (
    <RightSide renderItem={(item) => {
      const isSelected = selectedIds.includes(item.id);
      return (
        <div
          onClick={() => !item.isLocked && onToggle(item)}
          className={`relative cursor-pointer transition-transform active:scale-95 ${isSelected ? "ring-2 ring-orange-500 rounded" : ""}`}
        >
          <ItemCard item={item} borderColorClass="border-orange-200" isLocked={item.isLocked} />
          {isSelected && (
            <div className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-bl-md font-bold">
              ✓
            </div>
          )}
        </div>
      )
    }} />
  )
}

export default MergeCardLeft;
