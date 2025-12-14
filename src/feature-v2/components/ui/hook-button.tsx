type HookButtonProps = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

export default function HookButton({
  label,
  onClick,
  disabled = false,
  className = "",
}: HookButtonProps) {
  return (
    <div
      className={`relative min-w-[134px] min-h-[116px] ${className}`}
      aria-label={label}
      role="button"
      tabIndex={0}
      onClick={() => !disabled && onClick?.()}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          if (!disabled) onClick?.();
        }
      }}
    >
      <img src="/images/hook-button.png" alt="hook-button" className="w-full h-[116px]" />
      <button
        type="button"
        onClick={() => !disabled && onClick?.()}
        disabled={disabled}
        className="text-[22px] font-regular text-white absolute z-10 h-fit top-[38%] left-[40%] -translate-x-1/2 -translate-y-1/2 -rotate-5"
      >
        {label}
      </button>
    </div>
  );
}

