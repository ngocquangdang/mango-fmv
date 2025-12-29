
import type { CollectionItem } from "../right-side";
import { ItemCard } from "../right-side";
import Button from "../../../components/ui/button";

interface MergeCardRightProps {
  slots: (CollectionItem | null)[];
  onRemoveSlot: (index: number) => void;
  onMerge: () => void;
}

export default function MergeCardRight({ slots, onRemoveSlot, onMerge }: MergeCardRightProps) {
  return (
    <div className="w-full h-full flex flex-col items-center relative pt-2 lg:pt-4 overflow-hidden">



      <div className="flex-1 flex flex-col w-full relative z-10 items-center justify-start mt-8 lg:mt-10">

        {/* Mystery Card Area - Scaled down significantly */}
        <div className="relative mb-2">
          {/* Card Container */}
          <div className="w-[80px] h-[112px] lg:w-[120px] lg:h-[168px] bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg shadow-lg border-[2px] border-[#FF9F1C] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-1.5 border border-white/20 rounded-md"></div>
            <div className="absolute top-3 right-1.5 text-[6px] text-[#FF9F1C] font-mono tracking-widest rotate-90 origin-top-right">SECRET</div>

            <span className="font-hand text-[#FF9F1C] text-5xl lg:text-7xl font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] filter">
              ?
            </span>

            <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-l-2 border-b-2 border-[#FF9F1C]"></div>
            <div className="absolute top-1.5 right-1.5 w-3 h-3 border-r-2 border-t-2 border-[#FF9F1C]"></div>
          </div>
        </div>

        {/* Input Slots Area - Scaled to fit */}
        <div className="w-[95%] lg:w-[90%] max-w-[280px] lg:max-w-xs bg-[#FFFDF5] border border-orange-300 rounded-lg p-2 lg:p-3 relative mt-1 shadow-sm">
          {/* Label/Icon */}
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#FF9F1C] text-white px-1.5 py-0.5 rounded text-[8px] lg:text-[10px] font-bold shadow-sm">
            ▲
          </div>

          <div className="flex gap-2 justify-center items-center my-1">
            {slots.map((slot, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-[36px] h-[50px] lg:w-[54px] lg:h-[76px] border border-dashed border-orange-300 rounded bg-white flex items-center justify-center relative hover:border-orange-500 transition-colors">
                  {slot ? (
                    <div className="w-full h-full relative group p-0.5">
                      <ItemCard item={slot} borderColorClass="border-transparent" isLocked={false} className="w-full h-full" />
                      <button
                        onClick={() => onRemoveSlot(index)}
                        className="absolute -top-1.5 -right-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] shadow-sm z-10"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <span className="text-orange-300 text-lg lg:text-xl font-bold select-none">+</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Merge Button - Compact */}
          <div className="mt-2 flex justify-center">
            <Button
              label="Ghép ngay"
              className={`text-white font-bold font-hand text-sm lg:text-base px-4 py-0.5 pb-1 shadow-sm transition-transform active:scale-95 ${slots.filter(Boolean).length >= 2 ? 'opacity-100' : 'opacity-70 grayscale'}`}
              containerClassName="w-fit"
              onClick={onMerge}
              disabled={slots.filter(s => s !== null).length < 2}
              customBgImage="/images/collection/button-primary.png"
            />
          </div>
        </div>

      </div>

      {/* Background Decors */}
      {/* <img src="/images/collection/dog-decor.png" className="absolute bottom-2 left-2 w-12 lg:w-16 opacity-80 pointer-events-none" alt="dog" /> */}
    </div>
  )
}
