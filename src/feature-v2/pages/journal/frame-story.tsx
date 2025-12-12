const FRAME_IMG = "/images/note-frame.png";

const FramedStoryline = ({
  className,
  bgImg = FRAME_IMG,
  info,
}: {
  className?: string;
  bgImg?: string;
  info?: {
    avatar: string;
    name: string;
    description: string;
  };
}) => {
  return (
    <div className={`relative ${className}`}>
      <img
        src={bgImg}
        alt="Frame"
        className="relative block z-2 pointer-events-none w-full h-full"
      />

      <img
        src={info?.avatar || "https://picsum.photos/200/120"}
        alt="Cốt truyện"
        className="absolute z-1 top-[7.5%] left-[6%] w-[88%] h-[85%]"
      />
      <div className="absolute z-10 bottom-1 left-0 w-full flex items-center justify-center">
        <p className="text-xs">{info?.name}</p>
      </div>
    </div>
  );
};

export default FramedStoryline;
