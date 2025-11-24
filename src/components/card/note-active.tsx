import { type ReactNode } from "react";

type NoteActiveCardProps = {
  imageSrc: string;
  width?: number | string;
  height?: number | string;
  children?: ReactNode;
};

export default function NoteActiveCard({
  imageSrc,
  width = 288,
  height = 225,
  children,
}: NoteActiveCardProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 288 225"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g clipPath="url(#clip0_28_64446)">
        <path
          d="M274.998 175.001H284.999V215.003H275.001V225H0V224.999H9.99902V215H0V175H10V165H274.998V175.001Z"
          fill="#F0C446"
        />
        <g clipPath="url(#clip1_28_64446)">
          <rect x="9.99023" y="165" width="265.008" height="5" fill="#111111" />
          <rect x="9.99902" y="220" width="265.002" height="5" fill="#111111" />
          <rect
            width="39.9999"
            height="5.00197"
            transform="matrix(-1.12179e-06 -1 1 -1.70324e-09 279.998 215)"
            fill="#111111"
          />
          <rect
            width="40"
            height="5"
            transform="matrix(1.12461e-06 -1 -1 -1.69897e-09 5 215)"
            fill="#111111"
          />
          <rect
            width="5"
            height="5"
            transform="matrix(-1 0 0 1 10 170)"
            fill="#111111"
          />
          <rect
            width="5"
            height="5"
            transform="matrix(-1 0 0 1 279.998 170)"
            fill="#111111"
          />
          <rect x="15" y="175" width="254.998" height="5" fill="white" />
          <rect
            width="5"
            height="5"
            transform="matrix(-1 0 0 1 15 180)"
            fill="white"
          />
          <rect
            width="5"
            height="5"
            transform="matrix(-1 0 0 1 274.998 180)"
            fill="white"
          />
          <rect
            x="9.99902"
            y="220"
            width="5"
            height="5"
            transform="rotate(180 9.99902 220)"
            fill="#111111"
          />
          <rect
            x="280.001"
            y="220"
            width="5"
            height="5"
            transform="rotate(180 280.001 220)"
            fill="#111111"
          />
          <rect
            x="9.99902"
            y="215.001"
            width="265.002"
            height="5"
            fill="#D96D35"
          />
          <rect
            x="9.99902"
            y="215.001"
            width="5"
            height="5"
            transform="rotate(180 9.99902 215.001)"
            fill="#D96D35"
          />
          <rect
            x="280.001"
            y="215.001"
            width="5"
            height="5"
            transform="rotate(180 280.001 215.001)"
            fill="#D96D35"
          />
        </g>
        {/* Replaced path with foreignObject for custom content */}
        <foreignObject x="10" y="180" width="268" height="35">
          <div className="w-full h-full flex items-center justify-center">
            {children}
          </div>
        </foreignObject>
      </g>
      <path d="M282 3V6H285V162H282V165H6V162H3V6H6V3H282Z" fill="#F0C446" />
      <rect x="9" y="165" width="270" height="3" fill="#111111" />
      <rect
        x="3"
        y="9"
        width="150"
        height="2.99999"
        transform="rotate(90 3 9)"
        fill="#111111"
      />
      <rect
        x="288"
        y="9"
        width="150"
        height="2.99999"
        transform="rotate(90 288 9)"
        fill="#111111"
      />
      <rect x="6" y="3" width="3" height="3" fill="#111111" />
      <rect x="282" y="159" width="3" height="3" fill="#111111" />
      <rect
        width="3"
        height="3"
        transform="matrix(-1 0 0 1 282 3)"
        fill="#111111"
      />
      <rect
        width="3"
        height="3"
        transform="matrix(-1 0 0 1 6 159)"
        fill="#111111"
      />
      <rect x="3" y="6" width="3" height="3" fill="#111111" />
      <rect x="279" y="162" width="3" height="3" fill="#111111" />
      <rect
        width="3"
        height="3"
        transform="matrix(-1 0 0 1 285 6)"
        fill="#111111"
      />
      <rect
        width="3"
        height="3"
        transform="matrix(-1 0 0 1 9 162)"
        fill="#111111"
      />
      <rect x="9" width="270" height="3" fill="#111111" />
      <rect
        x="12"
        y="12"
        width="264"
        height="144"
        fill="url(#pattern0_28_64446)"
      />
      <rect x="15" y="156" width="258" height="3" fill="#111111" />
      <rect x="15" y="9" width="258" height="3" fill="#111111" />
      <rect
        x="12"
        y="15"
        width="138"
        height="2.99999"
        transform="rotate(90 12 15)"
        fill="#111111"
      />
      <rect
        width="138"
        height="2.99999"
        transform="matrix(4.37114e-08 1 1 -4.37114e-08 276 15)"
        fill="#111111"
      />
      <rect x="12" y="12" width="3" height="3" fill="#111111" />
      <rect
        width="3"
        height="3"
        transform="matrix(-1 0 0 1 14.998 153)"
        fill="#111111"
      />
      <rect
        width="3"
        height="3"
        transform="matrix(-1 0 0 1 276 12)"
        fill="#111111"
      />
      <rect x="273" y="153" width="3" height="3" fill="#111111" />
      <rect x="4" y="11" width="2" height="142" fill="white" />
      <rect x="6" y="9" width="2" height="2" fill="white" />
      <rect x="8" y="7" width="2" height="2" fill="white" />
      <rect x="11" y="4" width="244" height="2" fill="white" />
      <rect y="20" width="1" height="3" fill="#111111" />
      <rect
        width="1"
        height="3"
        transform="matrix(-1 0 0 1 12 20)"
        fill="#111111"
      />
      <rect
        width="8"
        height="1"
        transform="matrix(-1 0 0 1 10 24)"
        fill="#111111"
      />
      <rect x="1" y="19" width="10" height="5" fill="#629BFE" />
      <rect x="1" y="19" width="1" height="1" fill="#111111" />
      <rect
        width="1"
        height="1"
        transform="matrix(-1 0 0 1 11 19)"
        fill="#111111"
      />
      <rect
        width="1"
        height="1"
        transform="matrix(-1 0 0 1 2 23)"
        fill="#111111"
      />
      <rect x="10" y="23" width="1" height="1" fill="#111111" />
      <rect x="3" y="18" width="7" height="1" fill="#111111" />
      <rect y="145" width="1" height="3" fill="#111111" />
      <rect
        width="1"
        height="3"
        transform="matrix(-1 0 0 1 12 145)"
        fill="#111111"
      />
      <rect
        width="8"
        height="1"
        transform="matrix(-1 0 0 1 10 149)"
        fill="#111111"
      />
      <rect x="1" y="144" width="10" height="5" fill="#629BFE" />
      <rect x="1" y="144" width="1" height="1" fill="#111111" />
      <rect
        width="1"
        height="1"
        transform="matrix(-1 0 0 1 11 144)"
        fill="#111111"
      />
      <rect
        width="1"
        height="1"
        transform="matrix(-1 0 0 1 2 148)"
        fill="#111111"
      />
      <rect x="10" y="148" width="1" height="1" fill="#111111" />
      <rect x="3" y="143" width="7" height="1" fill="#111111" />
      <rect x="276" y="20" width="1" height="3" fill="#111111" />
      <rect
        width="1"
        height="3"
        transform="matrix(-1 0 0 1 288 20)"
        fill="#111111"
      />
      <rect
        width="8"
        height="1"
        transform="matrix(-1 0 0 1 286 24)"
        fill="#111111"
      />
      <rect x="277" y="19" width="10" height="5" fill="#629BFE" />
      <rect x="277" y="19" width="1" height="1" fill="#111111" />
      <rect
        width="1"
        height="1"
        transform="matrix(-1 0 0 1 287 19)"
        fill="#111111"
      />
      <rect
        width="1"
        height="1"
        transform="matrix(-1 0 0 1 278 23)"
        fill="#111111"
      />
      <rect x="286" y="23" width="1" height="1" fill="#111111" />
      <rect x="279" y="18" width="7" height="1" fill="#111111" />
      <rect x="276" y="145" width="1" height="3" fill="#111111" />
      <rect
        width="1"
        height="3"
        transform="matrix(-1 0 0 1 288 145)"
        fill="#111111"
      />
      <rect
        width="8"
        height="1"
        transform="matrix(-1 0 0 1 286 149)"
        fill="#111111"
      />
      <rect x="277" y="144" width="10" height="5" fill="#629BFE" />
      <rect x="277" y="144" width="1" height="1" fill="#111111" />
      <rect
        width="1"
        height="1"
        transform="matrix(-1 0 0 1 287 144)"
        fill="#111111"
      />
      <rect
        width="1"
        height="1"
        transform="matrix(-1 0 0 1 278 148)"
        fill="#111111"
      />
      <rect x="286" y="148" width="1" height="1" fill="#111111" />
      <rect x="279" y="143" width="7" height="1" fill="#111111" />
      <defs>
        <pattern
          id="pattern0_28_64446"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_28_64446"
            transform="matrix(0.0013587 0 0 0.00249094 0 -0.661002)"
          />
        </pattern>
        <clipPath id="clip0_28_64446">
          <rect
            width="285"
            height="60"
            fill="white"
            transform="translate(0 165)"
          />
        </clipPath>
        <clipPath id="clip1_28_64446">
          <rect
            width="285"
            height="60"
            fill="white"
            transform="translate(0 165)"
          />
        </clipPath>
        <image
          id="image0_28_64446"
          width="736"
          height="743"
          preserveAspectRatio="none"
          href={imageSrc}
        />
      </defs>
    </svg>
  );
}
