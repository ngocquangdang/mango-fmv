import { useEffect, useState } from "react";

export default function Loading() {
  const [filledBlocks, setFilledBlocks] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFilledBlocks((prev) => {
        if (prev >= 8) {
          return 0; // Reset to 0 when all blocks are filled
        }
        return prev + 1;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const Block = ({ x, index }: { x: number; index?: number }) => {
    const isVisible = index !== undefined && index < filledBlocks;

    if (!isVisible) return null;

    return (
      <g>
        <rect x={x} y="13" width="36" height="5" fill="#FFDE29" />
        <rect x={x} y="18" width="36" height="34" fill="#FFA720" />
        <rect x={x} y="52" width="36" height="5" fill="#FF9442" />
        <rect x={x} y="57" width="36" height="5" fill="#D96D35" />
      </g>
    );
  };

  return (
    <svg width="490" height="75" viewBox="0 0 490 75" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_3_8382)">
        <rect x="470" y="5" width="5" height="5" fill="#FFA720" />
        <rect x="20" y="70" width="5" height="5" transform="rotate(180 20 70)" fill="#FFA720" />
        <rect width="5" height="5" transform="matrix(-1 0 0 1 20 5)" fill="#FFA720" />
        <rect width="5" height="5" transform="matrix(1 0 0 -1 470 70)" fill="#FFA720" />
        <rect x="475" y="10" width="5" height="5" fill="#FFA720" />
        <rect x="15" y="65" width="5" height="5" transform="rotate(180 15 65)" fill="#FFA720" />
        <rect width="5" height="5" transform="matrix(-1 0 0 1 15 10)" fill="#FFA720" />
        <rect width="5" height="5" transform="matrix(1 0 0 -1 475 65)" fill="#FFA720" />
        <rect x="480" y="15" width="5" height="5" fill="#FFA720" />
        <rect x="10" y="60" width="5" height="5" transform="rotate(180 10 60)" fill="#FFA720" />
        <rect width="5" height="5" transform="matrix(-1 0 0 1 10 15)" fill="#FFA720" />
        <rect width="5" height="5" transform="matrix(1 0 0 -1 480 60)" fill="#FFA720" />
        <rect x="5" y="55" width="5" height="35" transform="rotate(180 5 55)" fill="#FFA720" />
        <rect x="490" y="55" width="5" height="35" transform="rotate(180 490 55)" fill="#FFA720" />
        <rect x="20" y="5" width="5.00001" height="450" transform="rotate(-90 20 5)" fill="#FFA720" />
        <rect x="470" y="70" width="5.00001" height="450" transform="rotate(90 470 70)" fill="#FFA720" />

        {/* First block - static */}
        <rect x="30" y="13" width="36" height="39" fill="#FFA720" />
        <rect x="30" y="13" width="36" height="5" fill="#FFDE29" />
        <rect x="25" y="18" width="5" height="34" fill="#FFA720" />
        <rect width="5" height="5" transform="matrix(1 0 0 -1 25 57)" fill="#D96D35" />
        <rect x="20" y="23" width="5" height="24" fill="#FFA720" />
        <rect width="5" height="5" transform="matrix(1 0 0 -1 20 52)" fill="#D96D35" />
        <rect x="30" y="57" width="36" height="5" fill="#D96D35" />
        <rect x="30" y="52" width="36" height="5" fill="#FF9442" />

        {/* Animated blocks (8 blocks) */}
        <Block x={74} index={0} />
        <Block x={118} index={1} />
        <Block x={162} index={2} />
        <Block x={206} index={3} />
        <Block x={250} index={4} />
        <Block x={294} index={5} />
        <Block x={338} index={6} />
        <Block x={382} index={7} />

        {/* Last block - static */}
        {/* <rect x="426" y="13" width="36" height="5" fill="#FFDE29" />
        <rect x="426" y="18" width="36" height="34" fill="#FFA720" />
        <rect x="426" y="52" width="36" height="5" fill="#FF9442" />
        <rect x="426" y="57" width="36" height="5" fill="#D96D35" />
        <rect x="462" y="18" width="5" height="34" fill="#FFA720" />
        <rect width="5" height="5" transform="matrix(1 0 0 -1 462 57)" fill="#D96D35" />
        <rect x="467" y="23" width="5" height="24" fill="#FFA720" />
        <rect width="5" height="5" transform="matrix(1 0 0 -1 467 52)" fill="#D96D35" /> */}
      </g>
      <defs>
        <clipPath id="clip0_3_8382">
          <rect width="490" height="75" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}