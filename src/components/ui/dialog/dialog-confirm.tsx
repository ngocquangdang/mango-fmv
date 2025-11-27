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
  title,
  description,
  onConfirm,
  onCancel,
}: DialogConfirmProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      data-testid="dialog-confirm-overlay"
      style={{
        background: "#00000099",
        paddingTop: "max(1rem, env(safe-area-inset-top))",
        paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
        paddingLeft: "max(1rem, env(safe-area-inset-left))",
        paddingRight: "max(1rem, env(safe-area-inset-right))",
      }}
    >
      <div className="flex items-center justify-center w-[90%] md:w-[60%]">
        <div className="svg-container">
          <div className="content-wrapper p-4 md:p-8 text-center flex flex-col justify-between gap-4 lg:gap-8">
            <div className="flex flex-col gap-2">
              <p className="text-xl font-bold">{title}</p>
              <p className="text-sm lg:text-base">{description}</p>
            </div>
            <div className="flex gap-4 min-h-[38px] md:min-h-[48px]">
              <ButtonLighter onClick={onCancel}>
                <span
                  style={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Hủy bỏ
                </span>
              </ButtonLighter>

              <ButtonLighter
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
                    fontWeight: "bold",
                  }}
                >
                  Xác nhận
                </span>
              </ButtonLighter>
            </div>
          </div>

          <div className="rect-common rect-1"></div>
          <div className="rect-common rect-2 blend-soft-light"></div>
          <div className="rect-common rect-3"></div>
          <div className="rect-common rect-4 blend-color-burn opacity-30"></div>

          <div className="rect-vertical rect-5"></div>
          <div className="rect-vertical rect-6"></div>

          <div className="rect-square rect-7"></div>
          <div className="rect-square rect-8 blend-soft-light"></div>
          <div className="rect-square rect-9"></div>

          <div className="rect-square rect-10"></div>
          <div className="rect-square rect-11 blend-soft-light"></div>
          <div className="rect-square rect-12"></div>
          <div className="rect-square rect-13 blend-soft-light"></div>

          <div className="rect-square rect-14"></div>
          <div className="rect-square rect-15 blend-color-burn opacity-30"></div>
          <div className="rect-square rect-16"></div>
          <div className="rect-square rect-17 blend-color-burn opacity-30"></div>

          <div className="rect-square rect-18"></div>
          <div className="rect-square rect-19 blend-color-burn opacity-30"></div>
          <div className="rect-square rect-20"></div>
        </div>
      </div>
    </div>
  );
}
