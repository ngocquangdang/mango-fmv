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
  // Generate stable IDs without hooks
  const uniqueId = props.id || `default-${width}`;
  const clipId0 = `btn-lighter-clip-${uniqueId}-0`;
  const clipId1 = `btn-lighter-clip-${uniqueId}-1`;

  // Default colors (non-hover state)
  const defaultColors = {
    main: hoverColor?.shadow || "#629BFE",
    accent: hoverColor?.accent || "#5FCDE3",
    shadow: hoverColor?.shadow || "#5B6DDF",
    border: hoverColor?.border || "#111111",
  };

  // Hover colors
  const hoverColors = {
    main: hoverColor?.main || "#7AB3FF",
    accent: hoverColor?.accent || "#7FE0F5",
    shadow: hoverColor?.shadow || "#6B7DFF",
    border: hoverColor?.border || "#000000",
  };

  return (
    <button
      className={`relative inline-flex items-center justify-center transition-all duration-200 group ${className}`}
      style={{
        width: '100%',
        aspectRatio: `${width} / 55.04`, // Reduced by 40% total (0.8 × 0.8)
        '--btn-main': defaultColors.main,
        '--btn-accent': defaultColors.accent,
        '--btn-shadow': defaultColors.shadow,
        '--btn-border': defaultColors.border,
        '--btn-hover-main': hoverColors.main,
        '--btn-hover-accent': hoverColors.accent,
        '--btn-hover-shadow': hoverColors.shadow,
        '--btn-hover-border': hoverColors.border,
      } as React.CSSProperties}
      {...props}
    >
      {/* SVG Background - scales with container */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${width} 55.04`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <style>{`
          .btn-lighter-main { fill: var(--btn-main); transition: fill 0.2s ease; }
          .btn-lighter-accent { fill: var(--btn-accent); transition: fill 0.2s ease; }
          .btn-lighter-shadow { fill: var(--btn-shadow); transition: fill 0.2s ease; }
          .btn-lighter-border { fill: var(--btn-border); transition: fill 0.2s ease; }
          .group:hover .btn-lighter-main { fill: var(--btn-hover-main); }
          .group:hover .btn-lighter-accent { fill: var(--btn-hover-accent); }
          .group:hover .btn-lighter-shadow { fill: var(--btn-hover-shadow); }
          .group:hover .btn-lighter-border { fill: var(--btn-hover-border); }
        `}</style>
        <g clipPath={`url(#${clipId0})`}>
          <path
            d={`M${width - 6.40128} 6.40064H${width - 0.00064}V48.641856H${width - 6.39936}V55.04H0V55.03936H6.3993728V48.64H0V6.4H6.4V0H${width - 6.40128}V6.40064Z`}
            className="btn-lighter-main"
          />
          <g clipPath={`url(#${clipId1})`}>
            <rect x="6.3937472" width={width - 12.79488} height="3.2" className="btn-lighter-border" />
            <rect x="6.3993728" y="51.84" width={width - 12.79872} height="3.2" className="btn-lighter-border" />
            <rect
              x={width - 3.20128}
              y="48.64"
              width="42.239936"
              height="3.2012736"
              transform={`rotate(-90 ${width - 3.20128} 48.64)`}
              className="btn-lighter-border"
            />
            <rect
              width="42.24"
              height="3.2"
              transform="matrix(6.81584e-07 -1 -1 -2.8033e-09 3.2 48.64)"
              className="btn-lighter-border"
            />
            <rect
              width="3.2"
              height="3.2"
              transform="matrix(-1 0 0 1 6.4 3.2)"
              className="btn-lighter-border"
            />
            <rect
              width="3.2"
              height="3.2"
              transform={`matrix(-1 0 0 1 ${width - 3.20128} 3.2)`}
              className="btn-lighter-border"
            />
            <rect x="9.6" y="6.4" width={width - 19.20128} height="3.2" className="btn-lighter-accent" />
            <rect
              width="3.2"
              height="3.2"
              transform="matrix(-1 0 0 1 9.6 9.6)"
              className="btn-lighter-accent"
            />
            <rect
              width="3.2"
              height="3.2"
              transform={`matrix(-1 0 0 1 ${width - 6.40128} 9.6)`}
              className="btn-lighter-accent"
            />
            <rect
              x="6.3993728"
              y="51.84"
              width="3.2"
              height="3.2"
              transform="rotate(180 6.3993728 51.84)"
              className="btn-lighter-border"
            />
            <rect
              x={width - 3.19936}
              y="51.84"
              width="3.2"
              height="3.2"
              transform={`rotate(180 ${width - 3.19936} 51.84)`}
              className="btn-lighter-border"
            />
            <rect
              x="6.3993728"
              y="48.64096"
              width={width - 12.79872}
              height="3.2"
              className="btn-lighter-shadow"
            />
            <rect
              x="6.3993728"
              y="48.64096"
              width="3.2"
              height="3.2"
              transform="rotate(180 6.3993728 48.64096)"
              className="btn-lighter-shadow"
            />
            <rect
              x={width - 3.19936}
              y="48.64096"
              width="3.2"
              height="3.2"
              transform={`rotate(180 ${width - 3.19936} 48.64096)`}
              className="btn-lighter-shadow"
            />
          </g>
        </g>
        <defs>
          <clipPath id={clipId0}>
            <rect width={width} height="55.04" fill="white" />
          </clipPath>
          <clipPath id={clipId1}>
            <rect width={width} height="55.04" fill="white" />
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
