type CharacterCardProps = {
  src: string;
  onClick?: () => void;
  width?: number | string;
  height?: number | string;
  className?: string;
  backgroundColor?: string;
};

export default function CharacterCard({
  src,
  onClick,
  width = 100,
  height = 100,
  className = "",
  backgroundColor = "#FFDE29",
}: CharacterCardProps) {
  return (
    <svg
      className={`cursor-pointer ${className}`}
      width={typeof width === "number" ? `${width}` : width}
      height={typeof height === "number" ? `${height}` : height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M86 14H93V86H86V92.9971H14.1318V86H6.99902V14.1318H14.1318V6.99609H86V14Z"
        fill={backgroundColor}
      />
      <image
        width="100"
        height="100"
        href={src}
        preserveAspectRatio="xMidYMid slice"
        clipPath="url(#character_card_clip)"
      />
      <rect x="21" width="58" height="7" fill="#475467" />
      <rect x="21" y="93" width="58" height="7" fill="#475467" />
      <rect x="93" y="79" width="58" height="7.00002" transform="rotate(-90 93 79)" fill="#475467" />
      <rect width="58" height="7.00002" transform="matrix(3.55233e-07 -1 -1 -5.37868e-09 7 79)" fill="#475467" />
      <rect width="7" height="7" transform="matrix(-1 0 0 1 21 7)" fill="#475467" />
      <rect x="79" y="7" width="7" height="7" fill="#475467" />
      <rect width="7" height="7" transform="matrix(-1 0 0 1 14 14)" fill="#475467" />
      <rect x="86" y="14" width="7" height="7" fill="#475467" />
      <rect width="7" height="7" transform="matrix(-1 0 0 1 21 0)" fill="#98A2B3" />
      <rect x="21" y="100" width="7" height="7" transform="rotate(180 21 100)" fill="#98A2B3" />
      <rect x="79" width="7" height="7" fill="#98A2B3" />
      <rect width="7" height="7" transform="matrix(1 0 0 -1 79 100)" fill="#98A2B3" />
      <rect width="7" height="7" transform="matrix(-1 0 0 1 7 14)" fill="#98A2B3" />
      <rect x="7" y="86" width="7" height="7" transform="rotate(180 7 86)" fill="#98A2B3" />
      <rect x="93" y="14" width="7" height="7" fill="#98A2B3" />
      <rect width="7" height="7" transform="matrix(1 0 0 -1 93 86)" fill="#98A2B3" />
      <rect width="14" height="14" transform="matrix(-1 0 0 1 14 0)" fill="#98A2B3" />
      <rect x="14" y="100" width="14" height="14" transform="rotate(180 14 100)" fill="#98A2B3" />
      <rect x="86" width="14" height="14" fill="#98A2B3" />
      <rect width="14" height="14" transform="matrix(1 0 0 -1 86 100)" fill="#98A2B3" />
      <rect width="7" height="7" transform="matrix(1 0 0 -1 79 93)" fill="#475467" />
      <rect width="7" height="7" transform="matrix(1 0 0 -1 86 86)" fill="#475467" />
      <rect x="21.1709" y="92.9453" width="7.05691" height="7.05691" transform="rotate(180 21.1709 92.9453)" fill="#475467" />
      <rect x="14.1143" y="85.8867" width="7.05691" height="7.05691" transform="rotate(180 14.1143 85.8867)" fill="#475467" />
      <defs>
        <clipPath id="character_card_clip">
          <path d="M86 14H93V86H86V92.9971H14.1318V86H6.99902V14.1318H14.1318V6.99609H86V14Z" />
        </clipPath>
      </defs>
    </svg>
  );
}
