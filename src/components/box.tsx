import { useId, useMemo } from "react";

type BoxProps = {
  src?: string;
  width?: number | string;
  height?: number | string;
  borderColor?: string;
  backgroundColor?: string;
  className?: string;
};

export default function Box({
  src = "https://picsum.photos/seed/picsum/200/300",
  width = 80,
  height = 80,
  borderColor = "#111111",
  backgroundColor = "#FFDE29",
  className = "",
}: BoxProps) {
  const clipPathId = useId().replace(/:/g, "");

  const dimensionStyle = useMemo(
    () => ({
      width: typeof width === "number" ? `${width}px` : width,
      height: typeof height === "number" ? `${height}px` : height,
    }),
    [width, height],
  );

  return (
    <div className={`relative overflow-hidden ${className}`} style={dimensionStyle}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M75.1992 4.7998H79.999V0H80L79.999 80V75.2061H75.2041V80H0V79.999H4.79883V75.2002H0V4.7998H4.7998V0H75.1992V4.7998Z"
          fill={backgroundColor}
        />
        <image
          width="80"
          height="80"
          href={src}
          preserveAspectRatio="xMidYMid slice"
          clipPath={`url(#${clipPathId})`}
        />
        <rect x="4.79053" width="70.4094" height="2.4" fill={borderColor} />
        <rect x="4.7959" y="77.6001" width="70.4078" height="2.4" fill={borderColor} />
        <rect
          x="77.6001"
          y="75.2002"
          width="70.4001"
          height="2.4"
          transform="rotate(-90 77.6001 75.2002)"
          fill={borderColor}
        />
        <rect
          width="70.4"
          height="2.4"
          transform="matrix(5.7315e-07 -1 -1 -3.33366e-09 2.3999 75.2002)"
          fill={borderColor}
        />
        <rect
          width="2.4"
          height="2.4"
          transform="matrix(-1 0 0 1 4.7998 2.3999)"
          fill={borderColor}
        />
        <rect
          width="2.4"
          height="2.4"
          transform="matrix(-1 0 0 1 77.6001 2.3999)"
          fill={borderColor}
        />
        <rect
          x="4.7959"
          y="77.6001"
          width="2.4"
          height="2.4"
          transform="rotate(180 4.7959 77.6001)"
          fill={borderColor}
        />
        <rect
          x="77.604"
          y="77.6001"
          width="2.4"
          height="2.4"
          transform="rotate(180 77.604 77.6001)"
          fill={borderColor}
        />
        <defs>
          <clipPath id={clipPathId}>
            <path d="M75.1992 4.7998H79.999V0H80L79.999 80V75.2061H75.2041V80H0V79.999H4.79883V75.2002H0V4.7998H4.7998V0H75.1992V4.7998Z" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
