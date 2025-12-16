import { useEffect, useState } from "react";

const LoadingBar = ({ isLoading = true }: { isLoading?: boolean }) => {
  const loadingTrackImg = "/images/loading-bar.png";
  const [dots, setDots] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setProgress(100);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        // Tăng dần đến 90% thì dừng chờ
        if (prev >= 90) return prev;
        return prev + Math.random() * 15;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <div className="flex flex-col w-full max-w-[500px] gap-1">
      {/* 1. Label Text: "Tải xuống..." */}
      <div className="ml-2">
        <span className=" text-xs text-white font-bold drop-shadow-[2px_2px_0_rgba(0,0,0,0.6)] tracking-wide">
          Tải xuống{dots}
        </span>
      </div>

      {/* 2. Thanh Loading */}
      <div
        className="relative w-full h-[25px] select-none"
        style={{
          backgroundImage: `url(${loadingTrackImg})`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Container bên trong dùng padding để phần màu cam 
            không đè lên viền xanh của ảnh nền.
            (Ước lượng viền ảnh dày khoảng 3px-4px)
        */}
        <div className="w-full h-full p-[4px]">
          {/* Thanh màu cam (Progress Fill) */}
          <div
            className="h-full bg-[#F05A28] transition-all duration-300 ease-out flex items-center overflow-hidden"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          >
            {/* Texture giấy mờ phủ lên màu cam để tạo độ sần tự nhiên (Optional) */}
            <div
              className="w-full h-full opacity-20 bg-white mix-blend-overlay"
              style={{
                backgroundImage: 'url("/images/paper-texture.png")',
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingBar;
