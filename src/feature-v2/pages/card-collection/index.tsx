import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Banner from "../../components/banner";
import CollectionProgress from "./components/collection-progress";
import BlindBagSelector from "./components/blind-bag-selector";
import BlindBagOpeningOverlay from "./components/blind-bag-opening-overlay";
import SingleBlindBagOverlay from "./components/single-blind-bag-overlay";
import TicketPurchaseOverlay from "./components/ticket-purchase-overlay";
import Button from "../../components/ui/button";
import GameModal from "../../components/ui/dialog";
import { CardCollectionProvider } from "./context"; // Import provider
import { useCardCollection } from "./hooks/use-card-collection"; // Import hook
import { useTicketPrice } from "./hooks/use-card-collection-query";
import { useVideoPlayerContext } from "../../../contexts";
import { getOrderStatus } from "../../../lib/api/ticket-api";
import type { Card } from "./services/card-collection-service";
import { useToast } from "../../../components/ui/toast-v2/use-toast";

function CardCollectionContent() {
  const navigate = useNavigate();
  const { banners, userState, userInfo, openBlindBag } = useCardCollection();
  const [searchParams, setSearchParams] = useSearchParams();
  const { showToast } = useToast();
  const { setIsVipModalOpen } = useVideoPlayerContext();

  const [isOpeningBulk, setIsOpeningBulk] = React.useState(false);
  const [isOpeningSingle, setIsOpeningSingle] = React.useState(false);
  const [isLoadingBulk, setIsLoadingBulk] = React.useState(false);
  const [isLoadingSingle, setIsLoadingSingle] = React.useState(false);
  const [isBuyingTickets, setIsBuyingTickets] = React.useState(false);
  const [selectedBannerIndex, setSelectedBannerIndex] = React.useState(0);
  const [openedCards, setOpenedCards] = React.useState<Card[]>([]);
  const [bonusCards, setBonusCards] = React.useState<Card[]>([]);
  const [isShowingBonus, setIsShowingBonus] = React.useState(false);
  const [paymentStatus, setPaymentStatus] = React.useState<'verifying' | 'success' | 'failed' | null>(null);
  const [paymentModalData, setPaymentModalData] = React.useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => { },
  });

  // Handle payment callback from Pay1
  React.useEffect(() => {
    // Get raw search string
    const searchString = window.location.search;

    if (!searchString) return;

    let status: string | null = null;
    let orderId: string | null = null;

    // Check if double-encoded (contains %3D or %26)
    if (searchString.includes('%3D') || searchString.includes('%26')) {
      // Double-encoded - decode once
      const decodedSearch = decodeURIComponent(searchString.substring(1)); // Remove '?' and decode
      const params = new URLSearchParams(decodedSearch);

      status = params.get('status');
      orderId = params.get('orderId');
    } else {
      // Normal encoding - use regular searchParams
      status = searchParams.get('status');
      orderId = searchParams.get('orderId');
    }

    if (status && orderId) {
      handlePaymentCallback(status, orderId);
    }
  }, [window.location.search, searchParams]);

  const handlePaymentCallback = async (_status: string, orderId: string) => {
    setPaymentStatus('verifying');

    try {
      // Poll for order status
      const maxAttempts = 6; // 30 seconds (6 attempts * 5 seconds)
      let attempts = 0;

      const pollOrderStatus = async (): Promise<void> => {
        if (attempts >= maxAttempts) {
          setPaymentStatus('failed');
          setPaymentModalData({
            isOpen: true,
            title: 'Lỗi xác thực',
            message: 'Không thể xác nhận thanh toán. Vui lòng kiểm tra lại sau.',
            onConfirm: () => {
              setPaymentModalData({ ...paymentModalData, isOpen: false });
              clearSearchParams();
            },
          });
          return;
        }

        try {
          console.log('Polling order status, attempt:', attempts + 1, 'orderId:', orderId);
          const orderStatus = await getOrderStatus(orderId);
          console.log('Order status response:', orderStatus);

          // Check order status (COMPLETED means payment succeeded)
          if (orderStatus.status === 'COMPLETED') {
            setPaymentStatus('success');
            sessionStorage.removeItem('pending_ticket_order');
            setPaymentModalData({
              isOpen: true,
              title: 'Thanh toán thành công!',
              message: `Bạn đã nhận ${orderStatus.quantity} vé. Trang sẽ tự động làm mới để cập nhật số vé.`,
              onConfirm: () => {
                setPaymentModalData({ ...paymentModalData, isOpen: false });
                clearSearchParams();
                window.location.reload();
              },
            });
          } else if (orderStatus.status === 'CANCELLED') {
            setPaymentStatus('failed');
            setPaymentModalData({
              isOpen: true,
              title: 'Thanh toán thất bại',
              message: 'Thanh toán không thành công. Vui lòng thử lại.',
              onConfirm: () => {
                setPaymentModalData({ ...paymentModalData, isOpen: false });
                clearSearchParams();
              },
            });
          } else if (orderStatus.status === 'WAITING_FOR_PAYMENT') {
            // Still pending, poll again after 5 seconds
            console.log('Payment still pending (WAITING_FOR_PAYMENT), will retry in 5 seconds');
            attempts++;
            setTimeout(pollOrderStatus, 5000);
          } else {
            // Unknown status, log and retry
            console.log('Unknown order status:', orderStatus.status, 'will retry in 5 seconds');
            attempts++;
            setTimeout(pollOrderStatus, 5000);
          }
        } catch (pollError) {
          console.error('Error polling order status:', pollError);
          // If polling fails, retry (don't immediately show error)
          attempts++;
          if (attempts >= maxAttempts) {
            // Only show error after max attempts
            setPaymentStatus('failed');
            setPaymentModalData({
              isOpen: true,
              title: 'Lỗi hệ thống',
              message: 'Có lỗi xảy ra khi xác nhận thanh toán. Vui lòng thử lại sau.',
              onConfirm: () => {
                setPaymentModalData({ ...paymentModalData, isOpen: false });
                clearSearchParams();
              },
            });
          } else {
            // Retry after delay
            setTimeout(pollOrderStatus, 5000);
          }
        }
      };

      await pollOrderStatus();
    } catch (error) {
      console.error('Payment verification failed:', error);
      setPaymentStatus('failed');
      setPaymentModalData({
        isOpen: true,
        title: 'Lỗi hệ thống',
        message: 'Có lỗi xảy ra khi xác nhận thanh toán. Vui lòng thử lại sau.',
        onConfirm: () => {
          setPaymentModalData({ ...paymentModalData, isOpen: false });
          clearSearchParams();
        },
      });
    }
  };

  const clearSearchParams = () => {
    setSearchParams({});
  };

  const activeBanner = banners[selectedBannerIndex];
  const { data: ticketPriceData } = useTicketPrice(activeBanner?.type);
  const ticketPrice = ticketPriceData?.data?.price ?? 10;

  const handleBulkOpen = async () => {
    if ((userInfo as any)?.isVip !== 3) {
      setIsVipModalOpen(true);
      return;
    }
    if (!activeBanner) return;
    setIsLoadingBulk(true);
    setIsShowingBonus(false);
    try {
      await openBlindBag({ bannerId: activeBanner.id, quantity: 10 }, {
        onSuccess: (data) => {
          console.log("Bulk open success", data);
          setIsOpeningBulk(true);
          setOpenedCards(data.data.results);
          setBonusCards(data.data.bonusRewards || []);
        },
        onSettled: () => {
          setIsLoadingBulk(false);
        }
      });
    } catch (e: any) {
      console.error("Failed to open bags", e);
      setIsLoadingBulk(false);
      const errorMessage = e?.response?.data?.error?.message || "Có lỗi xảy ra, vui lòng thử lại sau.";
      showToast({
        description: errorMessage,
      });
    }
  };

  const handleCloseBulk = () => {
    setIsOpeningBulk(false);
    if (bonusCards.length > 0) {
      setTimeout(() => {
        setOpenedCards(bonusCards);
        setIsOpeningBulk(true);
        setIsShowingBonus(true);
        setBonusCards([]);
      }, 300);
    }
  };

  const handleViewCollectionFromOverlay = () => {
    if (bonusCards.length > 0) {
      handleCloseBulk();
    } else {
      navigate('/collection');
    }
  };

  const handleSingleOpen = async () => {
    if ((userInfo as any)?.isVip !== 3) {
      setIsVipModalOpen(true);
      return;
    }
    if (!activeBanner) return;
    setIsLoadingSingle(true);
    setIsShowingBonus(false);
    try {
      await openBlindBag({ bannerId: activeBanner.id, quantity: 1 }, {
        onSuccess: (data) => {
          console.log("Single open success", data);
          setOpenedCards(data.data.results);
          setBonusCards(data.data.bonusRewards || []);
          setIsOpeningSingle(true);
        },
        onSettled: () => {
          setIsLoadingSingle(false);
        }
      });
    } catch (e: any) {
      console.error("Failed to open bag", e);
      setIsLoadingSingle(false);
      const errorMessage = e?.response?.data?.error?.message || "Có lỗi xảy ra, vui lòng thử lại sau.";
      showToast({
        description: errorMessage,
      });
    }
  }

  const handleCloseSingle = () => {
    if (bonusCards.length > 0) {
      setOpenedCards(bonusCards);
      setIsOpeningBulk(true); // Switch to Bulk Overlay (Grid View)
      setIsShowingBonus(true);
      setIsOpeningSingle(false);
      setBonusCards([]); // Clear so we don't loop
    } else {
      setIsOpeningSingle(false);
      setOpenedCards([]);
      setBonusCards([]);
    }
  }

  // Use real ticket count from API (userInfo has the actual balance from database)
  // Fallback to userState for backward compatibility
  const tickets = userInfo?.ticketBalance ?? userState?.ticketCount ?? 0;
  const collectedCount = userState?.pityCount || 0;

  return (
    <div className="w-full h-full flex flex-col items-center relative overflow-hidden">
      <div className='absolute inset-0 w-full h-full ' style={{
        backgroundImage: "url('/images/collection/bg.png')",
        backgroundSize: "contain",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}></div>
      {/* Back Button */}
      <div
        className="absolute top-4 left-4 z-50 cursor-pointer w-9 h-9"
        onClick={() => navigate("/collection")}
      >
        <img src="/images/back-icon.png" alt="back-icon" className="w-9 h-9" />
      </div>

      {/* Currency Top Right */}

      <div className="absolute top-0 right-0 flex items-center gap-2 p-4" onClick={() => { }}>
        <div
          className="w-20 h-10 lg:w-[164px] lg:h-[82px] bg-cover bg-center bg-no-repeat flex items-center justify-center text-xs lg:text-xl lg:pb-1"
          style={{ backgroundImage: `url(/images/score-banner.png)` }}
        >
          {tickets}

        </div>
        <div className='absolute top-4 left-1 w-8 h-8 lg:w-13 lg:h-13 lg:top-5 lg:left-3' style={{
          backgroundImage: "url('/images/collection/coin-icon.png')",
          backgroundSize: "contain",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}></div>
        {/* <div className='absolute top-6 right-1 w-8 h-8 lg:top-10 lg:right-5 lg:w-10 lg:h-10  font-bold text-lg lg:text-2xl text-[#FF4820]'>+</div> */}
      </div>

      {/* Header Banner */}
      <div className="flex flex-col items-center gap-2">
        <Banner text="Thu thập thẻ" />
      </div>

      {/* Progress Bar */}
      <div className="mt-8 z-10">
        <CollectionProgress current={collectedCount} max={40} />
      </div>

      <div className='relative z-10 top-0 w-[464px] h-[234px] lg:w-[820px] lg:h-[496px]' style={{
        backgroundImage: "url('/images/collection/bg-inside.png')",
        backgroundSize: "contain",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}>

        {/* Blind Bag Area */}
        <div className="flex-1 w-full h-full flex items-center justify-center relative z-10 lg:mt-8 -top-4">
          <BlindBagSelector
            banners={banners}
            selectedIndex={selectedBannerIndex}
            onSelect={setSelectedBannerIndex}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 lg:gap-10 z-20 items-center justify-center relative bottom-10 lg:bottom-24">
          {/* Single Open */}
          <div className="flex flex-col items-center gap-2 relative">
            <Button
              label={isLoadingSingle ? "Đang xé..." : "Xé túi mù"}
              size="small"
              lgSize="large"
              className="text-[#F76933]! text-xs pl-8 pr-2"
              containerClassName="text-[#F76933]! text-xs pl-10 pr-2"
              onClick={handleSingleOpen}
              disabled={isLoadingSingle || isLoadingBulk}
              customBgImage="/images/collection/button-white.png"
            />
            <div className='absolute -left-2 -top-2 z-10'>
              <span className=" text-[10px] absolute left-1 top-5 -rotate-20">tốn {ticketPrice}</span>
              <img src="/images/collection/ticket-x.png" alt="ticket" className="w-14 h-12 lg:w-24 lg:h-[70px] lg:-left-12 lg:-top-2" />
            </div>
          </div>

          {/* Bulk Open */}
          <div className="flex flex-col items-center gap-2 relative">
            <Button
              label={isLoadingBulk ? "Đang xé..." : "Xé túi mù x10"}
              size="small"
              lgSize="large"
              className="text-white! text-xs pl-8 pr-2"
              containerClassName="bg-contain! w-fit text-white! text-xs pl-10 pr-2"
              onClick={handleBulkOpen}
              disabled={isLoadingSingle || isLoadingBulk}
              customBgImage="/images/collection/button-primary.png"
            />
            <div className='absolute -left-2 -top-2 z-10'>
              <span className=" text-[10px] absolute left-1 top-5 -rotate-20">tốn {ticketPrice * 10}</span>
              <img src="/images/collection/ticket-x.png" alt="ticket" className="w-14 h-12 lg:w-24 lg:h-[70px] lg:-left-12 lg:-top-2" />
            </div>

          </div>
        </div>
      </div>

      <BlindBagOpeningOverlay isOpen={isOpeningBulk} onSkip={handleCloseBulk} cards={openedCards} blindBagImage={activeBanner?.imageUrl} onViewCollection={handleViewCollectionFromOverlay} isBonus={isShowingBonus} />
      <SingleBlindBagOverlay isOpen={isOpeningSingle} onConfirm={() => handleCloseSingle()} card={openedCards[0]} />
      <TicketPurchaseOverlay
        isOpen={isBuyingTickets}
        onClose={() => setIsBuyingTickets(false)}
        currentTickets={tickets}
      // We can pass handleCreateOrder here if TicketPurchaseOverlay supported it
      />

      {/* Payment Verification Overlay */}
      {paymentStatus === 'verifying' && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-8 text-center max-w-md">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#FF4820] mx-auto mb-4"></div>
            <p className="text-xl font-bold text-[#112953] mb-2">Đang xác thực thanh toán...</p>
            <p className="text-sm text-gray-600">Vui lòng đợi trong giây lát</p>
          </div>
        </div>
      )}

      {/* Payment Result Modal */}
      <GameModal
        isOpen={paymentModalData.isOpen}
        onConfirm={paymentModalData.onConfirm}
        title={paymentModalData.title}
        message={paymentModalData.message}
      />
    </div>
  );
}

export default function CardCollection() {
  return (
    <div className="w-full h-full relative">
      <CardCollectionProvider>
        <CardCollectionContent />
      </CardCollectionProvider>
    </div>
  )
}
