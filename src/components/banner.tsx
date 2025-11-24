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
  charWidth = 30,
  padding = 100,
  minWidth = 300,
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
  const height = svgHeight ?? 124;

  // Calculate font size to fit text within the available content width
  const availableTextWidth = Math.max(0, totalWidth - LEFT_WIDTH - RIGHT_WIDTH - 20); // 20px padding for safety
  const estimatedTextWidth = text.length * charWidth;
  // If text is empty or estimated width is 0, default to 40. Otherwise scale down if needed.
  const fontSize = estimatedTextWidth > 0
    ? Math.min(40, (availableTextWidth / estimatedTextWidth) * 40)
    : 40;

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
        viewBox={`0 0 ${totalWidth} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* Left Section */}
        <g>
          <path
            d="M3 3L39 3V27.0583V121.002L15 121L3 27.0583V3Z"
            fill="#1570EF"
          />
          <rect x="24" y="27" width="15" height="85" fill="#36BFFA" />
          <rect x="30" y="24" width="9" height="3" fill="#344054" />
          <rect
            width="9"
            height="3"
            transform="matrix(1 0 0 -1 30 115)"
            fill="#344054"
          />
          <rect x="24" y="27" width="3" height="3" fill="#1570EF" />
          <rect x="24" y="30" width="3" height="3" fill="#344054" />
          <rect x="27" y="27" width="3" height="3" fill="#344054" />
          <rect
            width="3"
            height="3"
            transform="matrix(1 0 0 -1 24 112)"
            fill="#1570EF"
          />
          <rect
            width="3"
            height="3"
            transform="matrix(1 0 0 -1 24 109)"
            fill="#344054"
          />
          <rect
            width="3"
            height="3"
            transform="matrix(1 0 0 -1 27 112)"
            fill="#344054"
          />
          <rect x="21" y="33" width="3" height="73" fill="#344054" />
          <rect x="3" width="36" height="3" fill="#344054" />
          <rect
            width="24"
            height="3"
            transform="matrix(1 0 0 -1 15 124)"
            fill="#344054"
          />
          <rect x="3" y="3" width="3" height="3" fill="#1570EF" />
          <rect x="6" y="6" width="3" height="3" fill="#FFDE29" />
          <rect x="9" y="9" width="3" height="3" fill="#FFDE29" />
          <rect x="9" y="19" width="3" height="3" fill="#FFDE29" />
          <rect x="12" y="12" width="3" height="3" fill="#FFDE29" />
          <rect x="12" y="22" width="3" height="3" fill="#FFDE29" />
          <rect x="15" y="15" width="3" height="3" fill="#FFDE29" />
          <rect x="15" y="25" width="3" height="3" fill="#FFDE29" />
          <rect
            width="3"
            height="3"
            transform="matrix(1 0 0 -1 18 118)"
            fill="#FFDE29"
          />
          <rect y="3" width="3" height="24" fill="#344054" />
          <rect x="3" y="27" width="3" height="24" fill="#344054" />
          <rect x="6" y="51" width="3" height="24" fill="#344054" />
          <rect x="9" y="75" width="3" height="24" fill="#344054" />
          <rect x="12" y="99" width="3" height="22" fill="#344054" />
        </g>

        {/* Middle Section */}
        <g transform={`translate(-1, 0)`}>
          <rect x="39" y="3" width={contentWidth} height="118" fill="#1570EF" />
          <rect x="39" y="27" width={contentWidth} height="85" fill="#36BFFA" />
          <rect x="39" y="24" width={contentWidth} height="3" fill="#344054" />
          <rect
            width={contentWidth}
            height="3"
            transform="matrix(1 0 0 -1 39 115)"
            fill="#344054"
          />
          <rect x="39" width={contentWidth} height="3" fill="#344054" />
          <rect
            width={contentWidth}
            height="3"
            transform="matrix(1 0 0 -1 39 124)"
            fill="#344054"
          />
          <rect x="39" y="12" width={contentWidth} height="3" fill="#3538CD" />
        </g>

        {/* Right Section */}
        <g transform={`translate(${totalWidth - 43}, 0)`}>
          <g transform="scale(-1, 1) translate(-39, 0)">
            <path
              d="M3 3L39 3V27.0583V121.002L15 121L3 27.0583V3Z"
              fill="#1570EF"
            />
            <rect x="24" y="27" width="15" height="85" fill="#36BFFA" />
            <rect x="30" y="24" width="9" height="3" fill="#344054" />
            <rect
              width="9"
              height="3"
              transform="matrix(1 0 0 -1 30 115)"
              fill="#344054"
            />
            <rect x="24" y="27" width="3" height="3" fill="#1570EF" />
            <rect x="24" y="30" width="3" height="3" fill="#344054" />
            <rect x="27" y="27" width="3" height="3" fill="#344054" />
            <rect
              width="3"
              height="3"
              transform="matrix(1 0 0 -1 24 112)"
              fill="#1570EF"
            />
            <rect
              width="3"
              height="3"
              transform="matrix(1 0 0 -1 24 109)"
              fill="#344054"
            />
            <rect
              width="3"
              height="3"
              transform="matrix(1 0 0 -1 27 112)"
              fill="#344054"
            />
            <rect x="21" y="33" width="3" height="73" fill="#344054" />
            <rect x="3" width="36" height="3" fill="#344054" />
            <rect
              width="24"
              height="3"
              transform="matrix(1 0 0 -1 15 124)"
              fill="#344054"
            />
            <rect x="3" y="3" width="3" height="3" fill="#1570EF" />
            <rect x="6" y="6" width="3" height="3" fill="#FFDE29" />
            <rect x="9" y="9" width="3" height="3" fill="#FFDE29" />
            <rect x="9" y="19" width="3" height="3" fill="#FFDE29" />
            <rect x="12" y="12" width="3" height="3" fill="#FFDE29" />
            <rect x="12" y="22" width="3" height="3" fill="#FFDE29" />
            <rect x="15" y="15" width="3" height="3" fill="#FFDE29" />
            <rect x="15" y="25" width="3" height="3" fill="#FFDE29" />
            <rect
              width="3"
              height="3"
              transform="matrix(1 0 0 -1 18 118)"
              fill="#FFDE29"
            />
            <rect y="3" width="3" height="24" fill="#344054" />
            <rect x="3" y="27" width="3" height="24" fill="#344054" />
            <rect x="6" y="51" width="3" height="24" fill="#344054" />
            <rect x="9" y="75" width="3" height="24" fill="#344054" />
            <rect x="12" y="99" width="3" height="22" fill="#344054" />
          </g>
        </g>

        {/* Text */}
        <text
          x="50%"
          y="55%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="white"
          fontSize={fontSize}
          fontFamily="CondensedDisplay, sans-serif"
          style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}
        >
          {text}
        </text>
      </svg>
    </div>
  );
}
