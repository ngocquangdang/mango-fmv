import React from "react";

type MatrixCoefficients = {
  a: number;
  b: number;
  c: number;
  d: number;
};

type MatrixRectConfig = {
  width: number;
  height: number;
  coeffs: MatrixCoefficients;
  txDelta: number;
  tyDelta: number;
  fill: "border" | "accent";
};

type RotateRectConfig = {
  width: number;
  height: number;
  pivotXDelta: number;
  pivotYDelta: number;
  angle: number;
  fill: "border" | "accent";
};

type VariantConfig = {
  width: number;
  height: number;
  extension: number;
  topOffset: number;
  leftInset: number;
  topBorder: {
    xDelta: number;
    width: number;
    height: number;
  };
  rotatedRects: RotateRectConfig[];
  matrixRects: MatrixRectConfig[];
  cornerRects: {
    width: number;
    height: number;
    xDelta: number;
    yDelta: number;
    fill: "border" | "accent";
  }[];
  accentRect: {
    xDelta: number;
    yDelta: number;
    width: number;
    height: number;
  };
};

const NEGATIVE_IDENTITY: MatrixCoefficients = {
  a: -1,
  b: 0,
  c: 0,
  d: 1,
};

const LEFT_BORDER_STANDARD: MatrixCoefficients = {
  a: 8.03295e-07,
  b: -1,
  c: -1,
  d: -2.37856e-09,
};

const LEFT_BORDER_SELECTED: MatrixCoefficients = {
  a: 5.76725e-07,
  b: -1,
  c: -1,
  d: -3.31299e-09,
};

const VARIANTS: Record<"standard" | "selected", VariantConfig> = {
  standard: {
    width: 212,
    height: 66,
    extension: 10,
    topOffset: 10,
    leftInset: 10,
    topBorder: { xDelta: 9.99, width: 202.008, height: 5 },
    rotatedRects: [
      {
        width: 56,
        height: 5,
        pivotXDelta: 217,
        pivotYDelta: 66,
        angle: -90,
        fill: "border",
      },
    ],
    matrixRects: [
      {
        width: 56,
        height: 5,
        coeffs: LEFT_BORDER_STANDARD,
        txDelta: 5,
        tyDelta: 66,
        fill: "border",
      },
      {
        width: 5,
        height: 5,
        coeffs: NEGATIVE_IDENTITY,
        txDelta: 10,
        tyDelta: 5,
        fill: "border",
      },
      {
        width: 5,
        height: 5,
        coeffs: NEGATIVE_IDENTITY,
        txDelta: 216.998,
        tyDelta: 5,
        fill: "border",
      },
      {
        width: 5,
        height: 5,
        coeffs: NEGATIVE_IDENTITY,
        txDelta: 15,
        tyDelta: 15,
        fill: "accent",
      },
      {
        width: 5,
        height: 5,
        coeffs: NEGATIVE_IDENTITY,
        txDelta: 211.998,
        tyDelta: 15,
        fill: "accent",
      },
    ],
    cornerRects: [],
    accentRect: {
      xDelta: 15,
      yDelta: 10,
      width: 191.998,
      height: 5,
    },
  },
  selected: {
    width: 223,
    height: 88,
    extension: 10,
    topOffset: 10,
    leftInset: 10,
    topBorder: { xDelta: 10, width: 213, height: 10 },
    rotatedRects: [
      {
        width: 78,
        height: 10,
        pivotXDelta: 223,
        pivotYDelta: 88,
        angle: -90,
        fill: "border",
      },
    ],
    matrixRects: [
      {
        width: 78,
        height: 10,
        coeffs: LEFT_BORDER_SELECTED,
        txDelta: 10,
        tyDelta: 88,
        fill: "border",
      },
      {
        width: 10,
        height: 10,
        coeffs: NEGATIVE_IDENTITY,
        txDelta: 15,
        tyDelta: 5,
        fill: "border",
      },
      {
        width: 10,
        height: 10,
        coeffs: NEGATIVE_IDENTITY,
        txDelta: 228,
        tyDelta: 5,
        fill: "border",
      },
      {
        width: 5,
        height: 5,
        coeffs: NEGATIVE_IDENTITY,
        txDelta: 15,
        tyDelta: 15,
        fill: "accent",
      },
      {
        width: 5,
        height: 5,
        coeffs: NEGATIVE_IDENTITY,
        txDelta: 222.998,
        tyDelta: 15,
        fill: "accent",
      },
    ],
    cornerRects: [],
    accentRect: {
      xDelta: 15,
      yDelta: 10,
      width: 202.998,
      height: 5,
    },
  },
};

type SvgTabBlockProps = {
  clipId: string;
  innerClipId: string;
  origin: { x: number; y: number };
  variant?: "standard" | "selected";
  colors?: {
    main?: string;
    accent?: string;
    border?: string;
  };
  children?: React.ReactNode;
};

const buildMainPath = (
  origin: { x: number; y: number },
  config: VariantConfig
) => {
  const rightEdge = origin.x + config.width;
  const extendedRight = rightEdge + config.extension;
  const topY = origin.y + config.topOffset;
  const bottomY = origin.y + config.height;
  const insetLeft = origin.x + config.leftInset;
  return `M${rightEdge} ${topY}H${extendedRight}V${bottomY}H${origin.x}V${topY}H${insetLeft}V${origin.y}H${rightEdge}V${topY}Z`;
};

const buildMatrixTransform = (
  coeffs: MatrixCoefficients,
  x: number,
  y: number
) => `matrix(${coeffs.a} ${coeffs.b} ${coeffs.c} ${coeffs.d} ${x} ${y})`;

const SvgTabBlock: React.FC<SvgTabBlockProps> = ({
  clipId,
  innerClipId,
  origin,
  variant = "standard",
  colors,
  children,
}) => {
  const config = VARIANTS[variant];
  const palette = {
    main: colors?.main ?? "#F7B27A",
    accent: colors?.accent ?? "#FEF0C7",
    border: colors?.border ?? "#111111",
  };

  return (
    <g clipPath={`url(#${clipId})`}>
      <path d={buildMainPath(origin, config)} fill={palette.main} />
      <g clipPath={`url(#${innerClipId})`}>
        <rect
          x={origin.x + config.topBorder.xDelta}
          y={origin.y}
          width={config.topBorder.width}
          height={config.topBorder.height}
          fill={palette.border}
        />
        {config.rotatedRects.map((rect) => {
          const pivotX = origin.x + rect.pivotXDelta;
          const pivotY = origin.y + rect.pivotYDelta;
          return (
            <rect
              key={`rot-${clipId}-${pivotX}-${pivotY}`}
              x={pivotX}
              y={pivotY}
              width={rect.width}
              height={rect.height}
              transform={`rotate(${rect.angle} ${pivotX} ${pivotY})`}
              fill={rect.fill === "border" ? palette.border : palette.accent}
            />
          );
        })}
        {config.matrixRects.map((rect) => {
          const tx = origin.x + rect.txDelta;
          const ty = origin.y + rect.tyDelta;
          return (
            <rect
              key={`mat-${clipId}-${tx}-${ty}`}
              width={rect.width}
              height={rect.height}
              transform={buildMatrixTransform(rect.coeffs, tx, ty)}
              fill={rect.fill === "border" ? palette.border : palette.accent}
            />
          );
        })}
        <rect
          x={origin.x + config.accentRect.xDelta}
          y={origin.y + config.accentRect.yDelta}
          width={config.accentRect.width}
          height={config.accentRect.height}
          fill={palette.accent}
        />
      </g>
      {children}
    </g>
  );
};

export default SvgTabBlock;

