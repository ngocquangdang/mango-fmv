import { useState, useMemo } from "react";
import FramedStoryline from "./frame-story";
import type { MomentReward } from "../../../features/user/apis";

interface RightSideProps {
  collectedRewards?: MomentReward[];
}

const ITEMS_PER_PAGE = 9;

export default function RightSide({ collectedRewards = [] }: RightSideProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(collectedRewards.length / ITEMS_PER_PAGE);

  const currentItems = useMemo(() => {
    const start = currentPage * ITEMS_PER_PAGE;
    return collectedRewards.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, collectedRewards]);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="relative w-full h-full">
      <div className="flex flex-row items-center justify-center h-full">
        {/* Nút Prev - ẩn nếu ở trang đầu */}
        <div
          className={`cursor-pointer ${
            currentPage === 0 ? "opacity-0 pointer-events-none" : ""
          }`}
          onClick={handlePrevPage}
          style={{ zIndex: 50 }}
        >
          <img
            src="/images/chevon-left.png"
            alt="prev-page"
            className="w-6 h-6"
          />
        </div>

        <div className="grid grid-cols-3 gap-2 min-w-[200px] min-h-[220px]">
          {currentItems.map((reward) => (
            <div key={reward.rewardId}>
              <FramedStoryline
                className="w-[54px] h-[64px] -rotate-12"
                bgImg="/images/note-gift-card.png"
                info={{
                  avatar: reward.rewardImageUrl,
                  name: "",
                }}
              />
            </div>
          ))}
          {/* Fill empty slots if current page has less than 9 items to maintain layout */}
          {Array.from({ length: ITEMS_PER_PAGE - currentItems.length }).map(
            (_, index) => (
              <div key={`empty-${index}`} className="w-[54px] h-[64px]" />
            )
          )}
        </div>

        {/* Nút Next - ẩn nếu ở trang cuối */}
        <div
          className={`cursor-pointer ${
            currentPage >= totalPages - 1 ? "opacity-0 pointer-events-none" : ""
          }`}
          onClick={handleNextPage}
          style={{ zIndex: 50 }}
        >
          <img
            src="/images/chevon-right.png"
            alt="next-page"
            className="w-6 h-6"
          />
        </div>
      </div>
      <div className="absolute bottom-2 left-4">
        <span className="text-[10px]">
          Bạn đã sưu tầm được {collectedRewards.length}/
          {collectedRewards.length} vật phẩm
        </span>
      </div>
    </div>
  );
}
