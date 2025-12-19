type PhotoFrameProps = {
  imageSrc: string;
  score: number;
  className?: string;
};

const PhotoFrame = ({ imageSrc = "", score = 0, className = "" }: PhotoFrameProps) => {
  const AVATAR_FRAME = "/images/avatar-frame.png";
  const containerClassName = `
    relative flex items-center justify-center overflow-hidden rounded-sm
    rotate-[-3deg]
    transition-transform duration-300 hover:rotate-0 hover:scale-105
    ${className || "w-16 h-16"}
  `;

  return (
    <div
      className={containerClassName}
      role="img"
      aria-label="User photo frame"
      tabIndex={0}
    >
      <img
        src={imageSrc}
        alt="User"
        loading="lazy"
        className={`absolute inset-2.5 top-[6px] left-[7px] lg:top-[12px] lg:left-[14px] z-1 object-cover bg-neutral-200 rotate-[8deg] w-[63%] h-[63%]`}
      />

      <img
        src={AVATAR_FRAME}
        alt="Frame"
        loading="lazy"
        className={`absolute inset-0 z-2 pointer-events-none drop-shadow-md`}
      />

      <div className="absolute bottom-0 right-0 z-3 rotate-[-10deg] text-sm font-bold text-[#F76933]">
        +{score}
      </div>
    </div>
  );
};

export default PhotoFrame;
