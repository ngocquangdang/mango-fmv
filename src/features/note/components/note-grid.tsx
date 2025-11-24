import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import NoteActiveCard from "../../../components/card/note-active";
import NoteDefaultCard from "../../../components/card/note-default";
import ArrowLeft from "../../../components/icon/arrow-left";
import ArrowRight from "../../../components/icon/arrow-right";

type NoteGridProps = {
  items: { id: string; label?: string; imageSrc: string; isActive?: boolean }[];
  onItemClick?: (item: { id: string; label?: string; imageSrc: string; isActive?: boolean }) => void;
};

export default function NoteGrid({ items, onItemClick }: NoteGridProps) {
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
        slidesPerView={3}
        spaceBetween={24}
        grid={{ rows: 2, fill: "row" }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id} className="w-fit!">
            <div className="cursor-pointer">
              {item.isActive ? (
                <NoteActiveCard imageSrc={item.imageSrc}>
                  <div className="text-sm" onClick={() => onItemClick?.(item)}  >{item.label}</div>
                </NoteActiveCard>
              ) : (
                <NoteDefaultCard src={item.imageSrc}>
                  <div className="text-sm">?</div>
                </NoteDefaultCard>
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
