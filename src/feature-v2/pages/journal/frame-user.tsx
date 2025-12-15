const FrameUser = ({
  selected,
  onClick,
}: {
  selected: boolean;
  onClick?: () => void;
}) => {
  const FRAME_UNSELECTED_IMG = "/images/note-box-unselected.png";
  const FRAME_SELECTED_IMG = "/images/note-box-selected.png";

  return (
    <div
      className={`relative h-auto ${selected ? "w-[64px]" : "w-[42px]"}`}
      onClick={onClick}
    >
      <img
        src={selected ? FRAME_SELECTED_IMG : FRAME_UNSELECTED_IMG}
        alt="Frame Unselected"
        className="relative block w-full h-auto z-2 pointer-events-none"
      />

      <img
        src={"https://picsum.photos/200/120"}
        alt="User Avatar"
        className="absolute z-1 top-[7.5%] left-[6%] w-[88%] h-[85%]"
      />
    </div>
  );
};

export default FrameUser;
