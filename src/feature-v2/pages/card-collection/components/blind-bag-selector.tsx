

import type { Banner } from "../services/card-collection-service";

interface BlindBagSelectorProps {
  banners?: Banner[];
  selectedIndex?: number;
  onSelect?: (index: number) => void;
}

const BlindBagItem = ({ item, isActive: _isActive = false }: { item: any; isActive?: boolean }) => {
  return (
    <div className="relative transition-all duration-300 flex flex-col items-center z-10">
      {/* Light effect can be kept or removed, keeping it simple for now */}
      {/* {isActive && <div className="absolute inset-0 bg-white/50 blur-xl rounded-full"></div>} */}

      <div
        className="flex items-center justify-center relative w-[100px] h-[90px] lg:w-[255px] lg:h-[230px]"
        style={{
          backgroundImage: "url('/images/collection/blind-bag.png')",
          backgroundSize: "contain",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <img
          src={item?.image}
          alt="bag"
          className="object-contain w-[60px] h-[40px] lg:w-[152px] lg:h-[102px] drop-shadow-md"
        />
      </div>

      <div className="absolute top-[85%] left-1/2 -translate-x-1/2 flex items-center justify-center w-[90px] h-[36px] lg:w-[230px] lg:h-[92px]" style={{
        backgroundImage: "url('/images/tab-selected.png')",
        backgroundSize: "contain",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}>
        <div className="text-[10px] lg:text-2xl font-bold text-[#3B4C7A] text-center w-[80px] lg:w-[195px] line-clamp-1 pb-1 lg:pb-4">
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
    <div className="relative flex items-center justify-center w-full px-8 py-4">
      {/* Left Arrow */}
      <div
        className="cursor-pointer absolute -left-20 z-50 hover:scale-110 transition-transform"
        onClick={handlePrev}
      >
        <img
          src="/images/chevon-left.png"
          alt="prev-page"
          className="w-8 h-8 drop-shadow-md"
        />
      </div>

      {/* Carousel Items */}
      <div className="flex items-center justify-center gap-1 w-full">
        <BlindBagItem item={items[leftIndex]} isActive={false} />
        <BlindBagItem item={items[selectedIndex]} isActive={true} />
        <BlindBagItem item={items[rightIndex]} isActive={false} />
      </div>

      {/* Right Arrow */}
      <div
        className="cursor-pointer absolute -right-20 z-50 hover:scale-110 transition-transform"
        onClick={handleNext}
      >
        <img
          src="/images/chevon-right.png"
          alt="next-page"
          className="w-8 h-8 drop-shadow-md"
        />
      </div>
    </div>
  );
};

export default BlindBagSelector;
