import { useEffect, useRef, useState } from "react";

type BannerProps = {
  className?: string;
  text?: string;
  charWidth?: number;
  padding?: number;
  minWidth?: number;
  width?: number | string;
  height?: number | string;
};

export default function Banner({
  className,
  text = "BANNER",
  charWidth = 19.2, // Reduced by 40% total (0.8 × 0.8)
  padding = 64, // Reduced by 40% total (0.8 × 0.8)
  minWidth = 192, // Reduced by 40% total (0.8 × 0.8)
  width,
  height: svgHeight,
}: BannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Calculate default width based on text for backward compatibility
  const defaultContentWidth = Math.max(minWidth, text.length * charWidth + padding);
  const LEFT_WIDTH = 39;
  const RIGHT_WIDTH = 39;
  const defaultTotalWidth = LEFT_WIDTH + defaultContentWidth + RIGHT_WIDTH;

  const calculatedWidth =
    width && typeof width === "number"
      ? width
      : containerWidth || (typeof width === "number" ? width : defaultTotalWidth);

  const finalWidth = calculatedWidth > 0 ? calculatedWidth : defaultTotalWidth;

  // contentWidth is the flexible middle part
  const contentWidth = Math.max(0, finalWidth - LEFT_WIDTH - RIGHT_WIDTH);

  const totalWidth = LEFT_WIDTH + contentWidth + RIGHT_WIDTH;
  const height = svgHeight ?? 79.2; // Reduced by 40% total (0.8 × 0.8)

  // Calculate font size to fit text within the available content width
  // const availableTextWidth = Math.max(0, totalWidth - LEFT_WIDTH - RIGHT_WIDTH - 20); // 20px padding for safety
  // const estimatedTextWidth = text.length * charWidth;
  // If text is empty or estimated width is 0, default to 40. Otherwise scale down if needed.
  // const fontSize = estimatedTextWidth > 0
  //   ? Math.min(16, (availableTextWidth / estimatedTextWidth) * 16)
  //   : 16;

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: width ?? defaultTotalWidth, // Use text-based width if no width provided
        height: height,
        minWidth: minWidth,
        display: "flex", // Ensure it takes space
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${totalWidth - 30} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* Left Section - scaled by 0.64 (0.8 × 0.8) */}
        <g>
          <path
            d="M1.92 1.92L24.96 1.92V17.32V77.44L9.6 77.44L1.92 17.32V1.92Z"
            fill="#1570EF"
          />
          <rect x="15.36" y="17.28" width="9.6" height="54.4" fill="#36BFFA" />
          <rect x="19.2" y="15.36" width="5.76" height="1.92" fill="#344054" />
          <rect
            width="5.76"
            height="1.92"
            transform="matrix(1 0 0 -1 19.2 73.6)"
            fill="#344054"
          />
          <rect x="15.36" y="17.28" width="1.92" height="1.92" fill="#1570EF" />
          <rect x="15.36" y="19.2" width="1.92" height="1.92" fill="#344054" />
          <rect x="17.28" y="17.28" width="1.92" height="1.92" fill="#344054" />
          <rect
            width="1.92"
            height="1.92"
            transform="matrix(1 0 0 -1 15.36 71.68)"
            fill="#1570EF"
          />
          <rect
            width="1.92"
            height="1.92"
            transform="matrix(1 0 0 -1 15.36 69.76)"
            fill="#344054"
          />
          <rect
            width="1.92"
            height="1.92"
            transform="matrix(1 0 0 -1 17.28 71.68)"
            fill="#344054"
          />
          <rect x="13.44" y="21.12" width="1.92" height="46.72" fill="#344054" />
          <rect x="1.92" width="23.04" height="1.92" fill="#344054" />
          <rect
            width="15.36"
            height="1.92"
            transform="matrix(1 0 0 -1 9.6 79.36)"
            fill="#344054"
          />
          <rect x="1.92" y="1.92" width="1.92" height="1.92" fill="#1570EF" />
          <rect x="3.84" y="3.84" width="1.92" height="1.92" fill="#FFDE29" />
          <rect x="5.76" y="5.76" width="1.92" height="1.92" fill="#FFDE29" />
          <rect x="5.76" y="12.16" width="1.92" height="1.92" fill="#FFDE29" />
          <rect x="7.68" y="7.68" width="1.92" height="1.92" fill="#FFDE29" />
          <rect x="7.68" y="14.08" width="1.92" height="1.92" fill="#FFDE29" />
          <rect x="9.6" y="9.6" width="1.92" height="1.92" fill="#FFDE29" />
          <rect x="9.6" y="16" width="1.92" height="1.92" fill="#FFDE29" />
          <rect
            width="1.92"
            height="1.92"
            transform="matrix(1 0 0 -1 11.52 75.52)"
            fill="#FFDE29"
          />
          <rect y="1.92" width="1.92" height="15.36" fill="#344054" />
          <rect x="1.92" y="17.28" width="1.92" height="15.36" fill="#344054" />
          <rect x="3.84" y="32.64" width="1.92" height="15.36" fill="#344054" />
          <rect x="5.76" y="48" width="1.92" height="15.36" fill="#344054" />
          <rect x="7.68" y="63.36" width="1.92" height="14.08" fill="#344054" />
        </g>

        {/* Middle Section - scaled by 0.64 (0.8 × 0.8) */}
        <g transform={`translate(-0.64, 0)`}>
          <rect x="24.96" y="1.92" width={contentWidth} height="75.52" fill="#1570EF" />
          <rect x="22.96" y="17.28" width={contentWidth} height="54.4" fill="#36BFFA" />
          <rect x="24.96" y="15.36" width={contentWidth} height="1.92" fill="#344054" />
          <rect
            width={contentWidth}
            height="1.92"
            transform="matrix(1 0 0 -1 24.96 73.6)"
            fill="#344054"
          />
          <rect x="24.96" width={contentWidth} height="1.92" fill="#344054" />
          <rect
            width={contentWidth}
            height="1.92"
            transform="matrix(1 0 0 -1 24.96 79.36)"
            fill="#344054"
          />
          <rect x="24.96" y="7.68" width={contentWidth} height="1.92" fill="#3538CD" />
        </g>

        {/* Right Section - scaled by 0.64 (0.8 × 0.8) */}
        <g transform={`translate(${totalWidth - 57.52}, 0)`}>
          <g transform="scale(-1, 1) translate(-24.96, 0)">
            <path
              d="M1.92 1.92L24.96 1.92V17.32V77.44L9.6 77.44L1.92 17.32V1.92Z"
              fill="#1570EF"
            />
            <rect x="15.36" y="17.28" width="9.6" height="54.4" fill="#36BFFA" />
            <rect x="19.2" y="15.36" width="5.76" height="1.92" fill="#344054" />
            <rect
              width="5.76"
              height="1.92"
              transform="matrix(1 0 0 -1 19.2 73.6)"
              fill="#344054"
            />
            <rect x="15.36" y="17.28" width="1.92" height="1.92" fill="#1570EF" />
            <rect x="15.36" y="19.2" width="1.92" height="1.92" fill="#344054" />
            <rect x="17.28" y="17.28" width="1.92" height="1.92" fill="#344054" />
            <rect
              width="1.92"
              height="1.92"
              transform="matrix(1 0 0 -1 15.36 71.68)"
              fill="#1570EF"
            />
            <rect
              width="1.92"
              height="1.92"
              transform="matrix(1 0 0 -1 15.36 69.76)"
              fill="#344054"
            />
            <rect
              width="1.92"
              height="1.92"
              transform="matrix(1 0 0 -1 17.28 71.68)"
              fill="#344054"
            />
            <rect x="13.44" y="21.12" width="1.92" height="46.72" fill="#344054" />
            <rect x="1.92" width="23.04" height="1.92" fill="#344054" />
            <rect
              width="15.36"
              height="1.92"
              transform="matrix(1 0 0 -1 9.6 79.36)"
              fill="#344054"
            />
            <rect x="1.92" y="1.92" width="1.92" height="1.92" fill="#1570EF" />
            <rect x="3.84" y="3.84" width="1.92" height="1.92" fill="#FFDE29" />
            <rect x="5.76" y="5.76" width="1.92" height="1.92" fill="#FFDE29" />
            <rect x="5.76" y="12.16" width="1.92" height="1.92" fill="#FFDE29" />
            <rect x="7.68" y="7.68" width="1.92" height="1.92" fill="#FFDE29" />
            <rect x="7.68" y="14.08" width="1.92" height="1.92" fill="#FFDE29" />
            <rect x="9.6" y="9.6" width="1.92" height="1.92" fill="#FFDE29" />
            <rect x="9.6" y="16" width="1.92" height="1.92" fill="#FFDE29" />
            <rect
              width="1.92"
              height="1.92"
              transform="matrix(1 0 0 -1 11.52 75.52)"
              fill="#FFDE29"
            />
            <rect y="1.92" width="1.92" height="15.36" fill="#344054" />
            <rect x="1.92" y="17.28" width="1.92" height="15.36" fill="#344054" />
            <rect x="3.84" y="32.64" width="1.92" height="15.36" fill="#344054" />
            <rect x="5.76" y="48" width="1.92" height="15.36" fill="#344054" />
            <rect x="7.68" y="63.36" width="1.92" height="14.08" fill="#344054" />
          </g>
        </g>

        {/* Text */}
        <text
          x="46%"
          y="60%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="white"
          fontSize={16}
          style={{ textTransform: "uppercase" }}
        >
          {text}
        </text>
      </svg>
    </div>
  );
}
