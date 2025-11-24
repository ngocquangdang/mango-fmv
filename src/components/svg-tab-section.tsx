import React from "react";

type TabSectionProps = {
  label: string;
  x?: number;
  y?: number;
  fill?: string;
  accent?: string;
  border?: string;
  fontSize?: number;
};

const SvgTabSection: React.FC<TabSectionProps> = ({
  label,
  x = 0,
  y = 0,
  fill = "#F7B27A",
  accent = "#FEF0C7",
  border = "#111111",
  fontSize = 16,
}) => {
  const textX = 106;
  const textY = 43;

  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M212 10H222V66H0V10H10V0H212V10Z" fill={fill} />
      <rect x="9.99" width="202.008" height="5" fill={border} />
      <rect
        x="217"
        y="66"
        width="56"
        height="5.00004"
        transform="rotate(-90 217 66)"
        fill={border}
      />
      <rect
        width="56"
        height="5.00004"
        transform="matrix(8.03295e-07 -1 -1 -2.37856e-09 -3 66)"
        fill={border}
      />
      <rect
        width="5"
        height="5"
        transform="matrix(-1 0 0 1 2 5)"
        fill={border}
      />
      <rect
        width="5"
        height="5"
        transform="matrix(-1 0 0 1 214 5)"
        fill={border}
      />
      <rect x="5" y="10" width="191.998" height="5" fill={accent} />
      <rect
        width="5"
        height="5"
        transform="matrix(-1 0 0 1 5 15)"
        fill={accent}
      />
      <rect
        width="5"
        height="5"
        transform="matrix(-1 0 0 1 202 15)"
        fill={accent}
      />
      <text
        x={textX}
        y={textY}
        fill="white"
        fontSize={fontSize}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {label}
      </text>
    </g>
  );
};

export default SvgTabSection;

