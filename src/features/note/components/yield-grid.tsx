import { useMemo, useState } from "react";
import YieldActiveCard from "../../../components/card/yield-active";
import YieldDefaultCard from "../../../components/card/yield-default";
import ArrowLeft from "../../../components/icon/arrow-left";
import ArrowRight from "../../../components/icon/arrow-right";

type YieldGridProps = {
  items: { id: string; label?: string; imageSrc: string; isActive?: boolean }[];
  onItemClick?: (item: {
    id: string;
    label?: string;
    imageSrc: string;
    isActive?: boolean;
  }) => void;
};

export default function YieldGrid({ items, onItemClick }: YieldGridProps) {
  const ITEMS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = useMemo(
    () => Math.ceil(items.length / ITEMS_PER_PAGE),
    [items.length]
  );

  const visibleItems = useMemo(
    () =>
      items.slice(
        currentPage * ITEMS_PER_PAGE,
        (currentPage + 1) * ITEMS_PER_PAGE
      ),
    [items, currentPage]
  );

  const handlePrev = () => {
    if (currentPage === 0) return;
    setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage >= totalPages - 1) return;
    setCurrentPage((prev) => prev + 1);
  };

  if (!items.length) return null;

  return (
    <div className="flex items-center justify-between gap-8 h-full w-full">
      <ArrowLeft
        width={40}
        height={40}
        onClick={totalPages > 1 ? handlePrev : undefined}
      />

      <foreignObject x="0" y="0" width="200" height="231">
        <div className="grid grid-cols-4 gap-x-6 gap-y-6">
          {visibleItems.map((item) => (
            <div key={item.id} className="w-[200px] h-[231px]">
              {item.isActive ? (
                <YieldActiveCard imageSrc={item.imageSrc}>
                  <button
                    type="button"
                    className="text-sm"
                    aria-label={item.label || "Yield item"}
                    onClick={() => onItemClick?.(item)}
                  >
                    {item.label}
                  </button>
                </YieldActiveCard>
              ) : (
                <YieldDefaultCard src={item.imageSrc}>
                  <span className="text-sm">?</span>
                </YieldDefaultCard>
              )}
            </div>
          ))}
        </div>
      </foreignObject>

      <ArrowRight
        width={40}
        height={40}
        onClick={totalPages > 1 ? handleNext : undefined}
      />
    </div>
  );
}
