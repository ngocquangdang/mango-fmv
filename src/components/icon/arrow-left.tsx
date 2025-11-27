export default function ArrowLeft({
  width = 10,
  height = 10,
  onClick,
}: {
  width?: number | string;
  height?: number | string;
  onClick?: () => void;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      tabIndex={0}
    >
      <rect x="28" width="5" height="5" fill="#111111" />
      <rect
        width="5"
        height="5"
        transform="matrix(-1 0 0 1 28 25)"
        fill="#111111"
      />
      <rect x="18" y="10" width="5" height="5" fill="#111111" />
      <rect
        width="5"
        height="5"
        transform="matrix(-1 0 0 1 38 35)"
        fill="#111111"
      />
      <rect x="23" y="5" width="5" height="5" fill="#111111" />
      <rect
        width="5"
        height="5"
        transform="matrix(-1 0 0 1 33 30)"
        fill="#111111"
      />
      <rect x="13" y="15" width="5" height="5" fill="#111111" />
      <rect x="8" y="20" width="5" height="5" fill="#111111" />
      <rect x="33" y="5" width="5" height="5" fill="#111111" />
      <rect
        width="5"
        height="5"
        transform="matrix(-1 0 0 1 23 30)"
        fill="#111111"
      />
      <rect x="23" y="15" width="5" height="5" fill="#111111" />
      <rect
        width="5"
        height="5"
        transform="matrix(-1 0 0 1 33 40)"
        fill="#111111"
      />
      <rect x="18" y="20" width="5" height="5" fill="#111111" />
      <rect x="28" y="10" width="5" height="5" fill="#111111" />
      <rect
        width="5"
        height="5"
        transform="matrix(-1 0 0 1 28 35)"
        fill="#111111"
      />
      <rect x="13" y="25" width="5" height="5" fill="#111111" />
    </svg>
  );
}
