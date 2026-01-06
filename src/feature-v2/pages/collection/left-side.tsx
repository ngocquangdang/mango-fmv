import React from "react";
import { useCollection } from "./hooks/use-collection";

const LeftSide: React.FC = () => {
  const { selectedCard } = useCollection();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2 lg:p-4">
      {/* Selected Card Display */}
      {selectedCard ? (
        <div className="w-full max-w-[160px] lg:max-w-[220px]">
          <div className="relative">
            {/* Card with tier-based styling */}
            <div className="relative rounded-lg lg:rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
              <img
                src={selectedCard.imageUrl}
                alt={selectedCard.name}
                className="w-full h-auto object-cover aspect-[3/4.5]"
              />
              {/* Quantity badge */}
              {selectedCard.quantity > 1 && (
                <div className="absolute top-1.5 right-1.5 bg-black/70 text-white rounded-full w-6 h-6 lg:w-9 lg:h-9 flex items-center justify-center font-bold text-[10px] lg:text-sm">
                  x{selectedCard.quantity}
                </div>
              )}
              {(selectedCard.serialNumbers && selectedCard.serialNumbers.length > 0) && (
                <div className="absolute bottom-1.5 right-1.5 flex flex-row gap-1">
                  {selectedCard.serialNumbers.map((sn) => (
                    <div key={sn} className="bg-black/70 text-white rounded-full w-6 h-6 lg:w-9 lg:h-9 flex items-center justify-center font-bold text-sm">
                      {sn}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="text-4xl lg:text-6xl mb-4 opacity-30">🎴</div>
          <h2 className="text-sm lg:text-lg font-bold text-gray-700 mb-2">
            Chọn một thẻ
          </h2>
          <p className="text-xs lg:text-sm text-gray-500">
            Nhấp vào thẻ bên phải để xem chi tiết
          </p>
        </div>
      )}
    </div>
  );
};

export default LeftSide;
