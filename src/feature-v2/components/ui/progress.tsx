const RewardProgress = ({
  currentPoints = 0, // Điểm hiện tại
  maxPoints = 100, // Tổng điểm
  onClaimReward, // Hàm callback khi bấm nhận quà
  className = "",
}: {
  currentPoints: number;
  maxPoints: number;
  onClaimReward: (value: number) => void;
  className?: string;
}) => {
  console.log("🚀 ~ RewardProgress ~ currentPoints:", currentPoints)
  // Tính phần trăm độ rộng thanh progress
  const percentage = Math.min((currentPoints / maxPoints) * 100, 100);

  // Cấu hình các mốc quà (bạn có thể truyền prop vào nếu muốn động)
  const milestones = [
    { value: 25, label: "25%" },
    { value: 50, label: "50%" },
    { value: 75, label: "75%" },
    { value: 100, label: "100%" },
  ];

  const GIFT_ACTIVE = "/images/gift-highlight.png";
  const GIFT_DISABLED = "/images/gift-disabled.png";

  return (
    <div className={`relative w-[192px] ${className}`}>
      <div className="progress-track">
        {/* Thanh đã chạy (Fill) */}
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        ></div>

        {/* Layer chứa các hộp quà */}
        <div className="milestones-layer">
          {milestones.map((milestone) => {
            // Kiểm tra xem đã đạt mốc này chưa
            const isReached = percentage >= milestone.value;

            return (
              <div
                key={milestone.value}
                className="milestone-item"
                style={{ left: `${milestone.value}%` }} // Căn vị trí theo %
                onClick={() =>
                  isReached && onClaimReward && onClaimReward(milestone.value)
                }
              >
                {/* Hiển thị ảnh quà dựa trên trạng thái */}
                <img
                  src={isReached ? GIFT_ACTIVE : GIFT_DISABLED}
                  alt={`Gift ${milestone.value}%`}
                  className="gift-icon"
                />

                {/* Nhãn phần trăm */}
                <span className="text-[10px] text-[#667085]">{milestone.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RewardProgress;
