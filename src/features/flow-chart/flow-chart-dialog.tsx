import FlowChart from "./flow-chart";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function FlowChartDialog({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-white"
      role="dialog"
      aria-modal="true"
      aria-label="Story Flow"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 rounded bg-white/90 px-3 py-1 text-sm z-10"
        aria-label="Close"
      >
        Close
      </button>
      <div className="h-full w-full">
        <FlowChart />
      </div>
    </div>
  );
}
