

import type { Banner } from "../services/card-collection-service";

interface BlindBagSelectorProps {
  banners?: Banner[];
  selectedIndex?: number;
  onSelect?: (index: number) => void;
}

const BlindBagItem = ({ item, isActive = false }: { item: any; isActive?: boolean }) => {
  return (
    <div className={`relative transition-all duration-300 flex flex-col items-center ${isActive ? "z-10 scale-100 -translate-y-2" : "opacity-70 scale-90 translate-y-2 grayscale-[0.3]"}`}>
      {isActive && <div className="absolute inset-0 bg-white/40 blur-2xl rounded-full scale-110"></div>}

      <div
        className={`flex items-center justify-center relative transition-all duration-300 ${isActive ? "w-[180px] h-[140px]" : "w-[90px] h-[70px]"}`}
        style={{
          backgroundImage: "url('/images/collection/blind-bag.png')",
          backgroundSize: "contain",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <img
          src="/images/home/paper-CB.png"
          alt="bag"
          className={`object-contain transition-all duration-300 ${isActive ? "w-[100px] h-[60px] drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" : "w-[40px] h-[30px]"}`}
        />
      </div>

      <div className={`transition-all duration-300 flex items-center justify-center bg-center bg-no-repeat bg-contain ${isActive ? "w-[120px] h-[48px] mt-2" : "w-[80px] h-[36px] mt-1"}`} style={{
        backgroundImage: "url('/images/tab-selected.png')",
      }}>
        <div className={`${isActive ? "text-sm font-bold text-[#3B4C7A] -rotate-1" : "text-[10px] text-gray-600 scale-90"}`}>
          {item?.name}
        </div>
      </div>
    </div>
  );
};

const BlindBagSelector = ({ banners = [], selectedIndex = 0, onSelect }: BlindBagSelectorProps) => {

  // Map banners to items or use fallback
  const items = banners.map(b => ({
    id: b.id,
    name: b.name,
    image: b.imageUrl
  }))

  const handleNext = () => {
    if (onSelect) {
      onSelect((selectedIndex + 1) % items.length);
    }
  };

  const handlePrev = () => {
    if (onSelect) {
      onSelect((selectedIndex - 1 + items.length) % items.length);
    }
  };

  // Simple view: Left (prev), Center (current), Right (next)
  const leftIndex = (selectedIndex - 1 + items.length) % items.length;
  const rightIndex = (selectedIndex + 1) % items.length;

  return (
    <div className="flex items-center justify-center w-full px-2">
      {/* Left Arrow */}
      <div
        className={`component-clickable absolute left-0 z-50 p-2 cursor-pointer hover:scale-110 transition-transform`}
        onClick={handlePrev}
      >
        <img
          src="/images/chevon-left.png"
          alt="prev-page"
          className="w-6 h-6 lg:w-8 lg:h-8 drop-shadow-md"
        />
      </div>

      {/* Carousel Items */}
      <div className="flex items-end justify-center gap-2 h-[240px] w-full">
        <BlindBagItem item={items[leftIndex]} isActive={false} />
        <BlindBagItem item={items[selectedIndex]} isActive={true} />
        <BlindBagItem item={items[rightIndex]} isActive={false} />
      </div>

      {/* Right Arrow */}
      <div
        className={`component-clickable absolute right-0 z-50 p-2 cursor-pointer hover:scale-110 transition-transform`}
        onClick={handleNext}
      >
        <img
          src="/images/chevon-right.png"
          alt="next-page"
          className="w-6 h-6 lg:w-8 lg:h-8 drop-shadow-md"
        />
      </div>
    </div>
  );
};

export default BlindBagSelector;
