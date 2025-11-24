import React from "react";

interface ButtonLighterProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  hoverColor?: {
    main?: string;      // Màu chính (mặc định #629BFE)
    accent?: string;    // Màu accent (mặc định #5FCDE3)
    shadow?: string;    // Màu shadow (mặc định #5B6DDF)
    border?: string;    // Màu border (mặc định #111111)
  };
}

export default function ButtonLighter({
  children,
  className = "",
  hoverColor,
  width = 287,
  ...props
}: ButtonLighterProps & { width?: number }) {
  const [isHovered, setIsHovered] = React.useState(false);

  const colors = {
    main: isHovered ? (hoverColor?.main || "#7AB3FF") : "#629BFE",
    accent: isHovered ? (hoverColor?.accent || "#7FE0F5") : "#5FCDE3",
    shadow: isHovered ? (hoverColor?.shadow || "#6B7DFF") : "#5B6DDF",
    border: isHovered ? (hoverColor?.border || "#000000") : "#111111",
  };

  const clipId0 = React.useId();
  const clipId1 = React.useId();

  return (
    <button
      className={`relative inline-flex items-center justify-center transition-all duration-200 ${className}`}
      style={{
        width: '100%',
        aspectRatio: `${width} / 86`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* SVG Background - scales with container */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${width} 86`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <g clipPath={`url(#${clipId0})`}>
          <path
            d={`M${width - 10.002} 10.001H${width - 0.001}V76.0029H${width - 9.999}V86H0V85.999H9.99902V76H0V10H10V0H${width - 10.002}V10.001Z`}
            fill={colors.main}
          />
          <g clipPath={`url(#${clipId1})`}>
            <rect x="9.99023" width={width - 19.992} height="5" fill={colors.border} />
            <rect x="9.99902" y="81" width={width - 19.998} height="5" fill={colors.border} />
            <rect
              x={width - 5.002}
              y="76"
              width="65.9999"
              height="5.00199"
              transform={`rotate(-90 ${width - 5.002} 76)`}
              fill={colors.border}
            />
            <rect
              width="66"
              height="5"
              transform="matrix(6.81584e-07 -1 -1 -2.8033e-09 5 76)"
              fill={colors.border}
            />
            <rect
              width="5"
              height="5"
              transform="matrix(-1 0 0 1 10 5)"
              fill={colors.border}
            />
            <rect
              width="5"
              height="5"
              transform={`matrix(-1 0 0 1 ${width - 5.002} 5)`}
              fill={colors.border}
            />
            <rect x="15" y="10" width={width - 30.002} height="5" fill={colors.accent} />
            <rect
              width="5"
              height="5"
              transform="matrix(-1 0 0 1 15 15)"
              fill={colors.accent}
            />
            <rect
              width="5"
              height="5"
              transform={`matrix(-1 0 0 1 ${width - 10.002} 15)`}
              fill={colors.accent}
            />
            <rect
              x="9.99902"
              y="81"
              width="5"
              height="5"
              transform="rotate(180 9.99902 81)"
              fill={colors.border}
            />
            <rect
              x={width - 4.999}
              y="81"
              width="5"
              height="5"
              transform={`rotate(180 ${width - 4.999} 81)`}
              fill={colors.border}
            />
            <rect
              x="9.99902"
              y="76.0015"
              width={width - 19.998}
              height="5"
              fill={colors.shadow}
            />
            <rect
              x="9.99902"
              y="76.0015"
              width="5"
              height="5"
              transform="rotate(180 9.99902 76.0015)"
              fill={colors.shadow}
            />
            <rect
              x={width - 4.999}
              y="76.0015"
              width="5"
              height="5"
              transform={`rotate(180 ${width - 4.999} 76.0015)`}
              fill={colors.shadow}
            />
          </g>
        </g>
        <defs>
          <clipPath id={clipId0}>
            <rect width={width} height="86" fill="white" />
          </clipPath>
          <clipPath id={clipId1}>
            <rect width={width} height="86" fill="white" />
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
