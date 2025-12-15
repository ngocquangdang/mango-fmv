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
    <div className="relative w-[120px] cursor-pointer" onClick={onClick}>
      <div className="flex items-center custom-shadow-box w-full py-2 px-3.5">
        <img
          src={icon}
          alt="home-button"
          className="w-6 h-6 mr-2"
        />
        <button className="text-xs items-center pointer-events-none">{label}</button>
      </div>
      <div className="custom-shadow-box-shadow"></div>
    </div>
  );
}
