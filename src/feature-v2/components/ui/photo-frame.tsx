const PhotoFrame = ({
  imageSrc = "", // Đường dẫn ảnh người dùng
  score = 0, // Điểm số (mặc định là 0)
  className = "", // Class tùy biến thêm
}: {
  imageSrc: string;
  score: number;
  className: string;
}) => {
  const AVATAR_FRAME = "/images/avatar-frame.png";
  return (
    <div className={`photo-frame-container ${className || ""}`}>
      {/* 1. Ảnh người dùng (User Avatar) */}
      <img src={imageSrc} alt="User" className="user-photo" />

      {/* 2. Khung viền (Frame Overlay) */}
      <img src={AVATAR_FRAME} alt="Frame" className="frame-overlay" />

      {/* 3. Điểm số (+0) */}
      <div className="absolute rotate-[-10deg] z-3 text-sm font-bold text-[#F76933] bottom-0 right-0 ">
        +{score}
      </div>
    </div>
  );
};

export default PhotoFrame;
