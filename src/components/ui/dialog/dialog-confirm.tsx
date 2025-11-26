import ButtonLighter from "../../button-lighter";

type DialogConfirmProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function DialogConfirm({
  isOpen,
  onClose,
  title,
  description,
  onConfirm,
  onCancel,
}: DialogConfirmProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "#00000099" }}
    // onClick={onClose}
    >
      <div className="flex items-end">
        <div onClick={(e) => e.stopPropagation()}>
          <svg
            width="559.36"
            height="293.76"
            viewBox="0 0 874 459"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_3_10690)">
              <path
                d="M854 20H864V439H854V449H20V439H10V20H20V10H854V20Z"
                fill="#FFFDFA"
              />
              <rect x="30" width="814" height="10" fill="black" />
              <g style={{ mixBlendMode: "soft-light" }}>
                <rect x="30" y="10" width="814" height="10" fill="white" />
              </g>
              <rect x="30" y="449" width="814" height="10" fill="black" />
              <g style={{ mixBlendMode: "color-burn" }} opacity="0.3">
                <rect x="30" y="439" width="814" height="10" fill="black" />
              </g>
              <rect
                x="864"
                y="429"
                width="399"
                height="9.99997"
                transform="rotate(-90 864 429)"
                fill="black"
              />
              <rect
                width="399"
                height="10"
                transform="matrix(7.27428e-08 -1 -1 -2.62663e-08 10 429)"
                fill="black"
              />
              <rect x="844" y="10" width="10" height="10" fill="black" />
              <g style={{ mixBlendMode: "soft-light" }}>
                <rect x="844" y="20" width="10" height="10" fill="white" />
              </g>
              <rect x="854" y="20" width="10" height="10" fill="black" />
              <rect
                width="10"
                height="10"
                transform="matrix(-1 0 0 1 30 10)"
                fill="black"
              />
              <g style={{ mixBlendMode: "soft-light" }}>
                <rect
                  width="10"
                  height="10"
                  transform="matrix(-1 0 0 1 30 20)"
                  fill="white"
                />
              </g>
              <rect
                width="10"
                height="10"
                transform="matrix(-1 0 0 1 20 20)"
                fill="black"
              />
              <g style={{ mixBlendMode: "soft-light" }}>
                <rect
                  width="10"
                  height="10"
                  transform="matrix(-1 0 0 1 20 30)"
                  fill="white"
                />
              </g>
              <rect
                width="10"
                height="10"
                transform="matrix(1 0 0 -1 844 449)"
                fill="black"
              />
              <g style={{ mixBlendMode: "color-burn" }} opacity="0.3">
                <rect
                  width="10"
                  height="10"
                  transform="matrix(1 0 0 -1 844 439)"
                  fill="black"
                />
              </g>
              <rect
                width="10"
                height="10"
                transform="matrix(1 0 0 -1 854 439)"
                fill="black"
              />
              <g style={{ mixBlendMode: "color-burn" }} opacity="0.3">
                <rect
                  width="10"
                  height="10"
                  transform="matrix(1 0 0 -1 854 429)"
                  fill="black"
                />
              </g>
              <rect
                x="30"
                y="449"
                width="10"
                height="10"
                transform="rotate(180 30 449)"
                fill="black"
              />
              <g style={{ mixBlendMode: "color-burn" }} opacity={0.3}>
                <rect
                  x="30"
                  y="439"
                  width="10"
                  height="10"
                  transform="rotate(180 30 439)"
                  fill="black"
                />
              </g>
              <rect
                x="20"
                y="439"
                width="10"
                height="10"
                transform="rotate(180 20 439)"
                fill="black"
              />
            </g>
            <text
              x="437"
              y="120"
              textAnchor="middle"
              fill="black"
              fontSize="36"
              fontWeight="bold"
            >
              {title}
            </text>
            <foreignObject x="160" y="145" width="554" height="120">
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: "10px 20px",
                }}
              >
                <p
                  style={{
                    fontSize: "24px",
                    lineHeight: "1.5",
                    color: "black",
                    margin: 0,
                    wordWrap: "break-word",
                  }}
                >
                  {description}
                </p>
              </div>
            </foreignObject>
            <foreignObject x="130" y="282" width="287" height="86">
              <div
                style={{
                  width: "287px",
                  height: "86px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ButtonLighter
                  width={287}
                  className="h-full"
                  onClick={onCancel}
                >
                  <span
                    style={{
                      color: "white",
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}
                  >
                    Hủy bỏ
                  </span>
                </ButtonLighter>
              </div>
            </foreignObject>
            <foreignObject x="457" y="282" width="287" height="86">
              <div
                style={{
                  width: "287px",
                  height: "86px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ButtonLighter
                  width={287}
                  className="h-full"
                  hoverColor={{
                    main: "#FF8A50",
                    accent: "#FFD460",
                    shadow: "#E55A2A",
                    border: "#000000",
                  }}
                  onClick={onConfirm}
                >
                  <span
                    style={{
                      color: "white",
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}
                  >
                    Xác nhận
                  </span>
                </ButtonLighter>
              </div>
            </foreignObject>
            <defs>
              <clipPath id="clip0_3_10690">
                <rect width="874" height="459" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
