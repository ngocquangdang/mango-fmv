const FrameUser = ({
  selected,
  onClick,
  avatar,
  className
}: {
  selected: boolean;
  onClick?: () => void;
  avatar?: string;
  className?: string;
}) => {
  const FRAME_UNSELECTED_IMG = "/images/note-box-unselected.png";
  const FRAME_SELECTED_IMG = "/images/note-box-selected.png";

  return (
    <div
      className={`relative h-auto ${className}`}
      onClick={onClick}
    >
      <img
        src={selected ? FRAME_SELECTED_IMG : FRAME_UNSELECTED_IMG}
        alt="Frame Unselected"
        className="relative block w-full h-auto z-2 pointer-events-none"
      />

      <img
        src={avatar || "https://picsum.photos/200/120"}
        alt="User Avatar"
        className="absolute z-1 top-[7.5%] left-[6%] w-[88%] h-[85%]"
      />
    </div>
  );
};

export default FrameUser;
