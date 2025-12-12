export default function HomeButton({
  icon,
  label,
}: {
  icon: string;
  label: string;
}) {
  return (
    <div className="relative w-[120px]">
      <div className="flex items-center custom-shadow-box w-full py-2 px-3.5">
        <img
          src={icon}
          alt="home-button"
          className="w-6 h-6 mr-2"
        />
        <button className="text-xs items-center">{label}</button>
      </div>
      <div className="custom-shadow-box-shadow"></div>
    </div>
  );
}
