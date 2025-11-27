import { useMemo, useState } from "react";
import NoteActiveCard from "../../../components/card/note-active";
import NoteDefaultCard from "../../../components/card/note-default";
import ArrowLeft from "../../../components/icon/arrow-left";
import ArrowRight from "../../../components/icon/arrow-right";

type NoteGridProps = {
  items: { id: string; label?: string; imageSrc: string; isActive?: boolean }[];
  onItemClick?: (item: {
    id: string;
    label?: string;
    imageSrc: string;
    isActive?: boolean;
  }) => void;
};

export default function NoteGrid({ items, onItemClick }: NoteGridProps) {
  const ITEMS_PER_PAGE = 6;
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
        <div className="grid grid-cols-3 gap-x-6 gap-y-6">
          {visibleItems.map((item) => (
            <div key={item.id} className="cursor-pointer">
              {item.isActive ? (
                <NoteActiveCard imageSrc={item.imageSrc}>
                  <button
                    type="button"
                    className="text-sm"
                    aria-label={item.label || "Note item"}
                    onClick={() => onItemClick?.(item)}
                  >
                    {item.label}
                  </button>
                </NoteActiveCard>
              ) : (
                <NoteDefaultCard src={item.imageSrc}>
                  <span className="text-sm">?</span>
                </NoteDefaultCard>
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
