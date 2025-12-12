import React from "react";
import FrameUser from "../../pages/journal/frame-user";
import FramedStoryline from "../../pages/journal/frame-story";
// Import các assets đã có

// Bạn nên thay thế các biến này bằng đường dẫn ảnh sticker thật của bạn
const CLOUD_STICKER = "https://cdn-icons-png.flaticon.com/512/1165/1165646.png"; // Ví dụ placeholder
const STAR_STICKER = "https://cdn-icons-png.flaticon.com/512/1828/1828884.png"; // Ví dụ placeholder
const CLIP_STICKER = "https://cdn-icons-png.flaticon.com/512/3081/3081096.png"; // Ví dụ placeholder (Kẹp giấy)
const CLOSE_BTN_IMG = "https://cdn-icons-png.flaticon.com/512/1828/1828778.png"; // Ví dụ nút Close đỏ

const DialogInfo = ({
  isOpen = true,
  onClose,
  data = {
    mainImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36", // Ảnh nhân vật
    itemImage: "https://images.unsplash.com/photo-1603351154351-5cf233081547", // Ảnh vật phẩm (Airpods)
    itemName: "airpods",
    title: "Khoảnh khắc của Phúc Nguyên",
    description:
      "Khi Phúc Nguyên đeo Airpods, anh lạc vào thế giới âm nhạc của mình. Một buổi chiều nắng đẹp, anh ngồi trên ghế công viên, nhắm mắt và để những giai điệu cuốn trôi lo âu. Mỗi lần nghe bài hát yêu thích, nụ cười của anh như ánh nắng.",
  },
}: {
  isOpen: boolean;
  onClose: () => void;
  data: {
    mainImage: string;
    itemImage: string;
    itemName: string;
    title: string;
    description: string;
  };
}) => {
  const BG_PAPER_IMG = "/images/bg-dialog-info.png";
  const FLOWER_IMAGE = "/images/flower.png";
  if (!isOpen) return null;

  return (
    // Lớp phủ mờ (Overlay)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60  p-4">
      <div
        className="relative w-full max-w-[370px] h-[294px] ml-[240px] bg-contain bg-center bg-no-repeat shadow-2xl"
        style={{ backgroundImage: `url(${BG_PAPER_IMG})` }}
      >
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 md:top-4 md:right-4 z-50 transition-transform hover:scale-110"
        >
          X
        </button>

        <div className="absolute z-10 top-8 -left-[60%]">
          <FramedStoryline className="w-[318px] h-[248px] -rotate-12" />
        </div>
        <div className="absolute w-fit left-[16%] z-20">
          <FramedStoryline
            className="w-[110px] h-[134px]"
            bgImg="/images/note-gift-card.png"
          />
        </div>

        <div className="pl-[124px] pr-[50px] pt-7">
          <div className="pl-14 ">
            <img src={FLOWER_IMAGE} alt="flower" className="w-12 h-15" />
            <h2 className="text-sm font-bold text-[#F76933]">{data.title}</h2>
          </div>
          <p className="text-[10px] text-[#667085] mt-4">{data.description}</p>
        </div>
      </div>
    </div>
  );
};

export default DialogInfo;
