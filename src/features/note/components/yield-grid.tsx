import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import YieldActiveCard from "../../../components/card/yield-active";
import YieldDefaultCard from "../../../components/card/yield-default";
import ArrowLeft from "../../../components/icon/arrow-left";
import ArrowRight from "../../../components/icon/arrow-right";

type YieldGridProps = {
  items: { id: string; label?: string; imageSrc: string; isActive?: boolean }[];
  onItemClick?: (item: { id: string; label?: string; imageSrc: string; isActive?: boolean }) => void;
};

export default function YieldGrid({ items, onItemClick }: YieldGridProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };
  return (
    <div className="flex items-center gap-8">
      <button onClick={handlePrev} className={`w-10 h-10 `}>
        <ArrowLeft width={40} height={40} />
      </button>
      <Swiper
        modules={[Grid, Navigation]}
        slidesPerView={4}
        grid={{ rows: 2, fill: "row" }}
        spaceBetween={32}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id} className="w-fit!">
            <div className="cursor-pointer">
              {item.isActive ? (
                <YieldActiveCard imageSrc={item.imageSrc}>
                  <div className="text-sm" onClick={() => onItemClick?.(item)}>{item.label}</div>
                </YieldActiveCard>
              ) : (
                <YieldDefaultCard src={item.imageSrc}>
                  <div className="text-sm">?</div>
                </YieldDefaultCard>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button onClick={handleNext} className={`w-10 h-10 `}>
        <ArrowRight width={40} height={40} />
      </button>
    </div>
  );
}
