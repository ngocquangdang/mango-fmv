
import { useState } from "react";

const BlindBagSelector = () => {
  // Mock data - In real app, this would come from props or API
  const [selectedIndex, setSelectedIndex] = useState(1);

  const items = [
    { id: 1, name: "Túi mù Minh Hiếu", image: "/images/gift-highlight.png" },
    { id: 2, name: "Túi mù Mỹ Nam", image: "/images/gift-highlight.png" }, // Central item
    { id: 3, name: "Túi mù Minh Hiếu", image: "/images/gift-highlight.png" },
  ];

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  // Simple view: Left (prev), Center (current), Right (next)
  const leftIndex = (selectedIndex - 1 + items.length) % items.length;
  const rightIndex = (selectedIndex + 1) % items.length;

  return (
    <div className="flex items-center justify-center gap-4 lg:gap-12 mt-8 lg:mt-16 w-full max-w-[800px]">
      <div
        className={`cursor-pointer`}
        onClick={handlePrev}
        style={{ zIndex: 50 }}
      >
        <img
          src="/images/chevon-left.png"
          alt="prev-page"
          className="w-6 h-6 lg:w-[28.8px] lg:h-[28.8px]"
        />
      </div>
      {/* Carousel Items */}
      <div className="flex items-center justify-center gap-2 lg:gap-4 h-[250px] lg:h-[320px] relative">

        {/* Left Item (Smaller, dimmer) */}
        <div className="relative opacity-70 transform scale-75 translate-y-4">
          <div className="w-[120px] h-[150px] lg:w-[160px] lg:h-[200px] flex items-center justify-center bg-blue-100/30 rounded-xl border-2 border-white/50 shadow-inner backdrop-blur-sm">
            <img src={items[leftIndex].image} alt="bag" className="w-full h-full object-contain p-2" />
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#EAD4aa] px-2 py-1 rounded text-[8px] lg:text-[10px] text-gray-600 whitespace-nowrap border border-orange-200">
            {items[leftIndex].name}
          </div>
        </div>

        {/* Center Item (Main, large, glowing) */}
        <div className="relative z-10 transform scale-110 -translate-y-2">
          <div className="absolute inset-0 bg-white/50 blur-xl rounded-full"></div>
          <div className="w-[160px] h-[200px] lg:w-[220px] lg:h-[280px] flex items-center justify-center relative">
            <img src={items[selectedIndex].image} alt="bag" className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
          </div>
          <div className="absolute top-[90%] left-1/2 -translate-x-1/2 w-[200px] text-center">
            <div className="bg-[#EAD4aa] px-4 py-2 rounded-lg text-sm lg:text-base font-bold text-[#3B4C7A] border-2 border-[#D6C098] shadow-md transform -rotate-1">
              {items[selectedIndex].name}
            </div>
          </div>
        </div>

        {/* Right Item (Smaller, dimmer) */}
        <div className="relative opacity-70 transform scale-75 translate-y-4">
          <div className="w-[120px] h-[150px] lg:w-[160px] lg:h-[200px] flex items-center justify-center bg-blue-100/30 rounded-xl border-2 border-white/50 shadow-inner backdrop-blur-sm">
            <img src={items[rightIndex].image} alt="bag" className="w-full h-full object-contain p-2" />
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#EAD4aa] px-2 py-1 rounded text-[8px] lg:text-[10px] text-gray-600 whitespace-nowrap border border-orange-200">
            {items[rightIndex].name}
          </div>
        </div>

      </div>

      {/* Right Arrow */}
      <div
        className={`cursor-pointer`}
        onClick={handleNext}
        style={{ zIndex: 50 }}
      >
        <img
          src="/images/chevon-right.png"
          alt="next-page"
          className="w-6 h-6 lg:w-[28.8px] lg:h-[28.8px]"
        />
      </div>
    </div>
  );
};

export default BlindBagSelector;
