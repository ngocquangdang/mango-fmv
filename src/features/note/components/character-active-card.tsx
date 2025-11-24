type CharacterActiveCardProps = {
  src: string;
  onClick?: () => void;
  className?: string;
  width?: number | string;
  height?: number | string;
};

export default function CharacterActiveCard({
  src,
  onClick,
  className = "",
  width = 134,
  height = 164,
}: CharacterActiveCardProps) {
  return (
    <svg
      className={className}
      width={typeof width === "number" ? `${width}` : width}
      height={typeof height === "number" ? `${height}` : height}
      viewBox="0 0 134 164"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      onClick={onClick}
    >
      <path
        d="M106 24H119.943V143H113V149.941H21.3232V143H14.0566V24H28V10H106V24Z"
        fill="url(#pattern0_114_24735)"
      />
      <rect x="28" y="10" width="78" height="7" fill="#EF5C1E" />
      <rect width="134" height="3" fill="#363F72" />
      <rect x="28" y="150" width="85" height="7" fill="#F0C446" />
      <rect
        x="120"
        y="143"
        width="115"
        height="7.00002"
        transform="rotate(-90 120 143)"
        fill="#F0C446"
      />
      <rect
        width="108"
        height="7.00002"
        transform="matrix(1.90252e-07 -1 -1 -1.00429e-08 14 136)"
        fill="#EF5C1E"
      />
      <rect x="113" y="24" width="7" height="7" fill="#EF5C1E" />
      <rect x="106" y="17" width="7" height="7" fill="#EF5C1E" />
      <rect
        width="7"
        height="7"
        transform="matrix(-1 0 0 1 28 17)"
        fill="#EF5C1E"
      />
      <rect
        width="7"
        height="7"
        transform="matrix(-1 0 0 1 21 24)"
        fill="#EF5C1E"
      />
      <rect
        x="21"
        y="143"
        width="7"
        height="7"
        transform="rotate(180 21 143)"
        fill="#EF5C1E"
      />
      <rect
        x="28"
        y="150"
        width="7"
        height="7"
        transform="rotate(180 28 150)"
        fill="#EF5C1E"
      />
      <rect x="7" y="157" width="120" height="7" fill="#EF5C1E" />
      <rect x="7" y="3" width="120" height="7" fill="#F0C446" />
      <rect
        width="154"
        height="7.00002"
        transform="matrix(1.2489e-07 -1 -1 -1.5299e-08 7 157)"
        fill="#F0C446"
      />
      <rect
        width="7"
        height="7"
        transform="matrix(1.2489e-07 -1 -1 -1.5299e-08 28 17)"
        fill="#F0C446"
      />
      <rect
        x="106"
        y="17"
        width="7"
        height="7"
        transform="rotate(-90 106 17)"
        fill="#F0C446"
      />
      <rect
        x="28"
        y="150"
        width="7"
        height="7"
        transform="rotate(90 28 150)"
        fill="#F0C446"
      />
      <rect
        width="14"
        height="14"
        transform="matrix(1.2489e-07 -1 -1 -1.5299e-08 21 24)"
        fill="#F0C446"
      />
      <rect
        x="113"
        y="24"
        width="14"
        height="14"
        transform="rotate(-90 113 24)"
        fill="#F0C446"
      />
      <rect
        x="113"
        y="150"
        width="14"
        height="14"
        transform="rotate(-90 113 150)"
        fill="#F0C446"
      />
      <rect
        x="106"
        y="157"
        width="14"
        height="14"
        transform="rotate(-90 106 157)"
        fill="#F0C446"
      />
      <rect
        x="21"
        y="143"
        width="14"
        height="14"
        transform="rotate(90 21 143)"
        fill="#F0C446"
      />
      <rect
        width="7"
        height="7"
        transform="matrix(1.2489e-07 -1 -1 -1.5299e-08 14 31)"
        fill="#F0C446"
      />
      <rect
        x="120"
        y="31"
        width="7"
        height="7"
        transform="rotate(-90 120 31)"
        fill="#F0C446"
      />
      <rect
        x="14"
        y="136"
        width="7"
        height="7"
        transform="rotate(90 14 136)"
        fill="#F0C446"
      />
      <rect
        width="154"
        height="7.00002"
        transform="matrix(1.2489e-07 -1 -1 -1.5299e-08 134 157)"
        fill="#EF5C1E"
      />
      <rect x="120" y="150" width="7" height="7" fill="#EF5C1E" />
      <defs>
        <pattern
          id="pattern0_114_24735"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <image
            width="134"
            height="164"
            href={src}
            preserveAspectRatio="xMidYMid slice"
          />
        </pattern>
      </defs>
    </svg>
  );
}
