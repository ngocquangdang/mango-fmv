
// import React from "react";


const CollectionProgress = ({
  current = 0,
  max = 40,
  className = "",
}: {
  current: number;
  max: number;
  className?: string;
}) => {
  const percentage = Math.min((current / max) * 100, 100);

  return (
    <div className={`relative w-[300px] lg:w-[450px] ${className}`}>
      {/* Progress Text - Centered or following design */}
      {/* Mockup shows 25/40 text inside the bar or above. Mockup has icon on right. */}

      <div className="relative h-6 lg:h-8 bg-black/30 rounded-full border-2 border-white/50 backdrop-blur-sm">
        {/* Fill */}
        <div
          className="h-full bg-gradient-to-r from-orange-400 to-yellow-300 rounded-full relative min-w-[20px]"
          style={{ width: `${percentage}%` }}
        >
          {/* Text is centered in the bar in the mockup, let's put it absolute centered in container */}
        </div>

        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold text-xs lg:text-sm drop-shadow-md z-10">
          {current}/{max}
        </span>

        {/* End Icon */}
        <div className="absolute -right-4 -top-4 w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center">
          <img src="/images/elements/card-frame.png" alt="Card Reward" className="w-full h-full object-contain rotate-12 drop-shadow-lg" />
          {/* Fallback if card-frame is empty or invalid, user can swap */}
        </div>
      </div>

      <p className="text-[10px] lg:text-xs text-blue-900 font-semibold text-center mt-2 max-w-full">
        Đảm bảo nhận 1 thẻ Ultra rare ngẫu nhiên khi mở 40 túi mù liên tiếp
      </p>
    </div>
  );
};

export default CollectionProgress;
