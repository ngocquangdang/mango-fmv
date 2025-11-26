import React from "react";
import ButtonLighter from "./button-lighter";

interface PixelProgressProps {
  progress: number;
  className?: string;
  style?: React.CSSProperties;
  onClickBtn?: () => void;
}

const PixelProgressSVG = ({ progress }: { progress: number }) => (
  <svg
    viewBox="0 0 1469 245"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    style={{ width: "100%", height: "100%" }}
  >
    <path d="M1454 104V114H1464V245H1063V104H1454Z" fill="#FA7036" />
    <rect
      width="10"
      height="141"
      transform="matrix(-1 0 0 1 1073 104)"
      fill="#B25229"
    />
    <rect
      width="10"
      height="25"
      transform="matrix(-1 0 0 1 1083 104)"
      fill="#B25229"
    />
    <rect x="1073" y="99" width="371" height="5" fill="#111111" />
    <rect x="1464" y="124" width="5" height="121" fill="#111111" />
    <rect x="1444" y="104" width="10" height="5" fill="#111111" />
    <rect x="1454" y="109" width="5" height="5" fill="#111111" />
    <rect x="1459" y="114" width="5" height="10" fill="#111111" />

    <rect x="153" y="55" width="768" height="190" fill="#FF9442" />
    <rect x="153" y="45" width="767" height="10" fill="#111111" />
    <rect x="153" y="55" width="767" height="10" fill="#FFB67E" />
    <rect
      width="10"
      height="10"
      transform="matrix(-4.37114e-08 1 1 4.37114e-08 896 55.0012)"
      fill="#D92D20"
    />
    <rect
      width="10"
      height="10"
      transform="matrix(-4.37114e-08 1 1 4.37114e-08 866 55.0012)"
      fill="#D92D20"
    />
    <rect
      width="10"
      height="10"
      transform="matrix(-4.37114e-08 1 1 4.37114e-08 836 55.0012)"
      fill="#D92D20"
    />
    <rect
      width="10"
      height="10"
      transform="matrix(-4.37114e-08 1 1 4.37114e-08 886 65.0012)"
      fill="#D92D20"
    />
    <rect
      width="10"
      height="10"
      transform="matrix(-4.37114e-08 1 1 4.37114e-08 876 75.0012)"
      fill="#D92D20"
    />
    <rect
      width="10"
      height="10"
      transform="matrix(-4.37114e-08 1 1 4.37114e-08 856 65.0012)"
      fill="#D92D20"
    />
    <rect
      width="10"
      height="10"
      transform="matrix(-4.37114e-08 1 1 4.37114e-08 846 75.0012)"
      fill="#D92D20"
    />
    <rect
      width="10"
      height="10"
      transform="matrix(-4.37114e-08 1 1 4.37114e-08 826 65.0012)"
      fill="#D92D20"
    />
    <rect
      width="10"
      height="10"
      transform="matrix(-4.37114e-08 1 1 4.37114e-08 816 75.0012)"
      fill="#D92D20"
    />
    <path d="M1043 45V65H1063V245H920V45H1043Z" fill="#FF9442" />
    <rect x="920" y="35" width="113" height="10" fill="#111111" />
    <rect x="920" y="45" width="113" height="10" fill="#FFB67E" />
    <rect
      x="1073"
      y="75"
      width="45"
      height="10"
      transform="rotate(90 1073 75)"
      fill="#111111"
    />
    <rect
      x="1063"
      y="75"
      width="45"
      height="10"
      transform="rotate(90 1063 75)"
      fill="#FA7036"
    />
    <rect x="1053" y="65" width="10" height="10" fill="#111111" />
    <rect x="1043" y="65" width="10" height="10" fill="#FA7036" />
    <rect x="1053" y="120" width="10" height="125" fill="#111111" />
    <rect x="1043" y="120" width="10" height="125" fill="#FA7036" />
    <rect x="1043" y="55" width="10" height="10" fill="#111111" />
    <rect x="1033" y="55" width="10" height="10" fill="#FA7036" />
    <rect x="1033" y="45" width="10" height="10" fill="#111111" />
    <rect
      x="933"
      y="60"
      width="3"
      height="85"
      transform="rotate(-90 933 60)"
      fill="#111111"
    />
    <path d="M933 63L933 60L1018 60L1018 63L933 63Z" fill="#F0C446" />
    <rect
      x="930"
      y="63"
      width="3"
      height="3"
      transform="rotate(-90 930 63)"
      fill="#111111"
    />
    <rect
      x="1018"
      y="63"
      width="3"
      height="3"
      transform="rotate(-90 1018 63)"
      fill="#111111"
    />
    <rect
      x="933"
      y="66"
      width="3"
      height="85"
      transform="rotate(-90 933 66)"
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
    <g clip-path="url(#clip1_3_9909)">
      <path
        d="M306 92H316V213H306V223H77V213H67V92H77V82H306V92Z"
        fill="white"
      />
      <rect x="301" y="82" width="5" height="5" fill="#111111" />
      <rect
        x="82"
        y="223"
        width="5"
        height="5"
        transform="rotate(180 82 223)"
        fill="#111111"
      />
      <rect
        width="5"
        height="5"
        transform="matrix(-1 0 0 1 82 82)"
        fill="#111111"
      />
      <rect
        width="5"
        height="5"
        transform="matrix(1 0 0 -1 301 223)"
        fill="#111111"
      />
      <rect x="306" y="87" width="5" height="5" fill="#111111" />
      <rect
        x="77"
        y="218"
        width="5"
        height="5"
        transform="rotate(180 77 218)"
        fill="#111111"
      />
      <rect
        width="5"
        height="5"
        transform="matrix(-1 0 0 1 77 87)"
        fill="#111111"
      />
      <rect
        width="5"
        height="5"
        transform="matrix(1 0 0 -1 306 218)"
        fill="#111111"
      />
      <rect x="311" y="92" width="5" height="5" fill="#111111" />
      <rect
        x="72"
        y="213"
        width="5"
        height="5"
        transform="rotate(180 72 213)"
        fill="#111111"
      />
      <rect
        width="5"
        height="5"
        transform="matrix(-1 0 0 1 72 92)"
        fill="#111111"
      />
      <rect
        width="5"
        height="5"
        transform="matrix(1 0 0 -1 311 213)"
        fill="#111111"
      />
      <rect
        x="67"
        y="208"
        width="5"
        height="111"
        transform="rotate(180 67 208)"
        fill="#111111"
      />
      <rect
        x="321"
        y="208"
        width="5"
        height="111"
        transform="rotate(180 321 208)"
        fill="#111111"
      />
      <rect
        x="82"
        y="82"
        width="5.00001"
        height="219"
        transform="rotate(-90 82 82)"
        fill="#111111"
      />
      <rect
        x="301"
        y="223"
        width="4.99999"
        height="219"
        transform="rotate(90 301 223)"
        fill="#111111"
      />
    </g>
    <path
      d="M102.027 133V118.943H96.0066V114.929H112.071V118.943H106.051V133H102.027ZM114.088 133V118.943H118.101V133H114.088ZM114.088 116.936V112.923H118.101V116.936H114.088ZM130.152 124.973V122.967H124.121V124.973H130.152ZM122.114 133V130.993H120.108V120.949H122.114V118.943H132.158V120.949H134.165V126.98H124.121V128.987H132.158V133H122.114ZM122.114 116.936V114.929H124.121V112.923H130.152V114.929H132.158V116.936H128.134V114.929H126.128V116.936H122.114ZM130.152 112.923V110.905H132.158V108.899H136.172V110.905H134.165V112.923H130.152ZM136.182 133V118.943H140.196V120.949H142.202V118.943H148.233V120.949H150.24V133H146.226V122.967H142.202V124.973H140.196V133H136.182ZM168.321 128.987V124.973H162.29V128.987H168.321ZM160.284 133V130.993H158.277V122.967H160.284V120.949H166.304V122.967H168.321V118.943H164.297V116.936H168.321V114.929H172.334V116.936H174.341V118.943H172.334V133H160.284ZM184.396 128.987V122.967H178.365V128.987H184.396ZM180.372 137.013V133H176.358V130.993H174.352V120.949H176.358V118.943H186.402V120.949H188.409V130.993H186.402V133H184.396V137.013H180.372ZM176.358 116.936V114.929H178.365V112.923H180.372V110.905H182.378V112.923H184.396V114.929H186.402V116.936H182.378V114.929H180.372V116.936H176.358ZM196.446 133V114.929H200.46V120.949H202.466V118.943H208.497V120.949H210.504V133H206.49V122.967H202.466V124.973H200.46V133H196.446ZM212.521 133V118.943H216.534V133H212.521ZM212.521 116.936V112.923H216.534V116.936H212.521ZM228.585 124.973V122.967H222.554V124.973H228.585ZM224.561 137.013V133H220.547V130.993H218.541V120.949H220.547V118.943H230.591V120.949H232.598V126.98H222.554V128.987H230.591V133H228.585V137.013H224.561ZM220.547 116.936V114.929H222.554V112.923H224.561V110.905H226.567V112.923H228.585V114.929H230.591V116.936H226.567V114.929H224.561V116.936H220.547ZM234.616 133V118.943H238.629V120.949H240.635V118.943H246.666V120.949H248.673V133H244.659V122.967H240.635V124.973H238.629V133H234.616ZM260.723 133V130.993H258.717V122.967H256.71V118.943H258.717V114.929H262.73V118.943H266.754V122.967H262.73V128.987H266.754V133H260.723ZM278.815 128.987V126.98H272.785V128.987H278.815ZM274.791 137.013V133H270.778V130.993H268.771V126.98H270.778V124.973H278.815V122.967H270.778V118.943H280.822V120.949H282.829V133H278.815V137.013H274.791ZM284.846 133V118.943H288.859V133H284.846ZM284.846 116.936V112.923H288.859V116.936H284.846Z"
      fill="#EF5C1E"
    />
    <text
      x="170"
      y="190"
      textAnchor="middle"
      fill="black"
      style={{ fontSize: "40px", fontWeight: "bold" }}
    >
      {Math.round(progress)}%
    </text>
    <rect x="1200" width="144" height="99" fill="url(#pattern0_3_9909)" />
    <g clip-path="url(#clip2_3_9909)">
      <path
        d="M317 156L308 165V177L317 186H320V177V165V156H317Z"
        fill="#E4FBCC"
      />
      <rect x="305" y="165" width="3" height="12" fill="#111111" />
      <rect x="308" y="162" width="3" height="3" fill="#111111" />
      <rect
        width="3"
        height="3"
        transform="matrix(1 0 0 -1 308 180)"
        fill="#111111"
      />
      <rect x="311" y="159" width="3" height="3" fill="#111111" />
      <rect
        width="3"
        height="3"
        transform="matrix(1 0 0 -1 311 183)"
        fill="#111111"
      />
      <rect x="317" y="153" width="3" height="3" fill="#111111" />
      <rect x="317" y="186" width="3" height="3" fill="#111111" />
      <rect x="314" y="156" width="3" height="3" fill="#111111" />
      <rect
        width="3"
        height="3"
        transform="matrix(1 0 0 -1 314 186)"
        fill="#111111"
      />
      <path d="M320 156V165V177V186H1000V177V165V156H320Z" fill="#E4FBCC" />
      <rect x="320" y="153" width="680" height="3" fill="#111111" />
      <rect x="320" y="186" width="680" height="3" fill="#111111" />
      <path
        d="M1003 156L1012 165V177L1003 186H1000V177V165V156H1003Z"
        fill="#E4FBCC"
      />
      <rect
        width="3"
        height="12"
        transform="matrix(-1 0 0 1 1015 165)"
        fill="#111111"
      />
      <rect
        width="3"
        height="3"
        transform="matrix(-1 0 0 1 1012 162)"
        fill="#111111"
      />
      <rect
        x="1012"
        y="180"
        width="3"
        height="3"
        transform="rotate(180 1012 180)"
        fill="#111111"
      />
      <rect
        width="3"
        height="3"
        transform="matrix(-1 0 0 1 1009 159)"
        fill="#111111"
      />
      <rect
        x="1009"
        y="183"
        width="3"
        height="3"
        transform="rotate(180 1009 183)"
        fill="#111111"
      />
      <rect
        width="3"
        height="3"
        transform="matrix(-1 0 0 1 1003 153)"
        fill="#111111"
      />
      <rect
        width="3"
        height="3"
        transform="matrix(-1 0 0 1 1003 186)"
        fill="#111111"
      />
      <rect
        width="3"
        height="3"
        transform="matrix(-1 0 0 1 1006 156)"
        fill="#111111"
      />
      <rect
        x="1006"
        y="186"
        width="3"
        height="3"
        transform="rotate(180 1006 186)"
        fill="#111111"
      />
      <g clipPath="url(#green-bar-clip)">
        <path
          d="M320 162L314 168V174L320 180H323V175V167V162H320Z"
          fill="#85E13A"
        />
        <rect x="314" y="165" width="3" height="12" fill="#111111" />
        <rect
          width="3"
          height="3"
          transform="matrix(1 0 0 -1 317 165)"
          fill="#111111"
        />
        <rect
          width="3"
          height="3"
          transform="matrix(1 0 0 -1 317 180)"
          fill="#111111"
        />
        <rect x="320" y="159" width="3" height="3" fill="#111111" />
        <rect
          width="3"
          height="3"
          transform="matrix(1 0 0 -1 320 183)"
          fill="#111111"
        />
        <rect x="323" y="159" width="677" height="3" fill="#111111" />
        <path
          d="M323 162V167.4V174.6V180H1000V174.6V167.4V162H323Z"
          fill="#85E13A"
        />
        <rect x="323" y="180" width="677" height="3" fill="#111111" />
        <path
          d="M1003 162L1009 168V174L1003 180H1000V175V167V162H1003Z"
          fill="#85E13A"
        />
        <rect
          width="3"
          height="12"
          transform="matrix(-1 0 0 1 1009 165)"
          fill="#111111"
        />
        <rect
          x="1006"
          y="165"
          width="3"
          height="3"
          transform="rotate(180 1006 165)"
          fill="#111111"
        />
        <rect
          x="1006"
          y="180"
          width="3"
          height="3"
          transform="rotate(180 1006 180)"
          fill="#111111"
        />
        <rect
          width="3"
          height="3"
          transform="matrix(-1 0 0 1 1003 159)"
          fill="#111111"
        />
        <rect
          x="1003"
          y="183"
          width="3"
          height="3"
          transform="rotate(180 1003 183)"
          fill="#111111"
        />
      </g>
      <path d="M482 156V165V177V186H485V177V165V156H482Z" fill="#F79009" />
      <rect x="482" y="153" width="3" height="3" fill="#111111" />
      <rect x="482" y="186" width="3" height="3" fill="#111111" />
      <path d="M660 156V165V177V186H663V177V165V156H660Z" fill="#F79009" />
      <rect x="660" y="153" width="3" height="3" fill="#111111" />
      <rect x="660" y="186" width="3" height="3" fill="#111111" />
      <path d="M837 156V165V177V186H840V177V165V156H837Z" fill="#F79009" />
      <rect x="837" y="153" width="3" height="3" fill="#111111" />
      <rect x="837" y="186" width="3" height="3" fill="#111111" />
      <path
        d="M456.998 214V210.004H458.996V208.006H460.994V206.008H462.992V204.01H464.99V202.001H466.999V200.003H460.994V202.001H456.998V198.005H458.996V196.007H468.997V198.005H470.995V204.01H468.997V206.008H466.999V208.006H464.99V210.004H470.995V214H456.998ZM475.002 214V212.002H473.004V208.006H477V210.004H483.005V206.008H473.004V196.007H487.001V200.003H477V202.001H485.003V204.01H487.001V212.002H485.003V214H475.002ZM507.003 210.004V208.006H505.005V210.004H507.003ZM495.004 202.001V200.003H493.006V202.001H495.004ZM493.006 214V210.004H495.004V206.008H491.008V204.01H489.01V198.005H491.008V196.007H497.002V198.005H499.011V202.001H501.009V200.003H503.007V196.007H507.003V200.003H505.005V204.01H509.012V206.008H511.01V212.002H509.012V214H503.007V212.002H501.009V208.006H499.011V210.004H497.002V214H493.006Z"
        fill="black"
      />
      <path
        d="M635.996 214V212.002H633.998V208.006H637.994V210.004H643.999V206.008H633.998V196.007H647.995V200.003H637.994V202.001H645.997V204.01H647.995V212.002H645.997V214H635.996ZM660.005 210.004V200.003H654V210.004H660.005ZM652.002 214V212.002H650.004V198.005H652.002V196.007H662.003V198.005H664.001V212.002H662.003V214H652.002ZM684.003 210.004V208.006H682.005V210.004H684.003ZM672.004 202.001V200.003H670.006V202.001H672.004ZM670.006 214V210.004H672.004V206.008H668.008V204.01H666.01V198.005H668.008V196.007H674.002V198.005H676.011V202.001H678.009V200.003H680.007V196.007H684.003V200.003H682.005V204.01H686.012V206.008H688.01V212.002H686.012V214H680.007V212.002H678.009V208.006H676.011V210.004H674.002V214H670.006Z"
        fill="black"
      />
      <path
        d="M814.994 214V208.006H816.992V204.01H818.99V200.003H810.998V196.007H824.995V202.001H822.997V206.008H820.999V210.004H818.99V214H814.994ZM829.002 214V212.002H827.004V208.006H831V210.004H837.005V206.008H827.004V196.007H841.001V200.003H831V202.001H839.003V204.01H841.001V212.002H839.003V214H829.002ZM861.003 210.004V208.006H859.005V210.004H861.003ZM849.004 202.001V200.003H847.006V202.001H849.004ZM847.006 214V210.004H849.004V206.008H845.008V204.01H843.01V198.005H845.008V196.007H851.002V198.005H853.011V202.001H855.009V200.003H857.007V196.007H861.003V200.003H859.005V204.01H863.012V206.008H865.01V212.002H863.012V214H857.007V212.002H855.009V208.006H853.011V210.004H851.002V214H847.006Z"
        fill="black"
      />
      <path
        d="M950.992 214V202.001H946.996V198.005H950.992V196.007H954.999V214H950.992ZM971.005 210.004V200.003H965V210.004H971.005ZM963.002 214V212.002H961.004V198.005H963.002V196.007H973.003V198.005H975.001V212.002H973.003V214H963.002ZM987.011 210.004V200.003H981.006V210.004H987.011ZM979.008 214V212.002H977.01V198.005H979.008V196.007H989.009V198.005H991.007V212.002H989.009V214H979.008ZM1011.01 210.004V208.006H1009.01V210.004H1011.01ZM999.01 202.001V200.003H997.012V202.001H999.01ZM997.012 214V210.004H999.01V206.008H995.014V204.01H993.016V198.005H995.014V196.007H1001.01V198.005H1003.02V202.001H1005.01V200.003H1007.01V196.007H1011.01V200.003H1009.01V204.01H1013.02V206.008H1015.02V212.002H1013.02V214H1007.01V212.002H1005.01V208.006H1003.02V210.004H1001.01V214H997.012Z"
        fill="black"
      />
    </g>
    <path d="M502 118V145H490V118H502Z" fill="#F04438" />
    <path d="M476 118V145H464V118H476Z" fill="#F04438" />
    <path d="M500 126V128H466V126H500Z" fill="#BC1B06" />
    <path d="M490 118V145H488V118H490Z" fill="#BC1B06" />
    <path d="M478 118V145H476V118H478Z" fill="#BC1B06" />
    <path d="M502 98V102H492V98H502Z" fill="#F4EBA7" />
    <path d="M506 102V114H488V102H506Z" fill="#F9C62C" />
    <path d="M476 104V114H462V104H476Z" fill="#F9C62C" />
    <path d="M500 130V145H498V130H500Z" fill="#F9ACBA" />
    <path d="M486 110V114H478V110H486Z" fill="#F9C62C" />
    <path d="M488 110V145H486V110H488Z" fill="#21201E" />
    <path d="M506 110V112H504V110H506Z" fill="#21201E" />
    <path d="M494 98V100H492V98H494Z" fill="#21201E" />
    <path d="M490 112V114H488V112H490Z" fill="#21201E" />
    <path d="M492 110V112H490V110H492Z" fill="#21201E" />
    <path d="M494 108V110H492V108H494Z" fill="#21201E" />
    <path d="M474 102V104H472V102H474Z" fill="#21201E" />
    <path d="M476 102V104H474V102H476Z" fill="#21201E" />
    <path d="M476 104V106H474V104H476Z" fill="#21201E" />
    <path
      d="M473.763 109.762V111.728H471.797V109.762H473.763Z"
      fill="#21201E"
    />
    <path d="M471.796 107.797V109.763H469.83V107.797H471.796Z" fill="#21201E" />
    <path d="M502 124V126H464V124H502Z" fill="#21201E" />
    <path d="M502 145V147H464V145H502Z" fill="#21201E" />
    <path d="M478 116V118H464V116H478Z" fill="#F9ACBA" />
    <path d="M502 116V118H488V116H502Z" fill="#F9ACBA" />
    <path d="M501.932 114V116H463.932V114H501.932Z" fill="#21201E" />
    <path d="M465.983 112V114H461.983V112H465.983Z" fill="#21201E" />
    <path d="M464 102V106H462V102H464Z" fill="#21201E" />
    <path d="M480 112V114H474V112H480Z" fill="#21201E" />
    <path d="M488 108V110H476V108H488Z" fill="#21201E" />
    <path d="M502 98V100H498V98H502Z" fill="#21201E" />
    <path d="M506 112V114H500V112H506Z" fill="#21201E" />
    <path d="M500 96V98H494V96H500Z" fill="#21201E" />
    <path d="M508 106V112H506V106H508Z" fill="#21201E" />
    <path d="M506 102V108H504V102H506Z" fill="#21201E" />
    <path d="M492 98V104H490V98H492Z" fill="#21201E" />
    <path d="M490 102V108H488V102H490Z" fill="#21201E" />
    <path d="M504 98V104H502V98H504Z" fill="#21201E" />
    <path d="M474 100V102H464V100H474Z" fill="#21201E" />
    <path d="M462 104V114H460V104H462Z" fill="#21201E" />
    <path d="M464 116V124H462V116H464Z" fill="#21201E" />
    <path d="M504 116V124H502V116H504Z" fill="#21201E" />
    <path d="M502 126V145H500V126H502Z" fill="#21201E" />
    <path d="M466 126V145H464V126H466Z" fill="#21201E" />
    <path d="M478 106V114H476V106H478Z" fill="#21201E" />
    <path d="M476 106V108H474V106H476Z" fill="#F4EBA7" />
    <path d="M494 102V104H492V102H494Z" fill="#F4EBA7" />
    <path d="M474 104V106H470V104H474Z" fill="#F4EBA7" />
    <path d="M486 110V112H482V110H486Z" fill="#F4EBA7" />
    <path d="M486 116V118H480V116H486Z" fill="#F4EBA7" />
    <path d="M486 118V124H480V118H486Z" fill="white" />
    <path d="M486 126V145H480V126H486Z" fill="white" />
    <path d="M494 104V106H490V104H494Z" fill="#F4EBA7" />
    <path d="M472 102V104H464V102H472Z" fill="#F4EBA7" />
    <path d="M480 116V145H478V116H480Z" fill="#21201E" />
    <path d="M681 118V145H669V118H681Z" fill="#F04438" />
    <path d="M655 118V145H643V118H655Z" fill="#F04438" />
    <path d="M679 126V128H645V126H679Z" fill="#BC1B06" />
    <path d="M669 118V145H667V118H669Z" fill="#BC1B06" />
    <path d="M657 118V145H655V118H657Z" fill="#BC1B06" />
    <path d="M681 98V102H671V98H681Z" fill="#F4EBA7" />
    <path d="M685 102V114H667V102H685Z" fill="#F9C62C" />
    <path d="M655 104V114H641V104H655Z" fill="#F9C62C" />
    <path d="M679 130V145H677V130H679Z" fill="#F9ACBA" />
    <path d="M665 110V114H657V110H665Z" fill="#F9C62C" />
    <path d="M667 110V145H665V110H667Z" fill="#21201E" />
    <path d="M685 110V112H683V110H685Z" fill="#21201E" />
    <path d="M673 98V100H671V98H673Z" fill="#21201E" />
    <path d="M669 112V114H667V112H669Z" fill="#21201E" />
    <path d="M671 110V112H669V110H671Z" fill="#21201E" />
    <path d="M673 108V110H671V108H673Z" fill="#21201E" />
    <path d="M653 102V104H651V102H653Z" fill="#21201E" />
    <path d="M655 102V104H653V102H655Z" fill="#21201E" />
    <path d="M655 104V106H653V104H655Z" fill="#21201E" />
    <path
      d="M652.763 109.762V111.728H650.797V109.762H652.763Z"
      fill="#21201E"
    />
    <path d="M650.796 107.797V109.763H648.83V107.797H650.796Z" fill="#21201E" />
    <path d="M681 124V126H643V124H681Z" fill="#21201E" />
    <path d="M681 145V147H643V145H681Z" fill="#21201E" />
    <path d="M657 116V118H643V116H657Z" fill="#F9ACBA" />
    <path d="M681 116V118H667V116H681Z" fill="#F9ACBA" />
    <path d="M680.932 114V116H642.932V114H680.932Z" fill="#21201E" />
    <path d="M644.983 112V114H640.983V112H644.983Z" fill="#21201E" />
    <path d="M643 102V106H641V102H643Z" fill="#21201E" />
    <path d="M659 112V114H653V112H659Z" fill="#21201E" />
    <path d="M667 108V110H655V108H667Z" fill="#21201E" />
    <path d="M681 98V100H677V98H681Z" fill="#21201E" />
    <path d="M685 112V114H679V112H685Z" fill="#21201E" />
    <path d="M679 96V98H673V96H679Z" fill="#21201E" />
    <path d="M687 106V112H685V106H687Z" fill="#21201E" />
    <path d="M685 102V108H683V102H685Z" fill="#21201E" />
    <path d="M671 98V104H669V98H671Z" fill="#21201E" />
    <path d="M669 102V108H667V102H669Z" fill="#21201E" />
    <path d="M683 98V104H681V98H683Z" fill="#21201E" />
    <path d="M653 100V102H643V100H653Z" fill="#21201E" />
    <path d="M641 104V114H639V104H641Z" fill="#21201E" />
    <path d="M643 116V124H641V116H643Z" fill="#21201E" />
    <path d="M683 116V124H681V116H683Z" fill="#21201E" />
    <path d="M681 126V145H679V126H681Z" fill="#21201E" />
    <path d="M645 126V145H643V126H645Z" fill="#21201E" />
    <path d="M657 106V114H655V106H657Z" fill="#21201E" />
    <path d="M655 106V108H653V106H655Z" fill="#F4EBA7" />
    <path d="M673 102V104H671V102H673Z" fill="#F4EBA7" />
    <path d="M653 104V106H649V104H653Z" fill="#F4EBA7" />
    <path d="M665 110V112H661V110H665Z" fill="#F4EBA7" />
    <path d="M665 116V118H659V116H665Z" fill="#F4EBA7" />
    <path d="M665 118V124H659V118H665Z" fill="white" />
    <path d="M665 126V145H659V126H665Z" fill="white" />
    <path d="M673 104V106H669V104H673Z" fill="#F4EBA7" />
    <path d="M651 102V104H643V102H651Z" fill="#F4EBA7" />
    <path d="M659 116V145H657V116H659Z" fill="#21201E" />
    <path d="M860 118V145H848V118H860Z" fill="#F04438" />
    <path d="M834 118V145H822V118H834Z" fill="#F04438" />
    <path d="M858 126V128H824V126H858Z" fill="#BC1B06" />
    <path d="M848 118V145H846V118H848Z" fill="#BC1B06" />
    <path d="M836 118V145H834V118H836Z" fill="#BC1B06" />
    <path d="M860 98V102H850V98H860Z" fill="#F4EBA7" />
    <path d="M864 102V114H846V102H864Z" fill="#F9C62C" />
    <path d="M834 104V114H820V104H834Z" fill="#F9C62C" />
    <path d="M858 130V145H856V130H858Z" fill="#F9ACBA" />
    <path d="M844 110V114H836V110H844Z" fill="#F9C62C" />
    <path d="M846 110V145H844V110H846Z" fill="#21201E" />
    <path d="M864 110V112H862V110H864Z" fill="#21201E" />
    <path d="M852 98V100H850V98H852Z" fill="#21201E" />
    <path d="M848 112V114H846V112H848Z" fill="#21201E" />
    <path d="M850 110V112H848V110H850Z" fill="#21201E" />
    <path d="M852 108V110H850V108H852Z" fill="#21201E" />
    <path d="M832 102V104H830V102H832Z" fill="#21201E" />
    <path d="M834 102V104H832V102H834Z" fill="#21201E" />
    <path d="M834 104V106H832V104H834Z" fill="#21201E" />
    <path
      d="M831.763 109.762V111.728H829.797V109.762H831.763Z"
      fill="#21201E"
    />
    <path d="M829.796 107.797V109.763H827.83V107.797H829.796Z" fill="#21201E" />
    <path d="M860 124V126H822V124H860Z" fill="#21201E" />
    <path d="M860 145V147H822V145H860Z" fill="#21201E" />
    <path d="M836 116V118H822V116H836Z" fill="#F9ACBA" />
    <path d="M860 116V118H846V116H860Z" fill="#F9ACBA" />
    <path d="M859.932 114V116H821.932V114H859.932Z" fill="#21201E" />
    <path d="M823.983 112V114H819.983V112H823.983Z" fill="#21201E" />
    <path d="M822 102V106H820V102H822Z" fill="#21201E" />
    <path d="M838 112V114H832V112H838Z" fill="#21201E" />
    <path d="M846 108V110H834V108H846Z" fill="#21201E" />
    <path d="M860 98V100H856V98H860Z" fill="#21201E" />
    <path d="M864 112V114H858V112H864Z" fill="#21201E" />
    <path d="M858 96V98H852V96H858Z" fill="#21201E" />
    <path d="M866 106V112H864V106H866Z" fill="#21201E" />
    <path d="M864 102V108H862V102H864Z" fill="#21201E" />
    <path d="M850 98V104H848V98H850Z" fill="#21201E" />
    <path d="M848 102V108H846V102H848Z" fill="#21201E" />
    <path d="M862 98V104H860V98H862Z" fill="#21201E" />
    <path d="M832 100V102H822V100H832Z" fill="#21201E" />
    <path d="M820 104V114H818V104H820Z" fill="#21201E" />
    <path d="M822 116V124H820V116H822Z" fill="#21201E" />
    <path d="M862 116V124H860V116H862Z" fill="#21201E" />
    <path d="M860 126V145H858V126H860Z" fill="#21201E" />
    <path d="M824 126V145H822V126H824Z" fill="#21201E" />
    <path d="M836 106V114H834V106H836Z" fill="#21201E" />
    <path d="M834 106V108H832V106H834Z" fill="#F4EBA7" />
    <path d="M852 102V104H850V102H852Z" fill="#F4EBA7" />
    <path d="M832 104V106H828V104H832Z" fill="#F4EBA7" />
    <path d="M844 110V112H840V110H844Z" fill="#F4EBA7" />
    <path d="M844 116V118H838V116H844Z" fill="#F4EBA7" />
    <path d="M844 118V124H838V118H844Z" fill="white" />
    <path d="M844 126V145H838V126H844Z" fill="white" />
    <path d="M852 104V106H848V104H852Z" fill="#F4EBA7" />
    <path d="M830 102V104H822V102H830Z" fill="#F4EBA7" />
    <path d="M838 116V145H836V116H838Z" fill="#21201E" />
    <path d="M1012 118V145H1000V118H1012Z" fill="#F04438" />
    <path d="M986 118V145H974V118H986Z" fill="#F04438" />
    <path d="M1010 126V128H976V126H1010Z" fill="#BC1B06" />
    <path d="M1000 118V145H998V118H1000Z" fill="#BC1B06" />
    <path d="M988 118V145H986V118H988Z" fill="#BC1B06" />
    <path d="M1012 98V102H1002V98H1012Z" fill="#F4EBA7" />
    <path d="M1016 102V114H998V102H1016Z" fill="#F9C62C" />
    <path d="M986 104V114H972V104H986Z" fill="#F9C62C" />
    <path d="M1010 130V145H1008V130H1010Z" fill="#F9ACBA" />
    <path d="M996 110V114H988V110H996Z" fill="#F9C62C" />
    <path d="M998 110V145H996V110H998Z" fill="#21201E" />
    <path d="M1016 110V112H1014V110H1016Z" fill="#21201E" />
    <path d="M1004 98V100H1002V98H1004Z" fill="#21201E" />
    <path d="M1000 112V114H998V112H1000Z" fill="#21201E" />
    <path d="M1002 110V112H1000V110H1002Z" fill="#21201E" />
    <path d="M1004 108V110H1002V108H1004Z" fill="#21201E" />
    <path d="M984 102V104H982V102H984Z" fill="#21201E" />
    <path d="M986 102V104H984V102H986Z" fill="#21201E" />
    <path d="M986 104V106H984V104H986Z" fill="#21201E" />
    <path
      d="M983.763 109.762V111.728H981.797V109.762H983.763Z"
      fill="#21201E"
    />
    <path d="M981.796 107.797V109.763H979.83V107.797H981.796Z" fill="#21201E" />
    <path d="M1012 124V126H974V124H1012Z" fill="#21201E" />
    <path d="M1012 145V147H974V145H1012Z" fill="#21201E" />
    <path d="M988 116V118H974V116H988Z" fill="#F9ACBA" />
    <path d="M1012 116V118H998V116H1012Z" fill="#F9ACBA" />
    <path d="M1011.93 114V116H973.932V114H1011.93Z" fill="#21201E" />
    <path d="M975.983 112V114H971.983V112H975.983Z" fill="#21201E" />
    <path d="M974 102V106H972V102H974Z" fill="#21201E" />
    <path d="M990 112V114H984V112H990Z" fill="#21201E" />
    <path d="M998 108V110H986V108H998Z" fill="#21201E" />
    <path d="M1012 98V100H1008V98H1012Z" fill="#21201E" />
    <path d="M1016 112V114H1010V112H1016Z" fill="#21201E" />
    <path d="M1010 96V98H1004V96H1010Z" fill="#21201E" />
    <path d="M1018 106V112H1016V106H1018Z" fill="#21201E" />
    <path d="M1016 102V108H1014V102H1016Z" fill="#21201E" />
    <path d="M1002 98V104H1000V98H1002Z" fill="#21201E" />
    <path d="M1000 102V108H998V102H1000Z" fill="#21201E" />
    <path d="M1014 98V104H1012V98H1014Z" fill="#21201E" />
    <path d="M984 100V102H974V100H984Z" fill="#21201E" />
    <path d="M972 104V114H970V104H972Z" fill="#21201E" />
    <path d="M974 116V124H972V116H974Z" fill="#21201E" />
    <path d="M1014 116V124H1012V116H1014Z" fill="#21201E" />
    <path d="M1012 126V145H1010V126H1012Z" fill="#21201E" />
    <path d="M976 126V145H974V126H976Z" fill="#21201E" />
    <path d="M988 106V114H986V106H988Z" fill="#21201E" />
    <path d="M986 106V108H984V106H986Z" fill="#F4EBA7" />
    <path d="M1004 102V104H1002V102H1004Z" fill="#F4EBA7" />
    <path d="M984 104V106H980V104H984Z" fill="#F4EBA7" />
    <path d="M996 110V112H992V110H996Z" fill="#F4EBA7" />
    <path d="M996 116V118H990V116H996Z" fill="#F4EBA7" />
    <path d="M996 118V124H990V118H996Z" fill="white" />
    <path d="M996 126V145H990V126H996Z" fill="white" />
    <path d="M1004 104V106H1000V104H1004Z" fill="#F4EBA7" />
    <path d="M982 102V104H974V102H982Z" fill="#F4EBA7" />
    <path d="M990 116V145H988V116H990Z" fill="#21201E" />
    <g clipPath="url(#clip3_3_9909)">
      <rect
        x="551"
        y="85"
        width="3"
        height="30"
        transform="rotate(180 551 85)"
        fill="#111111"
      />
      <path d="M554 85L551 85L551 55L554 55L554 85Z" fill="#5FCDE3" />
      <rect
        x="554"
        y="88"
        width="3"
        height="3"
        transform="rotate(180 554 88)"
        fill="#111111"
      />
      <rect
        x="554"
        y="55"
        width="3"
        height="3"
        transform="rotate(180 554 55)"
        fill="#111111"
      />
      <rect
        x="557"
        y="85"
        width="3"
        height="30"
        transform="rotate(180 557 85)"
        fill="#111111"
      />
    </g>
    <g clipPath="url(#clip4_3_9909)">
      <rect
        x="570"
        y="85"
        width="3"
        height="30"
        transform="rotate(180 570 85)"
        fill="#111111"
      />
      <path d="M573 85L570 85L570 55L573 55L573 85Z" fill="#5FCDE3" />
      <rect
        x="573"
        y="88"
        width="3"
        height="3"
        transform="rotate(180 573 88)"
        fill="#111111"
      />
      <rect
        x="573"
        y="55"
        width="3"
        height="3"
        transform="rotate(180 573 55)"
        fill="#111111"
      />
      <rect
        x="576"
        y="85"
        width="3"
        height="30"
        transform="rotate(180 576 85)"
        fill="#111111"
      />
    </g>
    <g clipPath="url(#clip5_3_9909)">
      <rect
        x="589"
        y="85"
        width="3"
        height="30"
        transform="rotate(180 589 85)"
        fill="#111111"
      />
      <path d="M592 85L589 85L589 55L592 55L592 85Z" fill="#5FCDE3" />
      <rect
        x="592"
        y="88"
        width="3"
        height="3"
        transform="rotate(180 592 88)"
        fill="#111111"
      />
      <rect
        x="592"
        y="55"
        width="3"
        height="3"
        transform="rotate(180 592 55)"
        fill="#111111"
      />
      <rect
        x="595"
        y="85"
        width="3"
        height="30"
        transform="rotate(180 595 85)"
        fill="#111111"
      />
    </g>
    <g clipPath="url(#clip6_3_9909)">
      <rect
        x="341"
        y="80"
        width="3"
        height="19"
        transform="rotate(-90 341 80)"
        fill="#111111"
      />
      <rect
        x="341"
        y="85"
        width="5"
        height="19"
        transform="rotate(-90 341 85)"
        fill="#D92D20"
      />
      <rect
        x="338"
        y="85"
        width="5"
        height="3"
        transform="rotate(-90 338 85)"
        fill="#111111"
      />
      <rect
        x="360"
        y="85"
        width="5"
        height="3"
        transform="rotate(-90 360 85)"
        fill="#111111"
      />
      <rect
        x="341"
        y="88"
        width="3"
        height="19"
        transform="rotate(-90 341 88)"
        fill="#111111"
      />
    </g>
    <g clipPath="url(#clip7_3_9909)">
      <rect
        x="341"
        y="96"
        width="3"
        height="19"
        transform="rotate(-90 341 96)"
        fill="#111111"
      />
      <rect
        x="341"
        y="101"
        width="5"
        height="19"
        transform="rotate(-90 341 101)"
        fill="#5FCDE3"
      />
      <rect
        x="338"
        y="101"
        width="5"
        height="3"
        transform="rotate(-90 338 101)"
        fill="#111111"
      />
      <rect
        x="360"
        y="101"
        width="5"
        height="3"
        transform="rotate(-90 360 101)"
        fill="#111111"
      />
      <rect
        x="341"
        y="104"
        width="3"
        height="19"
        transform="rotate(-90 341 104)"
        fill="#111111"
      />
    </g>
    <g clipPath="url(#clip8_3_9909)">
      <rect
        x="341"
        y="112"
        width="3"
        height="19"
        transform="rotate(-90 341 112)"
        fill="#111111"
      />
      <rect
        x="341"
        y="117"
        width="5"
        height="19"
        transform="rotate(-90 341 117)"
        fill="#FEC84B"
      />
      <rect
        x="338"
        y="117"
        width="5"
        height="3"
        transform="rotate(-90 338 117)"
        fill="#111111"
      />
      <rect
        x="360"
        y="117"
        width="5"
        height="3"
        transform="rotate(-90 360 117)"
        fill="#111111"
      />
      <rect
        x="341"
        y="120"
        width="3"
        height="19"
        transform="rotate(-90 341 120)"
        fill="#111111"
      />
    </g>
    <defs>
      <pattern
        id="pattern0_3_9909"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use
          xlinkHref="#image0_3_9909"
          transform="scale(0.00195312 0.00285645)"
        />
      </pattern>
      <clipPath id="green-bar-clip">
        <rect
          x="314"
          y="159"
          width={((1009 - 314) * progress) / 100}
          height="27"
        />
      </clipPath>
      <clipPath id="clip0_3_9909">
        <rect
          width="357"
          height="111"
          fill="white"
          transform="translate(1090 116)"
        />
      </clipPath>
      <clipPath id="clip1_3_9909">
        <rect
          width="259"
          height="151"
          fill="white"
          transform="translate(62 77)"
        />
      </clipPath>
      <clipPath id="clip2_3_9909">
        <rect
          width="711"
          height="61"
          fill="white"
          transform="translate(305 153)"
        />
      </clipPath>
      <clipPath id="clip3_3_9909">
        <rect
          width="36"
          height="9"
          fill="white"
          transform="translate(548 88) rotate(-90)"
        />
      </clipPath>
      <clipPath id="clip4_3_9909">
        <rect
          width="36"
          height="9"
          fill="white"
          transform="translate(567 88) rotate(-90)"
        />
      </clipPath>
      <clipPath id="clip5_3_9909">
        <rect
          width="36"
          height="9"
          fill="white"
          transform="translate(586 88) rotate(-90)"
        />
      </clipPath>
      <clipPath id="clip6_3_9909">
        <rect
          width="25"
          height="11"
          fill="white"
          transform="translate(338 77)"
        />
      </clipPath>
      <clipPath id="clip7_3_9909">
        <rect
          width="25"
          height="11"
          fill="white"
          transform="translate(338 93)"
        />
      </clipPath>
      <clipPath id="clip8_3_9909">
        <rect
          width="25"
          height="11"
          fill="white"
          transform="translate(338 109)"
        />
      </clipPath>
      <image
        id="image0_3_9909"
        width="512"
        height="512"
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,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"
      />
    </defs>
  </svg>
);

export const PixelProgress: React.FC<PixelProgressProps> = ({
  progress,
  className,
  style,
  onClickBtn,
}) => {
  // Ensure progress is between 0 and 100
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "1469 / 245",
        ...style,
      }}
    >
      <PixelProgressSVG progress={clampedProgress} />
      <div
        style={{
          position: "absolute",
          left: "74.45%",
          top: "47.35%",
          width: "24.38%",
          height: "45.31%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ButtonLighter onClick={onClickBtn} className="cursor-pointer">
          Tiếp tục
        </ButtonLighter>
      </div>
    </div>
  );
};
