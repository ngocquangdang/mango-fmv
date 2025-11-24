import type { ReactNode } from "react";

export default function NoteLeft({
  width = 635,
  height = 853,
  className = "",
  noteInfo,
  noteImage,
  noteName,
  children,
}: {
  width?: number | string;
  height?: number | string;
  className?: string;
  noteInfo?: ReactNode;
  noteImage?: ReactNode;
  noteName?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <svg
      className={className}
      width={typeof width === "number" ? `${width} ` : width}
      height={typeof height === "number" ? `${height} ` : height}
      viewBox="0 0 635 853"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect x="570" y="129" width="65" height="310" fill="#DC6803" />
      <rect x="18" y="515" width="588" height="210" fill="#009DFF" />
      <rect
        width="568"
        height="10"
        transform="matrix(1 0 0 -1 28 735)"
        fill="#111111"
      />
      <rect
        width="568"
        height="10"
        transform="matrix(1 0 0 -1 28 515)"
        fill="#111111"
      />
      <rect x="8" y="525" width="10" height="190" fill="#111111" />
      <rect x="606" y="525" width="10" height="190" fill="#111111" />
      <rect x="596" y="515" width="10" height="10" fill="#111111" />
      <rect x="18" y="515" width="10" height="10" fill="#111111" />
      <rect x="596" y="715" width="10" height="10" fill="#111111" />
      <rect x="18" y="715" width="10" height="10" fill="#111111" />
      <rect
        x="85"
        y="474"
        width="440"
        height="36"
        fill="#4E5BA6"
        stroke="#111111"
        stroke-width="10"
      />
      <path d="M550 119H570V262H20V252H10V119H30V99H550V119Z" fill="#FF9442" />
      <path d="M570 449H550V469H60V449H40V262H570V449Z" fill="#FF9442" />
      <rect x="621" y="139" width="14" height="290" fill="#B25229" />
      <rect x="570" y="139" width="10" height="290" fill="#B25229" />
      <rect x="621" y="197" width="14" height="10" fill="#344054" />
      <rect x="621" y="217" width="14" height="10" fill="#344054" />
      <rect x="621" y="346" width="14" height="10" fill="#344054" />
      <rect x="621" y="366" width="14" height="10" fill="#344054" />
      <rect x="570" y="129" width="65" height="10" fill="#111111" />
      <rect x="18.001" y="526.001" width="70" height="6" fill="#175CD3" />
      <rect x="18.001" y="539.001" width="70" height="6" fill="#175CD3" />
      <rect x="570" y="197" width="51" height="10" fill="#5B6DDF" />
      <rect x="570" y="346" width="51" height="10" fill="#5B6DDF" />
      <rect x="570" y="217" width="51" height="10" fill="#5B6DDF" />
      <rect x="570" y="366" width="51" height="10" fill="#5B6DDF" />
      <rect x="427" y="89" width="113" height="10" fill="#111111" />
      <rect x="40" y="89" width="113" height="10" fill="#111111" />
      <rect
        x="10"
        y="129"
        width="113"
        height="10"
        transform="rotate(90 10 129)"
        fill="#111111"
      />
      <rect
        x="580"
        y="129"
        width="45"
        height="10"
        transform="rotate(90 580 129)"
        fill="#111111"
      />
      <rect
        x="580"
        y="394"
        width="45"
        height="10"
        transform="rotate(90 580 394)"
        fill="#111111"
      />
      <rect x="153" y="99" width="274" height="10" fill="#111111" />
      <rect x="560" y="119" width="10" height="10" fill="#111111" />
      <rect x="560" y="439" width="10" height="10" fill="#111111" />
      <rect
        width="10"
        height="10"
        transform="matrix(-1 0 0 1 50 439)"
        fill="#111111"
      />
      <rect x="550" y="449" width="10" height="10" fill="#111111" />
      <rect x="540" y="459" width="10" height="10" fill="#111111" />
      <rect
        width="10"
        height="10"
        transform="matrix(-1 0 0 1 60 449)"
        fill="#111111"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(-1 0 0 1 70 459)"
        fill="#111111"
      />
      <rect
        width="470"
        height="10"
        transform="matrix(-1 0 0 1 540 469)"
        fill="#111111"
      />
      <rect x="560" y="174" width="10" height="220" fill="#111111" />
      <rect
        width="10"
        height="10"
        transform="matrix(1 0 0 -1 30 109)"
        fill="#111111"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(1 0 0 -1 20 159)"
        fill="#D92D20"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(1 0 0 -1 20 189)"
        fill="#D92D20"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(1 0 0 -1 20 219)"
        fill="#D92D20"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(1 0 0 -1 30 169)"
        fill="#D92D20"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(1 0 0 -1 40 179)"
        fill="#D92D20"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(1 0 0 -1 30 199)"
        fill="#D92D20"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(1 0 0 -1 40 209)"
        fill="#D92D20"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(1 0 0 -1 30 229)"
        fill="#D92D20"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(1 0 0 -1 40 239)"
        fill="#D92D20"
      />
      <rect
        x="590"
        y="577"
        width="10"
        height="10"
        transform="rotate(180 590 577)"
        fill="#175CD3"
      />
      <rect
        x="590"
        y="607"
        width="10"
        height="10"
        transform="rotate(180 590 607)"
        fill="#175CD3"
      />
      <rect
        x="590"
        y="637"
        width="10"
        height="10"
        transform="rotate(180 590 637)"
        fill="#175CD3"
      />
      <rect
        x="580"
        y="587"
        width="10"
        height="10"
        transform="rotate(180 580 587)"
        fill="#175CD3"
      />
      <rect
        x="570"
        y="597"
        width="10"
        height="10"
        transform="rotate(180 570 597)"
        fill="#175CD3"
      />
      <rect
        x="580"
        y="617"
        width="10"
        height="10"
        transform="rotate(180 580 617)"
        fill="#175CD3"
      />
      <rect
        x="570"
        y="627"
        width="10"
        height="10"
        transform="rotate(180 570 627)"
        fill="#175CD3"
      />
      <rect
        x="580"
        y="647"
        width="10"
        height="10"
        transform="rotate(180 580 647)"
        fill="#175CD3"
      />
      <rect
        x="570"
        y="657"
        width="10"
        height="10"
        transform="rotate(180 570 657)"
        fill="#175CD3"
      />
      <rect
        x="20"
        y="252"
        width="10"
        height="10"
        transform="rotate(180 20 252)"
        fill="#111111"
      />
      <rect x="550" y="109" width="10" height="10" fill="#111111" />
      <rect
        width="10"
        height="10"
        transform="matrix(1 0 0 -1 20 119)"
        fill="#111111"
      />
      <rect
        x="30"
        y="262"
        width="10"
        height="10"
        transform="rotate(180 30 262)"
        fill="#111111"
      />
      <rect x="540" y="99" width="10" height="10" fill="#111111" />
      <rect
        width="10"
        height="10"
        transform="matrix(1 0 0 -1 10 129)"
        fill="#111111"
      />
      <rect
        x="40"
        y="439"
        width="10"
        height="177"
        transform="rotate(180 40 439)"
        fill="#111111"
      />
      <path
        d="M530 146H540V431H530V441H73V431H63V146H73V136H530V146Z"
        fill="white"
      />
      <g clip-path="url(#clip0_28_52263)">
        <path
          d="M530 146H540V431H530V441H73V431H63V146H73V136H530V146Z"
          fill="white"
        />
        <rect x="525" y="136" width="5" height="5" fill="#111111" />
        <rect
          x="78"
          y="441"
          width="5"
          height="5"
          transform="rotate(180 78 441)"
          fill="#111111"
        />
        <rect
          width="5"
          height="5"
          transform="matrix(-1 0 0 1 78 136)"
          fill="#111111"
        />
        <rect
          width="5"
          height="5"
          transform="matrix(1 0 0 -1 525 441)"
          fill="#111111"
        />
        <rect x="530" y="141" width="5" height="5" fill="#111111" />
        <rect
          x="73"
          y="436"
          width="5"
          height="5"
          transform="rotate(180 73 436)"
          fill="#111111"
        />
        <rect
          width="5"
          height="5"
          transform="matrix(-1 0 0 1 73 141)"
          fill="#111111"
        />
        <rect
          width="5"
          height="5"
          transform="matrix(1 0 0 -1 530 436)"
          fill="#111111"
        />
        <rect x="535" y="146" width="5" height="5" fill="#111111" />
        <rect
          x="68"
          y="431"
          width="5"
          height="5"
          transform="rotate(180 68 431)"
          fill="#111111"
        />
        <rect
          width="5"
          height="5"
          transform="matrix(-1 0 0 1 68 146)"
          fill="#111111"
        />
        <rect
          width="5"
          height="5"
          transform="matrix(1 0 0 -1 535 431)"
          fill="#111111"
        />
        <rect
          x="63"
          y="426"
          width="5"
          height="275"
          transform="rotate(180 63 426)"
          fill="#111111"
        />
        <rect
          x="545"
          y="426"
          width="5"
          height="275"
          transform="rotate(180 545 426)"
          fill="#111111"
        />
        <rect
          x="78"
          y="136"
          width="5.00001"
          height="447"
          transform="rotate(-90 78 136)"
          fill="#111111"
        />
        <rect
          x="525"
          y="441"
          width="5.00001"
          height="447"
          transform="rotate(90 525 441)"
          fill="#111111"
        />
        <div>display image</div>
      </g>
      <rect
        x="440"
        y="114"
        width="3"
        height="85"
        transform="rotate(-90 440 114)"
        fill="#111111"
      />
      <path d="M440 117L440 114L525 114L525 117L440 117Z" fill="#B25229" />
      <rect
        x="437"
        y="117"
        width="3"
        height="3"
        transform="rotate(-90 437 117)"
        fill="#111111"
      />
      <rect
        x="525"
        y="117"
        width="3"
        height="3"
        transform="rotate(-90 525 117)"
        fill="#111111"
      />
      <rect
        x="440"
        y="120"
        width="3"
        height="85"
        transform="rotate(-90 440 120)"
        fill="#111111"
      />
      <rect
        x="55"
        y="114"
        width="3"
        height="85"
        transform="rotate(-90 55 114)"
        fill="#111111"
      />
      <path d="M55 117L55 114L140 114L140 117L55 117Z" fill="#B25229" />
      <rect
        x="52"
        y="117"
        width="3"
        height="3"
        transform="rotate(-90 52 117)"
        fill="#111111"
      />
      <rect
        x="140"
        y="117"
        width="3"
        height="3"
        transform="rotate(-90 140 117)"
        fill="#111111"
      />
      <rect
        x="55"
        y="120"
        width="3"
        height="85"
        transform="rotate(-90 55 120)"
        fill="#111111"
      />
      <g clip-path="url(#clip1_28_52263)">
        <rect
          x="37"
          y="585"
          width="3"
          height="19"
          transform="rotate(-90 37 585)"
          fill="#111111"
        />
        <rect
          x="37"
          y="590"
          width="5"
          height="19"
          transform="rotate(-90 37 590)"
          fill="#FF9442"
        />
        <rect
          x="34"
          y="590"
          width="5"
          height="3"
          transform="rotate(-90 34 590)"
          fill="#111111"
        />
        <rect
          x="56"
          y="590"
          width="5"
          height="3"
          transform="rotate(-90 56 590)"
          fill="#111111"
        />
        <rect
          x="37"
          y="593"
          width="3"
          height="19"
          transform="rotate(-90 37 593)"
          fill="#111111"
        />
      </g>
      <g clip-path="url(#clip2_28_52263)">
        <rect
          x="37"
          y="601"
          width="3"
          height="19"
          transform="rotate(-90 37 601)"
          fill="#111111"
        />
        <rect
          x="37"
          y="606"
          width="5"
          height="19"
          transform="rotate(-90 37 606)"
          fill="#5FCDE3"
        />
        <rect
          x="34"
          y="606"
          width="5"
          height="3"
          transform="rotate(-90 34 606)"
          fill="#111111"
        />
        <rect
          x="56"
          y="606"
          width="5"
          height="3"
          transform="rotate(-90 56 606)"
          fill="#111111"
        />
        <rect
          x="37"
          y="609"
          width="3"
          height="19"
          transform="rotate(-90 37 609)"
          fill="#111111"
        />
      </g>
      <g clip-path="url(#clip3_28_52263)">
        <rect
          x="37"
          y="617"
          width="3"
          height="19"
          transform="rotate(-90 37 617)"
          fill="#111111"
        />
        <rect
          x="37"
          y="622"
          width="5"
          height="19"
          transform="rotate(-90 37 622)"
          fill="#17B26A"
        />
        <rect
          x="34"
          y="622"
          width="5"
          height="3"
          transform="rotate(-90 34 622)"
          fill="#111111"
        />
        <rect
          x="56"
          y="622"
          width="5"
          height="3"
          transform="rotate(-90 56 622)"
          fill="#111111"
        />
        <rect
          x="37"
          y="625"
          width="3"
          height="19"
          transform="rotate(-90 37 625)"
          fill="#111111"
        />
      </g>
      <g clip-path="url(#clip4_28_52263)">
        <rect
          x="28"
          y="682"
          width="3"
          height="568"
          transform="rotate(-90 28 682)"
          fill="#111111"
        />
        <rect
          x="28"
          y="700"
          width="18"
          height="568"
          transform="rotate(-90 28 700)"
          fill="#3E4784"
        />
        <rect
          x="25"
          y="700"
          width="18"
          height="3"
          transform="rotate(-90 25 700)"
          fill="#111111"
        />
        <rect
          x="596"
          y="700"
          width="18"
          height="3"
          transform="rotate(-90 596 700)"
          fill="#111111"
        />
        <rect
          x="28"
          y="703"
          width="3"
          height="568"
          transform="rotate(-90 28 703)"
          fill="#111111"
        />
      </g>
      <rect x="570" y="429" width="65" height="10" fill="#111111" />
      <rect x="98" width="440" height="440" fill="url(#pattern0_28_52263)" />

      <rect x="113.5" y="457.5" width="384" height="83" fill="#2E90FA" />
      <rect
        x="113.5"
        y="457.5"
        width="384"
        height="83"
        stroke="black"
        stroke-width="5"
      />
      <rect
        width="5"
        height="5"
        transform="matrix(-1 0 0 1 492 463)"
        fill="#004EEB"
      />
      <rect
        width="5"
        height="5"
        transform="matrix(-1 0 0 1 124 463)"
        fill="#004EEB"
      />
      <rect
        width="5"
        height="5"
        transform="matrix(-1 0 0 1 492 530)"
        fill="#004EEB"
      />
      <rect
        width="5"
        height="5"
        transform="matrix(-1 0 0 1 124 530)"
        fill="#004EEB"
      />

      {/* <path
        d="M167.054 513V493.817H158.839V488.341H180.76V493.817H172.545V513H167.054ZM183.513 513V488.341H188.99V496.555H191.728V493.817H199.958V496.555H202.696V513H197.219V499.309H191.728V502.047H188.99V513H183.513ZM219.155 507.523V504.785H210.926V507.523H219.155ZM208.187 513V510.262H205.449V504.785H208.187V502.047H219.155V499.309H208.187V493.817H221.894V496.555H224.632V513H208.187ZM210.926 491.079V488.341H213.664V482.849H221.894V485.602H219.155V488.341H216.402V491.079H210.926ZM227.385 513V493.817H232.861V513H227.385ZM227.385 491.079V485.602H232.861V491.079H227.385ZM243.815 513V488.341H249.291V507.523H262.997V513H243.815ZM279.457 502.047V499.309H271.227V502.047H279.457ZM268.489 513V510.262H265.751V496.555H268.489V493.817H282.195V496.555H284.933V504.785H271.227V507.523H282.195V513H268.489ZM268.489 491.079V488.341H271.227V485.602H273.965V482.849H276.704V485.602H279.457V488.341H282.195V491.079H276.704V488.341H273.965V491.079H268.489ZM295.901 513V488.341H304.116V493.817H306.854V499.309H309.607V493.817H312.346V488.341H320.561V513H315.084V502.047H312.346V507.523H309.607V513H306.854V507.523H304.116V502.047H301.378V513H295.901ZM323.314 513V493.817H328.79V513H323.314ZM323.314 491.079V485.602H328.79V491.079H323.314ZM331.529 513V493.817H337.005V496.555H339.743V493.817H347.973V496.555H350.711V513H345.235V499.309H339.743V502.047H337.005V513H331.529ZM353.464 513V488.341H358.941V496.555H361.679V493.817H369.909V496.555H372.647V513H367.171V499.309H361.679V502.047H358.941V513H353.464ZM383.615 513V488.341H389.092V496.555H397.321V488.341H402.798V513H397.321V502.047H389.092V513H383.615ZM405.551 513V493.817H411.028V513H405.551ZM405.551 491.079V485.602H411.028V491.079H405.551ZM427.472 502.047V499.309H419.242V502.047H427.472ZM416.504 513V510.262H413.766V496.555H416.504V493.817H430.21V496.555H432.949V504.785H419.242V507.523H430.21V513H416.504ZM416.504 491.079V488.341H419.242V485.602H427.472V488.341H430.21V491.079H424.719V488.341H421.981V491.079H416.504ZM427.472 485.602V482.849H430.21V480.111H435.687V482.849H432.949V485.602H427.472ZM438.44 513V510.262H435.702V493.817H441.178V507.523H446.655V504.785H449.408V493.817H454.884V513H449.408V510.262H446.655V513H438.44Z"
        fill="black"
      /> */}

      <g clip-path="url(#clip5_28_52263)">
        <rect x="125" y="469" width="361" height="60" fill="white" />
        <rect x="128" y="466" width="355" height="3" fill="#D9D9D9" />
        <rect
          width="355"
          height="3"
          transform="matrix(1 0 0 -1 128 532)"
          fill="#D9D9D9"
        />
        <rect x="125" y="469" width="3" height="3" fill="#D9D9D9" />
        <rect
          width="3"
          height="3"
          transform="matrix(-1 0 0 1 486 469)"
          fill="#D9D9D9"
        />
        <rect
          width="3"
          height="3"
          transform="matrix(1 0 0 -1 125 529)"
          fill="#D9D9D9"
        />
        <rect
          x="486"
          y="529"
          width="3"
          height="3"
          transform="rotate(180 486 529)"
          fill="#D9D9D9"
        />
        <rect x="122" y="472" width="3" height="54" fill="#D9D9D9" />
        <rect
          width="3"
          height="54"
          transform="matrix(-1 0 0 1 489 472)"
          fill="#D9D9D9"
        />
      </g>
      {noteName && (
        <foreignObject
          x={125}
          y={469}
          width={361}
          height={60}
          requiredExtensions="http://www.w3.org/1999/xhtml"
        >
          <div className="h-full w-full flex items-center justify-center text-center">
            {noteName}
          </div>
        </foreignObject>
      )}
      <g clip-path="url(#clip6_28_52263)">
        <rect x="87" y="554" width="452" height="116" fill="#84CAFF" />
        <rect x="90" y="551" width="446" height="3" fill="#026AA2" />
        <rect
          width="446"
          height="3"
          transform="matrix(1 0 0 -1 90 673)"
          fill="#026AA2"
        />
        <rect x="87" y="554" width="3" height="3" fill="#026AA2" />
        <rect
          width="3"
          height="3"
          transform="matrix(-1 0 0 1 539 554)"
          fill="#026AA2"
        />
        <rect
          width="3"
          height="3"
          transform="matrix(1 0 0 -1 87 670)"
          fill="#026AA2"
        />
        <rect
          x="539"
          y="670"
          width="3"
          height="3"
          transform="rotate(180 539 670)"
          fill="#026AA2"
        />
        <rect x="84" y="557" width="3" height="110" fill="#026AA2" />
        <rect
          width="3"
          height="110"
          transform="matrix(-1 0 0 1 542 557)"
          fill="#026AA2"
        />
      </g>
      {noteImage && (
        <foreignObject
          x={73}
          y={146}
          width={457}
          height={295}
          requiredExtensions="http://www.w3.org/1999/xhtml"
        >
          <div className="h-full w-full flex justify-center items-center p-4">
            {noteImage}
          </div>
        </foreignObject>
      )}
      <rect x="48.7549" y="647" width="2.2" height="2.2" fill="#111111" />
      <rect
        width="2.2"
        height="2.2"
        transform="matrix(-1 0 0 1 53.1553 653.6)"
        fill="#111111"
      />
      <rect x="50.9551" y="649.2" width="2.2" height="2.2" fill="#111111" />
      <rect
        width="2.2"
        height="2.2"
        transform="matrix(-1 0 0 1 50.9551 655.8)"
        fill="#111111"
      />
      <rect x="53.1553" y="651.4" width="2.2" height="2.2" fill="#111111" />
      <rect x="40" y="647" width="2.2" height="2.2" fill="#111111" />
      <rect
        width="2.2"
        height="2.2"
        transform="matrix(-1 0 0 1 44.4004 653.6)"
        fill="#111111"
      />
      <rect x="42.2002" y="649.2" width="2.2" height="2.2" fill="#111111" />
      <rect
        width="2.2"
        height="2.2"
        transform="matrix(-1 0 0 1 42.2002 655.8)"
        fill="#111111"
      />
      <rect x="44.4004" y="651.4" width="2.2" height="2.2" fill="#111111" />
      <rect x="568.755" y="529" width="2.2" height="2.2" fill="#111111" />
      <rect
        width="2.2"
        height="2.2"
        transform="matrix(-1 0 0 1 573.155 535.6)"
        fill="#111111"
      />
      <rect x="570.955" y="531.2" width="2.2" height="2.2" fill="#111111" />
      <rect
        width="2.2"
        height="2.2"
        transform="matrix(-1 0 0 1 570.955 537.8)"
        fill="#111111"
      />
      <rect x="573.155" y="533.4" width="2.2" height="2.2" fill="#111111" />
      <rect x="560" y="529" width="2.2" height="2.2" fill="#111111" />
      <rect
        width="2.2"
        height="2.2"
        transform="matrix(-1 0 0 1 564.4 535.6)"
        fill="#111111"
      />
      <rect x="562.2" y="531.2" width="2.2" height="2.2" fill="#111111" />
      <rect
        width="2.2"
        height="2.2"
        transform="matrix(-1 0 0 1 562.2 537.8)"
        fill="#111111"
      />
      <rect x="564.4" y="533.4" width="2.2" height="2.2" fill="#111111" />
      <rect x="583" y="270.999" width="5" height="5" fill="#D92D20" />
      <rect x="588" y="275.999" width="5" height="5" fill="#D92D20" />
      <rect x="593" y="280.999" width="5" height="5" fill="#D92D20" />
      <rect x="588" y="285.999" width="5" height="5" fill="#D92D20" />
      <rect x="583" y="290.999" width="5" height="5" fill="#D92D20" />
      <rect x="603" y="271" width="5" height="5" fill="#D92D20" />
      <rect x="608" y="276" width="5" height="5" fill="#D92D20" />
      <rect x="613" y="281" width="5" height="5" fill="#D92D20" />
      <rect x="608" y="286" width="5" height="5" fill="#D92D20" />
      <rect x="603" y="291" width="5" height="5" fill="#D92D20" />
      <rect x="570" y="197" width="10" height="10" fill="#344054" />
      <rect x="570" y="217" width="10" height="10" fill="#344054" />
      <rect x="570" y="346" width="10" height="10" fill="#344054" />
      <rect x="570" y="366" width="10" height="10" fill="#344054" />
      <rect x="113" y="35" width="51" height="5" fill="#111111" />
      <path
        d="M169 45H174V97H164V107H113V97H103V45H108V40H169V45Z"
        fill="white"
      />
      <rect x="164" y="40" width="5" height="5" fill="#111111" />
      <rect
        width="5"
        height="5"
        transform="matrix(-1 0 0 1 113 40)"
        fill="#111111"
      />
      <rect
        width="5"
        height="5"
        transform="matrix(-1 0 0 1 174 92)"
        fill="#111111"
      />
      <rect x="103" y="92" width="5" height="5" fill="#111111" />
      <rect x="169" y="45" width="5" height="5" fill="#111111" />
      <rect
        width="5"
        height="5"
        transform="matrix(-1 0 0 1 108 45)"
        fill="#111111"
      />
      <rect
        width="5"
        height="5"
        transform="matrix(-1 0 0 1 169 97)"
        fill="#111111"
      />
      <rect
        width="5"
        height="15"
        transform="matrix(-1 0 0 1 164 102)"
        fill="#111111"
      />
      <rect x="108" y="97" width="5" height="5" fill="#111111" />
      <rect x="113" y="102" width="41" height="5" fill="#111111" />
      <rect x="149" y="107" width="10" height="5" fill="#111111" />
      <rect
        x="98"
        y="92"
        width="42"
        height="5"
        transform="rotate(-90 98 92)"
        fill="#111111"
      />
      <rect
        x="174"
        y="92"
        width="42"
        height="5"
        transform="rotate(-90 174 92)"
        fill="#111111"
      />
      <rect x="127" y="45" width="22" height="51" fill="#F9EC31" />
      <rect x="112" y="60" width="52" height="21" fill="#F9EC31" />
      <rect x="117" y="55" width="42" height="31" fill="#F9EC31" />
      <rect x="122" y="50" width="32" height="41" fill="#F9EC31" />
      <rect x="128" y="62" width="5" height="5" fill="#111111" />
      <rect x="122" y="73" width="5" height="5" fill="#111111" />
      <rect x="127" y="78" width="22" height="5" fill="#111111" />
      <rect x="143" y="62" width="5" height="5" fill="#111111" />
      <rect x="149" y="73" width="5" height="5" fill="#111111" />
      <rect x="91" y="149" width="51" height="5" fill="#111111" />
      <path
        d="M147 159H152V193H142V203H91V193H81V159H86V154H147V159Z"
        fill="white"
      />
      <rect x="142" y="154" width="5" height="5" fill="#111111" />
      <rect
        width="5"
        height="5"
        transform="matrix(-1 0 0 1 91 154)"
        fill="#111111"
      />
      <rect
        width="5"
        height="5"
        transform="matrix(-1 0 0 1 152 188)"
        fill="#111111"
      />
      <rect x="81" y="188" width="5" height="5" fill="#111111" />
      <rect x="147" y="159" width="5" height="5" fill="#111111" />
      <rect
        width="5"
        height="5"
        transform="matrix(-1 0 0 1 86 159)"
        fill="#111111"
      />
      <rect
        width="5"
        height="5"
        transform="matrix(-1 0 0 1 147 193)"
        fill="#111111"
      />
      <rect
        width="5"
        height="15"
        transform="matrix(-1 0 0 1 142 198)"
        fill="#111111"
      />
      <rect x="86" y="193" width="5" height="5" fill="#111111" />
      <rect x="91" y="198" width="41" height="5" fill="#111111" />
      <rect x="132" y="203" width="5" height="5" fill="#111111" />
      <rect
        x="76"
        y="188"
        width="24"
        height="5"
        transform="rotate(-90 76 188)"
        fill="#111111"
      />
      <rect
        x="152"
        y="188"
        width="24"
        height="5"
        transform="rotate(-90 152 188)"
        fill="#111111"
      />
      <rect
        x="120"
        y="188"
        width="25"
        height="5"
        transform="rotate(-90 120 188)"
        fill="#F04438"
      />
      <rect
        x="96"
        y="183"
        width="15"
        height="5"
        transform="rotate(-90 96 183)"
        fill="#F04438"
      />
      <rect
        x="111"
        y="183"
        width="15"
        height="5"
        transform="rotate(-90 111 183)"
        fill="#F04438"
      />
      <rect
        x="130"
        y="173"
        width="10"
        height="5"
        transform="rotate(-90 130 173)"
        fill="#F04438"
      />
      <rect
        x="130"
        y="188"
        width="10"
        height="5"
        transform="rotate(-90 130 188)"
        fill="#F04438"
      />
      <rect
        x="125"
        y="178"
        width="5"
        height="5"
        transform="rotate(-90 125 178)"
        fill="#F04438"
      />
      <rect
        x="101"
        y="168"
        width="5"
        height="10"
        transform="rotate(-90 101 168)"
        fill="#F04438"
      />
      <rect
        x="101"
        y="188"
        width="5"
        height="10"
        transform="rotate(-90 101 188)"
        fill="#F04438"
      />
      <rect
        x="508.281"
        y="368.173"
        width="30"
        height="5"
        transform="rotate(18.8871 508.281 368.173)"
        fill="#FFD932"
      />
      <rect
        x="492.471"
        y="368.048"
        width="60"
        height="60"
        transform="rotate(18.8871 492.471 368.048)"
        fill="#FFD932"
      />
      <rect
        x="482.884"
        y="380.622"
        width="70"
        height="30"
        transform="rotate(18.8871 482.884 380.622)"
        fill="#FFD932"
      />
      <rect
        width="5"
        height="5"
        transform="matrix(-0.946158 -0.323704 -0.323704 0.946158 474.792 404.276)"
        fill="#FFBB31"
      />
      <rect
        width="5"
        height="5"
        transform="matrix(-0.946158 -0.323704 -0.323704 0.946158 541.022 426.935)"
        fill="#FFBB31"
      />
      <rect
        width="5"
        height="10"
        transform="matrix(-0.946158 -0.323704 -0.323704 0.946158 477.904 410.625)"
        fill="#FFBB31"
      />
      <rect
        width="5"
        height="15"
        transform="matrix(-0.946158 -0.323704 -0.323704 0.946158 548.99 419.092)"
        fill="#FFBB31"
      />
      <rect
        width="5"
        height="15"
        transform="matrix(-0.946158 -0.323704 -0.323704 0.946158 553.846 404.899)"
        fill="#FFE56F"
      />
      <rect
        width="5"
        height="15"
        transform="matrix(-0.946158 -0.323704 -0.323704 0.946158 479.647 390.083)"
        fill="#FFE56F"
      />
      <rect
        width="5"
        height="10"
        transform="matrix(-0.946158 -0.323704 -0.323704 0.946158 552.353 393.819)"
        fill="#FFE56F"
      />
      <rect
        width="10"
        height="10"
        transform="matrix(-0.946158 -0.323704 -0.323704 0.946158 485.747 418.593)"
        fill="#FFBB31"
      />
      <rect
        width="15"
        height="10"
        transform="matrix(-0.946158 -0.323704 -0.323704 0.946158 539.404 431.666)"
        fill="#FFBB31"
      />
      <rect
        width="20"
        height="10"
        transform="matrix(-0.946158 -0.323704 -0.323704 0.946158 533.055 434.778)"
        fill="#FFBB31"
      />
      <rect
        width="50"
        height="15"
        transform="matrix(-0.946158 -0.323704 -0.323704 0.946158 526.706 437.89)"
        fill="#FFBB31"
      />
      <rect
        x="500.438"
        y="360.205"
        width="10"
        height="5"
        transform="rotate(18.8871 500.438 360.205)"
        fill="#111111"
      />
      <rect
        x="498.82"
        y="364.936"
        width="15"
        height="10"
        transform="rotate(18.8871 498.82 364.936)"
        fill="#FFE56F"
      />
      <rect
        x="492.471"
        y="368.048"
        width="15"
        height="10"
        transform="rotate(18.8871 492.471 368.048)"
        fill="#FFE56F"
      />
      <rect
        x="509.9"
        y="363.442"
        width="10"
        height="10"
        transform="rotate(18.8871 509.9 363.442)"
        fill="#FFE56F"
      />
      <rect
        x="486.121"
        y="371.16"
        width="10"
        height="10"
        transform="rotate(18.8871 486.121 371.16)"
        fill="#FFE56F"
      />
      <rect
        x="478.153"
        y="379.003"
        width="10"
        height="10"
        transform="rotate(18.8871 478.153 379.003)"
        fill="#FFE56F"
      />
      <rect
        width="10"
        height="5"
        transform="matrix(0.946158 0.323704 0.323704 -0.946158 474.542 435.897)"
        fill="#111111"
      />
      <rect
        width="10"
        height="5"
        transform="matrix(-0.946158 -0.323704 -0.323704 0.946158 547.746 376.39)"
        fill="#111111"
      />
      <rect
        width="10"
        height="5"
        transform="matrix(-0.946158 -0.323704 -0.323704 0.946158 546.128 381.121)"
        fill="#FFE56F"
      />
      <rect
        x="521.85"
        y="452.083"
        width="10"
        height="5"
        transform="rotate(-161.113 521.85 452.083)"
        fill="#111111"
      />
      <rect
        width="5"
        height="5"
        transform="matrix(-0.946158 -0.323704 -0.323704 0.946158 498.82 364.936)"
        fill="#111111"
      />
      <rect
        width="40"
        height="5"
        transform="matrix(-0.946158 -0.323704 -0.323704 0.946158 526.83 422.08)"
        fill="#111111"
      />
      <rect
        width="20"
        height="5"
        transform="matrix(-0.946158 -0.323704 -0.323704 0.946158 515.75 423.573)"
        fill="#E53B68"
      />
      <rect
        width="20"
        height="5"
        transform="matrix(-0.946158 -0.323704 -0.323704 0.946158 514.132 428.304)"
        fill="#F55277"
      />
      <rect
        width="10"
        height="5"
        transform="matrix(-0.946158 -0.323704 -0.323704 0.946158 507.782 431.417)"
        fill="#F55277"
      />
      <rect
        width="5"
        height="5"
        transform="matrix(-0.946158 -0.323704 -0.323704 0.946158 490.603 404.401)"
        fill="#111111"
      />
      <rect
        width="5"
        height="5"
        transform="matrix(-0.946158 -0.323704 -0.323704 0.946158 533.18 418.967)"
        fill="#111111"
      />
      <rect
        x="493.964"
        y="379.128"
        width="10"
        height="5"
        transform="rotate(18.8871 493.964 379.128)"
        fill="#111111"
      />
      <rect
        x="490.728"
        y="388.59"
        width="10"
        height="5"
        transform="rotate(18.8871 490.728 388.59)"
        fill="#111111"
      />
      <rect
        width="5"
        height="5"
        transform="matrix(-0.946158 -0.323704 -0.323704 0.946158 506.538 388.714)"
        fill="#111111"
      />
      <rect
        width="10"
        height="5"
        transform="matrix(-0.946158 -0.323704 -0.323704 0.946158 541.272 395.313)"
        fill="#111111"
      />
      <rect
        width="10"
        height="5"
        transform="matrix(-0.946158 -0.323704 -0.323704 0.946158 538.035 404.775)"
        fill="#111111"
      />
      <rect
        x="525.462"
        y="395.188"
        width="5"
        height="5"
        transform="rotate(18.8871 525.462 395.188)"
        fill="#111111"
      />
      <rect
        x="476.16"
        y="431.167"
        width="5"
        height="5"
        transform="rotate(-161.113 476.16 431.167)"
        fill="#111111"
      />
      <rect
        x="546.128"
        y="381.121"
        width="5"
        height="5"
        transform="rotate(18.8871 546.128 381.121)"
        fill="#111111"
      />
      <rect
        width="5"
        height="5"
        transform="matrix(0.946158 0.323704 0.323704 -0.946158 523.469 447.352)"
        fill="#111111"
      />
      <rect
        width="5"
        height="5"
        transform="matrix(-0.946158 -0.323704 -0.323704 0.946158 492.471 368.048)"
        fill="#111111"
      />
      <rect
        width="5"
        height="5"
        transform="matrix(-0.946158 -0.323704 -0.323704 0.946158 501.932 371.285)"
        fill="white"
      />
      <rect
        width="5"
        height="5"
        transform="matrix(-0.946158 -0.323704 -0.323704 0.946158 495.583 374.397)"
        fill="white"
      />
      <rect
        width="5"
        height="5"
        transform="matrix(-0.946158 -0.323704 -0.323704 0.946158 533.055 434.778)"
        fill="#FFCF7B"
      />
      <rect
        width="5"
        height="5"
        transform="matrix(-0.946158 -0.323704 -0.323704 0.946158 526.706 437.89)"
        fill="#FFCF7B"
      />
      <rect
        x="473.049"
        y="424.817"
        width="5"
        height="5"
        transform="rotate(-161.113 473.049 424.817)"
        fill="#111111"
      />
      <rect
        x="549.24"
        y="387.47"
        width="5"
        height="5"
        transform="rotate(18.8871 549.24 387.47)"
        fill="#111111"
      />
      <rect
        x="544.51"
        y="385.852"
        width="5"
        height="5"
        transform="rotate(18.8871 544.51 385.852)"
        fill="#FFE56F"
      />
      <rect
        width="5"
        height="5"
        transform="matrix(0.946158 0.323704 0.323704 -0.946158 529.818 444.24)"
        fill="#111111"
      />
      <rect
        x="511.519"
        y="358.711"
        width="30"
        height="5"
        transform="rotate(18.8871 511.519 358.711)"
        fill="#111111"
      />
      <rect
        x="509.9"
        y="363.442"
        width="30"
        height="5"
        transform="rotate(18.8871 509.9 363.442)"
        fill="#FFE56F"
      />
      <rect
        width="30"
        height="5"
        transform="matrix(0.946158 0.323704 0.323704 -0.946158 482.385 443.865)"
        fill="#111111"
      />
      <rect
        x="478.153"
        y="379.003"
        width="30"
        height="5"
        transform="rotate(108.887 478.153 379.003)"
        fill="#111111"
      />
      <rect
        x="558.577"
        y="406.518"
        width="30"
        height="5"
        transform="rotate(108.887 558.577 406.518)"
        fill="#111111"
      />
      <rect
        x="478.153"
        y="379.003"
        width="10"
        height="5"
        transform="rotate(-71.1129 478.153 379.003)"
        fill="#111111"
      />
      <rect
        width="10"
        height="5"
        transform="matrix(-0.323704 0.946158 0.946158 0.323704 468.442 407.388)"
        fill="#111111"
      />
      <rect
        width="10"
        height="5"
        transform="matrix(0.323704 -0.946158 -0.946158 -0.323704 553.846 404.899)"
        fill="#111111"
      />
      <rect
        x="544.135"
        y="433.284"
        width="10"
        height="5"
        transform="rotate(108.887 544.135 433.284)"
        fill="#111111"
      />
      {noteInfo && (
        <foreignObject
          x={87}
          y={554}
          width={452}
          height={116}
          requiredExtensions="http://www.w3.org/1999/xhtml"
        >
          <div className="h-full w-full p-4">{noteInfo}</div>
        </foreignObject>
      )}
      {children && (
        <foreignObject x={0} y={700} width={635} height={190}>
          <div className="flex gap-2 items-end justify-center w-full h-full pb-4">
            {children}
          </div>
        </foreignObject>
      )}
      <defs></defs>
    </svg>
  );
}
