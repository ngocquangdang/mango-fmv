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
  };
}) => {
  return (
    <div className={`relative ${className}`}>
      <img
        src={bgImg}
        alt="Frame"
        className="relative block z-2 pointer-events-none w-full h-full"
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <img
        src={info?.avatar || ""}
        alt={info?.name}
        className="absolute z-1 top-[7.5%] left-1/2 -translate-x-1/2 w-auto h-[74%] object-contain"
      />
      <div className="absolute z-10 bottom-1 left-0 w-full flex items-center justify-center">
        <p className="text-xs">{info?.name}</p>
      </div>
    </div>
  );
};

export default FramedStoryline;
