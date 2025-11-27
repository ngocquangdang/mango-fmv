import { type ReactNode } from "react";
import SvgTabBlock from "./svg-tab-block";

const DEFAULT_LABEL_OFFSET = { x: 106, y: 43 };

export type ColorSet = {
  main?: string;
  accent?: string;
  border?: string;
};

export type TabBlockConfig = {
  key: string;
  clipId: string;
  innerClipId: string;
  origin: { x: number; y: number };
  activeClipId?: string;
  activeInnerClipId?: string;
  activeOrigin?: { x: number; y: number };
  label: string;
  labelOffset?: { x: number; y: number };
  activeLabelOffset?: { x: number; y: number };
  labelFontSize?: number;
  activeLabelFontSize?: number;
  baseColors?: ColorSet;
  activeColors?: ColorSet;
};

const defaultStandardColors: Required<ColorSet> = {
  main: "#F7B27A",
  accent: "#FEF0C7",
  border: "#111111",
};

const defaultActiveColors: Required<ColorSet> = {
  main: "url(#paint0_linear_28_52262)",
  accent: "white",
  border: "#111111",
};

type TabProps = {
  width?: number | string;
  height?: number | string;
  children?: ReactNode;
  activeTab: string;
  onTabChange: (key: string) => void;
  tabBlocks: TabBlockConfig[];
  className?: string;
};

export default function Tab({
  width = "1201",
  height = "820",
  children,
  activeTab,
  onTabChange,
  tabBlocks,
  className,
}: TabProps) {
  const handleTabClick = (tabKey: string) => {
    onTabChange(tabKey);
  };

  const activeIndex = tabBlocks.findIndex((tab) => tab.key === activeTab);

  return (
    <svg
      width={typeof width === "number" ? `${width} ` : width}
      height={typeof height === "number" ? `${height} ` : height}
      viewBox="0 0 1201 820"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
    >
      {(() => {
        const tabElements = tabBlocks.map((config, index) => {
          const {
            key,
            label,
            origin,
            activeOrigin,
            labelOffset = DEFAULT_LABEL_OFFSET,
            activeLabelOffset,
            labelFontSize = 16,
            activeLabelFontSize,
            baseColors,
            activeColors,
            clipId,
            innerClipId,
            activeClipId,
            activeInnerClipId,
          } = config;

          const isActive = key === activeTab;
          const shouldShift = index > 0 && activeIndex > index;
          const shiftX = shouldShift ? 10 : 0;
          const baseOrigin = {
            x: origin.x - shiftX,
            y: origin.y,
          };
          const shiftedActiveOrigin = activeOrigin
            ? { x: activeOrigin.x - shiftX, y: activeOrigin.y }
            : baseOrigin;

          const currentOrigin = isActive ? shiftedActiveOrigin : baseOrigin;
          const currentClipId = isActive ? activeClipId ?? clipId : clipId;
          const currentInnerClipId = isActive
            ? activeInnerClipId ?? innerClipId
            : innerClipId;
          const currentLabelOffset = isActive
            ? activeLabelOffset ?? labelOffset
            : labelOffset;
          const labelX = currentOrigin.x + currentLabelOffset.x;
          const labelY = currentOrigin.y + currentLabelOffset.y;
          const resolvedVariant = isActive ? "selected" : "standard";
          const resolvedFontSize =
            (isActive ? activeLabelFontSize : labelFontSize) ??
            (isActive ? 18 : 16);
          const resolvedColors = isActive
            ? { ...defaultActiveColors, ...activeColors }
            : { ...defaultStandardColors, ...baseColors };

          const handleKeyDown = (event: React.KeyboardEvent) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              handleTabClick(key);
            }
          };

          const tabNode = (
            <SvgTabBlock
              key={key}
              origin={currentOrigin}
              clipId={currentClipId}
              innerClipId={currentInnerClipId}
              variant={resolvedVariant}
              colors={resolvedColors}
            >
              <foreignObject
                x={labelX - 95}
                y={labelY - 23}
                width={200}
                height={50}
                requiredExtensions="http://www.w3.org/1999/xhtml"
              >
                <div
                  className="h-full w-full flex items-center justify-center text-center cursor-pointer"
                  style={{ color: "white", fontSize: resolvedFontSize }}
                  tabIndex={0}
                  onClick={() => handleTabClick(key)}
                  onKeyDown={handleKeyDown}
                >
                  {label}
                </div>
              </foreignObject>
            </SvgTabBlock>
          );

          return { key, isActive, node: tabNode };
        });

        const inactiveTabs = tabElements
          .filter((tab) => !tab.isActive)
          .map((tab) => tab.node);
        const activeTabNode = tabElements.find((tab) => tab.isActive)?.node;

        return (
          <>
            {inactiveTabs}
            <g clip-path="url(#clip8_28_52262)">
              <path
                d="M1181 98H1191V800H1181V810H20V800H10V98H20V88H1181V98Z"
                fill="#FEF0C7"
              />
              <rect x="30" y="77.5" width="1141" height="10" fill="black" />
              <g style={{ mixBlendMode: "soft-light" }}>
                <rect x="30" y="88" width="1141" height="10" fill="white" />
              </g>
              <rect x="30" y="810" width="1141" height="10" fill="black" />
              <g style={{ mixBlendMode: "color-burn" }} opacity="0.3">
                <rect x="30" y="800" width="1141" height="10" fill="black" />
              </g>
              <rect
                x="1191"
                y="790"
                width="682"
                height="9.99997"
                transform="rotate(-90 1191 790)"
                fill="black"
              />
              <rect
                width="682"
                height="10"
                transform="matrix(4.25577e-08 -1 -1 -4.48963e-08 10 790)"
                fill="black"
              />
              <rect x="1171" y="88" width="10" height="10" fill="black" />
              <g style={{ mixBlendMode: "soft-light" }}>
                <rect x="1171" y="98" width="10" height="10" fill="white" />
              </g>
              <rect x="1181" y="98" width="10" height="10" fill="black" />
              <rect
                width="10"
                height="10"
                transform="matrix(-1 0 0 1 30 88)"
                fill="black"
              />
              <g style={{ mixBlendMode: "soft-light" }}>
                <rect
                  width="10"
                  height="10"
                  transform="matrix(-1 0 0 1 30 98)"
                  fill="white"
                />
              </g>
              <rect
                width="10"
                height="10"
                transform="matrix(-1 0 0 1 20 98)"
                fill="black"
              />
              <g style={{ mixBlendMode: "soft-light" }}>
                <rect
                  width="10"
                  height="10"
                  transform="matrix(-1 0 0 1 20 108)"
                  fill="white"
                />
              </g>
              <rect
                width="10"
                height="10"
                transform="matrix(1 0 0 -1 1171 810)"
                fill="black"
              />
              <g style={{ mixBlendMode: "color-burn" }} opacity="0.3">
                <rect
                  width="10"
                  height="10"
                  transform="matrix(1 0 0 -1 1171 800)"
                  fill="black"
                />
              </g>
              <rect
                width="10"
                height="10"
                transform="matrix(1 0 0 -1 1181 800)"
                fill="black"
              />
              <g style={{ mixBlendMode: "color-burn" }} opacity="0.3">
                <rect
                  width="10"
                  height="10"
                  transform="matrix(1 0 0 -1 1181 790)"
                  fill="black"
                />
              </g>
              <rect
                x="30"
                y="810"
                width="10"
                height="10"
                transform="rotate(180 30 810)"
                fill="black"
              />
              <g style={{ mixBlendMode: "color-burn" }} opacity="0.3">
                <rect
                  x="30"
                  y="800"
                  width="10"
                  height="10"
                  transform="rotate(180 30 800)"
                  fill="black"
                />
              </g>
              <rect
                x="20"
                y="800"
                width="10"
                height="10"
                transform="rotate(180 20 800)"
                fill="black"
              />
            </g>
            {activeTabNode}
          </>
        );
      })()}

      {children && (
        <foreignObject
          x={40}
          y={120}
          width={1120}
          height={620}
          requiredExtensions="http://www.w3.org/1999/xhtml"
          xmlns="http://www.w3.org/1999/xhtml"
        >
          {children}
        </foreignObject>
      )}

      <defs>
        <pattern
          id="pattern0_28_52262"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_28_52262"
            transform="matrix(0.00101072 0 0 0.00118317 -0.106435 -0.231635)"
          />
        </pattern>
        <pattern
          id="pattern1_28_52262"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image1_28_52262"
            transform="matrix(0.00133511 0 0 0.00162258 0 -0.213124)"
          />
        </pattern>
        <pattern
          id="pattern2_28_52262"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image1_28_52262"
            transform="matrix(0.00133511 0 0 0.00162258 0 -0.213124)"
          />
        </pattern>
        <pattern
          id="pattern3_28_52262"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image1_28_52262"
            transform="matrix(0.00133511 0 0 0.00162258 0 -0.213124)"
          />
        </pattern>
        <pattern
          id="pattern4_28_52262"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image1_28_52262"
            transform="matrix(0.00133511 0 0 0.00162258 0 -0.213124)"
          />
        </pattern>
        <pattern
          id="pattern5_28_52262"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image1_28_52262"
            transform="matrix(0.00133511 0 0 0.00162258 0 -0.213124)"
          />
        </pattern>
        <pattern
          id="pattern6_28_52262"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image1_28_52262"
            transform="matrix(0.00133511 0 0 0.00162258 0 -0.213124)"
          />
        </pattern>
        <pattern
          id="pattern7_28_52262"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image1_28_52262"
            transform="matrix(0.00133511 0 0 0.00162258 0 -0.213124)"
          />
        </pattern>
        <linearGradient
          id="paint0_linear_28_52262"
          x1="146.5"
          y1="0"
          x2="146.5"
          y2="88"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.591346" stop-color="#FA7036" />
          <stop offset="1" stop-color="#FEF0C7" />
        </linearGradient>
        <clipPath id="clip0_28_52262">
          <rect
            width="233"
            height="88"
            fill="white"
            transform="translate(253)"
          />
        </clipPath>
        <clipPath id="clip1_28_52262">
          <rect
            width="233"
            height="88"
            fill="white"
            transform="translate(253)"
          />
        </clipPath>
        <clipPath id="clip2_28_52262">
          <rect
            width="233"
            height="88"
            fill="white"
            transform="translate(479)"
          />
        </clipPath>
        <clipPath id="clip3_28_52262">
          <rect
            width="233"
            height="88"
            fill="white"
            transform="translate(479)"
          />
        </clipPath>
        <clipPath id="clip4_28_52262">
          <rect
            width="233"
            height="88"
            fill="white"
            transform="translate(703)"
          />
        </clipPath>
        <clipPath id="clip5_28_52262">
          <rect
            width="233"
            height="88"
            fill="white"
            transform="translate(703)"
          />
        </clipPath>
        <clipPath id="clip6_28_52262">
          <rect
            width="233"
            height="88"
            fill="white"
            transform="translate(927)"
          />
        </clipPath>
        <clipPath id="clip7_28_52262">
          <rect
            width="233"
            height="88"
            fill="white"
            transform="translate(927)"
          />
        </clipPath>
        <clipPath id="clip8_28_52262">
          <rect
            width="1201"
            height="742"
            fill="white"
            transform="translate(0 78)"
          />
        </clipPath>
        <clipPath id="clip9_28_52262">
          <rect
            width="233"
            height="88"
            fill="white"
            transform="translate(30)"
          />
        </clipPath>
        <clipPath id="clip10_28_52262">
          <rect
            width="233"
            height="88"
            fill="white"
            transform="translate(30)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
