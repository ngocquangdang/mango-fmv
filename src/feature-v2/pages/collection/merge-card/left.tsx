
import type { CollectionItem } from "../right-side";
import RightSide, { ItemCard } from "../right-side";

interface MergeCardLeftProps {
  onToggle: (item: CollectionItem) => void;
  selectedIds: string[];
}

const MergeCardLeft = ({ onToggle, selectedIds }: MergeCardLeftProps) => {
  return (
    <RightSide
      title="Chọn thẻ để ghép"
      hideStats={true}
      renderItem={(item) => {
        const selectedCount = selectedIds.filter(id => id === item.id).length;
        const isSelected = selectedCount > 0;
        const isUR = item.rank === 'UR';

        // Match sizing classes from RightSide implementation
        const sizeClass = isUR
          ? "w-[44px] h-[60px] lg:w-[64px] lg:h-[88px]"
          : "w-[28px] h-[38px] lg:w-[45px] lg:h-[68px]";

        return (
          <div
            onClick={() => {
              if (!item.isLocked) {
                onToggle(item);
              }
            }}
            className={`relative cursor-pointer transition-transform active:scale-95 ${sizeClass} ${isSelected ? "ring-2 ring-blue-500 rounded" : ""}`}
          >
            <div className="w-full h-full">
              <ItemCard
                item={item}
                borderColorClass={isUR ? "border-[#FF9F1C]" : "border-white"}
                isLocked={item.isLocked}
                className="w-full h-full"
              />
            </div>

            {isSelected && (
              <div className="absolute -top-1 -right-1 z-10 bg-blue-500 text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-sm">
                {selectedCount > 1 ? selectedCount : '✓'}
              </div>
            )}

            {/* Owned Quantity Indicator */}
            {!item.isLocked && (item.count || 0) > 1 && (
              <div className="absolute bottom-0 right-0 z-10 bg-black/50 text-white text-[6px] lg:text-[8px] px-1 rounded-tl-md font-mono">
                x{item.count}
              </div>
            )}
          </div>
        )
      }} />
  )
}

export default MergeCardLeft;
