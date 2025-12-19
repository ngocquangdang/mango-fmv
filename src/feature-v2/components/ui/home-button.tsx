export default function HomeButton({
  icon,
  label,
  onClick,
}: {
  icon: string;
  label: string;
  onClick?: () => void;
}) {
  return (
    <div className="relative w-[132px] lg:w-[158px] cursor-pointer" onClick={onClick}>
      <div className="flex items-center custom-shadow-box w-full py-2 px-3.5">
        <img
          src={icon}
          alt="home-button"
          className="w-6 h-6 lg:w-[29px] lg:h-[29px] mr-2"
        />
        <button className="text-xs lg:text-[14.4px] items-center pointer-events-none">{label}</button>
      </div>
      <div className="custom-shadow-box-shadow"></div>
    </div>
  );
}
