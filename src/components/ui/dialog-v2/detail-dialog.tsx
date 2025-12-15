import DialogInfo from "../../../feature-v2/components/ui/dialog-info";

type DetailDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  data: {
    mainImage: string;
    itemImage: string;
    itemName: string;
    title: string;
    description: string;
  };
};

export default function DetailDialog({
  isOpen,
  onClose,
  data,
}: DetailDialogProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "#00000099" }}
      onClick={onClose}
    >
      <div className="flex items-end justify-end w-[80vw]">
        <DialogInfo isOpen={isOpen} onClose={onClose} data={data} />
      </div>
    </div>
  );
}
