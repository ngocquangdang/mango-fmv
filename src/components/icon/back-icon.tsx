type BackIconProps = {
  onClick: () => void;
  width?: number | string;
  height?: number | string;
  className?: string;
};

export default function BackIcon({
  onClick,
  width = 64,
  height = 64,
  className = "",
}: BackIconProps) {
  return (
    <svg
      className={className}
      width={typeof width === "number" ? `${width}` : width}
      height={typeof height === "number" ? `${height}` : height}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <g clip-path="url(#clip0_61_33158)">
        <path
          d="M57.999 6H63.999V58.0078H58.0049V64H0V63.999H5.99902V58H0V6H6V0H57.999V6Z"
          fill="#FFDE29"
        />
        <g clip-path="url(#clip1_61_33158)">
          <rect x="5.98828" width="52.0117" height="3" fill="#111111" />
          <rect x="5.99512" y="61" width="52.0098" height="3" fill="#111111" />
          <rect
            x="61"
            y="58"
            width="52.0001"
            height="3"
            transform="rotate(-90.0001 61 58)"
            fill="#111111"
          />
          <rect
            width="52"
            height="3"
            transform="matrix(9.69946e-07 -1 -1 -1.96989e-09 3 58)"
            fill="#111111"
          />
          <rect
            width="3"
            height="3"
            transform="matrix(-1 0 0 1 6 3)"
            fill="#111111"
          />
          <rect
            width="3"
            height="3"
            transform="matrix(-1 0 0 1 61 3)"
            fill="#111111"
          />
          <rect x="9" y="6" width="45.9997" height="3" fill="white" />
          <rect
            width="3"
            height="3"
            transform="matrix(-1 0 0 1 9 9)"
            fill="white"
          />
          <rect
            width="3"
            height="3"
            transform="matrix(-1 0 0 1 58 9)"
            fill="white"
          />
          <rect
            x="5.99512"
            y="61"
            width="3"
            height="3"
            transform="rotate(180 5.99512 61)"
            fill="#111111"
          />
          <rect
            x="61.0049"
            y="61"
            width="3"
            height="3"
            transform="rotate(180 61.0049 61)"
            fill="#111111"
          />
          <rect x="5.99512" y="58" width="52.0098" height="3" fill="#FFA720" />
          <rect
            x="5.99512"
            y="58"
            width="3"
            height="3"
            transform="rotate(180 5.99512 58)"
            fill="#FFA720"
          />
          <rect
            x="61.0049"
            y="58"
            width="3"
            height="3"
            transform="rotate(180 61.0049 58)"
            fill="#FFA720"
          />
        </g>
        <mask
          id="path-16-outside-1_61_33158"
          maskUnits="userSpaceOnUse"
          x="12.5"
          y="14"
          width="39"
          height="36"
          fill="black"
        >
          <rect fill="white" x="12.5" y="14" width="39" height="36" />
          <path d="M33.5 23H30.5V26H27.5V29H48.5V35H27.5V38H30.5V41H33.5V47H27.5V44H24.5V41H21.5V38H18.5V35H15.5V29H18.5V26H21.5V23H24.5V20H27.5V17H33.5V23Z" />
        </mask>
        <path
          d="M33.5 23H30.5V26H27.5V29H48.5V35H27.5V38H30.5V41H33.5V47H27.5V44H24.5V41H21.5V38H18.5V35H15.5V29H18.5V26H21.5V23H24.5V20H27.5V17H33.5V23Z"
          fill="white"
        />
        <path
          d="M33.5 23V26H36.5V23H33.5ZM30.5 23V20H27.5V23H30.5ZM30.5 26V29H33.5V26H30.5ZM27.5 26V23H24.5V26H27.5ZM27.5 29H24.5V32H27.5V29ZM48.5 29H51.5V26H48.5V29ZM48.5 35V38H51.5V35H48.5ZM27.5 35V32H24.5V35H27.5ZM27.5 38H24.5V41H27.5V38ZM30.5 38H33.5V35H30.5V38ZM30.5 41H27.5V44H30.5V41ZM33.5 41H36.5V38H33.5V41ZM33.5 47V50H36.5V47H33.5ZM27.5 47H24.5V50H27.5V47ZM27.5 44H30.5V41H27.5V44ZM24.5 44H21.5V47H24.5V44ZM24.5 41H27.5V38H24.5V41ZM21.5 41H18.5V44H21.5V41ZM21.5 38H24.5V35H21.5V38ZM18.5 38H15.5V41H18.5V38ZM18.5 35H21.5V32H18.5V35ZM15.5 35H12.5V38H15.5V35ZM15.5 29V26H12.5V29H15.5ZM18.5 29V32H21.5V29H18.5ZM18.5 26V23H15.5V26H18.5ZM21.5 26V29H24.5V26H21.5ZM21.5 23V20H18.5V23H21.5ZM24.5 23V26H27.5V23H24.5ZM24.5 20V17H21.5V20H24.5ZM27.5 20V23H30.5V20H27.5ZM27.5 17V14H24.5V17H27.5ZM33.5 17H36.5V14H33.5V17ZM33.5 23V20H30.5V23V26H33.5V23ZM30.5 23H27.5V26H30.5H33.5V23H30.5ZM30.5 26V23H27.5V26V29H30.5V26ZM27.5 26H24.5V29H27.5H30.5V26H27.5ZM27.5 29V32H48.5V29V26H27.5V29ZM48.5 29H45.5V35H48.5H51.5V29H48.5ZM48.5 35V32H27.5V35V38H48.5V35ZM27.5 35H24.5V38H27.5H30.5V35H27.5ZM27.5 38V41H30.5V38V35H27.5V38ZM30.5 38H27.5V41H30.5H33.5V38H30.5ZM30.5 41V44H33.5V41V38H30.5V41ZM33.5 41H30.5V47H33.5H36.5V41H33.5ZM33.5 47V44H27.5V47V50H33.5V47ZM27.5 47H30.5V44H27.5H24.5V47H27.5ZM27.5 44V41H24.5V44V47H27.5V44ZM24.5 44H27.5V41H24.5H21.5V44H24.5ZM24.5 41V38H21.5V41V44H24.5V41ZM21.5 41H24.5V38H21.5H18.5V41H21.5ZM21.5 38V35H18.5V38V41H21.5V38ZM18.5 38H21.5V35H18.5H15.5V38H18.5ZM18.5 35V32H15.5V35V38H18.5V35ZM15.5 35H18.5V29H15.5H12.5V35H15.5ZM15.5 29V32H18.5V29V26H15.5V29ZM18.5 29H21.5V26H18.5H15.5V29H18.5ZM18.5 26V29H21.5V26V23H18.5V26ZM21.5 26H24.5V23H21.5H18.5V26H21.5ZM21.5 23V26H24.5V23V20H21.5V23ZM24.5 23H27.5V20H24.5H21.5V23H24.5ZM24.5 20V23H27.5V20V17H24.5V20ZM27.5 20H30.5V17H27.5H24.5V20H27.5ZM27.5 17V20H33.5V17V14H27.5V17ZM33.5 17H30.5V23H33.5H36.5V17H33.5Z"
          fill="black"
          mask="url(#path-16-outside-1_61_33158)"
        />
      </g>
      <defs>
        <clipPath id="clip0_61_33158">
          <rect width="64" height="64" fill="white" />
        </clipPath>
        <clipPath id="clip1_61_33158">
          <rect width="64" height="64" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
