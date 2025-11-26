type StartProps = {
  className?: string;
  onClick?: () => void;
  width?: number | string;
  height?: number | string;
};

export default function Start({
  className = "",
  onClick,
  width = 106,
  height = 110,
}: StartProps) {
  const computedWidth = typeof width === "number" ? `${width}` : width;
  const computedHeight = typeof height === "number" ? `${height}` : height;

  return (
    <svg
      width={computedWidth}
      height={computedHeight}
      viewBox="0 0 106 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} cursor-pointer`}
      onClick={onClick}
    >
      <path
        d="M73 4V12H81V16H85V24H93V89H85V97H21V89H13V24H21V16H25V12H33V4H73Z"
        fill="#4ADE80"
      />
      <rect x="5" y="44" width="96" height="37" fill="#4ADE80" />
      <rect
        x="69"
        y="105"
        width="32"
        height="4"
        transform="rotate(180 69 105)"
        fill="#15803D"
      />
      <rect
        width="4"
        height="4"
        transform="matrix(-1 0 0 1 101 73)"
        fill="#15803D"
      />
      <rect x="5" y="73" width="4" height="4" fill="#15803D" />
      <rect
        width="4"
        height="4"
        transform="matrix(-1 0 0 1 97 77)"
        fill="#15803D"
      />
      <rect x="9" y="77" width="4" height="4" fill="#15803D" />
      <rect
        width="4"
        height="4"
        transform="matrix(-1 0 0 1 93 81)"
        fill="#15803D"
      />
      <rect x="13" y="81" width="4" height="4" fill="#15803D" />
      <rect
        width="4"
        height="4"
        transform="matrix(-1 0 0 1 89 85)"
        fill="#15803D"
      />
      <rect x="17" y="85" width="4" height="4" fill="#15803D" />
      <rect
        width="4"
        height="4"
        transform="matrix(-1 0 0 1 85 89)"
        fill="#15803D"
      />
      <rect x="21" y="89" width="4" height="4" fill="#15803D" />
      <rect
        width="4"
        height="4"
        transform="matrix(-1 0 0 1 81 93)"
        fill="#15803D"
      />
      <rect x="25" y="93" width="4" height="4" fill="#15803D" />
      <rect
        width="8"
        height="4"
        transform="matrix(-1 0 0 1 77 97)"
        fill="#15803D"
      />
      <rect x="29" y="97" width="8" height="4" fill="#15803D" />
      <rect
        x="69"
        y="101"
        width="32"
        height="4"
        transform="rotate(180 69 101)"
        fill="#A7F3D0"
      />
      <rect
        width="4"
        height="4"
        transform="matrix(-1 0 0 1 101 69)"
        fill="#A7F3D0"
      />
      <rect x="5" y="69" width="4" height="4" fill="#A7F3D0" />
      <rect
        width="4"
        height="4"
        transform="matrix(-1 0 0 1 97 73)"
        fill="#A7F3D0"
      />
      <rect x="9" y="73" width="4" height="4" fill="#A7F3D0" />
      <rect
        width="4"
        height="4"
        transform="matrix(-1 0 0 1 93 77)"
        fill="#A7F3D0"
      />
      <rect x="13" y="77" width="4" height="4" fill="#A7F3D0" />
      <rect
        width="4"
        height="4"
        transform="matrix(-1 0 0 1 89 81)"
        fill="#A7F3D0"
      />
      <rect x="17" y="81" width="4" height="4" fill="#A7F3D0" />
      <rect
        width="4"
        height="4"
        transform="matrix(-1 0 0 1 85 85)"
        fill="#A7F3D0"
      />
      <rect x="21" y="85" width="4" height="4" fill="#A7F3D0" />
      <rect
        width="4"
        height="4"
        transform="matrix(-1 0 0 1 81 89)"
        fill="#A7F3D0"
      />
      <rect x="25" y="89" width="4" height="4" fill="#A7F3D0" />
      <rect
        width="8"
        height="4"
        transform="matrix(-1 0 0 1 77 93)"
        fill="#A7F3D0"
      />
      <rect x="29" y="93" width="8" height="4" fill="#A7F3D0" />
      <path d="M65 89H41V81H65V89Z" fill="#1D4ED8" />
      <path d="M73 85H65V77H73V85Z" fill="#1D4ED8" />
      <path d="M33 85H41V77H33V85Z" fill="#1D4ED8" />
      <path d="M77 81H73V69H77V81Z" fill="#1D4ED8" />
      <path d="M29 81H33V69H29V81Z" fill="#1D4ED8" />
      <path d="M69 77H73V73H69V77Z" fill="#1D4ED8" />
      <path d="M33 77H37V73H33V77Z" fill="#1D4ED8" />
      <path d="M81 77H77V65H81V77Z" fill="#1D4ED8" />
      <path d="M25 77H29V65H25V77Z" fill="#1D4ED8" />
      <path d="M85 73H81V61H85V73Z" fill="#1D4ED8" />
      <path d="M21 73H25V61H21V73Z" fill="#1D4ED8" />
      <path d="M89 69H85V57H89V69Z" fill="#1D4ED8" />
      <path d="M17 69H21V57H17V69Z" fill="#1D4ED8" />
      <path d="M93 61H89V53H93V61Z" fill="#1D4ED8" />
      <path d="M13 61H17V53H13V61Z" fill="#1D4ED8" />
      <rect x="41" width="24" height="4" fill="#111111" />
      <rect
        x="65"
        y="93"
        width="24"
        height="4"
        transform="rotate(180 65 93)"
        fill="#111111"
      />
      <rect
        x="69"
        y="109"
        width="32"
        height="4"
        transform="rotate(180 69 109)"
        fill="#111111"
      />
      <rect x="33" y="4" width="8" height="4" fill="#111111" />
      <rect
        x="73"
        y="89"
        width="8"
        height="4"
        transform="rotate(180 73 89)"
        fill="#111111"
      />
      <rect
        width="8"
        height="4"
        transform="matrix(-1 0 0 1 73 4)"
        fill="#111111"
      />
      <rect
        width="8"
        height="4"
        transform="matrix(1 0 0 -1 33 89)"
        fill="#111111"
      />
      <rect x="29" y="8" width="4" height="4" fill="#111111" />
      <rect
        x="77"
        y="85"
        width="4"
        height="4"
        transform="rotate(180 77 85)"
        fill="#111111"
      />
      <rect
        width="4"
        height="4"
        transform="matrix(-1 0 0 1 77 8)"
        fill="#111111"
      />
      <rect
        width="4"
        height="4"
        transform="matrix(1 0 0 -1 29 85)"
        fill="#111111"
      />
      <rect x="25" y="12" width="4" height="4" fill="#111111" />
      <rect
        x="81"
        y="81"
        width="4"
        height="4"
        transform="rotate(180 81 81)"
        fill="#111111"
      />
      <rect
        width="4"
        height="4"
        transform="matrix(-1 0 0 1 81 12)"
        fill="#111111"
      />
    </svg>
  );
}

    