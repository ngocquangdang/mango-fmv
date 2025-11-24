import React from "react";

interface ButtonUIProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  hoverColor?: {
    main?: string;      // Màu chính (mặc định #FA7036)
    accent?: string;    // Màu accent (mặc định #F0C446)
    shadow?: string;    // Màu shadow (mặc định #CE4D2A)
    border?: string;    // Màu border (mặc định #111111)
  };
}

export default function ButtonUI({
  children,
  className = "",
  hoverColor,
  width = 357,
  ...props
}: ButtonUIProps & { width?: number }) {
  const [isHovered, setIsHovered] = React.useState(false);

  const colors = {
    main: isHovered ? (hoverColor?.main || "#FF8C42") : "#FA7036",
    accent: isHovered ? (hoverColor?.accent || "#FFD700") : "#F0C446",
    shadow: isHovered ? (hoverColor?.shadow || "#E65A2E") : "#CE4D2A",
    border: isHovered ? (hoverColor?.border || "#000000") : "#111111",
  };

  return (
    <button
      className={`relative inline-flex items-center justify-center transition-all duration-200 ${className}`}
      style={{
        minWidth: `${width}px`,
        minHeight: '60px',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* SVG Background - scales with container */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${width} 111`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <g clipPath="url(#clip0_3_9696)">
          <path
            d={`M${width - 20} 20H${width - 10}V91H${width - 20}V101H20V91H10V20H20V10H${width - 20}V20Z`}
            fill={colors.main}
          />
          <rect x="20" width={width - 40} height="10" fill={colors.border} />
          <rect x="20" y="101" width={width - 40} height="10" fill={colors.border} />
          <rect
            x={width - 10}
            y="91"
            width="71"
            height="10"
            transform={`rotate(-90 ${width - 10} 91)`}
            fill={colors.border}
          />
          <rect
            width="71"
            height="10"
            transform="matrix(5.01702e-07 -1 -1 -3.80841e-09 10 91)"
            fill={colors.border}
          />
          <rect
            width="10"
            height="10"
            transform="matrix(-1 0 0 1 20 10)"
            fill={colors.border}
          />
          <rect
            width="10"
            height="10"
            transform={`matrix(-1 0 0 1 ${width - 10} 10)`}
            fill={colors.border}
          />
          <rect x="30" y="20" width={width - 60} height="10" fill={colors.accent} />
          <rect
            width="10"
            height="10"
            transform="matrix(-1 0 0 1 30 30)"
            fill={colors.accent}
          />
          <rect
            width="10"
            height="10"
            transform={`matrix(-1 0 0 1 ${width - 20} 30)`}
            fill={colors.accent}
          />
          <rect
            x="20"
            y="101"
            width="10"
            height="10"
            transform="rotate(180 20 101)"
            fill={colors.border}
          />
          <rect
            x={width - 10}
            y="101"
            width="10"
            height="10"
            transform={`rotate(180 ${width - 10} 101)`}
            fill={colors.border}
          />
          <rect x="20" y="91" width={width - 40} height="10" fill={colors.shadow} />
          <rect
            x="20"
            y="91"
            width="10"
            height="10"
            transform="rotate(180 20 91)"
            fill={colors.shadow}
          />
        </g>
        <defs>
          <clipPath id="clip0_3_9696">
            <rect width={width} height="111" fill="white" />
          </clipPath>
        </defs>
      </svg>

      {/* Children content */}
      <span className="relative z-10 px-4 py-2">
        {children}
      </span>
    </button>
  );
}
