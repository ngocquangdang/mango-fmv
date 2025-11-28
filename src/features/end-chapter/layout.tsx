import type { ReactNode } from "react";
import ButtonLighter from "../../components/button-lighter";
import GiftCard from "../../components/card/gift";

const VIEWBOX_WIDTH = 1389;
const VIEWBOX_HEIGHT = 805;

// const toCssSize = (size?: number | string) =>
//   typeof size === "number" ? `${size}px` : size;

export default function LayoutEndChapter({
  // width = 973,
  // height = 564,
  className = "",
  progress = "",
  description = "",
  chapter = "",
  gift = [],
  onPlayAgain,
}: {
  width?: number | string;
  height?: number | string;
  className?: string;
  progress?: string;
  description?: string;
  chapter?: ReactNode;
  gift?: any[];
  onPlayAgain: () => void;
}) {
  const wrapperStyles = {
    // width: toCssSize(width),
    // height: toCssSize(height),
  };

  return (
    <div className={`relative ${className}`} style={wrapperStyles}>
      <svg
        className="block w-full h-full"
        width="100%"
        height="100%"
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <path d="M1374 104V114H1384V245H968V104H1374Z" fill="#FEC84B" />
        <rect
          width="10"
          height="141"
          transform="matrix(-1 0 0 1 968 104)"
          fill="#B25229"
        />
        <rect
          width="10"
          height="84"
          transform="matrix(-1 0 0 1 998 104)"
          fill="#B25229"
        />
        <rect
          width="10"
          height="10"
          transform="matrix(-1 0 0 1 988 188)"
          fill="#B25229"
        />
        <rect
          width="10"
          height="10"
          transform="matrix(-1 0 0 1 978 198)"
          fill="#B25229"
        />
        <rect x="988" y="99" width="376" height="5" fill="#111111" />
        <path d="M998 104H1364V114H998V104Z" fill="#FEDF89" />
        <rect x="958" y="240" width="25" height="5" fill="#111111" />
        <rect x="1384" y="124" width="5" height="121" fill="#111111" />
        <path d="M1374 124H1384V245H1374V124Z" fill="#FDB022" />
        <rect x="1364" y="104" width="10" height="5" fill="#111111" />
        <path d="M1359 109H1374V119H1359V109Z" fill="#FEDF89" />
        <rect x="1374" y="109" width="5" height="5" fill="#111111" />
        <path d="M1369 114H1379V124H1369V114Z" fill="#FEDF89" />
        <rect x="1379" y="114" width="5" height="10" fill="#111111" />
        <path d="M1374 760V750H1384V610H948V760H1374Z" fill="#FEC84B" />
        <rect
          x="958"
          y="710"
          width="10"
          height="100"
          transform="rotate(-180 958 710)"
          fill="#B25229"
        />
        <rect
          x="978"
          y="760"
          width="10"
          height="40"
          transform="rotate(-180 978 760)"
          fill="#B25229"
        />
        <rect
          x="968"
          y="720"
          width="10"
          height="10"
          transform="rotate(-180 968 720)"
          fill="#B25229"
        />
        <rect
          width="398"
          height="5"
          transform="matrix(1 0 0 -1 966 765)"
          fill="#111111"
        />
        <path d="M978 760H1364V750H978V760Z" fill="#FDB022" />
        <rect
          width="35"
          height="5"
          transform="matrix(1 0 0 -1 948 615)"
          fill="#111111"
        />
        <rect
          width="5"
          height="130"
          transform="matrix(1 0 0 -1 1384 740)"
          fill="#111111"
        />
        <path d="M1374 740H1384V610H1374V740Z" fill="#FDB022" />
        <rect
          width="10"
          height="5"
          transform="matrix(1 0 0 -1 1364 760)"
          fill="#111111"
        />
        <path d="M1359 755H1374V745H1359V755Z" fill="#FDB022" />
        <rect
          width="5"
          height="5"
          transform="matrix(1 0 0 -1 1374 755)"
          fill="#111111"
        />
        <path d="M1364 745H1369V740H1364V745Z" fill="#FDB022" />
        <rect
          width="5"
          height="10"
          transform="matrix(1 0 0 -1 1379 750)"
          fill="#111111"
        />
        <path d="M1369 750H1379V735H1369V750Z" fill="#FDB022" />
        <rect
          width="391"
          height="365"
          transform="matrix(-1 0 0 1 1374 245)"
          fill="#FEC84B"
        />
        <path d="M1374 245H1384V610H1374V245Z" fill="#FDB022" />
        <rect
          width="10"
          height="365"
          transform="matrix(-1 0 0 1 983 245)"
          fill="#FDB022"
        />
        <rect
          width="5"
          height="365"
          transform="matrix(-1 0 0 1 1389 245)"
          fill="#111111"
        />
        <rect
          width="5"
          height="365"
          transform="matrix(-1 0 0 1 973 245)"
          fill="#111111"
        />
        <path
          d="M1062.19 180.914V175.828H1067.29V178.371H1069.83V170.729H1067.29V168.186H1059.64V170.729H1057.1V178.371H1059.64V180.914H1062.19ZM1057.1 186V183.457H1054.56V180.914H1052.02V168.186H1054.56V165.643H1057.1V163.1H1069.83V165.643H1072.37V168.186H1074.92V178.371H1072.37V180.914H1074.92V186H1069.83V183.457H1067.29V186H1057.1ZM1080.02 186V183.457H1077.47V168.186H1082.56V180.914H1087.64V178.371H1090.2V168.186H1095.29V186H1090.2V183.457H1087.64V186H1080.02ZM1110.57 180.914V178.371H1102.93V180.914H1110.57ZM1100.39 186V183.457H1097.84V178.371H1100.39V175.828H1110.57V173.285H1100.39V168.186H1113.12V170.729H1115.66V186H1100.39ZM1105.47 165.643V163.1H1102.93V160.557H1100.39V158H1108.02V163.1H1110.57V165.643H1105.47ZM1125.84 186V168.186H1130.93V170.729H1133.47V168.186H1141.12V170.729H1143.66V186H1138.57V173.285H1133.47V175.828H1130.93V186H1125.84ZM1146.21 186V163.1H1151.3V170.729H1153.84V168.186H1161.49V170.729H1164.03V186H1158.94V173.285H1153.84V175.828H1151.3V186H1146.21ZM1179.31 180.914V178.371H1171.67V180.914H1179.31ZM1174.21 191.086V186H1169.13V183.457H1166.59V178.371H1169.13V175.828H1179.31V173.285H1169.13V168.186H1181.86V170.729H1184.4V186H1179.31V191.086H1174.21ZM1169.13 165.643V163.1H1171.67V160.557H1174.21V158H1176.76V160.557H1179.31V163.1H1181.86V165.643H1176.76V163.1H1174.21V165.643H1169.13ZM1186.96 186V168.186H1192.04V170.729H1194.59V168.186H1202.23V170.729H1204.77V186H1199.69V173.285H1194.59V175.828H1192.04V186H1186.96ZM1227.69 180.914V175.828H1220.04V180.914H1227.69ZM1217.5 186V183.457H1214.96V173.285H1217.5V170.729H1225.13V173.285H1227.69V168.186H1222.59V165.643H1227.69V163.1H1232.77V165.643H1235.31V168.186H1232.77V186H1217.5ZM1237.87 186V183.457H1235.33V168.186H1240.41V180.914H1245.5V178.371H1248.06V168.186H1253.14V170.729H1255.69V165.643H1260.79V173.285H1258.23V175.828H1253.14V186H1248.06V183.457H1245.5V186H1237.87ZM1273.51 180.914V173.285H1265.87V180.914H1273.51ZM1268.41 191.086V186H1263.33V183.457H1260.79V170.729H1263.33V168.186H1276.06V170.729H1278.6V165.643H1283.69V173.285H1281.14V175.828H1278.6V183.457H1276.06V186H1273.51V191.086H1268.41ZM1286.24 186V183.457H1283.7V170.729H1286.24V168.186H1298.97V173.285H1288.79V180.914H1296.43V178.371H1301.51V183.457H1298.97V186H1286.24Z"
          fill="black"
        />
        <rect x="1114" width="144" height="99" fill="url(#pattern3_3_10184)" />
        <rect
          width="767"
          height="190"
          transform="matrix(-1 0 0 1 897 55)"
          fill="#FF9442"
        />
        <rect
          width="767"
          height="10"
          transform="matrix(-1 0 0 1 897 45)"
          fill="#111111"
        />
        <rect
          width="767"
          height="10"
          transform="matrix(-1 0 0 1 897 55)"
          fill="#FFB67E"
        />
        <rect
          width="888"
          height="693"
          transform="matrix(-1 0 0 1 938 102)"
          fill="#FF9442"
        />
        <rect
          width="10"
          height="350"
          transform="matrix(-1 0 0 1 40 245)"
          fill="#111111"
        />
        <rect
          width="10"
          height="350"
          transform="matrix(-1 0 0 1 50 245)"
          fill="#FFB67E"
        />
        <rect
          width="10"
          height="435"
          transform="matrix(-1 0 0 1 948 245)"
          fill="#111111"
        />
        <rect
          width="10"
          height="435"
          transform="matrix(-1 0 0 1 938 245)"
          fill="#FA7036"
        />
        <rect
          width="661"
          height="10"
          transform="matrix(-1 0 0 1 815 795)"
          fill="#111111"
        />
        <rect
          width="661"
          height="10"
          transform="matrix(-1 0 0 1 815 785)"
          fill="#FA7036"
        />
        <path d="M835 245H958V198H978V65H958V45H835V245Z" fill="#FF9442" />
        <rect
          width="113"
          height="10"
          transform="matrix(-1 0 0 1 948 35)"
          fill="#111111"
        />
        <rect
          width="113"
          height="10"
          transform="matrix(4.37114e-08 1 1 -4.37114e-08 978 75)"
          fill="#111111"
        />
        <rect
          width="113"
          height="10"
          transform="matrix(4.37114e-08 1 1 -4.37114e-08 968 75)"
          fill="#FA7036"
        />
        <rect
          x="958"
          y="55"
          width="10"
          height="10"
          transform="rotate(180 958 55)"
          fill="#111111"
        />
        <rect
          x="948"
          y="55"
          width="113"
          height="10"
          transform="rotate(180 948 55)"
          fill="#FFB67E"
        />
        <rect
          x="968"
          y="105"
          width="10"
          height="10"
          transform="rotate(180 968 105)"
          fill="#D92D20"
        />
        <rect
          x="968"
          y="135"
          width="10"
          height="10"
          transform="rotate(180 968 135)"
          fill="#D92D20"
        />
        <rect
          x="968"
          y="165"
          width="10"
          height="10"
          transform="rotate(180 968 165)"
          fill="#D92D20"
        />
        <rect
          x="958"
          y="115"
          width="10"
          height="10"
          transform="rotate(180 958 115)"
          fill="#D92D20"
        />
        <rect
          x="948"
          y="125"
          width="10"
          height="10"
          transform="rotate(180 948 125)"
          fill="#D92D20"
        />
        <rect
          x="958"
          y="145"
          width="10"
          height="10"
          transform="rotate(180 958 145)"
          fill="#D92D20"
        />
        <rect
          x="948"
          y="155"
          width="10"
          height="10"
          transform="rotate(180 948 155)"
          fill="#D92D20"
        />
        <rect
          x="958"
          y="175"
          width="10"
          height="10"
          transform="rotate(180 958 175)"
          fill="#D92D20"
        />
        <rect
          x="948"
          y="185"
          width="10"
          height="10"
          transform="rotate(180 948 185)"
          fill="#D92D20"
        />
        <rect
          width="10"
          height="10"
          transform="matrix(1 0 0 -1 968 198)"
          fill="#111111"
        />
        <rect
          width="10"
          height="10"
          transform="matrix(1 0 0 -1 958 198)"
          fill="#FA7036"
        />
        <rect
          x="968"
          y="65"
          width="10"
          height="10"
          transform="rotate(180 968 65)"
          fill="#111111"
        />
        <rect
          x="958"
          y="65"
          width="10"
          height="10"
          transform="rotate(180 958 65)"
          fill="#FA7036"
        />
        <rect
          width="10"
          height="10"
          transform="matrix(1 0 0 -1 958 208)"
          fill="#111111"
        />
        <rect
          width="10"
          height="10"
          transform="matrix(1 0 0 -1 948 208)"
          fill="#FA7036"
        />
        <rect
          x="978"
          y="75"
          width="10"
          height="10"
          transform="rotate(180 978 75)"
          fill="#111111"
        />
        <rect
          x="968"
          y="75"
          width="10"
          height="10"
          transform="rotate(180 968 75)"
          fill="#FA7036"
        />
        <rect
          width="10"
          height="37"
          transform="matrix(1 0 0 -1 948 245)"
          fill="#111111"
        />
        <rect
          width="10"
          height="37"
          transform="matrix(1 0 0 -1 938 245)"
          fill="#FA7036"
        />
        <rect
          width="3"
          height="85"
          transform="matrix(-1.19249e-08 -1 -1 1.19249e-08 933 60)"
          fill="#111111"
        />
        <path d="M933 63L933 60L848 60L848 63L933 63Z" fill="#FFDE29" />
        <rect
          width="3"
          height="3"
          transform="matrix(-1.19249e-08 -1 -1 1.19249e-08 936 63)"
          fill="#111111"
        />
        <rect
          width="3"
          height="3"
          transform="matrix(-1.19249e-08 -1 -1 1.19249e-08 848 63)"
          fill="#111111"
        />
        <rect
          width="3"
          height="85"
          transform="matrix(-7.02424e-09 -1 -1 2.02446e-08 933 66)"
          fill="#111111"
        />
        <path d="M153 245H30V198H10V65H30V45H153V245Z" fill="#FF9442" />
        <rect x="40" y="35" width="113" height="10" fill="#111111" />
        <rect
          x="10"
          y="75"
          width="113"
          height="10"
          transform="rotate(90 10 75)"
          fill="#111111"
        />
        <rect
          x="20"
          y="75"
          width="113"
          height="10"
          transform="rotate(90 20 75)"
          fill="#FFB67E"
        />
        <rect
          width="10"
          height="10"
          transform="matrix(1 0 0 -1 30 55)"
          fill="#111111"
        />
        <rect
          width="113"
          height="10"
          transform="matrix(1 0 0 -1 40 55)"
          fill="#FFB67E"
        />
        <rect
          width="10"
          height="10"
          transform="matrix(1 0 0 -1 20 105)"
          fill="#D92D20"
        />
        <rect
          width="10"
          height="10"
          transform="matrix(1 0 0 -1 20 135)"
          fill="#D92D20"
        />
        <rect
          width="10"
          height="10"
          transform="matrix(1 0 0 -1 20 165)"
          fill="#D92D20"
        />
        <rect
          width="10"
          height="10"
          transform="matrix(1 0 0 -1 30 115)"
          fill="#D92D20"
        />
        <rect
          width="10"
          height="10"
          transform="matrix(1 0 0 -1 40 125)"
          fill="#D92D20"
        />
        <rect
          width="10"
          height="10"
          transform="matrix(1 0 0 -1 30 145)"
          fill="#D92D20"
        />
        <rect
          width="10"
          height="10"
          transform="matrix(1 0 0 -1 40 155)"
          fill="#D92D20"
        />
        <rect
          width="10"
          height="10"
          transform="matrix(1 0 0 -1 30 175)"
          fill="#D92D20"
        />
        <rect
          width="10"
          height="10"
          transform="matrix(1 0 0 -1 40 185)"
          fill="#D92D20"
        />
        <rect
          x="20"
          y="198"
          width="10"
          height="10"
          transform="rotate(180 20 198)"
          fill="#111111"
        />
        <rect
          x="30"
          y="198"
          width="10"
          height="10"
          transform="rotate(180 30 198)"
          fill="#FFB67E"
        />
        <rect
          width="10"
          height="10"
          transform="matrix(1 0 0 -1 20 65)"
          fill="#111111"
        />
        <rect
          width="10"
          height="10"
          transform="matrix(1 0 0 -1 30 65)"
          fill="#FFB67E"
        />
        <rect
          x="30"
          y="208"
          width="10"
          height="10"
          transform="rotate(180 30 208)"
          fill="#111111"
        />
        <rect
          x="40"
          y="208"
          width="10"
          height="10"
          transform="rotate(180 40 208)"
          fill="#FFB67E"
        />
        <rect
          width="10"
          height="10"
          transform="matrix(1 0 0 -1 10 75)"
          fill="#111111"
        />
        <rect
          width="10"
          height="10"
          transform="matrix(1 0 0 -1 20 75)"
          fill="#FFB67E"
        />
        <rect
          x="40"
          y="245"
          width="10"
          height="37"
          transform="rotate(180 40 245)"
          fill="#111111"
        />
        <rect
          x="50"
          y="245"
          width="10"
          height="37"
          transform="rotate(180 50 245)"
          fill="#FFB67E"
        />
        <rect
          x="55"
          y="60"
          width="3"
          height="85"
          transform="rotate(-90 55 60)"
          fill="#111111"
        />
        <path d="M55 63L55 60L140 60L140 63L55 63Z" fill="#FFDE29" />
        <rect
          x="52"
          y="63"
          width="3"
          height="3"
          transform="rotate(-90 52 63)"
          fill="#111111"
        />
        <rect
          x="140"
          y="63"
          width="3"
          height="3"
          transform="rotate(-90 140 63)"
          fill="#111111"
        />
        <rect
          x="55"
          y="66"
          width="3"
          height="85"
          transform="rotate(-90 55 66)"
          fill="#111111"
        />
        <path d="M154 595H31V642H11V775H31V795H154V595Z" fill="#FF9442" />
        <rect
          width="113"
          height="10"
          transform="matrix(1 0 0 -1 41 805)"
          fill="#111111"
        />
        <rect
          width="113"
          height="10"
          transform="matrix(-4.37114e-08 -1 -1 4.37114e-08 11 765)"
          fill="#111111"
        />
        <rect
          width="113"
          height="10"
          transform="matrix(-4.37114e-08 -1 -1 4.37114e-08 21 765)"
          fill="#FFB67E"
        />
        <rect x="31" y="785" width="10" height="10" fill="#111111" />
        <rect x="41" y="785" width="113" height="10" fill="#FA7036" />
        <rect x="21" y="735" width="10" height="10" fill="#D92D20" />
        <rect x="21" y="705" width="10" height="10" fill="#D92D20" />
        <rect x="21" y="675" width="10" height="10" fill="#D92D20" />
        <rect x="31" y="725" width="10" height="10" fill="#D92D20" />
        <rect x="41" y="715" width="10" height="10" fill="#D92D20" />
        <rect x="31" y="695" width="10" height="10" fill="#D92D20" />
        <rect x="41" y="685" width="10" height="10" fill="#D92D20" />
        <rect x="31" y="665" width="10" height="10" fill="#D92D20" />
        <rect x="41" y="655" width="10" height="10" fill="#D92D20" />
        <rect
          width="10"
          height="10"
          transform="matrix(-1 0 0 1 21 642)"
          fill="#111111"
        />
        <rect
          width="10"
          height="10"
          transform="matrix(-1 0 0 1 31 642)"
          fill="#FFB67E"
        />
        <rect x="21" y="775" width="10" height="10" fill="#111111" />
        <rect x="31" y="775" width="10" height="10" fill="#FA7036" />
        <rect
          width="10"
          height="10"
          transform="matrix(-1 0 0 1 31 632)"
          fill="#111111"
        />
        <rect
          width="10"
          height="10"
          transform="matrix(-1 0 0 1 41 632)"
          fill="#FFB67E"
        />
        <rect x="11" y="765" width="10" height="10" fill="#111111" />
        <rect x="21" y="765" width="10" height="10" fill="#FA7036" />
        <rect
          width="10"
          height="37"
          transform="matrix(-1 0 0 1 41 595)"
          fill="#111111"
        />
        <rect
          width="10"
          height="37"
          transform="matrix(-1 0 0 1 51 595)"
          fill="#FFB67E"
        />
        <rect
          width="3"
          height="85"
          transform="matrix(1.19249e-08 1 1 -1.19249e-08 56 780)"
          fill="#111111"
        />
        <path d="M56 777L56 780L141 780L141 777L56 777Z" fill="#FFDE29" />
        <rect
          width="3"
          height="3"
          transform="matrix(1.19249e-08 1 1 -1.19249e-08 53 777)"
          fill="#111111"
        />
        <rect
          width="3"
          height="3"
          transform="matrix(1.19249e-08 1 1 -1.19249e-08 141 777)"
          fill="#111111"
        />
        <rect
          width="3"
          height="85"
          transform="matrix(7.02424e-09 1 1 -2.02446e-08 56 774)"
          fill="#111111"
        />
        <g clipPath="url(#clip13_3_10184)">
          <rect
            width="3"
            height="30"
            transform="matrix(1 3.17865e-08 3.17865e-08 -1 534 85)"
            fill="#111111"
          />
          <path d="M531 85L534 85L534 55L531 55L531 85Z" fill="#5FCDE3" />
          <rect
            width="3"
            height="3"
            transform="matrix(1 3.17865e-08 3.17865e-08 -1 531 88)"
            fill="#111111"
          />
          <rect
            width="3"
            height="3"
            transform="matrix(1 3.17865e-08 3.17865e-08 -1 531 55)"
            fill="#111111"
          />
          <rect
            width="3"
            height="30"
            transform="matrix(1 3.66871e-08 2.34668e-08 -1 528 85)"
            fill="#111111"
          />
        </g>
        <g clipPath="url(#clip14_3_10184)">
          <rect
            width="3"
            height="30"
            transform="matrix(1 3.17865e-08 3.17865e-08 -1 515 85)"
            fill="#111111"
          />
          <path d="M512 85L515 85L515 55L512 55L512 85Z" fill="#5FCDE3" />
          <rect
            width="3"
            height="3"
            transform="matrix(1 3.17865e-08 3.17865e-08 -1 512 88)"
            fill="#111111"
          />
          <rect
            width="3"
            height="3"
            transform="matrix(1 3.17865e-08 3.17865e-08 -1 512 55)"
            fill="#111111"
          />
          <rect
            width="3"
            height="30"
            transform="matrix(1 3.66871e-08 2.34668e-08 -1 509 85)"
            fill="#111111"
          />
        </g>
        <g clipPath="url(#clip15_3_10184)">
          <rect
            width="3"
            height="30"
            transform="matrix(1 3.17865e-08 3.17865e-08 -1 496 85)"
            fill="#111111"
          />
          <path d="M493 85L496 85L496 55L493 55L493 85Z" fill="#5FCDE3" />
          <rect
            width="3"
            height="3"
            transform="matrix(1 3.17865e-08 3.17865e-08 -1 493 88)"
            fill="#111111"
          />
          <rect
            width="3"
            height="3"
            transform="matrix(1 3.17865e-08 3.17865e-08 -1 493 55)"
            fill="#111111"
          />
          <rect
            width="3"
            height="30"
            transform="matrix(1 3.66871e-08 2.34668e-08 -1 490 85)"
            fill="#111111"
          />
        </g>
        <path d="M938 795V775H948V680H815V795H938Z" fill="#FF9442" />
        <rect
          width="113"
          height="10"
          transform="matrix(1 0 0 -1 815 805)"
          fill="#111111"
        />
        <rect
          width="113"
          height="10"
          transform="matrix(1 0 0 -1 815 795)"
          fill="#FA7036"
        />
        <rect
          width="45"
          height="10"
          transform="matrix(-4.37114e-08 -1 -1 4.37114e-08 968 765)"
          fill="#111111"
        />
        <rect
          width="45"
          height="10"
          transform="matrix(-4.37114e-08 -1 -1 4.37114e-08 958 765)"
          fill="#FA7036"
        />
        <rect
          width="10"
          height="10"
          transform="matrix(1 0 0 -1 948 775)"
          fill="#111111"
        />
        <rect
          width="10"
          height="10"
          transform="matrix(1 0 0 -1 938 775)"
          fill="#FA7036"
        />
        <rect
          width="10"
          height="10"
          transform="matrix(1 0 0 -1 948 720)"
          fill="#111111"
        />
        <rect
          width="10"
          height="30"
          transform="matrix(1 0 0 -1 938 710)"
          fill="#111111"
        />
        <rect
          width="10"
          height="10"
          transform="matrix(1 0 0 -1 938 720)"
          fill="#FA7036"
        />
        <rect
          width="10"
          height="30"
          transform="matrix(1 0 0 -1 928 710)"
          fill="#FA7036"
        />
        <rect
          width="10"
          height="10"
          transform="matrix(1 0 0 -1 938 785)"
          fill="#111111"
        />
        <rect
          width="10"
          height="10"
          transform="matrix(1 0 0 -1 928 785)"
          fill="#FA7036"
        />
        <rect
          width="10"
          height="10"
          transform="matrix(1 0 0 -1 928 795)"
          fill="#111111"
        />
        <rect
          width="3"
          height="85"
          transform="matrix(1.19249e-08 1 1 -1.19249e-08 828 780)"
          fill="#111111"
        />
        <path d="M828 777L828 780L913 780L913 777L828 777Z" fill="#F0C446" />
        <rect
          width="3"
          height="3"
          transform="matrix(1.19249e-08 1 1 -1.19249e-08 825 777)"
          fill="#111111"
        />
        <rect
          width="3"
          height="3"
          transform="matrix(1.19249e-08 1 1 -1.19249e-08 913 777)"
          fill="#111111"
        />
        <rect
          width="3"
          height="85"
          transform="matrix(7.02424e-09 1 1 -2.02446e-08 828 774)"
          fill="#111111"
        />
        <rect
          width="60"
          height="10"
          transform="matrix(-1 0 0 1 928 418)"
          fill="#CE4D2A"
        />
        <rect
          width="60"
          height="10"
          transform="matrix(-1 0 0 1 928 440)"
          fill="#CE4D2A"
        />
        <rect
          width="60"
          height="10"
          transform="matrix(-1 0 0 1 928 462)"
          fill="#CE4D2A"
        />
        <g clipPath="url(#clip16_3_10184)">
          <rect
            width="3"
            height="19"
            transform="matrix(-1.19249e-08 -1 -1 1.19249e-08 901 248)"
            fill="#111111"
          />
          <rect
            width="5"
            height="19"
            transform="matrix(-1.19249e-08 -1 -1 1.19249e-08 901 253)"
            fill="#D92D20"
          />
          <rect
            width="5"
            height="3"
            transform="matrix(-7.15493e-09 -1 -1 1.98748e-08 904 253)"
            fill="#111111"
          />
          <rect
            width="5"
            height="3"
            transform="matrix(-7.15493e-09 -1 -1 1.98748e-08 882 253)"
            fill="#111111"
          />
          <rect
            width="3"
            height="19"
            transform="matrix(-7.41448e-09 -1 -1 1.91791e-08 901 256)"
            fill="#111111"
          />
        </g>
        <g clipPath="url(#clip17_3_10184)">
          <rect
            width="3"
            height="19"
            transform="matrix(-1.19249e-08 -1 -1 1.19249e-08 901 264)"
            fill="#111111"
          />
          <rect
            width="5"
            height="19"
            transform="matrix(-1.19249e-08 -1 -1 1.19249e-08 901 269)"
            fill="#5FCDE3"
          />
          <rect
            width="5"
            height="3"
            transform="matrix(-7.15493e-09 -1 -1 1.98748e-08 904 269)"
            fill="#111111"
          />
          <rect
            width="5"
            height="3"
            transform="matrix(-7.15493e-09 -1 -1 1.98748e-08 882 269)"
            fill="#111111"
          />
          <rect
            width="3"
            height="19"
            transform="matrix(-7.41448e-09 -1 -1 1.91791e-08 901 272)"
            fill="#111111"
          />
        </g>
        <g clipPath="url(#clip18_3_10184)">
          <rect
            width="3"
            height="19"
            transform="matrix(-1.19249e-08 -1 -1 1.19249e-08 901 280)"
            fill="#111111"
          />
          <rect
            width="5"
            height="19"
            transform="matrix(-1.19249e-08 -1 -1 1.19249e-08 901 285)"
            fill="#FEC84B"
          />
          <rect
            width="5"
            height="3"
            transform="matrix(-7.15493e-09 -1 -1 1.98748e-08 904 285)"
            fill="#111111"
          />
          <rect
            width="5"
            height="3"
            transform="matrix(-7.15493e-09 -1 -1 1.98748e-08 882 285)"
            fill="#111111"
          />
          <rect
            width="3"
            height="19"
            transform="matrix(-7.41448e-09 -1 -1 1.91791e-08 901 288)"
            fill="#111111"
          />
        </g>
        <g clipPath="url(#clip19_3_10184)">
          <path
            d="M836 117H846V249H836V259H192V249H182V117H192V107H836V117Z"
            fill="white"
          />
          <rect x="831" y="107" width="5" height="5" fill="#111111" />
          <rect
            x="197"
            y="259"
            width="5"
            height="5"
            transform="rotate(180 197 259)"
            fill="#111111"
          />
          <rect
            width="5"
            height="5"
            transform="matrix(-1 0 0 1 197 107)"
            fill="#111111"
          />
          <rect
            width="5"
            height="5"
            transform="matrix(1 0 0 -1 831 259)"
            fill="#111111"
          />
          <rect x="836" y="112" width="5" height="5" fill="#111111" />
          <rect
            x="192"
            y="254"
            width="5"
            height="5"
            transform="rotate(180 192 254)"
            fill="#111111"
          />
          <rect
            width="5"
            height="5"
            transform="matrix(-1 0 0 1 192 112)"
            fill="#111111"
          />
          <rect
            width="5"
            height="5"
            transform="matrix(1 0 0 -1 836 254)"
            fill="#111111"
          />
          <rect x="841" y="117" width="5" height="5" fill="#111111" />
          <rect
            x="187"
            y="249"
            width="5"
            height="5"
            transform="rotate(180 187 249)"
            fill="#111111"
          />
          <rect
            width="5"
            height="5"
            transform="matrix(-1 0 0 1 187 117)"
            fill="#111111"
          />
          <rect
            width="5"
            height="5"
            transform="matrix(1 0 0 -1 841 249)"
            fill="#111111"
          />
          <rect
            x="182"
            y="244"
            width="5"
            height="122"
            transform="rotate(180 182 244)"
            fill="#111111"
          />
          <rect
            x="851"
            y="244"
            width="5"
            height="122"
            transform="rotate(180 851 244)"
            fill="#111111"
          />
          <rect
            x="197"
            y="107"
            width="5.00001"
            height="634"
            transform="rotate(-90 197 107)"
            fill="#111111"
          />
          <rect
            x="831"
            y="259"
            width="4.99999"
            height="634"
            transform="rotate(90 831 259)"
            fill="#111111"
          />
        </g>
        <foreignObject x="210" y="132" width="610" height="110">
          <div
            className="w-full h-full flex items-center justify-center text-center text-black font-extrabold text-2xl uppercase"
            style={{ fontSize: "24px" }}
          >
            {chapter}
          </div>
        </foreignObject>
        <rect x="188.5" y="565.5" width="648" height="185" fill="#D1E9FF" />
        <rect
          x="188.5"
          y="565.5"
          width="648"
          height="185"
          stroke="#8098F9"
          stroke-width="5"
        />
        <foreignObject x="210" y="603" width="610" height="110">
          <div
            className="w-full h-full flex items-center justify-center text-center text-black font-extrabold text-2xl uppercase"
            style={{ fontSize: "24px", color: "#363F72" }}
          >
            {description}
          </div>
        </foreignObject>{" "}
        <g clipPath="url(#clip20_3_10184)">
          <path
            d="M180 343H190V401H180V411H50V401H40V343H50V333H180V343Z"
            fill="#D0F8AB"
          />
          <rect x="175" y="333" width="5" height="5" fill="#111111" />
          <rect
            x="55"
            y="411"
            width="5"
            height="5"
            transform="rotate(180 55 411)"
            fill="#111111"
          />
          <rect
            width="5"
            height="5"
            transform="matrix(-1 0 0 1 55 333)"
            fill="#111111"
          />
          <rect
            width="5"
            height="5"
            transform="matrix(1 0 0 -1 175 411)"
            fill="#111111"
          />
          <rect x="180" y="338" width="5" height="5" fill="#111111" />
          <rect
            x="50"
            y="406"
            width="5"
            height="5"
            transform="rotate(180 50 406)"
            fill="#111111"
          />
          <rect
            width="5"
            height="5"
            transform="matrix(-1 0 0 1 50 338)"
            fill="#111111"
          />
          <rect
            width="5"
            height="5"
            transform="matrix(1 0 0 -1 180 406)"
            fill="#111111"
          />
          <rect x="185" y="343" width="5" height="5" fill="#111111" />
          <rect
            x="45"
            y="401"
            width="5"
            height="5"
            transform="rotate(180 45 401)"
            fill="#111111"
          />
          <rect
            width="5"
            height="5"
            transform="matrix(-1 0 0 1 45 343)"
            fill="#111111"
          />
          <rect
            width="5"
            height="5"
            transform="matrix(1 0 0 -1 185 401)"
            fill="#111111"
          />
          <rect
            x="40"
            y="396"
            width="5"
            height="48"
            transform="rotate(180 40 396)"
            fill="#111111"
          />
          <rect
            x="195"
            y="396"
            width="5"
            height="48"
            transform="rotate(180 195 396)"
            fill="#111111"
          />
          <rect
            x="55"
            y="333"
            width="5.00001"
            height="120"
            transform="rotate(-90 55 333)"
            fill="#111111"
          />
          <rect
            x="175"
            y="411"
            width="4.99999"
            height="120"
            transform="rotate(90 175 411)"
            fill="#111111"
          />
        </g>
        <path
          d="M58.0859 361V352.093H54.2715V349.55H64.4502V352.093H60.6357V361H58.0859ZM65.7285 361V352.093H68.2715V361H65.7285ZM65.7285 350.821V348.278H68.2715V350.821H65.7285ZM75.9072 355.914V354.643H72.0859V355.914H75.9072ZM70.8145 361V359.729H69.543V353.364H70.8145V352.093H77.1787V353.364H78.4502V357.186H72.0859V358.457H77.1787V361H70.8145ZM70.8145 350.821V349.55H72.0859V348.278H75.9072V349.55H77.1787V350.821H74.6289V349.55H73.3574V350.821H70.8145ZM75.9072 348.278V347H77.1787V345.729H79.7217V347H78.4502V348.278H75.9072ZM79.7285 361V352.093H82.2715V353.364H83.543V352.093H87.3643V353.364H88.6357V361H86.0928V354.643H83.543V355.914H82.2715V361H79.7285ZM100.093 358.457V355.914H96.2715V358.457H100.093ZM95 361V359.729H93.7285V354.643H95V353.364H98.8145V354.643H100.093V352.093H97.543V350.821H100.093V349.55H102.636V350.821H103.907V352.093H102.636V361H95ZM110.278 358.457V354.643H106.457V358.457H110.278ZM107.729 363.543V361H105.186V359.729H103.914V353.364H105.186V352.093H111.55V353.364H112.821V359.729H111.55V361H110.278V363.543H107.729ZM105.186 350.821V349.55H106.457V348.278H107.729V347H109V348.278H110.278V349.55H111.55V350.821H109V349.55H107.729V350.821H105.186ZM117.914 361V349.55H120.457V353.364H121.729V352.093H125.55V353.364H126.821V361H124.278V354.643H121.729V355.914H120.457V361H117.914ZM128.1 361V352.093H130.643V361H128.1ZM128.1 350.821V348.278H130.643V350.821H128.1ZM138.278 355.914V354.643H134.457V355.914H138.278ZM135.729 363.543V361H133.186V359.729H131.914V353.364H133.186V352.093H139.55V353.364H140.821V357.186H134.457V358.457H139.55V361H138.278V363.543H135.729ZM133.186 350.821V349.55H134.457V348.278H135.729V347H137V348.278H138.278V349.55H139.55V350.821H137V349.55H135.729V350.821H133.186ZM142.1 361V352.093H144.643V353.364H145.914V352.093H149.735V353.364H151.007V361H148.464V354.643H145.914V355.914H144.643V361H142.1ZM158.643 361V359.729H157.371V354.643H156.1V352.093H157.371V349.55H159.914V352.093H162.464V354.643H159.914V358.457H162.464V361H158.643ZM170.106 358.457V357.186H166.285V358.457H170.106ZM167.557 363.543V361H165.014V359.729H163.742V357.186H165.014V355.914H170.106V354.643H165.014V352.093H171.378V353.364H172.649V361H170.106V363.543H167.557ZM173.928 361V352.093H176.471V361H173.928ZM173.928 350.821V348.278H176.471V350.821H173.928Z"
          fill="#38682D"
        />
        <text
          x="95"
          y="390"
          fill="#38682D"
          fontSize="24"
          fontWeight="800"
          textAnchor="middle"
          className="uppercase"
        >
          {progress}
        </text>
        <g clipPath="url(#clip21_3_10184)">
          <path
            d="M166.998 292.001H176.999V319.003H167.001V329H35V328.999H44.999V319H35V292H45V282H166.998V292.001Z"
            fill="#17B26A"
          />
          <g clipPath="url(#clip22_3_10184)">
            <rect
              x="44.9902"
              y="282"
              width="122.008"
              height="5"
              fill="#111111"
            />
            <rect
              x="44.999"
              y="324"
              width="122.002"
              height="5"
              fill="#111111"
            />
            <rect
              width="26.9999"
              height="5.00198"
              transform="matrix(-1.66192e-06 -1 1 -1.14969e-09 171.998 319)"
              fill="#111111"
            />
            <rect
              width="27"
              height="5"
              transform="matrix(1.66609e-06 -1 -1 -1.14681e-09 40 319)"
              fill="#111111"
            />
            <rect
              width="5"
              height="5"
              transform="matrix(-1 0 0 1 45 287)"
              fill="#111111"
            />
            <rect
              width="5"
              height="5"
              transform="matrix(-1 0 0 1 171.998 287)"
              fill="#111111"
            />
            <rect
              x="44.999"
              y="324"
              width="5"
              height="5"
              transform="rotate(180 44.999 324)"
              fill="#111111"
            />
            <rect
              x="172.001"
              y="324"
              width="5"
              height="5"
              transform="rotate(180 172.001 324)"
              fill="#111111"
            />
          </g>
          <path
            d="M60.1562 313.5V300.414H63.0625V304.773H65.9688V300.414H68.8828V313.5H65.9688V307.688H63.0625V313.5H60.1562ZM76.1562 310.594V306.234H73.25V310.594H76.1562ZM71.7969 313.5V312.047H70.3438V304.773H71.7969V303.32H77.6172V304.773H79.0703V312.047H77.6172V313.5H71.7969ZM86.3438 310.594V309.141H83.4375V310.594H86.3438ZM81.9844 313.5V312.047H80.5312V309.141H81.9844V307.688H86.3438V306.234H81.9844V303.32H87.8047V304.773H89.2578V313.5H81.9844ZM84.8906 301.867V300.414H83.4375V298.961H81.9844V297.5H86.3438V300.414H87.8047V301.867H84.8906ZM90.7188 313.5V303.32H93.625V304.773H95.0781V303.32H97.9922V304.773H99.4453V313.5H96.5312V306.234H95.0781V307.688H93.625V313.5H90.7188ZM108.172 313.5V312.047H106.719V306.234H105.266V303.32H106.719V300.414H109.625V303.32H112.539V306.234H109.625V310.594H112.539V313.5H108.172ZM114 313.5V300.414H116.906V304.773H118.359V303.32H121.273V304.773H122.727V313.5H119.812V306.234H118.359V307.688H116.906V313.5H114ZM130 310.594V309.141H127.094V310.594H130ZM125.641 313.5V312.047H124.188V309.141H125.641V307.688H130V306.234H125.641V303.32H131.461V304.773H132.914V313.5H125.641ZM128.547 301.867V300.414H127.094V298.961H125.641V297.5H130V300.414H131.461V301.867H128.547ZM134.375 313.5V303.32H137.281V304.773H138.734V303.32H141.648V304.773H143.102V313.5H140.188V306.234H138.734V307.688H137.281V313.5H134.375ZM144.562 313.5V300.414H147.469V304.773H148.922V303.32H151.836V304.773H153.289V313.5H150.375V306.234H148.922V307.688H147.469V313.5H144.562Z"
            fill="white"
          />
        </g>
        <g clipPath="url(#clip23_3_10184)">
          <path
            d="M789 301H799V589H789V599H245V589H235V301H245V291H789V301Z"
            fill="#FFFDFA"
          />
          <path
            d="M789 301H799V589H789V599H245V589H235V301H245V291H789V301Z"
            fill="url(#pattern4_3_10184)"
          />
          <rect x="255" y="281" width="524" height="10" fill="#FA7036" />
          <g style={{ mixBlendMode: "soft-light" }}>
            <rect x="255" y="291" width="524" height="10" fill="white" />
          </g>
          <rect x="255" y="599" width="524" height="10" fill="#FA7036" />
          <g style={{ mixBlendMode: "color-burn" }} opacity={0.3}>
            <rect x="255" y="589" width="524" height="10" fill="black" />
          </g>
          <rect
            x="799"
            y="579"
            width="268"
            height="9.99997"
            transform="rotate(-90 799 579)"
            fill="#FA7036"
          />
          <rect
            width="268"
            height="10"
            transform="matrix(1.083e-07 -1 -1 -1.76425e-08 235 579)"
            fill="#FA7036"
          />
          <rect x="779" y="291" width="10" height="10" fill="#FA7036" />
          <g style={{ mixBlendMode: "soft-light" }}>
            <rect x="779" y="301" width="10" height="10" fill="white" />
          </g>
          <rect x="789" y="301" width="10" height="10" fill="#FA7036" />
          <rect
            width="10"
            height="10"
            transform="matrix(-1 0 0 1 255 291)"
            fill="#FA7036"
          />
          <g style={{ mixBlendMode: "soft-light" }}>
            <rect
              width="10"
              height="10"
              transform="matrix(-1 0 0 1 255 301)"
              fill="white"
            />
          </g>
          <rect
            width="10"
            height="10"
            transform="matrix(-1 0 0 1 245 301)"
            fill="#FA7036"
          />
          <g style={{ mixBlendMode: "soft-light" }}>
            <rect
              width="10"
              height="10"
              transform="matrix(-1 0 0 1 245 311)"
              fill="white"
            />
          </g>
          <rect
            width="10"
            height="10"
            transform="matrix(1 0 0 -1 779 599)"
            fill="#FA7036"
          />
          <g style={{ mixBlendMode: "color-burn" }} opacity={0.3}>
            <rect
              width="10"
              height="10"
              transform="matrix(1 0 0 -1 779 589)"
              fill="black"
            />
          </g>
          <rect
            width="10"
            height="10"
            transform="matrix(1 0 0 -1 789 589)"
            fill="#FA7036"
          />
          <g style={{ mixBlendMode: "color-burn" }} opacity={0.3}>
            <rect
              width="10"
              height="10"
              transform="matrix(1 0 0 -1 789 579)"
              fill="black"
            />
          </g>
          <rect
            x="255"
            y="599"
            width="10"
            height="10"
            transform="rotate(180 255 599)"
            fill="#FA7036"
          />
          <g style={{ mixBlendMode: "color-burn" }} opacity={0.3}>
            <rect
              x="255"
              y="589"
              width="10"
              height="10"
              transform="rotate(180 255 589)"
              fill="black"
            />
          </g>
          <rect
            x="245"
            y="589"
            width="10"
            height="10"
            transform="rotate(180 245 589)"
            fill="#FA7036"
          />
        </g>
        <rect
          x="166.976"
          y="548.701"
          width="30"
          height="5"
          transform="rotate(-30.0485 166.976 548.701)"
          fill="#FFD932"
        />
        <rect
          x="156.495"
          y="560.54"
          width="60"
          height="60"
          transform="rotate(-30.0485 156.495 560.54)"
          fill="#FFD932"
        />
        <rect
          x="159.678"
          y="576.027"
          width="70"
          height="30"
          transform="rotate(-30.0485 159.678 576.027)"
          fill="#FFD932"
        />
        <rect
          width="5"
          height="5"
          transform="matrix(-0.865602 0.500733 0.500733 0.865602 172.196 597.667)"
          fill="#FFBB31"
        />
        <rect
          width="5"
          height="5"
          transform="matrix(-0.865602 0.500733 0.500733 0.865602 232.788 562.616)"
          fill="#FFBB31"
        />
        <rect
          width="5"
          height="10"
          transform="matrix(-0.865602 0.500733 0.500733 0.865602 179.028 599.492)"
          fill="#FFBB31"
        />
        <rect
          width="5"
          height="15"
          transform="matrix(-0.865602 0.500733 0.500733 0.865602 232.109 551.456)"
          fill="#FFBB31"
        />
        <rect
          width="5"
          height="15"
          transform="matrix(-0.865602 0.500733 0.500733 0.865602 224.599 538.472)"
          fill="#FFE56F"
        />
        <rect
          width="5"
          height="15"
          transform="matrix(-0.865602 0.500733 0.500733 0.865602 164.686 584.683)"
          fill="#FFE56F"
        />
        <rect
          width="5"
          height="10"
          transform="matrix(-0.865602 0.500733 0.500733 0.865602 215.263 532.32)"
          fill="#FFE56F"
        />
        <rect
          width="10"
          height="10"
          transform="matrix(-0.865602 0.500733 0.500733 0.865602 190.188 598.812)"
          fill="#FFBB31"
        />
        <rect
          width="15"
          height="10"
          transform="matrix(-0.865602 0.500733 0.500733 0.865602 235.292 566.944)"
          fill="#FFBB31"
        />
        <rect
          width="20"
          height="10"
          transform="matrix(-0.865602 0.500733 0.500733 0.865602 233.468 573.775)"
          fill="#FFBB31"
        />
        <rect
          width="50"
          height="15"
          transform="matrix(-0.865602 0.500733 0.500733 0.865602 231.644 580.607)"
          fill="#FFBB31"
        />
        <rect
          x="155.815"
          y="549.38"
          width="10"
          height="5"
          transform="rotate(-30.0485 155.815 549.38)"
          fill="#111111"
        />
        <rect
          x="158.319"
          y="553.708"
          width="15"
          height="10"
          transform="rotate(-30.0485 158.319 553.708)"
          fill="#FFE56F"
        />
        <rect
          x="156.495"
          y="560.54"
          width="15"
          height="10"
          transform="rotate(-30.0485 156.495 560.54)"
          fill="#FFE56F"
        />
        <rect
          x="164.472"
          y="544.373"
          width="10"
          height="10"
          transform="rotate(-30.0485 164.472 544.373)"
          fill="#FFE56F"
        />
        <rect
          x="154.671"
          y="567.371"
          width="10"
          height="10"
          transform="rotate(-30.0485 154.671 567.371)"
          fill="#FFE56F"
        />
        <rect
          x="155.35"
          y="578.531"
          width="10"
          height="10"
          transform="rotate(-30.0485 155.35 578.531)"
          fill="#FFE56F"
        />
        <rect
          width="10"
          height="5"
          transform="matrix(0.865602 -0.500733 -0.500733 -0.865602 195.874 618.628)"
          fill="#111111"
        />
        <rect
          width="10"
          height="5"
          transform="matrix(-0.865602 0.500733 0.500733 0.865602 199.096 524.343)"
          fill="#111111"
        />
        <rect
          width="10"
          height="5"
          transform="matrix(-0.865602 0.500733 0.500733 0.865602 201.6 528.671)"
          fill="#FFE56F"
        />
        <rect
          x="239.154"
          y="593.591"
          width="10"
          height="5"
          transform="rotate(149.952 239.154 593.591)"
          fill="#111111"
        />
        <rect
          width="5"
          height="5"
          transform="matrix(-0.865602 0.500733 0.500733 0.865602 158.319 553.708)"
          fill="#111111"
        />
        <rect
          width="40"
          height="5"
          transform="matrix(-0.865602 0.500733 0.500733 0.865602 219.805 570.127)"
          fill="#111111"
        />
        <rect
          width="20"
          height="5"
          transform="matrix(-0.865602 0.500733 0.500733 0.865602 213.652 579.462)"
          fill="#E53B68"
        />
        <rect
          width="20"
          height="5"
          transform="matrix(-0.865602 0.500733 0.500733 0.865602 216.155 583.791)"
          fill="#F55277"
        />
        <rect
          width="10"
          height="5"
          transform="matrix(-0.865602 0.500733 0.500733 0.865602 214.331 590.622)"
          fill="#F55277"
        />
        <rect
          width="5"
          height="5"
          transform="matrix(-0.865602 0.500733 0.500733 0.865602 182.677 585.828)"
          fill="#111111"
        />
        <rect
          width="5"
          height="5"
          transform="matrix(-0.865602 0.500733 0.500733 0.865602 221.629 563.295)"
          fill="#111111"
        />
        <rect
          x="165.83"
          y="566.692"
          width="10"
          height="5"
          transform="rotate(-30.0485 165.83 566.692)"
          fill="#111111"
        />
        <rect
          x="170.838"
          y="575.348"
          width="10"
          height="5"
          transform="rotate(-30.0485 170.838 575.348)"
          fill="#111111"
        />
        <rect
          width="5"
          height="5"
          transform="matrix(-0.865602 0.500733 0.500733 0.865602 181.317 563.509)"
          fill="#111111"
        />
        <rect
          width="10"
          height="5"
          transform="matrix(-0.865602 0.500733 0.500733 0.865602 209.11 541.655)"
          fill="#111111"
        />
        <rect
          width="10"
          height="5"
          transform="matrix(-0.865602 0.500733 0.500733 0.865602 214.118 550.312)"
          fill="#111111"
        />
        <rect
          x="198.63"
          y="553.494"
          width="5"
          height="5"
          transform="rotate(-30.0485 198.63 553.494)"
          fill="#111111"
        />
        <rect
          x="193.371"
          y="614.3"
          width="5"
          height="5"
          transform="rotate(149.952 193.371 614.3)"
          fill="#111111"
        />
        <rect
          x="201.6"
          y="528.671"
          width="5"
          height="5"
          transform="rotate(-30.0485 201.6 528.671)"
          fill="#111111"
        />
        <rect
          width="5"
          height="5"
          transform="matrix(0.865602 -0.500733 -0.500733 -0.865602 236.65 589.263)"
          fill="#111111"
        />
        <rect
          width="5"
          height="5"
          transform="matrix(-0.865602 0.500733 0.500733 0.865602 156.495 560.54)"
          fill="#111111"
        />
        <rect
          width="5"
          height="5"
          transform="matrix(-0.865602 0.500733 0.500733 0.865602 165.151 555.532)"
          fill="white"
        />
        <rect
          width="5"
          height="5"
          transform="matrix(-0.865602 0.500733 0.500733 0.865602 163.327 562.364)"
          fill="white"
        />
        <rect
          width="5"
          height="5"
          transform="matrix(-0.865602 0.500733 0.500733 0.865602 233.468 573.775)"
          fill="#FFCF7B"
        />
        <rect
          width="5"
          height="5"
          transform="matrix(-0.865602 0.500733 0.500733 0.865602 231.644 580.607)"
          fill="#FFCF7B"
        />
        <rect
          x="186.539"
          y="612.476"
          width="5"
          height="5"
          transform="rotate(149.952 186.539 612.476)"
          fill="#111111"
        />
        <rect
          x="208.431"
          y="530.496"
          width="5"
          height="5"
          transform="rotate(-30.0485 208.431 530.496)"
          fill="#111111"
        />
        <rect
          x="204.104"
          y="532.999"
          width="5"
          height="5"
          transform="rotate(-30.0485 204.104 532.999)"
          fill="#FFE56F"
        />
        <rect
          width="5"
          height="5"
          transform="matrix(0.865602 -0.500733 -0.500733 -0.865602 238.475 582.432)"
          fill="#111111"
        />
        <rect
          x="161.968"
          y="540.044"
          width="30"
          height="5"
          transform="rotate(-30.0485 161.968 540.044)"
          fill="#111111"
        />
        <rect
          x="164.472"
          y="544.373"
          width="30"
          height="5"
          transform="rotate(-30.0485 164.472 544.373)"
          fill="#FFE56F"
        />
        <rect
          width="30"
          height="5"
          transform="matrix(0.865602 -0.500733 -0.500733 -0.865602 207.034 617.949)"
          fill="#111111"
        />
        <rect
          x="155.35"
          y="578.531"
          width="30"
          height="5"
          transform="rotate(59.9515 155.35 578.531)"
          fill="#111111"
        />
        <rect
          x="228.926"
          y="535.969"
          width="30"
          height="5"
          transform="rotate(59.9515 228.926 535.969)"
          fill="#111111"
        />
        <rect
          x="155.35"
          y="578.531"
          width="10"
          height="5"
          transform="rotate(-120.048 155.35 578.531)"
          fill="#111111"
        />
        <rect
          width="10"
          height="5"
          transform="matrix(0.500733 0.865602 0.865602 -0.500733 170.372 604.499)"
          fill="#111111"
        />
        <rect
          width="10"
          height="5"
          transform="matrix(-0.500733 -0.865602 -0.865602 0.500733 224.599 538.472)"
          fill="#111111"
        />
        <rect
          x="239.62"
          y="564.44"
          width="10"
          height="5"
          transform="rotate(59.9515 239.62 564.44)"
          fill="#111111"
        />
        <rect x="179" y="23" width="51" height="5" fill="#111111" />
        <path
          d="M235 33H240V67H230V77H179V67H169V33H174V28L235 28V33Z"
          fill="white"
        />
        <rect x="230" y="28" width="5" height="5" fill="#111111" />
        <rect
          width="5"
          height="5"
          transform="matrix(-1 0 0 1 179 28)"
          fill="#111111"
        />
        <rect
          width="5"
          height="5"
          transform="matrix(-1 0 0 1 240 62)"
          fill="#111111"
        />
        <rect x="169" y="62" width="5" height="5" fill="#111111" />
        <rect x="235" y="33" width="5" height="5" fill="#111111" />
        <rect
          width="5"
          height="5"
          transform="matrix(-1 0 0 1 174 33)"
          fill="#111111"
        />
        <rect
          width="5"
          height="5"
          transform="matrix(-1 0 0 1 235 67)"
          fill="#111111"
        />
        <rect
          width="5"
          height="15"
          transform="matrix(-1 0 0 1 230 72)"
          fill="#111111"
        />
        <rect x="174" y="67" width="5" height="5" fill="#111111" />
        <rect x="179" y="72" width="41" height="5" fill="#111111" />
        <rect x="220" y="77" width="5" height="5" fill="#111111" />
        <rect
          x="164"
          y="62"
          width="24"
          height="5"
          transform="rotate(-90 164 62)"
          fill="#111111"
        />
        <rect
          x="240"
          y="62"
          width="24"
          height="5"
          transform="rotate(-90 240 62)"
          fill="#111111"
        />
        <rect
          x="208"
          y="62"
          width="25"
          height="5"
          transform="rotate(-90 208 62)"
          fill="#F04438"
        />
        <rect
          x="184"
          y="57"
          width="15"
          height="5"
          transform="rotate(-90 184 57)"
          fill="#F04438"
        />
        <rect
          x="199"
          y="57"
          width="15"
          height="5"
          transform="rotate(-90 199 57)"
          fill="#F04438"
        />
        <rect
          x="218"
          y="47"
          width="10"
          height="5"
          transform="rotate(-90 218 47)"
          fill="#F04438"
        />
        <rect
          x="218"
          y="62"
          width="10"
          height="5"
          transform="rotate(-90 218 62)"
          fill="#F04438"
        />
        <rect
          x="213"
          y="52"
          width="5"
          height="5"
          transform="rotate(-90 213 52)"
          fill="#F04438"
        />
        <rect
          x="189"
          y="42"
          width="5"
          height="10"
          transform="rotate(-90 189 42)"
          fill="#F04438"
        />
        <rect
          x="189"
          y="62"
          width="5"
          height="10"
          transform="rotate(-90 189 62)"
          fill="#F04438"
        />
        <defs>
          <pattern
            id="pattern0_3_10184"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use
              xlinkHref="#image0_3_10184"
              transform="translate(0 -0.125) scale(0.000833333)"
            />
          </pattern>
          <pattern
            id="pattern1_3_10184"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use
              xlinkHref="#image0_3_10184"
              transform="translate(0 -0.125) scale(0.000833333)"
            />
          </pattern>
          <pattern
            id="pattern2_3_10184"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use
              xlinkHref="#image0_3_10184"
              transform="translate(0 -0.125) scale(0.000833333)"
            />
          </pattern>
          <pattern
            id="pattern3_3_10184"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use
              xlinkHref="#image1_3_10184"
              transform="scale(0.00195312 0.00285645)"
            />
          </pattern>
          <pattern
            id="pattern4_3_10184"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use
              xlinkHref="#image2_3_10184"
              transform="matrix(0.0013587 0 0 0.00245631 0 -0.660681)"
            />
          </pattern>
          <clipPath id="clip0_3_10184">
            <rect
              width="379"
              height="96"
              fill="white"
              transform="translate(989 276)"
            />
          </clipPath>
          <clipPath id="clip1_3_10184">
            <rect
              width="379"
              height="96"
              fill="white"
              transform="translate(989 276)"
            />
          </clipPath>
          <clipPath id="clip2_3_10184">
            <rect
              width="80"
              height="80"
              fill="white"
              transform="translate(997 284)"
            />
          </clipPath>
          <clipPath id="clip3_3_10184">
            <rect
              width="80"
              height="80"
              fill="white"
              transform="translate(997 284)"
            />
          </clipPath>
          <clipPath id="clip4_3_10184">
            <rect
              width="379"
              height="96"
              fill="white"
              transform="translate(989 380)"
            />
          </clipPath>
          <clipPath id="clip5_3_10184">
            <rect
              width="379"
              height="96"
              fill="white"
              transform="translate(989 380)"
            />
          </clipPath>
          <clipPath id="clip6_3_10184">
            <rect
              width="80"
              height="80"
              fill="white"
              transform="translate(997 388)"
            />
          </clipPath>
          <clipPath id="clip7_3_10184">
            <rect
              width="80"
              height="80"
              fill="white"
              transform="translate(997 388)"
            />
          </clipPath>
          <clipPath id="clip8_3_10184">
            <rect
              width="379"
              height="96"
              fill="white"
              transform="translate(989 484)"
            />
          </clipPath>
          <clipPath id="clip9_3_10184">
            <rect
              width="379"
              height="96"
              fill="white"
              transform="translate(989 484)"
            />
          </clipPath>
          <clipPath id="clip10_3_10184">
            <rect
              width="80"
              height="80"
              fill="white"
              transform="translate(997 492)"
            />
          </clipPath>
          <clipPath id="clip11_3_10184">
            <rect
              width="80"
              height="80"
              fill="white"
              transform="translate(997 492)"
            />
          </clipPath>
          <clipPath id="clip12_3_10184">
            <rect
              width="357"
              height="111"
              fill="white"
              transform="translate(1007 629)"
            />
          </clipPath>
          <clipPath id="clip13_3_10184">
            <rect
              width="36"
              height="9"
              fill="white"
              transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 537 88)"
            />
          </clipPath>
          <clipPath id="clip14_3_10184">
            <rect
              width="36"
              height="9"
              fill="white"
              transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 518 88)"
            />
          </clipPath>
          <clipPath id="clip15_3_10184">
            <rect
              width="36"
              height="9"
              fill="white"
              transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 499 88)"
            />
          </clipPath>
          <clipPath id="clip16_3_10184">
            <rect
              width="25"
              height="11"
              fill="white"
              transform="matrix(-1 0 0 1 904 245)"
            />
          </clipPath>
          <clipPath id="clip17_3_10184">
            <rect
              width="25"
              height="11"
              fill="white"
              transform="matrix(-1 0 0 1 904 261)"
            />
          </clipPath>
          <clipPath id="clip18_3_10184">
            <rect
              width="25"
              height="11"
              fill="white"
              transform="matrix(-1 0 0 1 904 277)"
            />
          </clipPath>
          <clipPath id="clip19_3_10184">
            <rect
              width="674"
              height="162"
              fill="white"
              transform="translate(177 102)"
            />
          </clipPath>
          <clipPath id="clip20_3_10184">
            <rect
              width="160"
              height="88"
              fill="white"
              transform="translate(35 328)"
            />
          </clipPath>
          <clipPath id="clip21_3_10184">
            <rect
              width="142"
              height="47"
              fill="white"
              transform="translate(35 282)"
            />
          </clipPath>
          <clipPath id="clip22_3_10184">
            <rect
              width="142"
              height="47"
              fill="white"
              transform="translate(35 282)"
            />
          </clipPath>
          <clipPath id="clip23_3_10184">
            <rect
              width="584"
              height="328"
              fill="white"
              transform="translate(225 281)"
            />
          </clipPath>
          <image
            id="image0_3_10184"
            width="1200"
            height="1500"
            preserveAspectRatio="none"
            href=""
          />
          <image
            id="image1_3_10184"
            width="512"
            height="512"
            preserveAspectRatio="none"
            href=""
          />
          <image
            id="image2_3_10184"
            width="736"
            height="743"
            preserveAspectRatio="none"
            href=""
          />
        </defs>
      </svg>
      <div
        className="absolute flex flex-col overflow-y-scroll items-start justify-start text-left text-[12px] font-medium text-[#344054] wrap-break-word"
        role="text"
        tabIndex={0}
        style={{
          left: `${(985 / VIEWBOX_WIDTH) * 100}%`,
          top: `${(250 / VIEWBOX_HEIGHT) * 100}%`,
          width: `${(380 / VIEWBOX_WIDTH) * 100}%`,
          height: `${(365 / VIEWBOX_HEIGHT) * 100}%`,
        }}
      >
        {gift.length > 0 ? (
          gift.map((giftItem, index) => (
            <GiftCard key={`${giftItem.name}-${index}`} text={giftItem.name} />
          ))
        ) : (
          <p className="text-center m-auto w-full">Chưa có quà</p>
        )}
      </div>
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: `${(1007 / VIEWBOX_WIDTH) * 100}%`,
          top: `${(629 / VIEWBOX_HEIGHT) * 100}%`,
          width: `${(340 / VIEWBOX_WIDTH) * 100}%`,
        }}
      >
        <ButtonLighter
          className="w-full h-[16px] md:h-[42px] text-white text-xs flex items-center justify-center px-2 md:px-4"
          onClick={onPlayAgain}
        >
          <span className="text-[6px] md:text-xs">Chơi lại</span>
        </ButtonLighter>
      </div>
    </div>
  );
}
