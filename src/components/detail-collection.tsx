type DetailCollectionProps = {
  rowLabel?: string;
  sectionLabel?: string;
};

const defaultRowLabel = "DETAIL COLLECTION ROW";

export default function DetailCollection({
  rowLabel = defaultRowLabel,
  sectionLabel,
}: DetailCollectionProps) {
  const rowLabelText = rowLabel?.trim() ?? "";
  const sectionLabelText = sectionLabel?.trim() ?? "";
  const normalizedRowLabel = rowLabelText.length > 0 ? rowLabelText : undefined;
  const normalizedSectionLabel = sectionLabelText.length > 0 ? sectionLabelText : undefined;

  return (
    <svg
      width="457"
      height="670"
      viewBox="0 0 457 670"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path d="M427 205V225H447V405H304V205H427Z" fill="#FF9442" />
      <rect x="304" y="195" width="113" height="10" fill="#111111" />
      <rect x="304" y="205" width="113" height="10" fill="#FFB67E" />
      <rect
        x="457"
        y="235"
        width="45"
        height="10"
        transform="rotate(90 457 235)"
        fill="#111111"
      />
      <rect
        x="447"
        y="235"
        width="45"
        height="10"
        transform="rotate(90 447 235)"
        fill="#FA7036"
      />
      <rect x="437" y="225" width="10" height="10" fill="#111111" />
      <rect x="427" y="225" width="10" height="10" fill="#FA7036" />
      <rect x="437" y="280" width="10" height="125" fill="#111111" />
      <rect x="427" y="280" width="10" height="125" fill="#FA7036" />
      <rect x="427" y="215" width="10" height="10" fill="#111111" />
      <rect x="417" y="215" width="10" height="10" fill="#FA7036" />
      <rect x="417" y="205" width="10" height="10" fill="#111111" />
      <path d="M427 626V606H447V426H304V626H427Z" fill="#FF9442" />
      <rect
        width="113"
        height="10"
        transform="matrix(1 0 0 -1 304 636)"
        fill="#111111"
      />
      <rect
        width="113"
        height="10"
        transform="matrix(1 0 0 -1 304 626)"
        fill="#FA7036"
      />
      <rect
        width="45"
        height="10"
        transform="matrix(-4.37114e-08 -1 -1 4.37114e-08 457 596)"
        fill="#111111"
      />
      <rect
        width="45"
        height="10"
        transform="matrix(-4.37114e-08 -1 -1 4.37114e-08 447 596)"
        fill="#FA7036"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(1 0 0 -1 437 606)"
        fill="#111111"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(1 0 0 -1 427 606)"
        fill="#FA7036"
      />
      <rect
        width="10"
        height="125"
        transform="matrix(1 0 0 -1 437 551)"
        fill="#111111"
      />
      <rect
        width="10"
        height="125"
        transform="matrix(1 0 0 -1 427 551)"
        fill="#FA7036"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(1 0 0 -1 427 616)"
        fill="#111111"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(1 0 0 -1 417 616)"
        fill="#FA7036"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(1 0 0 -1 417 626)"
        fill="#111111"
      />
      <rect
        x="273"
        y="96"
        width="144"
        height="99"
        fill="url(#pattern0_28_64661)"
      />
      <rect x="4" y="205" width="364" height="295" fill="#FF9442" />
      <rect x="4" y="195" width="364" height="10" fill="#111111" />
      <rect x="4" y="205" width="364" height="10" fill="#FFB67E" />
      <rect
        width="10"
        height="10"
        transform="matrix(-4.37114e-08 1 1 4.37114e-08 344 205.001)"
        fill="#D92D20"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(-4.37114e-08 1 1 4.37114e-08 314 205.001)"
        fill="#D92D20"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(-4.37114e-08 1 1 4.37114e-08 284 205.001)"
        fill="#D92D20"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(-4.37114e-08 1 1 4.37114e-08 334 215.001)"
        fill="#D92D20"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(-4.37114e-08 1 1 4.37114e-08 324 225.001)"
        fill="#D92D20"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(-4.37114e-08 1 1 4.37114e-08 304 215.001)"
        fill="#D92D20"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(-4.37114e-08 1 1 4.37114e-08 294 225.001)"
        fill="#D92D20"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(-4.37114e-08 1 1 4.37114e-08 274 215.001)"
        fill="#D92D20"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(-4.37114e-08 1 1 4.37114e-08 264 225.001)"
        fill="#D92D20"
      />
      <rect
        x="437"
        y="353"
        width="191"
        height="190"
        transform="rotate(90 437 353)"
        fill="#FF9442"
      />
      <rect
        x="447"
        y="353"
        width="191"
        height="10"
        transform="rotate(90 447 353)"
        fill="#111111"
      />
      <rect
        x="437"
        y="353"
        width="191"
        height="10"
        transform="rotate(90 437 353)"
        fill="#FA7036"
      />
      <rect
        x="308"
        y="620"
        width="308"
        height="190"
        transform="rotate(-180 308 620)"
        fill="#FF9442"
      />
      <rect
        x="308"
        y="630"
        width="308"
        height="10"
        transform="rotate(-180 308 630)"
        fill="#111111"
      />
      <rect
        x="308"
        y="620"
        width="308"
        height="10"
        transform="rotate(-180 308 620)"
        fill="#FA7036"
      />
      <rect x="43" y="5" width="180" height="160.012" fill="#F9C12B" />
      <rect
        x="61.0015"
        y="25.7656"
        width="143.998"
        height="118.486"
        fill="white"
      />
      <rect
        x="61.0015"
        y="25.7656"
        width="143.998"
        height="118.486"
        fill="url(#pattern1_28_64661)"
      />
      <rect x="228" y="15" width="5" height="165.016" fill="#111111" />
      <rect x="48" width="170" height="5" fill="#111111" />
      <rect x="87.3877" y="5" width="91.2248" height="5" fill="#EF5C1E" />
      <rect x="87.3877" y="154" width="91.2248" height="5" fill="#EF5C1E" />
      <rect x="64.001" y="16.7656" width="137.998" height="3" fill="#111111" />
      <rect x="64.001" y="22.7656" width="137.998" height="3" fill="#111111" />
      <rect x="64.001" y="151" width="137.998" height="3" fill="#111111" />
      <rect x="64.001" y="148" width="137.998" height="3" fill="#FFE191" />
      <rect x="64.001" y="145" width="137.998" height="3" fill="#111111" />
      <rect
        x="55.001"
        y="28.7656"
        width="113.234"
        height="3"
        transform="rotate(90 55.001 28.7656)"
        fill="#111111"
      />
      <rect
        x="58.001"
        y="28.7656"
        width="113.234"
        height="3"
        transform="rotate(90 58.001 28.7656)"
        fill="#FDA814"
      />
      <rect
        x="61.001"
        y="28.7656"
        width="113.234"
        height="3"
        transform="rotate(90 61.001 28.7656)"
        fill="#111111"
      />
      <rect
        width="113.234"
        height="3"
        transform="matrix(4.37114e-08 1 1 -4.37114e-08 210.999 28.7656)"
        fill="#111111"
      />
      <rect
        width="113.234"
        height="3"
        transform="matrix(4.37114e-08 1 1 -4.37114e-08 207.999 28.7656)"
        fill="#FFE191"
      />
      <rect
        width="113.234"
        height="3"
        transform="matrix(4.37114e-08 1 1 -4.37114e-08 204.999 28.7656)"
        fill="#111111"
      />
      <rect x="61.001" y="19.7656" width="3" height="3" fill="#111111" />
      <rect
        width="3"
        height="3"
        transform="matrix(-1 0 0 1 204.999 19.7656)"
        fill="#111111"
      />
      <rect
        width="3"
        height="3"
        transform="matrix(-1 0 0 1 58.001 142)"
        fill="#111111"
      />
      <rect x="207.999" y="142" width="3" height="3" fill="#111111" />
      <rect x="58.001" y="22.7656" width="3" height="3" fill="#111111" />
      <rect x="61.001" y="25.7656" width="3" height="3" fill="#111111" />
      <rect
        width="3"
        height="3"
        transform="matrix(-1 0 0 1 207.999 22.7656)"
        fill="#111111"
      />
      <rect
        width="3"
        height="3"
        transform="matrix(-1 0 0 1 204.999 25.7656)"
        fill="#111111"
      />
      <rect
        width="3"
        height="3"
        transform="matrix(-1 0 0 1 61.001 145)"
        fill="#111111"
      />
      <rect
        width="3"
        height="3"
        transform="matrix(-1 0 0 1 64 142)"
        fill="#111111"
      />
      <rect x="204.999" y="145" width="3" height="3" fill="#111111" />
      <rect x="204.999" y="142" width="3" height="3" fill="#FFE191" />
      <rect x="202.005" y="142" width="3" height="3" fill="#111111" />
      <rect x="55.001" y="25.7656" width="3" height="3" fill="#111111" />
      <rect x="45.001" y="43.8398" width="7" height="3" fill="#D78422" />
      <rect x="45.001" y="49.8398" width="7" height="3" fill="#D78422" />
      <rect x="45.001" y="55.8398" width="7" height="3" fill="#D78422" />
      <rect x="213.999" y="43.8398" width="7" height="3" fill="#D78422" />
      <rect x="213.999" y="49.8398" width="7" height="3" fill="#D78422" />
      <rect x="213.999" y="55.8398" width="7" height="3" fill="#D78422" />
      <rect
        width="3"
        height="3"
        transform="matrix(-1 0 0 1 210.999 25.7656)"
        fill="#111111"
      />
      <rect
        width="3"
        height="3"
        transform="matrix(-1 0 0 1 64.001 148)"
        fill="#111111"
      />
      <rect x="201.999" y="148" width="3" height="3" fill="#111111" />
      <rect x="201.999" y="145" width="3" height="3" fill="#FFE191" />
      <rect x="218" y="5" width="5" height="5" fill="#111111" />
      <rect
        width="5"
        height="5"
        transform="matrix(-1 0 0 1 48 5)"
        fill="#111111"
      />
      <rect
        width="5"
        height="5"
        transform="matrix(-1 0 0 1 48 10)"
        fill="#FFE191"
      />
      <rect
        width="5"
        height="5"
        transform="matrix(-1 0 0 1 53 5)"
        fill="#FFE191"
      />
      <rect x="223" y="10" width="5" height="5" fill="#111111" />
      <rect
        width="5"
        height="5"
        transform="matrix(-1 0 0 1 43 10)"
        fill="#111111"
      />
      <rect x="33" y="15" width="5" height="165.016" fill="#111111" />
      <rect x="223" y="15" width="5" height="159.992" fill="#FDA814" />
      <rect x="38" y="15" width="5" height="159.992" fill="#FFE191" />
      <rect x="43" y="165.012" width="180" height="5" fill="#FDA814" />
      <rect x="188.979" y="158" width="1" height="1" fill="#111111" />
      <rect
        width="1"
        height="1"
        transform="matrix(-1 0 0 1 190.979 161)"
        fill="#111111"
      />
      <rect x="189.979" y="159" width="1" height="1" fill="#111111" />
      <rect
        width="1"
        height="1"
        transform="matrix(-1 0 0 1 189.979 162)"
        fill="#111111"
      />
      <rect x="190.979" y="160" width="1" height="1" fill="#111111" />
      <rect x="185" y="158" width="1" height="1" fill="#111111" />
      <rect
        width="1"
        height="1"
        transform="matrix(-1 0 0 1 187 161)"
        fill="#111111"
      />
      <rect x="186" y="159" width="1" height="1" fill="#111111" />
      <rect
        width="1"
        height="1"
        transform="matrix(-1 0 0 1 186 162)"
        fill="#111111"
      />
      <rect x="187" y="160" width="1" height="1" fill="#111111" />
      <rect x="194.005" y="160" width="1" height="1" fill="#111111" />
      <rect x="194.005" y="160" width="1" height="2" fill="#111111" />
      <rect
        width="1"
        height="2"
        transform="matrix(-1 0 0 1 203.005 160)"
        fill="#111111"
      />
      <rect
        width="5"
        height="1"
        transform="matrix(-1 0 0 1 201.005 163)"
        fill="#111111"
      />
      <rect x="195.005" y="159" width="7" height="4" fill="#FD7714" />
      <rect x="195.005" y="159" width="1" height="1" fill="#111111" />
      <rect
        width="1"
        height="1"
        transform="matrix(-1 0 0 1 202.005 159)"
        fill="#111111"
      />
      <rect
        width="1"
        height="1"
        transform="matrix(-1 0 0 1 196.005 162)"
        fill="#111111"
      />
      <rect x="201.005" y="162" width="1" height="1" fill="#111111" />
      <rect x="196.005" y="158" width="5" height="1" fill="#111111" />
      <rect x="72" y="159" width="1" height="3" fill="#111111" />
      <rect
        width="1"
        height="3"
        transform="matrix(-1 0 0 1 80 159)"
        fill="#111111"
      />
      <rect
        width="4"
        height="1"
        transform="matrix(-1 0 0 1 78 163)"
        fill="#111111"
      />
      <rect x="73" y="158" width="6" height="5" fill="#03C357" />
      <rect x="73" y="158" width="1" height="1" fill="#111111" />
      <rect
        width="1"
        height="1"
        transform="matrix(-1 0 0 1 79 158)"
        fill="#111111"
      />
      <rect
        width="1"
        height="1"
        transform="matrix(-1 0 0 1 74 162)"
        fill="#111111"
      />
      <rect x="78" y="162" width="1" height="1" fill="#111111" />
      <rect x="74" y="157" width="4" height="1" fill="#111111" />
      <rect x="62" y="159" width="1" height="3" fill="#111111" />
      <rect
        width="1"
        height="3"
        transform="matrix(-1 0 0 1 70 159)"
        fill="#111111"
      />
      <rect
        width="4"
        height="1"
        transform="matrix(-1 0 0 1 68 163)"
        fill="#111111"
      />
      <rect x="63" y="158" width="6" height="5" fill="#3D98FF" />
      <rect x="63" y="158" width="1" height="1" fill="#111111" />
      <rect
        width="1"
        height="1"
        transform="matrix(-1 0 0 1 69 158)"
        fill="#111111"
      />
      <rect
        width="1"
        height="1"
        transform="matrix(-1 0 0 1 64 162)"
        fill="#111111"
      />
      <rect x="68" y="162" width="1" height="1" fill="#111111" />
      <rect x="64" y="157" width="4" height="1" fill="#111111" />
      <rect x="64.001" y="19.7656" width="137.998" height="3" fill="#FDA814" />
      <rect x="61.001" y="22.7656" width="3" height="3" fill="#FDA814" />
      <rect x="58.001" y="25.7656" width="3" height="3" fill="#FDA814" />
      <g clipPath="url(#clip0_28_64661)">
        <path
          d="M222.998 180.017H232.999V220.019H223.001V230.016H33V230.015H42.999V220.016H33V180.016H43V170.016H222.998V180.017Z"
          fill="#FFDE29"
        />
        <g clip-path="url(#clip1_28_64661)">
          <rect
            x="42.9902"
            y="170.016"
            width="180.008"
            height="5"
            fill="#111111"
          />
          <rect
            x="42.999"
            y="225.016"
            width="180.002"
            height="5"
            fill="#111111"
          />
          <rect
            width="39.9999"
            height="5.00198"
            transform="matrix(-1.12179e-06 -1 1 -1.70324e-09 227.998 220.016)"
            fill="#111111"
          />
          <rect
            width="40"
            height="5"
            transform="matrix(1.12461e-06 -1 -1 -1.69897e-09 38 220.016)"
            fill="#111111"
          />
          <rect
            width="5"
            height="5"
            transform="matrix(-1 0 0 1 43 175.016)"
            fill="#111111"
          />
          <rect
            width="5"
            height="5"
            transform="matrix(-1 0 0 1 227.998 175.016)"
            fill="#111111"
          />
          <rect x="48" y="180.016" width="169.998" height="5" fill="white" />
          <rect
            width="5"
            height="5"
            transform="matrix(-1 0 0 1 48 185.016)"
            fill="white"
          />
          <rect
            width="5"
            height="5"
            transform="matrix(-1 0 0 1 222.998 185.016)"
            fill="white"
          />
          <rect
            x="42.999"
            y="225.016"
            width="5"
            height="5"
            transform="rotate(180 42.999 225.016)"
            fill="#111111"
          />
          <rect
            x="228.001"
            y="225.016"
            width="5"
            height="5"
            transform="rotate(180 228.001 225.016)"
            fill="#111111"
          />
          <rect
            x="42.999"
            y="220.017"
            width="180.002"
            height="5"
            fill="#FFA720"
          />
          <rect
            x="42.999"
            y="220.017"
            width="5"
            height="5"
            transform="rotate(180 42.999 220.017)"
            fill="#FFA720"
          />
          <rect
            x="228.001"
            y="220.017"
            width="5"
            height="5"
            transform="rotate(180 228.001 220.017)"
            fill="#FFA720"
          />
        </g>
        <text
          x="133"
          y="204"
          fill="#111111"
          fontFamily="Inter, sans-serif"
          fontSize="9"
          fontWeight="700"
          textAnchor="middle"
          aria-label="Collection label"
          role="text"
          tabIndex={0}
        >
          COLLECTION
        </text>
      </g>
      <g clip-path="url(#clip2_28_64661)">
        <path
          d="M388 264H398V545H388V555H48V545H38V264H48V254H388V264Z"
          fill="white"
        />
        <rect x="383" y="254" width="5" height="5" fill="#111111" />
        <rect
          x="53"
          y="555"
          width="5"
          height="5"
          transform="rotate(180 53 555)"
          fill="#111111"
        />
        <rect
          width="5"
          height="5"
          transform="matrix(-1 0 0 1 53 254)"
          fill="#111111"
        />
        <rect
          width="5"
          height="5"
          transform="matrix(1 0 0 -1 383 555)"
          fill="#111111"
        />
        <rect x="388" y="259" width="5" height="5" fill="#111111" />
        <rect
          x="48"
          y="550"
          width="5"
          height="5"
          transform="rotate(180 48 550)"
          fill="#111111"
        />
        <rect
          width="5"
          height="5"
          transform="matrix(-1 0 0 1 48 259)"
          fill="#111111"
        />
        <rect
          width="5"
          height="5"
          transform="matrix(1 0 0 -1 388 550)"
          fill="#111111"
        />
        <rect x="393" y="264" width="5" height="5" fill="#111111" />
        <rect
          x="43"
          y="545"
          width="5"
          height="5"
          transform="rotate(180 43 545)"
          fill="#111111"
        />
        <rect
          width="5"
          height="5"
          transform="matrix(-1 0 0 1 43 264)"
          fill="#111111"
        />
        <rect
          width="5"
          height="5"
          transform="matrix(1 0 0 -1 393 545)"
          fill="#111111"
        />
        <rect
          x="38"
          y="540"
          width="5"
          height="271"
          transform="rotate(180 38 540)"
          fill="#111111"
        />
        <rect
          x="403"
          y="540"
          width="5"
          height="271"
          transform="rotate(180 403 540)"
          fill="#111111"
        />
        <rect
          x="53"
          y="254"
          width="5.00001"
          height="330"
          transform="rotate(-90 53 254)"
          fill="#111111"
        />
        <rect
          x="383"
          y="555"
          width="4.99999"
          height="330"
          transform="rotate(90 383 555)"
          fill="#111111"
        />
      </g>
      {normalizedSectionLabel && (
        <foreignObject
          x="55"
          y="330"
          width="320"
          height="140"
          requiredExtensions="http://www.w3.org/1999/xhtml"
        >
          <div
            className="flex h-full w-full items-start justify-start text-left text-[12px] font-medium leading-tight text-[#344054] wrap-break-word"
            role="text"
            aria-label={normalizedSectionLabel}
            tabIndex={0}
          >
            {normalizedSectionLabel}
          </div>
        </foreignObject>
      )}
      <line
        x1="104"
        y1="311.5"
        x2="332"
        y2="311.5"
        stroke="black"
        stroke-width="3"
      />
      {normalizedRowLabel && (
        <foreignObject
          x="80"
          y="265"
          width="280"
          height="45"
          requiredExtensions="http://www.w3.org/1999/xhtml"
        >
          <div
            className="flex h-full w-full items-center justify-center text-center text-[10px] font-bold leading-tight text-[#111111] wrap-break-word"
            role="text"
            aria-label={normalizedRowLabel}
            tabIndex={0}
          >
            {normalizedRowLabel}
          </div>
        </foreignObject>
      )}
      <rect x="399" y="577" width="12" height="12" fill="#667085" />
      <rect
        width="3"
        height="3"
        transform="matrix(1 0 0 -1 396 583)"
        fill="#111111"
      />
      <rect x="396" y="583" width="3" height="3" fill="#111111" />
      <rect
        x="414"
        y="583"
        width="3"
        height="3"
        transform="rotate(180 414 583)"
        fill="#111111"
      />
      <rect
        width="3"
        height="3"
        transform="matrix(-1 0 0 1 414 583)"
        fill="#111111"
      />
      <rect
        width="6"
        height="3"
        transform="matrix(1 0 0 -1 402 577)"
        fill="#111111"
      />
      <rect x="402" y="589" width="6" height="3" fill="#111111" />
      <rect
        width="3"
        height="3"
        transform="matrix(1 0 0 -1 399 580)"
        fill="#111111"
      />
      <rect
        width="3"
        height="3"
        transform="matrix(1 0 0 -1 402 583)"
        fill="#111111"
      />
      <rect
        width="3"
        height="3"
        transform="matrix(1 0 0 -1 405 586)"
        fill="#111111"
      />
      <rect x="399" y="586" width="3" height="3" fill="#111111" />
      <rect
        x="411"
        y="580"
        width="3"
        height="3"
        transform="rotate(180 411 580)"
        fill="#111111"
      />
      <rect
        width="3"
        height="3"
        transform="matrix(-1 0 0 1 411 586)"
        fill="#111111"
      />
      <g clip-path="url(#clip3_28_64661)">
        <path
          d="M350.998 594.001H360.999V660.003H351.001V670H74V669.999H83.999V660H74V594H84V584H350.998V594.001Z"
          fill="#629BFE"
        />
        <g clip-path="url(#clip4_28_64661)">
          <rect x="83.9902" y="584" width="267.008" height="5" fill="#111111" />
          <rect x="83.999" y="665" width="267.002" height="5" fill="#111111" />
          <rect
            x="355.998"
            y="660"
            width="65.9999"
            height="5.00199"
            transform="rotate(-90 355.998 660)"
            fill="#111111"
          />
          <rect
            width="66"
            height="5"
            transform="matrix(6.81584e-07 -1 -1 -2.8033e-09 79 660)"
            fill="#111111"
          />
          <rect
            width="5"
            height="5"
            transform="matrix(-1 0 0 1 84 589)"
            fill="#111111"
          />
          <rect
            width="5"
            height="5"
            transform="matrix(-1 0 0 1 355.998 589)"
            fill="#111111"
          />
          <rect x="89" y="594" width="256.998" height="5" fill="#5FCDE3" />
          <rect
            width="5"
            height="5"
            transform="matrix(-1 0 0 1 89 599)"
            fill="#5FCDE3"
          />
          <rect
            width="5"
            height="5"
            transform="matrix(-1 0 0 1 350.998 599)"
            fill="#5FCDE3"
          />
          <rect
            x="83.999"
            y="665"
            width="5"
            height="5"
            transform="rotate(180 83.999 665)"
            fill="#111111"
          />
          <rect
            x="356.001"
            y="665"
            width="5"
            height="5"
            transform="rotate(180 356.001 665)"
            fill="#111111"
          />
          <rect
            x="83.999"
            y="660.001"
            width="267.002"
            height="5"
            fill="#5B6DDF"
          />
          <rect
            x="83.999"
            y="660.001"
            width="5"
            height="5"
            transform="rotate(180 83.999 660.001)"
            fill="#5B6DDF"
          />
          <rect
            x="356.001"
            y="660.001"
            width="5"
            height="5"
            transform="rotate(180 356.001 660.001)"
            fill="#5B6DDF"
          />
        </g>
        <path
          d="M193.078 634.524V632.035H195.566V624.557H193.078V622.069H185.6V624.557H190.589V629.547H185.6V634.524H193.078ZM180.623 639.5V629.547H178.135V624.557H180.623V617.093H195.566V619.581H198.054V622.069H200.542V634.524H198.054V637.012H195.566V639.5H180.623ZM215.498 634.524V627.059H208.02V634.524H215.498ZM205.532 639.5V637.012H203.044V624.557H205.532V622.069H217.987V624.557H220.475V637.012H217.987V639.5H205.532ZM208.02 619.581V617.093H210.509V612.103H217.987V614.604H215.498V617.093H212.997V619.581H208.02ZM222.976 639.5V622.069H227.953V624.557H230.441V622.069H237.919V624.557H240.407V639.5H235.431V627.059H230.441V629.547H227.953V639.5H222.976ZM255.364 632.035V627.059H247.885V632.035H255.364ZM242.909 644.476V639.5H255.364V637.012H245.397V634.524H242.909V624.557H245.397V622.069H252.862V624.557H255.364V622.069H260.34V641.988H257.852V644.476H242.909Z"
          fill="white"
        />
      </g>
      <rect x="26" y="571" width="5" height="5" fill="#D92D20" />
      <rect x="31" y="576" width="5" height="5" fill="#D92D20" />
      <rect x="36" y="581" width="5" height="5" fill="#D92D20" />
      <rect x="31" y="586" width="5" height="5" fill="#D92D20" />
      <rect x="26" y="591" width="5" height="5" fill="#D92D20" />
      <rect x="46" y="571" width="5" height="5" fill="#D92D20" />
      <rect x="51" y="576" width="5" height="5" fill="#D92D20" />
      <rect x="56" y="581" width="5" height="5" fill="#D92D20" />
      <rect x="51" y="586" width="5" height="5" fill="#D92D20" />
      <rect x="46" y="591" width="5" height="5" fill="#D92D20" />
      <rect
        x="14"
        y="205"
        width="415"
        height="9.99998"
        transform="rotate(90 14 205)"
        fill="#B25229"
      />
      <defs>
        <pattern
          id="pattern0_28_64661"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_28_64661"
            transform="scale(0.00195312 0.00285645)"
          />
        </pattern>
        <pattern
          id="pattern1_28_64661"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image1_28_64661"
            transform="matrix(0.00101072 0 0 0.00118317 -0.106435 -0.231635)"
          />
        </pattern>
        <clipPath id="clip0_28_64661">
          <rect
            width="200"
            height="60"
            fill="white"
            transform="translate(33 170.016)"
          />
        </clipPath>
        <clipPath id="clip1_28_64661">
          <rect
            width="200"
            height="60"
            fill="white"
            transform="translate(33 170.016)"
          />
        </clipPath>
        <clipPath id="clip2_28_64661">
          <rect
            width="370"
            height="311"
            fill="white"
            transform="translate(33 249)"
          />
        </clipPath>
        <clipPath id="clip3_28_64661">
          <rect
            width="287"
            height="86"
            fill="white"
            transform="translate(74 584)"
          />
        </clipPath>
        <clipPath id="clip4_28_64661">
          <rect
            width="287"
            height="86"
            fill="white"
            transform="translate(74 584)"
          />
        </clipPath>
        <image
          id="image0_28_64661"
          width="512"
          height="512"
          preserveAspectRatio="none"
          href="/src/assets/detail-text.png"
        />
        <image
          id="image1_28_64661"
          width="1200"
          height="1500"
          preserveAspectRatio="none"
          href="/src/assets/detail-text.png"
        />
      </defs>
    </svg>
  );
}
