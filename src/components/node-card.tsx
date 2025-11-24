type NodeCardProps = {
  className?: string;
  src?: string;
  width?: number | string;
  height?: number | string;
  backgroundColor?: string;
};

export default function NodeCard({
  className,
  src,
  width = 302,
  height = 201,
  backgroundColor = "#FFFDFA",
}: NodeCardProps) {
  return (
    <svg
      className={className}
      width={typeof width === "number" ? `${width}` : width}
      height={typeof height === "number" ? `${height}` : height}
      viewBox="0 0 302 201"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_3_9879)">
        <path
          d="M286.615 15.3848H294.308V184.615H286.615V192.308H15.3848V184.615H7.69238V15.3848H15.3848V7.69238H286.615V15.3848Z"
          fill={backgroundColor}
        />
        <image
          width="302"
          height="201"
          href={src || "/src/assets/node-card.png"}
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#node-card-clip)"
        />
        <rect x="23.0771" width="255.846" height="7.69231" fill="black" />
        <g style={{ mixBlendMode: "soft-light" }}>
          <rect
            x="23.0771"
            y="7.69238"
            width="255.846"
            height="7.69231"
            fill="white"
          />
        </g>
        <rect
          x="23.0771"
          y="192.308"
          width="255.846"
          height="7.69231"
          fill="black"
        />
        <g style={{ mixBlendMode: "color-burn" }} opacity="0.3">
          <rect
            x="23.0771"
            y="184.615"
            width="255.846"
            height="7.69231"
            fill="black"
          />
        </g>
        <rect
          x="294.308"
          y="176.923"
          width="153.846"
          height="7.69231"
          transform="rotate(-90 294.308 176.923)"
          fill="black"
        />
        <rect
          width="153.846"
          height="7.69231"
          transform="matrix(1.45122e-07 -1 -1 -1.31661e-08 7.69238 176.923)"
          fill="black"
        />
        <rect
          x="278.923"
          y="7.69238"
          width="7.69231"
          height="7.69231"
          fill="black"
        />
        <g style={{ mixBlendMode: "soft-light" }}>
          <rect
            x="278.923"
            y="15.3848"
            width="7.69231"
            height="7.69231"
            fill="white"
          />
        </g>
        <rect
          x="286.615"
          y="15.3848"
          width="7.69231"
          height="7.69231"
          fill="black"
        />
        <rect
          width="7.69231"
          height="7.69231"
          transform="matrix(-1 0 0 1 23.0771 7.69238)"
          fill="black"
        />
        <g style={{ mixBlendMode: "soft-light" }}>
          <rect
            width="7.69231"
            height="7.69231"
            transform="matrix(-1 0 0 1 23.0771 15.3848)"
            fill="white"
          />
        </g>
        <rect
          width="7.69231"
          height="7.69231"
          transform="matrix(-1 0 0 1 15.3848 15.3848)"
          fill="black"
        />
        <g style={{ mixBlendMode: "soft-light" }}>
          <rect
            width="7.69231"
            height="7.69231"
            transform="matrix(-1 0 0 1 15.3848 23.0771)"
            fill="white"
          />
        </g>
        <rect
          width="7.69231"
          height="7.69231"
          transform="matrix(1 0 0 -1 278.923 192.308)"
          fill="black"
        />
        <g style={{ mixBlendMode: "color-burn" }} opacity="0.3">
          <rect
            width="7.69231"
            height="7.69231"
            transform="matrix(1 0 0 -1 278.923 184.615)"
            fill="black"
          />
        </g>
        <rect
          width="7.69231"
          height="7.69231"
          transform="matrix(1 0 0 -1 286.615 184.615)"
          fill="black"
        />
        <g style={{ mixBlendMode: "color-burn" }} opacity="0.3">
          <rect
            width="7.69231"
            height="7.69231"
            transform="matrix(1 0 0 -1 286.615 176.923)"
            fill="black"
          />
        </g>
        <rect
          x="23.0771"
          y="192.308"
          width="7.69231"
          height="7.69231"
          transform="rotate(180 23.0771 192.308)"
          fill="black"
        />
        <g style={{ mixBlendMode: "color-burn" }} opacity="0.3">
          <rect
            x="23.0771"
            y="184.615"
            width="7.69231"
            height="7.69231"
            transform="rotate(180 23.0771 184.615)"
            fill="black"
          />
        </g>
        <rect
          x="15.3848"
          y="184.615"
          width="7.69231"
          height="7.69231"
          transform="rotate(180 15.3848 184.615)"
          fill="black"
        />
      </g>
      <defs>
        <clipPath id="node-card-clip">
          <rect x="7.69238" y="7.69238" width="286.615" height="184.615" />
        </clipPath>
      </defs>
    </svg>
  );
}
