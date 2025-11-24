export default function ArrowRight({
  width = 10,
  height = 10,
  className,
}: {
  width?: number | string;
  height?: number | string;
  className?: string;
}) {
  return (
    <svg width={width} height={height} viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="5" height="5" transform="matrix(-1 0 0 1 17 0)" fill="#111111" />
      <rect x="17" y="25" width="5" height="5" fill="#111111" />
      <rect width="5" height="5" transform="matrix(-1 0 0 1 27 10)" fill="#111111" />
      <rect x="7" y="35" width="5" height="5" fill="#111111" />
      <rect width="5" height="5" transform="matrix(-1 0 0 1 22 5)" fill="#111111" />
      <rect x="12" y="30" width="5" height="5" fill="#111111" />
      <rect width="5" height="5" transform="matrix(-1 0 0 1 32 15)" fill="#111111" />
      <rect width="5" height="5" transform="matrix(-1 0 0 1 37 20)" fill="#111111" />
      <rect width="5" height="5" transform="matrix(-1 0 0 1 12 5)" fill="#111111" />
      <rect x="22" y="30" width="5" height="5" fill="#111111" />
      <rect width="5" height="5" transform="matrix(-1 0 0 1 22 15)" fill="#111111" />
      <rect x="12" y="40" width="5" height="5" fill="#111111" />
      <rect width="5" height="5" transform="matrix(-1 0 0 1 27 20)" fill="#111111" />
      <rect width="5" height="5" transform="matrix(-1 0 0 1 17 10)" fill="#111111" />
      <rect x="17" y="35" width="5" height="5" fill="#111111" />
      <rect width="5" height="5" transform="matrix(-1 0 0 1 32 25)" fill="#111111" />
    </svg>

  );
}