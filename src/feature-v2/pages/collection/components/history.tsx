import { useMemo, useState } from 'react';
import { useTicketTransactions, useSpendingHistory } from '../hooks/use-collection';
import { useUserContext } from '../../../../features/user/context';

const LIMIT = 8;

export function HistoryLeft() {
  const { userInfo } = useUserContext();
  const [purchasePage, setPurchasePage] = useState(1);

  const { data: transactionData, isLoading: isLoadingTransactions } = useTicketTransactions(LIMIT, (purchasePage - 1) * LIMIT);

  const purchaseHistory = useMemo(() => {
    if (!transactionData?.data) return [];
    return transactionData.data.map((item) => ({
      date: new Date(item.createdAt).toLocaleDateString('vi-VN'),
      action: item.activity,
      amount: item.amount || item.mangoAmount // fallback if needed
    }));
  }, [transactionData]);

  const purchaseTotal = transactionData?.meta?.total || 0;
  const purchaseTotalPages = Math.ceil(purchaseTotal / LIMIT);

  return (
    <div className="w-full h-full px-2 lg:px-4 flex flex-col pt-6 lg:pt-10 border-r border-dashed border-gray-400/50">
      {/* User Info */}
      <div className="absolute top-2 left-4 lg:left-4 z-10 flex items-center gap-2 lg:gap-3">
        <div className="w-8 h-8 lg:w-10 lg:h-10 relative flex items-center justify-center">
          {/* Avatar Border */}
          <img src="/images/avatar-border.png" alt="border" className="absolute w-full h-full object-contain" />
          {/* Avatar */}
          <img
            src={userInfo?.avatar}
            alt="avatar"
            className="w-6 h-6 lg:w-8 lg:h-8 rounded-full object-cover relative z-10"
          />
        </div>
        <span className="font-hand font-bold text-[#112953] text-[10px] lg:text-base tracking-wide">
          {userInfo?.phoneMasked}
        </span>
      </div>

      {/* Header */}
      <div className="relative mb-4 text-center flex-shrink-0 mt-2 lg:mt-4">
        <img src="/images/cloud-icon.png" className="absolute left-6 lg:left-12 top-0 w-6 opacity-80" alt="" />
        <div className="inline-block bg-[#FF7E47] text-white px-2 lg:px-4 py-0.5 rounded-sm transform -rotate-1 shadow-sm">
          <span className="font-bold text-xs lg:text-base uppercase">LỊCH SỬ TẶNG XOÀI</span>
        </div>
        <img src="/images/cloud-icon.png" className="absolute right-6 lg:right-12 top-2 w-6 opacity-60" alt="" />
      </div>

      {/* Table Header */}
      <div className="flex text-[#E85D04] font-hand font-bold text-[10px] lg:text-sm mb-2 border-b-2 border-[#E85D04]/20 pb-1 flex-shrink-0 mx-4 lg:mx-6">
        <div className="w-1/3 text-center">Thời gian</div>
        <div className="w-1/3 text-center">Hoạt động</div>
        <div className="w-1/3 text-center">Số xoài</div>
      </div>

      {/* Content Area with Arrows */}
      <div className="flex-1 relative flex flex-col min-h-0">
        {/* Left Arrow */}
        {purchaseTotalPages > 1 && (
          <div
            className={`absolute -left-2 lg:-left-2 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer transition-opacity ${purchasePage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
            onClick={() => purchasePage > 1 && setPurchasePage(p => p - 1)}
          >
            <img src="/images/chevon-left.png" alt="prev" className="w-6 h-8 lg:w-8 lg:h-10 object-contain" />
          </div>
        )}

        {/* Right Arrow */}
        {purchaseTotalPages > 1 && (
          <div
            className={`absolute -right-2 lg:-right-2 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer transition-opacity ${purchasePage === purchaseTotalPages ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
            onClick={() => purchasePage < purchaseTotalPages && setPurchasePage(p => p + 1)}
          >
            <img src="/images/chevon-right.png" alt="next" className="w-6 h-8 lg:w-8 lg:h-10 object-contain" />
          </div>
        )}

        {/* List Container */}
        <div className="flex-1 overflow-y-auto scrollbar-hide px-4 lg:px-6">
          {isLoadingTransactions ? (
            <div className="w-full text-center py-4">Loading...</div>
          ) : (
            purchaseHistory.map((item, idx) => (
              <div key={idx} className="flex text-[#112953] font-bold text-[10px] lg:text-sm py-1 border-b border-gray-200">
                <div className="w-1/3 text-center">{item.date}</div>
                <div className="w-1/3 text-center">{item.action}</div>
                <div className="w-1/3 text-center">{item.amount}</div>
              </div>
            ))
          )}
          {!isLoadingTransactions && purchaseHistory.length === 0 && (
            <div className="w-full text-center py-4 text-gray-500 text-xs">Chưa có giao dịch</div>
          )}
        </div>
      </div>
    </div>
  );
}

export function HistoryRight() {
  const [spendPage, setSpendPage] = useState(1);
  const { data: spendingData, isLoading: isLoadingSpending } = useSpendingHistory(LIMIT, (spendPage - 1) * LIMIT);

  const spendHistory = useMemo(() => {
    if (!spendingData?.data) return [];
    return spendingData.data.map((item) => ({
      date: new Date(item.createdAt).toLocaleDateString('vi-VN'),
      action: item.activity,
      amount: item.amount
    }));
  }, [spendingData]);

  const spendTotal = spendingData?.meta?.total || 0;
  const spendTotalPages = Math.ceil(spendTotal / LIMIT);

  return (
    <div className="w-full h-full px-2 lg:px-4 flex flex-col pt-2 lg:pt-4">
      {/* Header */}
      <div className="relative mb-4 text-center flex-shrink-0">
        {/* Decor icons */}
        <div className="inline-block bg-[#E76F51] text-white px-2 lg:px-4 py-0.5 rounded-sm transform rotate-1 shadow-sm mt-6 lg:mt-9">
          <span className="font-bold text-xs lg:text-base uppercase">LỊCH SỬ TIÊU XOÀI</span>
        </div>
      </div>

      {/* Table Header */}
      <div className="flex text-[#E85D04] font-hand font-bold text-[10px] lg:text-sm mb-2 border-b-2 border-[#E85D04]/20 pb-1 flex-shrink-0 mx-4 lg:mx-6">
        <div className="w-1/3 text-center">Thời gian</div>
        <div className="w-1/3 text-center">Hoạt động</div>
        <div className="w-1/3 text-center">Số xoài</div>
      </div>

      {/* Content Area with Arrows */}
      <div className="flex-1 relative flex flex-col min-h-0">
        {/* Left Arrow */}
        {spendTotalPages > 1 && (
          <div
            className={`absolute -left-2 lg:-left-2 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer transition-opacity ${spendPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
            onClick={() => spendPage > 1 && setSpendPage(p => p - 1)}
          >
            <img src="/images/chevon-left.png" alt="prev" className="w-6 h-8 lg:w-8 lg:h-10 object-contain" />
          </div>
        )}

        {/* Right Arrow */}
        {spendTotalPages > 1 && (
          <div
            className={`absolute -right-2 lg:-right-2 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer transition-opacity ${spendPage === spendTotalPages ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
            onClick={() => spendPage < spendTotalPages && setSpendPage(p => p + 1)}
          >
            <img src="/images/chevon-right.png" alt="next" className="w-6 h-8 lg:w-8 lg:h-10 object-contain" />
          </div>
        )}

        {/* List Container */}
        <div className="flex-1 overflow-y-auto scrollbar-hide px-4 lg:px-6">
          {isLoadingSpending ? (
            <div className="w-full text-center py-4">Loading...</div>
          ) : (
            spendHistory.map((item, idx) => (
              <div key={idx} className="flex text-[#112953] font-bold text-[10px] lg:text-sm py-1 border-b border-gray-200">
                <div className="w-1/3 text-center">{item.date}</div>
                <div className="w-1/3 text-center opacity-80">{item.action}</div>
                <div className="w-1/3 text-center">{item.amount}</div>
              </div>
            ))
          )}
          {!isLoadingSpending && spendHistory.length === 0 && (
            <div className="w-full text-center py-4 text-gray-500 text-xs">Chưa có giao dịch</div>
          )}
        </div>
      </div>
    </div>
  );
}
