import DetailImage from "./detail-image";
import DetailCollection from "./detail-collection";
import DetailItem from './detail-item';

type DetailDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  type: "image" | "collection";
  rowLabel?: string;
  sectionLabel?: string;
};

export default function DetailDialog({
  isOpen,
  onClose,
  type,
  rowLabel,
  sectionLabel,
}: DetailDialogProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "#00000099" }}
      onClick={onClose}
    >
      <div className="flex items-end justify-end w-[80vw] h-[80vh]">
        <div onClick={(e) => e.stopPropagation()}>
          {type === "image" ? (
            <DetailImage rowLabel={rowLabel} sectionLabel={sectionLabel} onClose={onClose} />
          ) : (
            <DetailItem rowLabel={rowLabel} sectionLabel={sectionLabel} onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  );
}
