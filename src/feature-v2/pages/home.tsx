import HookButton from "../components/ui/hook-button";
import HomeButton from "../components/ui/home-button";

export default function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="flex flex-col top-1/2 translate-y-3/4 gap-4 w-fit">
        <HomeButton icon="/images/window-icon.png" label="Cốt truyện" />
        <HomeButton icon="/images/book-icon.png" label="Nhật ký" />
        <HomeButton icon="/images/rank-icon.png" label="Xếp hạng" />
      </div>
      <div className="fixed bottom-0 right-12 w-[134px] h-[116px]">
        <HookButton label="Tiếp tục" onClick={() => {}} />
      </div>
    </div>
  );
}
