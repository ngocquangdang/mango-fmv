const FRAME_IMG = "/images/note-frame.png";

const FramedStoryline = ({
  className,
  bgImg = FRAME_IMG,
}: {
  className: string;
  bgImg?: string;
}) => {
  return (
    <div className={`relative ${className}`}>
      {/* Ảnh chiếc khung */}
      <img
        src={bgImg}
        alt="Frame"
        className="relative block z-2 pointer-events-none w-full h-full"
      />

      {/* Ảnh nội dung bên trong */}
      <img
        src={"https://picsum.photos/200/120"}
        alt="Cốt truyện"
        className="absolute z-1 top-[7.5%] left-[6%] w-[88%] h-[85%]"
      />
    </div>
  );
};

export default FramedStoryline;
