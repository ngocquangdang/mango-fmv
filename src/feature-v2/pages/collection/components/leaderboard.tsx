import { useUserLeaderboard } from '../hooks/use-collection';

export default function CollectionLeaderboard() {
  const { data: leaderboardData, isLoading } = useUserLeaderboard();

  const leaderboard = leaderboardData?.data || [];

  return (
    <div className="w-full h-full flex items-center justify-center p-4 lg:p-8 relative z-[11]">
      {/* Container simulating the paper background */}
      <div className="w-full h-full relative" style={{
        // backgroundImage: "url('/images/paper-texture.png')", // Fallback or assume notebook background is enough
        // backgroundSize: "cover" 
      }}>
        {/* Header Table */}
        <div className="flex w-full mb-2 lg:mb-4 px-4 lg:px-12 text-[#E85D04] font-hand font-bold text-xs lg:text-base">
          <div className="w-1/4 text-center">
            <span className="bg-[#FF7E47] text-white px-2 py-1 rounded-sm shadow relative block w-fit mx-auto">HẠNG</span>
          </div>
          <div className="w-1/2 text-center">
            <span className="bg-[#FF7E47] text-white px-8 py-1 rounded-sm shadow relative block w-fit mx-auto">SỐ ĐIỆN THOẠI</span>
          </div>
          <div className="w-1/4 text-center flex justify-end">
            <span className="bg-[#FF7E47] text-white px-2 py-1 rounded-sm shadow relative block w-fit mx-auto">SỐ LƯỢT XÉ TÚI MÙ</span>
          </div>
        </div>

        {/* List */}
        <div className="flex flex-col gap-1 lg:gap-2 px-2 lg:px-8 overflow-y-auto h-[240px] lg:h-[500px] scrollbar-hide">
          {isLoading ? (
            <div className="w-full text-center py-4">Loading...</div>
          ) : (
            leaderboard.map((item, index) => (
              <div key={index} className="flex items-center w-full py-1 lg:py-2 hover:bg-black/5 rounded-lg transition-colors">

                {/* Rank */}
                <div className="w-1/4 flex justify-center relative items-center">
                  <span
                    className={`relative z-10 font-bold font-hand text-lg lg:text-2xl ${item.rank === 1
                      ? "text-[#FBBF24] scale-125" // text-yellow-500
                      : "text-[#64748B]" // text-slate-500
                      }`}
                  >
                    {item.rank}
                  </span>
                  <img
                    src={
                      item.rank <= 3
                        ? `/images/elements/crown-${item.rank}-element.png`
                        : `/images/elements/crown-element.png`
                    }
                    alt="crown"
                    className={
                      "absolute -top-1 left-1/4 opacity-80 " +
                      (item.rank <= 3 ? "w-10 h-10 lg:w-12 lg:h-12" : "w-6 h-6 lg:w-8 lg:h-8 hidden")

                    }
                    style={{ marginTop: '-4px' }} // Adjust vertical alignment
                  />
                </div>

                {/* Phone */}
                <div className="w-1/2 flex justify-center items-center gap-2">
                  {/* Avatar */}
                  <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full border border-[#E85D04] overflow-hidden flex-shrink-0">
                    <img
                      src={item.imageUrl}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Phone */}
                  <span className="text-[#0066FF] font-hand font-bold text-sm lg:text-xl">{item.phoneMasked}</span>
                </div>

                {/* Total Spins */}
                <div className="w-1/4 flex justify-end items-center gap-1 lg:gap-2 pr-4 lg:pr-10">
                  <span className="text-[#112953] font-bold text-sm lg:text-lg">{item.totalSpins.toLocaleString('vi-VN')}</span>
                  <img src="/images/collection/blind-box-empty.png" alt="ticket" className="w-4 h-3 lg:w-6 lg:h-4" />
                </div>

              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
