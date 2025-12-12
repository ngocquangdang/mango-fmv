type ButtonSize = "small" | "medium" | "large";

type ButtonProps = {
  label: string;
  size?: ButtonSize;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};

const sizeMap: Record<ButtonSize, { width: string; height: string }> = {
  small: { width: "w-[120px]", height: "h-[40px]" },
  medium: { width: "w-[160px]", height: "h-[48px]" },
  large: { width: "w-[200px]", height: "h-[56px]" },
};

const ButtonBg = "/images/small-bg-button.png";

export default function Button({
  label,
  size = "medium",
  className = "",
  onClick,
  disabled = false,
}: ButtonProps) {
  const { width, height } = sizeMap[size];

  return (
    <div className={`${width} ${height} bg-center bg-no-repeat bg-cover cursor-pointer inline-flex items-center justify-center `}
    style={{ backgroundImage: `url(${ButtonBg})` }}
    >
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-label={label}
        tabIndex={0}
        className={`relative text-sm font-semibold text-white drop-shadow-md transition-opacity duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-400 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            if (!disabled) onClick?.();
          }
        }}
      >
        <span className="px-3 leading-none">{label}</span>
      </button>
    </div>
  );
}
