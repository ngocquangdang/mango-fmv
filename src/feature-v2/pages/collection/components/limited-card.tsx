
import { useURSupplyStats } from '../../collection/hooks/use-collection';

export default function CollectionLimited() {
  const { data, isLoading } = useURSupplyStats();

  // Fallback to empty array if loading or no data
  const items = data?.data || [];

  return (
    <div className="w-full h-full flex flex-col items-center p-4 lg:p-8 relative">
      <div className="w-full h-full overflow-y-auto mt-2 px-4 lg:px-12 scrollbar-hide">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <>
            {items.map((item) => {
              // Calculate progress (issued cards)
              const issued = item.max_supply - item.remaining_supply;
              const percentage = (issued / item.max_supply) * 100;

              return (
                <div key={item.card_id} className="flex items-center gap-4 w-full">
                  {/* Card Image */}
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-14 lg:w-16 lg:h-24 bg-gray-300 rounded overflow-hidden shadow-md border-2 border-white transform rotate-[-2deg]">
                      {/* Placeholder image for now as API doesn't return image URL */}
                      <img src={item.image_url} alt="" className="w-full h-full object-cover" />
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="flex justify-between items-end px-1">
                      <span className="font-hand font-bold text-[#112953] text-xs lg:text-sm">{item.card_name}</span>
                      <span className="font-hand font-bold text-[#FF5A5A] text-sm lg:text-lg">
                        {issued}/{item.max_supply}
                      </span>
                    </div>
                    <div className="w-full h-3 lg:h-5 bg-white border-2 border-[#112953] rounded-full relative overflow-hidden shadow-inner">
                      <div
                        className="h-full bg-[#FFC300]"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}

            {items.length === 0 && (
              <div className="w-full text-center py-10 font-hand text-gray-500">Chưa có dữ liệu thẻ giới hạn</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
