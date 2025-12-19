type ButtonSize = "tiny" | "small" | "medium" | "large";

type ButtonProps = {
  label: string;
  size?: ButtonSize;
  lgSize?: ButtonSize;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};

const sizeMap: Record<
  ButtonSize,
  { width: string; height: string; lgWidth: string; lgHeight: string }
> = {
  tiny: {
    width: "w-[68px]",
    height: "h-[24px]",
    lgWidth: "lg:w-[81.6px]",
    lgHeight: "lg:h-[28.8px]",
  },
  small: {
    width: "w-[120px]",
    height: "h-[40px]",
    lgWidth: "lg:w-[120px]",
    lgHeight: "lg:h-[40px]",
  },
  medium: {
    width: "w-[160px]",
    height: "h-[48px]",
    lgWidth: "lg:w-[168px]",
    lgHeight: "lg:h-[57.6px]",
  },
  large: {
    width: "w-[200px]",
    height: "h-[56px]",
    lgWidth: "lg:w-[240px]",
    lgHeight: "lg:h-[67.2px]",
  },
};

const ButtonBg = "/images/small-bg-button.png";

export default function Button({
  label,
  size = "medium",
  lgSize,
  className = "",
  onClick,
  disabled = false,
}: ButtonProps) {
  const { width, height } = sizeMap[size];
  const { lgWidth, lgHeight } = sizeMap[lgSize || size];

  return (
    <div
      className={`${width} ${height} ${lgWidth} ${lgHeight} bg-center bg-no-repeat bg-cover cursor-pointer inline-flex items-center justify-center `}
      style={{ backgroundImage: `url(${ButtonBg})` }}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          if (!disabled) onClick?.();
        }
      }}
    >
      <button
        type="button"
        disabled={disabled}
        aria-label={label}
        tabIndex={0}
        className={`relative text-sm lg:text-base px-3 font-semibold text-white drop-shadow-md transition-opacity duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-400 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      >

        <span className=" leading-none">{label}</span>
      </button>
    </div>
  );
}
