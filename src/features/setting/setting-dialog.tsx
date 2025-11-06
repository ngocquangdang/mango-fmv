import SettingMenu from "../../components/setting-menu";

interface Props {
  onOpenChapter: () => void;
  onClose: () => void;
}

export default function SettingDialog(props: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-10">
      <div className="bg-white p-4 rounded-lg w-[400px]">
        <SettingMenu {...props} />
      </div>
    </div>
  );
}
