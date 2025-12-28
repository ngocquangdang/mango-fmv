
import type { CollectionItem } from "../right-side";
import { ItemCard } from "../right-side";
import Button from "../../../components/ui/button";

interface MergeCardRightProps {
  slots: (CollectionItem | null)[];
  onRemoveSlot: (index: number) => void;
  onMerge: () => void;
}

const MergeCardRight = ({ slots, onRemoveSlot, onMerge }: MergeCardRightProps) => {

  // Removed internal state and DnD handlers

  return (
    <div className="w-full h-full flex flex-col items-center relative">
      <div className="text-[#E85D04] font-hand font-bold text-xl lg:text-3xl mt-2 mb-4">
        GHÉP THẺ
      </div>

      <div className="flex-1 flex flex-col gap-2 lg:gap-3 w-full relative z-10">

        {/* Mystery Card Placeholder */}
        <div className="w-[90px] h-[126px] lg:w-[150px] lg:h-[205px] bg-[#D9D9D9] rounded-lg shadow-inner flex items-center justify-center relative mb-1 lg:mb-2 mx-auto">
          <span className="text-4xl lg:text-7xl text-orange-400 font-bold opacity-50">?</span>
        </div>

        {/* Slots */}
        <div className="w-[212px] lg:w-[432px] max-w-full mx-auto bg-[#FFFDF5] border border-orange-200 rounded-lg p-2 lg:p-6 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 border-orange-200  rotate-90">
            <img src="/images/chevon-left.png" alt="merge icon" className="w-4 h-4 lg:w-5 lg:h-5 object-contain" />
          </div>

          <div className="flex gap-2 lg:gap-3 justify-center my-2">
            {slots.map((slot, index) => (
              <div
                key={index}
                className="w-[42px] h-[60px] lg:w-[90px] lg:h-[122px] border-2 border-dashed border-orange-300 rounded bg-white flex items-center justify-center relative"
              >
                {slot ? (
                  <div className="w-full h-full relative group">
                    <ItemCard item={slot} borderColorClass="border-orange-400" isLocked={false} className="w-full h-full" />
                    <button
                      onClick={() => onRemoveSlot(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity"
                    >
                      x
                    </button>
                  </div>
                ) : (
                  <span className="text-orange-300 text-2xl lg:text-3xl font-bold">+</span>
                )}
              </div>
            ))}

          </div>

          <div className="flex justify-center absolute -bottom-7 left-1/2 -translate-x-1/2">
            <Button
              label="Ghép ngay"
              className="text-white"
              containerClassName="bg-contain! w-fit"
              onClick={onMerge}
              disabled={slots.filter(s => s !== null).length < 2} // Allow merge if at least 2 items
              customBgImage="/images/collection/button-primary.png"
            />
          </div>
        </div>
      </div>

      {/* Decor */}
      <img src="/images/collection/dog-decor.png" className="absolute bottom-10 left-2 w-16 z-0 hidden lg:block" alt="dog" />
      <img src="/images/collection/star-decor.png" className="absolute bottom-4 right-4 w-8 z-0 hidden lg:block" alt="star" />

    </div>
  )
}

export default MergeCardRight;
