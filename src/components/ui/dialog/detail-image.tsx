// import { useEffect, useRef, useState } from "react";

type DetailCollectionProps = {
  rowLabel?: string;
  sectionLabel?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  onClose?: () => void;
};

const defaultRowLabel = "DETAIL COLLECTION ROW";
// const DEFAULT_WIDTH = 700;
const DEFAULT_HEIGHT = 746;

export default function DetailImage({
  rowLabel = defaultRowLabel,
  sectionLabel,
  // width,
  height: svgHeight,
  // className,
  onClose
}: DetailCollectionProps) {
  // const containerRef = useRef<HTMLDivElement>(null);
  // const [containerWidth, setContainerWidth] = useState<number>(0);

  // useEffect(() => {
  //   if (!containerRef.current) return;

  //   const observer = new ResizeObserver((entries) => {
  //     for (const entry of entries) {
  //       setContainerWidth(entry.contentRect.width);
  //     }
  //   });

  //   observer.observe(containerRef.current);

  //   return () => {
  //     observer.disconnect();
  //   };
  // }, []);

  const rowLabelText = rowLabel?.trim() ?? "";
  const sectionLabelText = sectionLabel?.trim() ?? "";
  const normalizedRowLabel = rowLabelText.length > 0 ? rowLabelText : undefined;
  const normalizedSectionLabel =
    sectionLabelText.length > 0 ? sectionLabelText : undefined;

  // const calculatedWidth =
  //   width && typeof width === "number"
  //     ? width
  //     : containerWidth || (typeof width === "number" ? width : DEFAULT_WIDTH);

  const calculatedHeight =
    svgHeight && typeof svgHeight === "number"
      ? svgHeight
      : typeof svgHeight === "string"
        ? svgHeight
        : DEFAULT_HEIGHT;

  return (
    // <div ref={containerRef} className={className} style={{ width: width || "100%", height: svgHeight || "auto" }}>
    <svg
      width={"100%"}
      height={calculatedHeight}
      viewBox="0 0 1637 746"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path d="M1607 239V259H1627V439H1484V239H1607Z" fill="#FF9442" />
      <rect x="1484" y="229" width="113" height="10" fill="#111111" />
      <rect x="1484" y="239" width="113" height="10" fill="#FFB67E" />
      <rect
        x="1637"
        y="269"
        width="45"
        height="10"
        transform="rotate(90 1637 269)"
        fill="#111111"
      />
      <rect
        x="1627"
        y="269"
        width="45"
        height="10"
        transform="rotate(90 1627 269)"
        fill="#FA7036"
      />
      <rect x="1617" y="259" width="10" height="10" fill="#111111" />
      <rect x="1607" y="259" width="10" height="10" fill="#FA7036" />
      <rect x="1617" y="314" width="10" height="125" fill="#111111" />
      <rect x="1607" y="314" width="10" height="125" fill="#FA7036" />
      <rect x="1607" y="249" width="10" height="10" fill="#111111" />
      <rect x="1597" y="249" width="10" height="10" fill="#FA7036" />
      <rect x="1597" y="239" width="10" height="10" fill="#111111" />
      <path d="M1607 660V640H1627V460H1484V660H1607Z" fill="#FF9442" />
      <rect
        width="113"
        height="10"
        transform="matrix(1 0 0 -1 1484 670)"
        fill="#111111"
      />
      <rect
        width="113"
        height="10"
        transform="matrix(1 0 0 -1 1484 660)"
        fill="#FA7036"
      />
      <rect
        width="45"
        height="10"
        transform="matrix(-4.37114e-08 -1 -1 4.37114e-08 1637 630)"
        fill="#111111"
      />
      <rect
        width="45"
        height="10"
        transform="matrix(-4.37114e-08 -1 -1 4.37114e-08 1627 630)"
        fill="#FA7036"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(1 0 0 -1 1617 640)"
        fill="#111111"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(1 0 0 -1 1607 640)"
        fill="#FA7036"
      />
      <rect
        width="10"
        height="125"
        transform="matrix(1 0 0 -1 1617 585)"
        fill="#111111"
      />
      <rect
        width="10"
        height="125"
        transform="matrix(1 0 0 -1 1607 585)"
        fill="#FA7036"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(1 0 0 -1 1607 650)"
        fill="#111111"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(1 0 0 -1 1597 650)"
        fill="#FA7036"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(1 0 0 -1 1597 660)"
        fill="#111111"
      />
      <rect
        x="1449"
        y="131"
        width="144"
        height="99"
        fill="url(#pattern0_33_53414)"
      />
      <rect x="1184" y="239" width="364" height="295" fill="#FF9442" />
      <rect x="1184" y="229" width="364" height="10" fill="#111111" />
      <rect x="1184" y="239" width="364" height="10" fill="#FFB67E" />
      <rect
        width="10"
        height="10"
        transform="matrix(-4.37114e-08 1 1 4.37114e-08 1524 239.001)"
        fill="#D92D20"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(-4.37114e-08 1 1 4.37114e-08 1494 239.001)"
        fill="#D92D20"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(-4.37114e-08 1 1 4.37114e-08 1464 239.001)"
        fill="#D92D20"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(-4.37114e-08 1 1 4.37114e-08 1514 249.001)"
        fill="#D92D20"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(-4.37114e-08 1 1 4.37114e-08 1504 259.001)"
        fill="#D92D20"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(-4.37114e-08 1 1 4.37114e-08 1484 249.001)"
        fill="#D92D20"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(-4.37114e-08 1 1 4.37114e-08 1474 259.001)"
        fill="#D92D20"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(-4.37114e-08 1 1 4.37114e-08 1454 249.001)"
        fill="#D92D20"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(-4.37114e-08 1 1 4.37114e-08 1444 259.001)"
        fill="#D92D20"
      />
      <rect
        x="1617"
        y="387"
        width="191"
        height="190"
        transform="rotate(90 1617 387)"
        fill="#FF9442"
      />
      <rect
        x="1627"
        y="387"
        width="191"
        height="10"
        transform="rotate(90 1627 387)"
        fill="#111111"
      />
      <rect
        x="1617"
        y="387"
        width="191"
        height="10"
        transform="rotate(90 1617 387)"
        fill="#FA7036"
      />
      <rect
        x="1488"
        y="654"
        width="308"
        height="190"
        transform="rotate(-180 1488 654)"
        fill="#FF9442"
      />
      <rect
        x="1488"
        y="664"
        width="308"
        height="10"
        transform="rotate(-180 1488 664)"
        fill="#111111"
      />
      <rect
        x="1488"
        y="654"
        width="308"
        height="10"
        transform="rotate(-180 1488 654)"
        fill="#FA7036"
      />
      <g clip-path="url(#clip0_33_53414)">
        <path
          d="M1458 209.001H1468V249.003H1458V259H1183V258.999H1193V249H1183V209H1193V199H1458V209.001Z"
          fill="#F0C446"
        />
        <g clip-path="url(#clip1_33_53414)">
          <rect x="1192.99" y="199" width="265.008" height="5" fill="#111111" />
          <rect x="1193" y="254" width="265.002" height="5" fill="#111111" />
          <rect
            width="39.9999"
            height="5.00197"
            transform="matrix(-1.12179e-06 -1 1 -1.70324e-09 1463 249)"
            fill="#111111"
          />
          <rect
            width="40"
            height="5"
            transform="matrix(1.12461e-06 -1 -1 -1.69897e-09 1188 249)"
            fill="#111111"
          />
          <rect
            width="5"
            height="5"
            transform="matrix(-1 0 0 1 1193 204)"
            fill="#111111"
          />
          <rect
            width="5"
            height="5"
            transform="matrix(-1 0 0 1 1463 204)"
            fill="#111111"
          />
          <rect x="1198" y="209" width="254.998" height="5" fill="white" />
          <rect
            width="5"
            height="5"
            transform="matrix(-1 0 0 1 1198 214)"
            fill="white"
          />
          <rect
            width="5"
            height="5"
            transform="matrix(-1 0 0 1 1458 214)"
            fill="white"
          />
          <rect
            x="1193"
            y="254"
            width="5"
            height="5"
            transform="rotate(180 1193 254)"
            fill="#111111"
          />
          <rect
            x="1463"
            y="254"
            width="5"
            height="5"
            transform="rotate(180 1463 254)"
            fill="#111111"
          />
          <rect
            x="1193"
            y="249.001"
            width="265.002"
            height="5"
            fill="#D96D35"
          />
          <rect
            x="1193"
            y="249.001"
            width="5"
            height="5"
            transform="rotate(180 1193 249.001)"
            fill="#D96D35"
          />
          <rect
            x="1463"
            y="249.001"
            width="5"
            height="5"
            transform="rotate(180 1463 249.001)"
            fill="#D96D35"
          />
        </g>
        {normalizedRowLabel && (
          <foreignObject
            x="1260"
            y="218"
            width="130"
            height="22"
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
      </g>
      <path
        d="M1465 37V40H1468V196H1465V199H1189V196H1186V40H1189V37H1465Z"
        fill="#F0C446"
      />
      <rect x="1192" y="199" width="270" height="3" fill="#111111" />
      <rect
        x="1186"
        y="43"
        width="150"
        height="2.99999"
        transform="rotate(90 1186 43)"
        fill="#111111"
      />
      <rect
        x="1471"
        y="43"
        width="150"
        height="2.99999"
        transform="rotate(90 1471 43)"
        fill="#111111"
      />
      <rect x="1189" y="37" width="3" height="3" fill="#111111" />
      <rect x="1465" y="193" width="3" height="3" fill="#111111" />
      <rect
        width="3"
        height="3"
        transform="matrix(-1 0 0 1 1465 37)"
        fill="#111111"
      />
      <rect
        width="3"
        height="3"
        transform="matrix(-1 0 0 1 1189 193)"
        fill="#111111"
      />
      <rect x="1186" y="40" width="3" height="3" fill="#111111" />
      <rect x="1462" y="196" width="3" height="3" fill="#111111" />
      <rect
        width="3"
        height="3"
        transform="matrix(-1 0 0 1 1468 40)"
        fill="#111111"
      />
      <rect
        width="3"
        height="3"
        transform="matrix(-1 0 0 1 1192 196)"
        fill="#111111"
      />
      <rect x="1192" y="34" width="270" height="3" fill="#111111" />
      <rect
        x="1195"
        y="46"
        width="264"
        height="144"
        fill="url(#pattern1_33_53414)"
      />
      <rect x="1198" y="190" width="258" height="3" fill="#111111" />
      <rect x="1198" y="43" width="258" height="3" fill="#111111" />
      <rect
        x="1195"
        y="49"
        width="138"
        height="2.99999"
        transform="rotate(90 1195 49)"
        fill="#111111"
      />
      <rect
        width="138"
        height="2.99999"
        transform="matrix(4.37114e-08 1 1 -4.37114e-08 1459 49)"
        fill="#111111"
      />
      <rect x="1195" y="46" width="3" height="3" fill="#111111" />
      <rect
        width="3"
        height="3"
        transform="matrix(-1 0 0 1 1198 187)"
        fill="#111111"
      />
      <rect
        width="3"
        height="3"
        transform="matrix(-1 0 0 1 1459 46)"
        fill="#111111"
      />
      <rect x="1456" y="187" width="3" height="3" fill="#111111" />
      <rect x="1187" y="45" width="2" height="142" fill="white" />
      <rect x="1189" y="43" width="2" height="2" fill="white" />
      <rect x="1191" y="41" width="2" height="2" fill="white" />
      <rect x="1194" y="38" width="244" height="2" fill="white" />
      <rect x="1183" y="54" width="1" height="3" fill="#111111" />
      <rect
        width="1"
        height="3"
        transform="matrix(-1 0 0 1 1195 54)"
        fill="#111111"
      />
      <rect
        width="8"
        height="1"
        transform="matrix(-1 0 0 1 1193 58)"
        fill="#111111"
      />
      <rect x="1184" y="53" width="10" height="5" fill="#629BFE" />
      <rect x="1184" y="53" width="1" height="1" fill="#111111" />
      <rect
        width="1"
        height="1"
        transform="matrix(-1 0 0 1 1194 53)"
        fill="#111111"
      />
      <rect
        width="1"
        height="1"
        transform="matrix(-1 0 0 1 1185 57)"
        fill="#111111"
      />
      <rect x="1193" y="57" width="1" height="1" fill="#111111" />
      <rect x="1186" y="52" width="7" height="1" fill="#111111" />
      <rect x="1183" y="179" width="1" height="3" fill="#111111" />
      <rect
        width="1"
        height="3"
        transform="matrix(-1 0 0 1 1195 179)"
        fill="#111111"
      />
      <rect
        width="8"
        height="1"
        transform="matrix(-1 0 0 1 1193 183)"
        fill="#111111"
      />
      <rect x="1184" y="178" width="10" height="5" fill="#629BFE" />
      <rect x="1184" y="178" width="1" height="1" fill="#111111" />
      <rect
        width="1"
        height="1"
        transform="matrix(-1 0 0 1 1194 178)"
        fill="#111111"
      />
      <rect
        width="1"
        height="1"
        transform="matrix(-1 0 0 1 1185 182)"
        fill="#111111"
      />
      <rect x="1193" y="182" width="1" height="1" fill="#111111" />
      <rect x="1186" y="177" width="7" height="1" fill="#111111" />
      <rect x="1459" y="54" width="1" height="3" fill="#111111" />
      <rect
        width="1"
        height="3"
        transform="matrix(-1 0 0 1 1471 54)"
        fill="#111111"
      />
      <rect
        width="8"
        height="1"
        transform="matrix(-1 0 0 1 1469 58)"
        fill="#111111"
      />
      <rect x="1460" y="53" width="10" height="5" fill="#629BFE" />
      <rect x="1460" y="53" width="1" height="1" fill="#111111" />
      <rect
        width="1"
        height="1"
        transform="matrix(-1 0 0 1 1470 53)"
        fill="#111111"
      />
      <rect
        width="1"
        height="1"
        transform="matrix(-1 0 0 1 1461 57)"
        fill="#111111"
      />
      <rect x="1469" y="57" width="1" height="1" fill="#111111" />
      <rect x="1462" y="52" width="7" height="1" fill="#111111" />
      <rect x="1459" y="179" width="1" height="3" fill="#111111" />
      <rect
        width="1"
        height="3"
        transform="matrix(-1 0 0 1 1471 179)"
        fill="#111111"
      />
      <rect
        width="8"
        height="1"
        transform="matrix(-1 0 0 1 1469 183)"
        fill="#111111"
      />
      <rect x="1460" y="178" width="10" height="5" fill="#629BFE" />
      <rect x="1460" y="178" width="1" height="1" fill="#111111" />
      <rect
        width="1"
        height="1"
        transform="matrix(-1 0 0 1 1470 178)"
        fill="#111111"
      />
      <rect
        width="1"
        height="1"
        transform="matrix(-1 0 0 1 1461 182)"
        fill="#111111"
      />
      <rect x="1469" y="182" width="1" height="1" fill="#111111" />
      <rect x="1462" y="177" width="7" height="1" fill="#111111" />
      <g clip-path="url(#clip2_33_53414)">
        <path
          d="M1568 298H1578V579H1568V589H1228V579H1218V298H1228V288H1568V298Z"
          fill="white"
        />
        <rect x="1563" y="288" width="5" height="5" fill="#111111" />
        <rect
          x="1233"
          y="589"
          width="5"
          height="5"
          transform="rotate(180 1233 589)"
          fill="#111111"
        />
        <rect
          width="5"
          height="5"
          transform="matrix(-1 0 0 1 1233 288)"
          fill="#111111"
        />
        <rect
          width="5"
          height="5"
          transform="matrix(1 0 0 -1 1563 589)"
          fill="#111111"
        />
        <rect x="1568" y="293" width="5" height="5" fill="#111111" />
        <rect
          x="1228"
          y="584"
          width="5"
          height="5"
          transform="rotate(180 1228 584)"
          fill="#111111"
        />
        <rect
          width="5"
          height="5"
          transform="matrix(-1 0 0 1 1228 293)"
          fill="#111111"
        />
        <rect
          width="5"
          height="5"
          transform="matrix(1 0 0 -1 1568 584)"
          fill="#111111"
        />
        <rect x="1573" y="298" width="5" height="5" fill="#111111" />
        <rect
          x="1223"
          y="579"
          width="5"
          height="5"
          transform="rotate(180 1223 579)"
          fill="#111111"
        />
        <rect
          width="5"
          height="5"
          transform="matrix(-1 0 0 1 1223 298)"
          fill="#111111"
        />
        <rect
          width="5"
          height="5"
          transform="matrix(1 0 0 -1 1573 579)"
          fill="#111111"
        />
        <rect
          x="1218"
          y="574"
          width="5"
          height="271"
          transform="rotate(180 1218 574)"
          fill="#111111"
        />
        <rect
          x="1583"
          y="574"
          width="5"
          height="271"
          transform="rotate(180 1583 574)"
          fill="#111111"
        />
        <rect
          x="1233"
          y="288"
          width="5.00001"
          height="330"
          transform="rotate(-90 1233 288)"
          fill="#111111"
        />
        <rect
          x="1563"
          y="589"
          width="4.99999"
          height="330"
          transform="rotate(90 1563 589)"
          fill="#111111"
        />
      </g>
      {normalizedSectionLabel && (
        <foreignObject
          x="1235"
          y="364"
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
        x1="1284"
        y1="345.5"
        x2="1512"
        y2="345.5"
        stroke="black"
        stroke-width="3"
      />
      {normalizedSectionLabel && (
        <foreignObject
          x="1235"
          y="300"
          width="290"
          height="25"
          requiredExtensions="http://www.w3.org/1999/xhtml"
        >
          <div
            className="flex h-full w-full items-center justify-center text-center text-[10px] font-bold leading-tight text-[#111111] wrap-break-word"
            role="text"
            aria-label={normalizedSectionLabel}
            tabIndex={0}
          >
            {normalizedSectionLabel}
          </div>
        </foreignObject>
      )}
      <rect x="1579" y="611" width="12" height="12" fill="#667085" />
      <rect
        width="3"
        height="3"
        transform="matrix(1 0 0 -1 1576 617)"
        fill="#111111"
      />
      <rect x="1576" y="617" width="3" height="3" fill="#111111" />
      <rect
        x="1594"
        y="617"
        width="3"
        height="3"
        transform="rotate(180 1594 617)"
        fill="#111111"
      />
      <rect
        width="3"
        height="3"
        transform="matrix(-1 0 0 1 1594 617)"
        fill="#111111"
      />
      <rect
        width="6"
        height="3"
        transform="matrix(1 0 0 -1 1582 611)"
        fill="#111111"
      />
      <rect x="1582" y="623" width="6" height="3" fill="#111111" />
      <rect
        width="3"
        height="3"
        transform="matrix(1 0 0 -1 1579 614)"
        fill="#111111"
      />
      <rect
        width="3"
        height="3"
        transform="matrix(1 0 0 -1 1582 617)"
        fill="#111111"
      />
      <rect
        width="3"
        height="3"
        transform="matrix(1 0 0 -1 1585 620)"
        fill="#111111"
      />
      <rect x="1579" y="620" width="3" height="3" fill="#111111" />
      <rect
        x="1591"
        y="614"
        width="3"
        height="3"
        transform="rotate(180 1591 614)"
        fill="#111111"
      />
      <rect
        width="3"
        height="3"
        transform="matrix(-1 0 0 1 1591 620)"
        fill="#111111"
      />
      <g clip-path="url(#clip3_33_53414)" onClick={onClose}>
        <path
          d="M1531 628.001H1541V694.003H1531V704H1254V703.999H1264V694H1254V628H1264V618H1531V628.001Z"
          fill="#629BFE"
        />
        <g clip-path="url(#clip4_33_53414)">
          <rect x="1263.99" y="618" width="267.008" height="5" fill="#111111" />
          <rect x="1264" y="699" width="267.002" height="5" fill="#111111" />
          <rect
            x="1536"
            y="694"
            width="65.9999"
            height="5.00199"
            transform="rotate(-90 1536 694)"
            fill="#111111"
          />
          <rect
            width="66"
            height="5"
            transform="matrix(6.81584e-07 -1 -1 -2.8033e-09 1259 694)"
            fill="#111111"
          />
          <rect
            width="5"
            height="5"
            transform="matrix(-1 0 0 1 1264 623)"
            fill="#111111"
          />
          <rect
            width="5"
            height="5"
            transform="matrix(-1 0 0 1 1536 623)"
            fill="#111111"
          />
          <rect x="1269" y="628" width="256.998" height="5" fill="#5FCDE3" />
          <rect
            width="5"
            height="5"
            transform="matrix(-1 0 0 1 1269 633)"
            fill="#5FCDE3"
          />
          <rect
            width="5"
            height="5"
            transform="matrix(-1 0 0 1 1531 633)"
            fill="#5FCDE3"
          />
          <rect
            x="1264"
            y="699"
            width="5"
            height="5"
            transform="rotate(180 1264 699)"
            fill="#111111"
          />
          <rect
            x="1536"
            y="699"
            width="5"
            height="5"
            transform="rotate(180 1536 699)"
            fill="#111111"
          />
          <rect
            x="1264"
            y="694.001"
            width="267.002"
            height="5"
            fill="#5B6DDF"
          />
          <rect
            x="1264"
            y="694.001"
            width="5"
            height="5"
            transform="rotate(180 1264 694.001)"
            fill="#5B6DDF"
          />
          <rect
            x="1536"
            y="694.001"
            width="5"
            height="5"
            transform="rotate(180 1536 694.001)"
            fill="#5B6DDF"
          />
        </g>
        <path
          d="M1373.08 668.524V666.035H1375.57V658.557H1373.08V656.069H1365.6V658.557H1370.59V663.547H1365.6V668.524H1373.08ZM1360.62 673.5V663.547H1358.13V658.557H1360.62V651.093H1375.57V653.581H1378.05V656.069H1380.54V668.524H1378.05V671.012H1375.57V673.5H1360.62ZM1395.5 668.524V661.059H1388.02V668.524H1395.5ZM1385.53 673.5V671.012H1383.04V658.557H1385.53V656.069H1397.99V658.557H1400.47V671.012H1397.99V673.5H1385.53ZM1388.02 653.581V651.093H1390.51V646.103H1397.99V648.604H1395.5V651.093H1393V653.581H1388.02ZM1402.98 673.5V656.069H1407.95V658.557H1410.44V656.069H1417.92V658.557H1420.41V673.5H1415.43V661.059H1410.44V663.547H1407.95V673.5H1402.98ZM1435.36 666.035V661.059H1427.89V666.035H1435.36ZM1422.91 678.476V673.5H1435.36V671.012H1425.4V668.524H1422.91V658.557H1425.4V656.069H1432.86V658.557H1435.36V656.069H1440.34V675.988H1437.85V678.476H1422.91Z"
          fill="white"
        />
      </g>
      <rect x="1206" y="605" width="5" height="5" fill="#D92D20" />
      <rect x="1211" y="610" width="5" height="5" fill="#D92D20" />
      <rect x="1216" y="615" width="5" height="5" fill="#D92D20" />
      <rect x="1211" y="620" width="5" height="5" fill="#D92D20" />
      <rect x="1206" y="625" width="5" height="5" fill="#D92D20" />
      <rect x="1226" y="605" width="5" height="5" fill="#D92D20" />
      <rect x="1231" y="610" width="5" height="5" fill="#D92D20" />
      <rect x="1236" y="615" width="5" height="5" fill="#D92D20" />
      <rect x="1231" y="620" width="5" height="5" fill="#D92D20" />
      <rect x="1226" y="625" width="5" height="5" fill="#D92D20" />
      <rect
        x="1194"
        y="239"
        width="415"
        height="9.99998"
        transform="rotate(90 1194 239)"
        fill="#B25229"
      />
      <g clip-path="url(#clip5_33_53414)">
        <path
          d="M1164 46H1174V696H1164V706H50V696H40V46H50V36H1164V46Z"
          fill="#FF9442"
        />
        <rect x="60" y="26" width="1094" height="10" fill="#111111" />
        <rect x="60" y="36" width="1094" height="10" fill="#FFB67E" />
        <rect x="60" y="706" width="1094" height="10" fill="#111111" />
        <g style={{ mixBlendMode: "color-burn" }} opacity="0.3">
          <rect x="60" y="696" width="1094" height="10" fill="#111111" />
        </g>
        <rect
          x="1174"
          y="686"
          width="630"
          height="9.99997"
          transform="rotate(-90 1174 686)"
          fill="#111111"
        />
        <rect
          width="630"
          height="10"
          transform="matrix(4.60704e-08 -1 -1 -4.14732e-08 40 686)"
          fill="#111111"
        />
        <rect x="1154" y="36" width="10" height="10" fill="#111111" />
        <rect x="1154" y="46" width="10" height="10" fill="#FFB67E" />
        <rect x="1164" y="46" width="10" height="10" fill="#111111" />
        <rect
          width="10"
          height="10"
          transform="matrix(-1 0 0 1 60 36)"
          fill="#111111"
        />
        <g style={{ mixBlendMode: "soft-light" }}>
          <rect
            width="10"
            height="10"
            transform="matrix(-1 0 0 1 60 46)"
            fill="white"
          />
        </g>
        <rect
          width="10"
          height="10"
          transform="matrix(-1 0 0 1 50 46)"
          fill="#111111"
        />
        <g style={{ mixBlendMode: "soft-light" }}>
          <rect
            width="10"
            height="10"
            transform="matrix(-1 0 0 1 50 56)"
            fill="white"
          />
        </g>
        <rect
          width="10"
          height="10"
          transform="matrix(1 0 0 -1 1154 706)"
          fill="#111111"
        />
        <g style={{ mixBlendMode: "color-burn" }} opacity="0.3">
          <rect
            width="10"
            height="10"
            transform="matrix(1 0 0 -1 1154 696)"
            fill="black"
          />
        </g>
        <rect
          width="10"
          height="10"
          transform="matrix(1 0 0 -1 1164 696)"
          fill="#111111"
        />
        <g style={{ mixBlendMode: "color-burn" }} opacity="0.3">
          <rect
            width="10"
            height="10"
            transform="matrix(1 0 0 -1 1164 686)"
            fill="#111111"
          />
        </g>
        <rect
          x="60"
          y="706"
          width="10"
          height="10"
          transform="rotate(180 60 706)"
          fill="#111111"
        />
        <g style={{ mixBlendMode: "color-burn" }} opacity={0.3}>
          <rect
            x="60"
            y="696"
            width="10"
            height="10"
            transform="rotate(180 60 696)"
            fill="black"
          />
        </g>
        <rect
          x="50"
          y="696"
          width="10"
          height="10"
          transform="rotate(180 50 696)"
          fill="#111111"
        />
      </g>
      <path d="M153 226H30V179H10V46H30V26H153V226Z" fill="#FF9442" />
      <rect x="40" y="16" width="113" height="10" fill="#111111" />
      <rect
        x="10"
        y="56"
        width="113"
        height="10"
        transform="rotate(90 10 56)"
        fill="#111111"
      />
      <rect
        x="20"
        y="56"
        width="113"
        height="10"
        transform="rotate(90 20 56)"
        fill="#FFB67E"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(1 0 0 -1 30 36)"
        fill="#111111"
      />
      <rect
        width="113"
        height="10"
        transform="matrix(1 0 0 -1 40 36)"
        fill="#FFB67E"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(1 0 0 -1 20 86)"
        fill="#D92D20"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(1 0 0 -1 20 116)"
        fill="#D92D20"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(1 0 0 -1 20 146)"
        fill="#D92D20"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(1 0 0 -1 30 96)"
        fill="#D92D20"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(1 0 0 -1 40 106)"
        fill="#D92D20"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(1 0 0 -1 30 126)"
        fill="#D92D20"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(1 0 0 -1 40 136)"
        fill="#D92D20"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(1 0 0 -1 30 156)"
        fill="#D92D20"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(1 0 0 -1 40 166)"
        fill="#D92D20"
      />
      <rect
        x="20"
        y="179"
        width="10"
        height="10"
        transform="rotate(180 20 179)"
        fill="#111111"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(1 0 0 -1 20 46)"
        fill="#111111"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(1 0 0 -1 30 46)"
        fill="#FFB67E"
      />
      <rect
        x="30"
        y="189"
        width="10"
        height="10"
        transform="rotate(180 30 189)"
        fill="#111111"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(1 0 0 -1 10 56)"
        fill="#111111"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(1 0 0 -1 20 56)"
        fill="#FFB67E"
      />
      <rect
        x="40"
        y="226"
        width="10"
        height="37"
        transform="rotate(180 40 226)"
        fill="#111111"
      />
      <rect
        x="55"
        y="41"
        width="3"
        height="85"
        transform="rotate(-90 55 41)"
        fill="#111111"
      />
      <path d="M55 44L55 41L140 41L140 44L55 44Z" fill="#667085" />
      <rect
        x="52"
        y="44"
        width="3"
        height="3"
        transform="rotate(-90 52 44)"
        fill="#111111"
      />
      <rect
        x="140"
        y="44"
        width="3"
        height="3"
        transform="rotate(-90 140 44)"
        fill="#111111"
      />
      <rect
        x="55"
        y="47"
        width="3"
        height="85"
        transform="rotate(-90 55 47)"
        fill="#111111"
      />
      <path d="M153 516H30V563H10V696H30V716H153V516Z" fill="#FF9442" />
      <rect
        width="113"
        height="10"
        transform="matrix(1 0 0 -1 40 726)"
        fill="#111111"
      />
      <rect
        width="113"
        height="10"
        transform="matrix(-4.37114e-08 -1 -1 4.37114e-08 10 686)"
        fill="#111111"
      />
      <rect x="30" y="706" width="10" height="10" fill="#111111" />
      <rect x="40" y="706" width="113" height="10" fill="#FA7036" />
      <rect x="20" y="656" width="10" height="10" fill="#D92D20" />
      <rect x="20" y="626" width="10" height="10" fill="#D92D20" />
      <rect x="20" y="596" width="10" height="10" fill="#D92D20" />
      <rect x="30" y="646" width="10" height="10" fill="#D92D20" />
      <rect x="40" y="636" width="10" height="10" fill="#D92D20" />
      <rect x="30" y="616" width="10" height="10" fill="#D92D20" />
      <rect x="40" y="606" width="10" height="10" fill="#D92D20" />
      <rect x="30" y="586" width="10" height="10" fill="#D92D20" />
      <rect x="40" y="576" width="10" height="10" fill="#D92D20" />
      <rect
        width="10"
        height="10"
        transform="matrix(-1 0 0 1 20 563)"
        fill="#111111"
      />
      <rect x="20" y="696" width="10" height="10" fill="#111111" />
      <rect x="30" y="696" width="10" height="10" fill="#FA7036" />
      <rect
        width="10"
        height="10"
        transform="matrix(-1 0 0 1 30 553)"
        fill="#111111"
      />
      <rect x="10" y="686" width="10" height="10" fill="#111111" />
      <rect x="20" y="686" width="10" height="10" fill="#FA7036" />
      <rect
        width="10"
        height="37"
        transform="matrix(-1 0 0 1 40 516)"
        fill="#111111"
      />
      <rect
        width="3"
        height="85"
        transform="matrix(1.19249e-08 1 1 -1.19249e-08 55 701)"
        fill="#111111"
      />
      <path d="M55 698L55 701L140 701L140 698L55 698Z" fill="#667085" />
      <rect
        width="3"
        height="3"
        transform="matrix(1.19249e-08 1 1 -1.19249e-08 52 698)"
        fill="#111111"
      />
      <rect
        width="3"
        height="3"
        transform="matrix(1.19249e-08 1 1 -1.19249e-08 140 698)"
        fill="#111111"
      />
      <rect
        width="3"
        height="85"
        transform="matrix(7.02424e-09 1 1 -2.02446e-08 55 695)"
        fill="#111111"
      />
      <g clip-path="url(#clip6_33_53414)">
        <path
          d="M1109 76H1129V86H1139V106H1144V636H1139V656H1129V666H1109V671H105V666H85V656H75V636H70V106H75V86H85V76H105V71H1109V76Z"
          fill="#FFFDFA"
        />
        <path
          d="M1109 76H1129V86H1139V106H1144V636H1139V656H1129V666H1109V671H105V666H85V656H75V636H70V106H75V86H85V76H105V71H1109V76Z"
          fill="url(#pattern2_33_53414)"
        />
        <rect
          width="5"
          height="5"
          transform="matrix(1 0 0 -1 1129 661)"
          fill="#EF5C1E"
        />
        <rect
          width="10"
          height="5"
          transform="matrix(1 0 0 -1 1109 671)"
          fill="#EF5C1E"
        />
        <rect
          width="10"
          height="5"
          transform="matrix(1 0 0 -1 1119 666)"
          fill="#EF5C1E"
        />
        <rect
          width="5"
          height="10"
          transform="matrix(1 0 0 -1 1134 656)"
          fill="#EF5C1E"
        />
        <rect
          width="5"
          height="10"
          transform="matrix(1 0 0 -1 1139 646)"
          fill="#EF5C1E"
        />
        <rect x="105" y="66" width="1004" height="5" fill="#EF5C1E" />
        <rect x="105" y="671" width="1004" height="5" fill="#EF5C1E" />
        <rect
          x="1144"
          y="636"
          width="530"
          height="4.99997"
          transform="rotate(-90 1144 636)"
          fill="#EF5C1E"
        />
        <rect
          width="530"
          height="5.00003"
          transform="matrix(5.34528e-08 -1 -1 -3.57453e-08 70 636)"
          fill="#EF5C1E"
        />
        <rect x="1129" y="81" width="5" height="5" fill="#EF5C1E" />
        <rect x="1119" y="76" width="10" height="5" fill="#EF5C1E" />
        <rect x="1109" y="71" width="10" height="5" fill="#EF5C1E" />
        <rect x="1134" y="86" width="5" height="10" fill="#EF5C1E" />
        <rect x="1139" y="96" width="5" height="10" fill="#EF5C1E" />
        <rect
          width="10"
          height="5"
          transform="matrix(-1 0 0 1 95 76)"
          fill="#EF5C1E"
        />
        <rect
          width="10"
          height="5"
          transform="matrix(-1 0 0 1 105 71)"
          fill="#EF5C1E"
        />
        <rect
          width="5"
          height="10"
          transform="matrix(-1 0 0 1 80 86)"
          fill="#EF5C1E"
        />
        <rect
          width="5"
          height="10"
          transform="matrix(-1 0 0 1 75 96)"
          fill="#EF5C1E"
        />
        <rect
          width="5"
          height="5"
          transform="matrix(-1 0 0 1 85 81)"
          fill="#EF5C1E"
        />
        <rect
          x="95"
          y="666"
          width="10"
          height="5"
          transform="rotate(180 95 666)"
          fill="#EF5C1E"
        />
        <rect
          x="105"
          y="671"
          width="10"
          height="5"
          transform="rotate(180 105 671)"
          fill="#EF5C1E"
        />
        <rect
          x="85"
          y="661"
          width="5"
          height="5"
          transform="rotate(180 85 661)"
          fill="#EF5C1E"
        />
        <rect
          x="80"
          y="656"
          width="5"
          height="10"
          transform="rotate(180 80 656)"
          fill="#EF5C1E"
        />
        <rect
          x="75"
          y="646"
          width="5"
          height="10"
          transform="rotate(180 75 646)"
          fill="#EF5C1E"
        />
        <g style={{ mixBlendMode: "color-burn" }} opacity={0.3}>
          <rect
            width="10"
            height="5"
            transform="matrix(1 0 0 -1 1109 666)"
            fill="#EF5C1E"
          />
        </g>
        <g style={{ mixBlendMode: "color-burn" }} opacity={0.3}>
          <rect x="105" y="666" width="1004" height="5" fill="#EF5C1E" />
        </g>
        <g style={{ mixBlendMode: "color-burn" }} opacity={0.3}>
          <rect
            width="10"
            height="5"
            transform="matrix(1 0 0 -1 1119 661)"
            fill="#EF5C1E"
          />
        </g>
        <g style={{ mixBlendMode: "color-burn" }} opacity={0.3}>
          <rect
            width="5"
            height="10"
            transform="matrix(1 0 0 -1 1129 656)"
            fill="#EF5C1E"
          />
        </g>
        <g style={{ mixBlendMode: "color-burn" }} opacity={0.3}>
          <rect
            width="5"
            height="10"
            transform="matrix(1 0 0 -1 1134 646)"
            fill="#EF5C1E"
          />
        </g>
        <g style={{ mixBlendMode: "color-burn" }} opacity={0.3}>
          <rect
            width="5"
            height="5"
            transform="matrix(1 0 0 -1 1139 636)"
            fill="#EF5C1E"
          />
        </g>
        <g style={{ mixBlendMode: "color-burn" }} opacity={0.3}>
          <rect
            width="5"
            height="5"
            transform="matrix(1 0 0 -1 1124 656)"
            fill="#EF5C1E"
          />
        </g>
        <g style={{ mixBlendMode: "color-burn" }} opacity={0.3}>
          <rect
            x="105"
            y="666"
            width="10"
            height="5"
            transform="rotate(180 105 666)"
            fill="#EF5C1E"
          />
        </g>
        <g style={{ mixBlendMode: "color-burn" }} opacity={0.3}>
          <rect
            x="95"
            y="661"
            width="10"
            height="5"
            transform="rotate(180 95 661)"
            fill="#EF5C1E"
          />
        </g>
        <g style={{ mixBlendMode: "soft-light" }}>
          <rect
            width="10"
            height="5"
            transform="matrix(-1 0 0 1 105 76)"
            fill="#FFB67E"
          />
        </g>
        <g style={{ mixBlendMode: "soft-light" }}>
          <rect
            width="10"
            height="5"
            transform="matrix(-1 0 0 1 95 81)"
            fill="#FFB67E"
          />
        </g>
        <g style={{ mixBlendMode: "soft-light" }}>
          <rect
            width="5"
            height="5"
            transform="matrix(-1 0 0 1 85 86)"
            fill="#FFB67E"
          />
        </g>
        <g style={{ mixBlendMode: "soft-light" }}>
          <rect x="1109" y="76" width="10" height="5" fill="#FFB67E" />
        </g>
        <g style={{ mixBlendMode: "soft-light" }}>
          <rect x="1119" y="81" width="10" height="5" fill="#FFB67E" />
        </g>
        <g style={{ mixBlendMode: "soft-light" }}>
          <rect x="1129" y="86" width="5" height="5" fill="#FFB67E" />
        </g>
        <g style={{ mixBlendMode: "soft-light" }}>
          <rect x="105" y="71" width="1004" height="5" fill="#FFB67E" />
        </g>
      </g>
      <rect x="1143" y="667" width="12" height="12" fill="#667085" />
      <rect
        width="3"
        height="3"
        transform="matrix(1 0 0 -1 1140 673)"
        fill="#111111"
      />
      <rect x="1140" y="673" width="3" height="3" fill="#111111" />
      <rect
        x="1158"
        y="673"
        width="3"
        height="3"
        transform="rotate(180 1158 673)"
        fill="#111111"
      />
      <rect
        width="3"
        height="3"
        transform="matrix(-1 0 0 1 1158 673)"
        fill="#111111"
      />
      <rect
        width="6"
        height="3"
        transform="matrix(1 0 0 -1 1146 667)"
        fill="#111111"
      />
      <rect x="1146" y="679" width="6" height="3" fill="#111111" />
      <rect
        width="3"
        height="3"
        transform="matrix(1 0 0 -1 1143 670)"
        fill="#111111"
      />
      <rect
        width="3"
        height="3"
        transform="matrix(1 0 0 -1 1146 673)"
        fill="#111111"
      />
      <rect
        width="3"
        height="3"
        transform="matrix(1 0 0 -1 1149 676)"
        fill="#111111"
      />
      <rect x="1143" y="676" width="3" height="3" fill="#111111" />
      <rect
        x="1155"
        y="670"
        width="3"
        height="3"
        transform="rotate(180 1155 670)"
        fill="#111111"
      />
      <rect
        width="3"
        height="3"
        transform="matrix(-1 0 0 1 1155 676)"
        fill="#111111"
      />
      <rect x="1143" y="59" width="12" height="12" fill="#667085" />
      <rect
        width="3"
        height="3"
        transform="matrix(1 0 0 -1 1140 65)"
        fill="#111111"
      />
      <rect x="1140" y="65" width="3" height="3" fill="#111111" />
      <rect
        x="1158"
        y="65"
        width="3"
        height="3"
        transform="rotate(180 1158 65)"
        fill="#111111"
      />
      <rect
        width="3"
        height="3"
        transform="matrix(-1 0 0 1 1158 65)"
        fill="#111111"
      />
      <rect
        width="6"
        height="3"
        transform="matrix(1 0 0 -1 1146 59)"
        fill="#111111"
      />
      <rect x="1146" y="71" width="6" height="3" fill="#111111" />
      <rect
        width="3"
        height="3"
        transform="matrix(1 0 0 -1 1143 62)"
        fill="#111111"
      />
      <rect
        width="3"
        height="3"
        transform="matrix(1 0 0 -1 1146 65)"
        fill="#111111"
      />
      <rect
        width="3"
        height="3"
        transform="matrix(1 0 0 -1 1149 68)"
        fill="#111111"
      />
      <rect x="1143" y="68" width="3" height="3" fill="#111111" />
      <rect
        x="1155"
        y="62"
        width="3"
        height="3"
        transform="rotate(180 1155 62)"
        fill="#111111"
      />
      <rect
        width="3"
        height="3"
        transform="matrix(-1 0 0 1 1155 68)"
        fill="#111111"
      />
      <rect x="1154" y="205" width="5" height="332" fill="#CE4D2A" />
      <rect x="597" y="696" width="10" height="10" fill="#F0C446" />
      <rect x="617" y="696" width="10" height="10" fill="#F0C446" />
      <rect x="607" y="686" width="10" height="10" fill="#F0C446" />
      <rect x="557" y="696" width="10" height="10" fill="#F0C446" />
      <rect x="567" y="686" width="10" height="10" fill="#F0C446" />
      <rect x="577" y="696" width="10" height="10" fill="#F0C446" />
      <rect x="637" y="696" width="10" height="10" fill="#F0C446" />
      <rect x="647" y="686" width="10" height="10" fill="#F0C446" />
      <rect x="657" y="696" width="10" height="10" fill="#F0C446" />
      <rect
        width="10"
        height="10"
        transform="matrix(1 0 0 -1 597 46)"
        fill="#F0C446"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(1 0 0 -1 617 46)"
        fill="#F0C446"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(1 0 0 -1 607 56)"
        fill="#F0C446"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(1 0 0 -1 557 46)"
        fill="#F0C446"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(1 0 0 -1 567 56)"
        fill="#F0C446"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(1 0 0 -1 577 46)"
        fill="#F0C446"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(1 0 0 -1 637 46)"
        fill="#F0C446"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(1 0 0 -1 647 56)"
        fill="#F0C446"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(1 0 0 -1 657 46)"
        fill="#F0C446"
      />
      <g clip-path="url(#clip7_33_53414)">
        <rect
          x="29"
          y="345.124"
          width="3"
          height="23"
          transform="rotate(-90 29 345.124)"
          fill="#111111"
        />
        <rect
          x="29"
          y="352.124"
          width="7"
          height="23"
          transform="rotate(-90 29 352.124)"
          fill="#D92D20"
        />
        <rect
          x="26"
          y="352.124"
          width="7"
          height="3"
          transform="rotate(-90 26 352.124)"
          fill="#111111"
        />
        <rect
          x="52"
          y="352.124"
          width="7"
          height="3"
          transform="rotate(-90 52 352.124)"
          fill="#111111"
        />
        <rect
          x="29"
          y="355.124"
          width="3"
          height="23"
          transform="rotate(-90 29 355.124)"
          fill="#111111"
        />
      </g>
      <g clip-path="url(#clip8_33_53414)">
        <rect
          x="29"
          y="363.684"
          width="3"
          height="23"
          transform="rotate(-90 29 363.684)"
          fill="#111111"
        />
        <rect
          x="29"
          y="370.684"
          width="7"
          height="23"
          transform="rotate(-90 29 370.684)"
          fill="#5FCDE3"
        />
        <rect
          x="26"
          y="370.684"
          width="7"
          height="3"
          transform="rotate(-90 26 370.684)"
          fill="#111111"
        />
        <rect
          x="52"
          y="370.684"
          width="7"
          height="3"
          transform="rotate(-90 52 370.684)"
          fill="#111111"
        />
        <rect
          x="29"
          y="373.684"
          width="3"
          height="23"
          transform="rotate(-90 29 373.684)"
          fill="#111111"
        />
      </g>
      <g clip-path="url(#clip9_33_53414)">
        <rect
          x="29"
          y="382.244"
          width="3"
          height="23"
          transform="rotate(-90 29 382.244)"
          fill="#111111"
        />
        <rect
          x="29"
          y="389.244"
          width="7"
          height="23"
          transform="rotate(-90 29 389.244)"
          fill="#FEC84B"
        />
        <rect
          x="26"
          y="389.244"
          width="7"
          height="3"
          transform="rotate(-90 26 389.244)"
          fill="#111111"
        />
        <rect
          x="52"
          y="389.244"
          width="7"
          height="3"
          transform="rotate(-90 52 389.244)"
          fill="#111111"
        />
        <rect
          x="29"
          y="392.244"
          width="3"
          height="23"
          transform="rotate(-90 29 392.244)"
          fill="#111111"
        />
      </g>
      <rect
        x="968.064"
        y="652.241"
        width="30"
        height="5"
        transform="rotate(15.7519 968.064 652.241)"
        fill="#FFD932"
      />
      <rect
        x="952.271"
        y="652.981"
        width="60"
        height="60"
        transform="rotate(15.7519 952.271 652.981)"
        fill="#FFD932"
      />
      <rect
        x="943.387"
        y="666.061"
        width="70"
        height="30"
        transform="rotate(15.7519 943.387 666.061)"
        fill="#FFD932"
      />
      <rect
        width="5"
        height="5"
        transform="matrix(-0.962446 -0.271472 -0.271472 0.962446 936.6 690.122)"
        fill="#FFBB31"
      />
      <rect
        width="5"
        height="5"
        transform="matrix(-0.962446 -0.271472 -0.271472 0.962446 1003.97 709.125)"
        fill="#FFBB31"
      />
      <rect
        width="5"
        height="10"
        transform="matrix(-0.962446 -0.271472 -0.271472 0.962446 940.055 696.292)"
        fill="#FFBB31"
      />
      <rect
        width="5"
        height="15"
        transform="matrix(-0.962446 -0.271472 -0.271472 0.962446 1011.5 700.858)"
        fill="#FFBB31"
      />
      <rect
        width="5"
        height="15"
        transform="matrix(-0.962446 -0.271472 -0.271472 0.962446 1015.57 686.421)"
        fill="#FFE56F"
      />
      <rect
        width="5"
        height="15"
        transform="matrix(-0.962446 -0.271472 -0.271472 0.962446 940.672 675.685)"
        fill="#FFE56F"
      />
      <rect
        width="5"
        height="10"
        transform="matrix(-0.962446 -0.271472 -0.271472 0.962446 1013.47 675.439)"
        fill="#FFE56F"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(-0.962446 -0.271472 -0.271472 0.962446 948.321 703.818)"
        fill="#FFBB31"
      />
      <rect
        width="15"
        height="10"
        transform="matrix(-0.962446 -0.271472 -0.271472 0.962446 1002.61 713.937)"
        fill="#FFBB31"
      />
      <rect
        width="20"
        height="10"
        transform="matrix(-0.962446 -0.271472 -0.271472 0.962446 996.444 717.392)"
        fill="#FFBB31"
      />
      <rect
        width="50"
        height="15"
        transform="matrix(-0.962446 -0.271472 -0.271472 0.962446 990.274 720.847)"
        fill="#FFBB31"
      />
      <rect
        x="959.798"
        y="644.714"
        width="10"
        height="5"
        transform="rotate(15.7519 959.798 644.714)"
        fill="#111111"
      />
      <rect
        x="958.44"
        y="649.527"
        width="15"
        height="10"
        transform="rotate(15.7519 958.44 649.527)"
        fill="#FFE56F"
      />
      <rect
        x="952.271"
        y="652.981"
        width="15"
        height="10"
        transform="rotate(15.7519 952.271 652.981)"
        fill="#FFE56F"
      />
      <rect
        x="969.422"
        y="647.429"
        width="10"
        height="10"
        transform="rotate(15.7519 969.422 647.429)"
        fill="#FFE56F"
      />
      <rect
        x="946.102"
        y="656.436"
        width="10"
        height="10"
        transform="rotate(15.7519 946.102 656.436)"
        fill="#FFE56F"
      />
      <rect
        x="938.574"
        y="664.703"
        width="10"
        height="10"
        transform="rotate(15.7519 938.574 664.703)"
        fill="#FFE56F"
      />
      <rect
        width="10"
        height="5"
        transform="matrix(0.962446 0.271472 0.271472 -0.962446 938.08 721.71)"
        fill="#111111"
      />
      <rect
        width="10"
        height="5"
        transform="matrix(-0.962446 -0.271472 -0.271472 0.962446 1007.92 658.288)"
        fill="#111111"
      />
      <rect
        width="10"
        height="5"
        transform="matrix(-0.962446 -0.271472 -0.271472 0.962446 1006.56 663.1)"
        fill="#FFE56F"
      />
      <rect
        x="986.202"
        y="735.284"
        width="10"
        height="5"
        transform="rotate(-164.248 986.202 735.284)"
        fill="#111111"
      />
      <rect
        width="5"
        height="5"
        transform="matrix(-0.962446 -0.271472 -0.271472 0.962446 958.44 649.527)"
        fill="#111111"
      />
      <rect
        width="40"
        height="5"
        transform="matrix(-0.962446 -0.271472 -0.271472 0.962446 989.534 705.053)"
        fill="#111111"
      />
      <rect
        width="20"
        height="5"
        transform="matrix(-0.962446 -0.271472 -0.271472 0.962446 978.553 707.15)"
        fill="#E53B68"
      />
      <rect
        width="20"
        height="5"
        transform="matrix(-0.962446 -0.271472 -0.271472 0.962446 977.195 711.963)"
        fill="#F55277"
      />
      <rect
        width="10"
        height="5"
        transform="matrix(-0.962446 -0.271472 -0.271472 0.962446 971.025 715.417)"
        fill="#F55277"
      />
      <rect
        width="5"
        height="5"
        transform="matrix(-0.962446 -0.271472 -0.271472 0.962446 952.394 689.382)"
        fill="#111111"
      />
      <rect
        width="5"
        height="5"
        transform="matrix(-0.962446 -0.271472 -0.271472 0.962446 995.704 701.598)"
        fill="#111111"
      />
      <rect
        x="954.368"
        y="663.963"
        width="10"
        height="5"
        transform="rotate(15.7519 954.368 663.963)"
        fill="#111111"
      />
      <rect
        x="951.653"
        y="673.588"
        width="10"
        height="5"
        transform="rotate(15.7519 951.653 673.588)"
        fill="#111111"
      />
      <rect
        width="5"
        height="5"
        transform="matrix(-0.962446 -0.271472 -0.271472 0.962446 967.447 672.848)"
        fill="#111111"
      />
      <rect
        width="10"
        height="5"
        transform="matrix(-0.962446 -0.271472 -0.271472 0.962446 1002.49 677.537)"
        fill="#111111"
      />
      <rect
        width="10"
        height="5"
        transform="matrix(-0.962446 -0.271472 -0.271472 0.962446 999.775 687.161)"
        fill="#111111"
      />
      <rect
        x="986.696"
        y="678.277"
        width="5"
        height="5"
        transform="rotate(15.7519 986.696 678.277)"
        fill="#111111"
      />
      <rect
        x="939.438"
        y="716.898"
        width="5"
        height="5"
        transform="rotate(-164.248 939.438 716.898)"
        fill="#111111"
      />
      <rect
        x="1006.56"
        y="663.1"
        width="5"
        height="5"
        transform="rotate(15.7519 1006.56 663.1)"
        fill="#111111"
      />
      <rect
        width="5"
        height="5"
        transform="matrix(0.962446 0.271472 0.271472 -0.962446 987.56 730.471)"
        fill="#111111"
      />
      <rect
        width="5"
        height="5"
        transform="matrix(-0.962446 -0.271472 -0.271472 0.962446 952.271 652.981)"
        fill="#111111"
      />
      <rect
        width="5"
        height="5"
        transform="matrix(-0.962446 -0.271472 -0.271472 0.962446 961.895 655.696)"
        fill="white"
      />
      <rect
        width="5"
        height="5"
        transform="matrix(-0.962446 -0.271472 -0.271472 0.962446 955.726 659.151)"
        fill="white"
      />
      <rect
        width="5"
        height="5"
        transform="matrix(-0.962446 -0.271472 -0.271472 0.962446 996.443 717.392)"
        fill="#FFCF7B"
      />
      <rect
        width="5"
        height="5"
        transform="matrix(-0.962446 -0.271472 -0.271472 0.962446 990.274 720.847)"
        fill="#FFCF7B"
      />
      <rect
        x="935.982"
        y="710.728"
        width="5"
        height="5"
        transform="rotate(-164.248 935.982 710.728)"
        fill="#111111"
      />
      <rect
        x="1010.02"
        y="669.27"
        width="5"
        height="5"
        transform="rotate(15.7519 1010.02 669.27)"
        fill="#111111"
      />
      <rect
        x="1005.21"
        y="667.912"
        width="5"
        height="5"
        transform="rotate(15.7519 1005.21 667.912)"
        fill="#FFE56F"
      />
      <rect
        width="5"
        height="5"
        transform="matrix(0.962446 0.271472 0.271472 -0.962446 993.729 727.017)"
        fill="#111111"
      />
      <rect
        x="970.779"
        y="642.617"
        width="30"
        height="5"
        transform="rotate(15.7519 970.779 642.617)"
        fill="#111111"
      />
      <rect
        x="969.422"
        y="647.429"
        width="30"
        height="5"
        transform="rotate(15.7519 969.422 647.429)"
        fill="#FFE56F"
      />
      <rect
        width="30"
        height="5"
        transform="matrix(0.962446 0.271472 0.271472 -0.962446 946.347 729.237)"
        fill="#111111"
      />
      <rect
        x="938.574"
        y="664.703"
        width="30"
        height="5"
        transform="rotate(105.752 938.574 664.703)"
        fill="#111111"
      />
      <rect
        x="1020.38"
        y="687.779"
        width="30"
        height="5"
        transform="rotate(105.752 1020.38 687.779)"
        fill="#111111"
      />
      <rect
        x="938.574"
        y="664.703"
        width="10"
        height="5"
        transform="rotate(-74.2481 938.574 664.703)"
        fill="#111111"
      />
      <rect
        width="10"
        height="5"
        transform="matrix(-0.271473 0.962446 0.962446 0.271472 930.43 693.577)"
        fill="#111111"
      />
      <rect
        width="10"
        height="5"
        transform="matrix(0.271473 -0.962446 -0.962446 -0.271472 1015.57 686.421)"
        fill="#111111"
      />
      <rect
        x="1007.43"
        y="715.295"
        width="10"
        height="5"
        transform="rotate(105.752 1007.43 715.295)"
        fill="#111111"
      />
      <rect
        x="253.385"
        y="28.4614"
        width="79.6923"
        height="34.1538"
        fill="#B9E6FE"
      />
      <rect
        x="264.77"
        y="5.69238"
        width="56.9231"
        height="22.7692"
        fill="#B9E6FE"
      />
      <rect
        x="242"
        y="28.4614"
        width="5.69231"
        height="22.7692"
        fill="#111111"
      />
      <rect
        x="338.77"
        y="34.1538"
        width="5.69231"
        height="17.0769"
        fill="#111111"
      />
      <rect
        x="298.923"
        y="34.1538"
        width="5.69231"
        height="11.3846"
        fill="#111111"
      />
      <rect
        x="281.846"
        y="34.1538"
        width="5.69231"
        height="11.3846"
        fill="#111111"
      />
      <rect
        x="247.692"
        y="28.4614"
        width="5.69231"
        height="22.7692"
        fill="white"
      />
      <rect
        x="247.692"
        y="22.7693"
        width="11.3846"
        height="5.69231"
        fill="#111111"
      />
      <rect
        x="259.077"
        y="22.7693"
        width="11.3846"
        height="5.69231"
        transform="rotate(-90 259.077 22.7693)"
        fill="#111111"
      />
      <rect
        x="247.692"
        y="62.6155"
        width="11.3846"
        height="5.69231"
        transform="rotate(-90 247.692 62.6155)"
        fill="#111111"
      />
      <rect
        x="333.077"
        y="62.6155"
        width="11.3846"
        height="5.69231"
        transform="rotate(-90 333.077 62.6155)"
        fill="#111111"
      />
      <rect
        x="327.385"
        y="28.4614"
        width="11.3846"
        height="5.69231"
        transform="rotate(-90 327.385 28.4614)"
        fill="#111111"
      />
      <rect
        x="264.77"
        y="11.3845"
        width="5.69231"
        height="5.69231"
        transform="rotate(-90 264.77 11.3845)"
        fill="#111111"
      />
      <rect
        x="270.462"
        y="62.6155"
        width="5.69231"
        height="5.69231"
        transform="rotate(-90 270.462 62.6155)"
        fill="#111111"
      />
      <rect
        width="5.69231"
        height="5.69231"
        transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 316 62.6155)"
        fill="#111111"
      />
      <rect
        width="5.69231"
        height="5.69231"
        transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 338.77 34.1538)"
        fill="#111111"
      />
      <rect
        width="5.69231"
        height="5.69231"
        transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 327.385 17.0769)"
        fill="#111111"
      />
      <rect
        x="281.846"
        y="74"
        width="5.69231"
        height="22.7692"
        transform="rotate(-90 281.846 74)"
        fill="#111111"
      />
      <rect
        x="276.154"
        y="68.3076"
        width="5.69231"
        height="5.69231"
        transform="rotate(-90 276.154 68.3076)"
        fill="#111111"
      />
      <rect
        width="5.69231"
        height="5.69231"
        transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 310.308 68.3076)"
        fill="#111111"
      />
      <rect
        x="270.462"
        y="11.3845"
        width="5.69231"
        height="5.69231"
        transform="rotate(-90 270.462 11.3845)"
        fill="white"
      />
      <rect
        x="259.077"
        y="28.4614"
        width="5.69231"
        height="5.69231"
        transform="rotate(-90 259.077 28.4614)"
        fill="white"
      />
      <rect
        x="264.77"
        y="62.6155"
        width="5.69231"
        height="5.69231"
        transform="rotate(-90 264.77 62.6155)"
        fill="#0BA5EC"
      />
      <rect
        x="276.154"
        y="51.2307"
        width="5.69231"
        height="5.69231"
        transform="rotate(-90 276.154 51.2307)"
        fill="#F9ACBA"
      />
      <rect
        x="304.615"
        y="51.2307"
        width="5.69231"
        height="5.69231"
        transform="rotate(-90 304.615 51.2307)"
        fill="#F9ACBA"
      />
      <rect
        x="304.615"
        y="62.6155"
        width="5.69231"
        height="5.69231"
        transform="rotate(-90 304.615 62.6155)"
        fill="#0BA5EC"
      />
      <rect
        x="321.692"
        y="62.6155"
        width="5.69231"
        height="5.69231"
        transform="rotate(-90 321.692 62.6155)"
        fill="#0BA5EC"
      />
      <rect
        x="327.385"
        y="62.6155"
        width="11.3846"
        height="5.69231"
        transform="rotate(-90 327.385 62.6155)"
        fill="#0BA5EC"
      />
      <rect
        x="316"
        y="17.0769"
        width="5.69231"
        height="5.69231"
        transform="rotate(-90 316 17.0769)"
        fill="#0BA5EC"
      />
      <rect
        x="327.385"
        y="34.1538"
        width="5.69231"
        height="5.69231"
        transform="rotate(-90 327.385 34.1538)"
        fill="#0BA5EC"
      />
      <rect
        x="321.692"
        y="28.4614"
        width="11.3846"
        height="5.69231"
        transform="rotate(-90 321.692 28.4614)"
        fill="#0BA5EC"
      />
      <rect
        x="333.077"
        y="51.2307"
        width="17.0769"
        height="5.69231"
        transform="rotate(-90 333.077 51.2307)"
        fill="#0BA5EC"
      />
      <rect
        x="281.846"
        y="68.3076"
        width="5.69231"
        height="22.7692"
        transform="rotate(-90 281.846 68.3076)"
        fill="#0BA5EC"
      />
      <rect
        x="264.77"
        y="22.7693"
        width="11.3846"
        height="5.69231"
        transform="rotate(-90 264.77 22.7693)"
        fill="white"
      />
      <rect
        x="253.385"
        y="62.6155"
        width="11.3846"
        height="5.69231"
        transform="rotate(-90 253.385 62.6155)"
        fill="white"
      />
      <rect
        x="316"
        y="11.3845"
        width="5.69231"
        height="5.69231"
        transform="rotate(-90 316 11.3845)"
        fill="#111111"
      />
      <rect x="270.462" width="17.0769" height="5.69231" fill="#111111" />
      <rect
        x="253.385"
        y="62.6155"
        width="17.0769"
        height="5.69231"
        fill="#111111"
      />
      <rect
        x="316"
        y="62.6155"
        width="17.0769"
        height="5.69231"
        fill="#111111"
      />
      <rect
        x="287.538"
        y="5.69238"
        width="11.3846"
        height="5.69231"
        fill="#111111"
      />
      <rect x="298.923" width="17.0769" height="5.69231" fill="#111111" />
      <rect x="1017.85" y="35.3999" width="6.15" height="24.6" fill="#AB354B" />
      <path
        d="M950.2 35.4L956.35 29.25H974.8L980.95 35.4H987.1L993.25 29.25H1011.7L1017.85 35.4V60L987.1 90.75H980.95L950.2 60V35.4Z"
        fill="#F14B69"
      />
      <rect x="950.2" y="29.25" width="6.15" height="6.15" fill="#AB354B" />
      <rect x="956.35" y="35.3999" width="12.3" height="6.15" fill="#FEF3F2" />
      <rect x="956.35" y="41.55" width="6.15" height="6.15" fill="#FEF3F2" />
      <rect x="1011.7" y="29.25" width="6.15" height="6.15" fill="#AB354B" />
      <rect x="950.2" y="60" width="6.15" height="6.15" fill="#AB354B" />
      <rect
        width="6.15"
        height="6.15"
        transform="matrix(-1 0 0 1 1017.85 60)"
        fill="#AB354B"
      />
      <rect x="956.35" y="66.1499" width="6.15" height="6.15" fill="#AB354B" />
      <rect
        width="6.15"
        height="6.15"
        transform="matrix(-1 0 0 1 1011.7 66.1499)"
        fill="#AB354B"
      />
      <rect x="962.5" y="72.3" width="6.15" height="6.15" fill="#AB354B" />
      <rect
        width="6.15"
        height="6.15"
        transform="matrix(-1 0 0 1 1005.55 72.3)"
        fill="#AB354B"
      />
      <rect x="968.65" y="78.45" width="6.15" height="6.15" fill="#AB354B" />
      <rect
        width="6.15"
        height="6.15"
        transform="matrix(-1 0 0 1 999.4 78.45)"
        fill="#AB354B"
      />
      <rect x="974.8" y="84.6001" width="6.15" height="6.15" fill="#AB354B" />
      <rect
        width="6.15"
        height="6.15"
        transform="matrix(-1 0 0 1 993.25 84.6001)"
        fill="#AB354B"
      />
      <rect x="980.95" y="90.75" width="6.15" height="6.15" fill="#AB354B" />
      <rect x="974.8" y="29.25" width="6.15" height="6.15" fill="#AB354B" />
      <rect x="980.95" y="35.3999" width="6.15" height="6.15" fill="#AB354B" />
      <rect x="987.1" y="29.25" width="6.15" height="6.15" fill="#AB354B" />
      <rect x="944.05" y="35.3999" width="6.15" height="24.6" fill="#AB354B" />
      <rect x="956.35" y="23.1001" width="18.45" height="6.15" fill="#AB354B" />
      <rect x="993.25" y="23.1001" width="18.45" height="6.15" fill="#AB354B" />
      <rect x="928" y="55" width="3" height="11" fill="#111111" />
      <rect x="928" y="75" width="3" height="11" fill="#111111" />
      <rect
        x="914"
        y="72"
        width="3"
        height="11"
        transform="rotate(-90 914 72)"
        fill="#111111"
      />
      <rect
        x="934"
        y="72"
        width="3"
        height="11"
        transform="rotate(-90 934 72)"
        fill="#111111"
      />
      <rect x="1045" y="40" width="3" height="11" fill="#111111" />
      <rect x="1045" y="60" width="3" height="11" fill="#111111" />
      <rect
        x="1031"
        y="57"
        width="3"
        height="11"
        transform="rotate(-90 1031 57)"
        fill="#111111"
      />
      <rect
        x="1051"
        y="57"
        width="3"
        height="11"
        transform="rotate(-90 1051 57)"
        fill="#111111"
      />
      <defs>
        <pattern
          id="pattern0_33_53414"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_33_53414"
            transform="scale(0.00195312 0.00285645)"
          />
        </pattern>
        <pattern
          id="pattern1_33_53414"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image1_33_53414"
            transform="matrix(0.0013587 0 0 0.00249094 0 -0.661002)"
          />
        </pattern>
        <pattern
          id="pattern2_33_53414"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image1_33_53414"
            transform="matrix(0.0013587 0 0 0.00241546 0 -0.568234)"
          />
        </pattern>
        <clipPath id="clip0_33_53414">
          <rect
            width="285"
            height="60"
            fill="white"
            transform="translate(1183 199)"
          />
        </clipPath>
        <clipPath id="clip1_33_53414">
          <rect
            width="285"
            height="60"
            fill="white"
            transform="translate(1183 199)"
          />
        </clipPath>
        <clipPath id="clip2_33_53414">
          <rect
            width="370"
            height="311"
            fill="white"
            transform="translate(1213 283)"
          />
        </clipPath>
        <clipPath id="clip3_33_53414">
          <rect
            width="287"
            height="86"
            fill="white"
            transform="translate(1254 618)"
          />
        </clipPath>
        <clipPath id="clip4_33_53414">
          <rect
            width="287"
            height="86"
            fill="white"
            transform="translate(1254 618)"
          />
        </clipPath>
        <clipPath id="clip5_33_53414">
          <rect
            width="1154"
            height="690"
            fill="white"
            transform="translate(30 26)"
          />
        </clipPath>
        <clipPath id="clip6_33_53414">
          <rect
            width="1084"
            height="610"
            fill="white"
            transform="translate(65 66)"
          />
        </clipPath>
        <clipPath id="clip7_33_53414">
          <rect
            width="29"
            height="12.76"
            fill="white"
            transform="translate(26 342.124)"
          />
        </clipPath>
        <clipPath id="clip8_33_53414">
          <rect
            width="29"
            height="12.76"
            fill="white"
            transform="translate(26 360.684)"
          />
        </clipPath>
        <clipPath id="clip9_33_53414">
          <rect
            width="29"
            height="12.76"
            fill="white"
            transform="translate(26 379.244)"
          />
        </clipPath>
        <image
          id="image0_33_53414"
          width="512"
          height="512"
          preserveAspectRatio="none"
          href=""
        />

        <image
          id="image1_33_53414"
          width="736"
          height="743"
          preserveAspectRatio="none"
          href={""}
        />
      </defs>
    </svg>
    // </div>
  );
}
