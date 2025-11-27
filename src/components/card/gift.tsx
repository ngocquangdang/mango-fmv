const BASE_WIDTH = 379;
const BASE_HEIGHT = 96;

type GiftCardProps = {
  text?: string;
  className?: string;
};

export default function GiftCard({ text = "xin chào", className = "" }: GiftCardProps) {
  return (
    <div
      className={`w-full ${className}`}
      style={{ aspectRatio: `${BASE_WIDTH} / ${BASE_HEIGHT}` }}
    >
      <svg
        viewBox={`0 0 ${BASE_WIDTH} ${BASE_HEIGHT}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <g clipPath="url(#clip0_3_10229)">
          <path d="M370 3L376 9H378.999V87.002L376.001 86.998L369.999 92.998V96H0V95.999H9V92.999L3 86.999H0V9H3L9 3V0H370V3Z" fill="#FEF0C7" />
          <g clipPath="url(#clip1_3_10229)">
            <path d="M9 0H370V3H9V0Z" fill="#FDB022" />
            <path d="M9 93H370V96H9V93Z" fill="#FDB022" />
            <rect x="376" y="87" width="78" height="3.00005" transform="rotate(-90 376 87)" fill="#FDB022" />
            <rect width="78" height="3.00005" transform="matrix(5.91902e-07 -1 -1 -3.22805e-09 3 87)" fill="#FDB022" />
            <rect width="3" height="3" transform="matrix(-1 0 0 1 6 6)" fill="#FDB022" />
            <rect x="6" y="90" width="3" height="3" transform="rotate(180 6 90)" fill="#FDB022" />
            <rect width="3" height="3" transform="matrix(-1 0 0 1 9 3)" fill="#FDB022" />
            <rect x="9" y="93" width="3" height="3" transform="rotate(180 9 93)" fill="#FDB022" />
            <path d="M373 3H370V6H373V3Z" fill="#FDB022" />
            <path d="M376 6H373V9H376V6Z" fill="#FDB022" />
            <path d="M373 93H370V90H373V93Z" fill="#FDB022" />
            <path d="M376 90H373V87H376V90Z" fill="#FDB022" />
          </g>
          <g clipPath="url(#clip2_3_10229)">
            <path d="M82 14H88V82.0039H82V88H14V82H8V14H14V8H82V14Z" fill="#FEDF89" />
            <path d="M82 14H88V82.0039H82V88H14V82H8V14H14V8H82V14Z" fill="url(#pattern0_3_10229)" />
            <g clipPath="url(#clip3_3_10229)">
              <rect x="14" y="8" width="68" height="3" fill="#FEDF89" />
              <rect x="14" y="85" width="68" height="3" fill="#FEDF89" />
              <rect x="85" y="82" width="68" height="3.00004" transform="rotate(-90 85 82)" fill="#FEDF89" />
              <rect width="68" height="3.00004" transform="matrix(5.23076e-07 -1 -1 -3.65279e-09 11 82)" fill="#FEDF89" />
              <rect width="3" height="3" transform="matrix(-1 0 0 1 14 11)" fill="#FEDF89" />
              <rect width="3" height="3" transform="matrix(-1 0 0 1 85 11)" fill="#FEDF89" />
              <rect x="14" y="85" width="3" height="3" transform="rotate(180 14 85)" fill="#FEDF89" />
              <rect x="85" y="85" width="3" height="3" transform="rotate(180 85 85)" fill="#FEDF89" />
            </g>
          </g>
          <text
            x="160"
            y="56"
            fill="#000"
            fontSize="20"
            textAnchor="middle"
          >
            {text}
          </text>
        </g>
        <defs>
          <pattern id="pattern0_3_10229" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use xlinkHref="#image0_3_10229" transform="translate(0 -0.125) scale(0.000833333)" />
          </pattern>
          <clipPath id="clip0_3_10229">
            <rect width="379" height="96" fill="white" />
          </clipPath>
          <clipPath id="clip1_3_10229">
            <rect width="379" height="96" fill="white" />
          </clipPath>
          <clipPath id="clip2_3_10229">
            <rect width="80" height="80" fill="white" transform="translate(8 8)" />
          </clipPath>
          <clipPath id="clip3_3_10229">
            <rect width="80" height="80" fill="white" transform="translate(8 8)" />
          </clipPath>
          <image
            id="image0_3_10229"
            width="1200"
            height="1500"
            preserveAspectRatio="none"
            href={""}
          />

        </defs>
      </svg>
    </div>

  )
}