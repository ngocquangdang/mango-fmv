
import React from "react";
import { useSearchParams } from "react-router-dom";
import Banner from "../../components/banner";
import { useVideoPlayerContext } from "../../../contexts";
import CollectionProgress from "./components/collection-progress";
import BlindBagSelector from "./components/blind-bag-selector";
import BlindBagOpeningOverlay from "./components/blind-bag-opening-overlay";
import SingleBlindBagOverlay from "./components/single-blind-bag-overlay";
import TicketPurchaseOverlay from "./components/ticket-purchase-overlay";
import Button from "../../components/ui/button";
import { CardCollectionProvider } from "./context"; // Import provider
import { useCardCollection } from "./hooks/use-card-collection"; // Import hook
import { getOrderStatus } from "../../../lib/api/ticket-api";

import type { Card } from "./services/card-collection-service"; // Import Card type

function CardCollectionContent() {
  const { setType } = useVideoPlayerContext();
  const { banners, userState, openBlindBag, isOpening } = useCardCollection();
  const [searchParams, setSearchParams] = useSearchParams();

  const [isOpeningBulk, setIsOpeningBulk] = React.useState(false);
  const [isOpeningSingle, setIsOpeningSingle] = React.useState(false);
  const [isBuyingTickets, setIsBuyingTickets] = React.useState(false);
  const [selectedBannerIndex, setSelectedBannerIndex] = React.useState(0);
  const [openedCards, setOpenedCards] = React.useState<Card[]>([]);
  const [bonusCards, setBonusCards] = React.useState<Card[]>([]);
  const [paymentStatus, setPaymentStatus] = React.useState<'verifying' | 'success' | 'failed' | null>(null);

  // Handle payment callback from Pay1
  React.useEffect(() => {
    const status = searchParams.get('status');
    const orderId = searchParams.get('orderId');

    if (status && orderId) {
      handlePaymentCallback(status, orderId);
    }
  }, [searchParams]);

  const handlePaymentCallback = async (_status: string, orderId: string) => {
    setPaymentStatus('verifying');

    try {
      // Poll for order status
      const maxAttempts = 6; // 30 seconds (6 attempts * 5 seconds)
      let attempts = 0;

      const pollOrderStatus = async (): Promise<void> => {
        if (attempts >= maxAttempts) {
          setPaymentStatus('failed');
          alert('Không thể xác nhận thanh toán. Vui lòng kiểm tra lại sau.');
          clearSearchParams();
          return;
        }

        const orderStatus = await getOrderStatus(orderId);

        if (orderStatus.transaction.paymentStatus === 'SUCCESS') {
          setPaymentStatus('success');
          sessionStorage.removeItem('pending_ticket_order');
          alert(`Thanh toán thành công! Bạn đã nhận ${orderStatus.quantity} vé.`);
          clearSearchParams();
          // Refresh the page to update ticket count
          window.location.reload();
        } else if (orderStatus.transaction.paymentStatus === 'FAILURE' || orderStatus.transaction.paymentStatus === 'CANCELLED') {
          setPaymentStatus('failed');
          alert('Thanh toán thất bại. Vui lòng thử lại.');
          clearSearchParams();
        } else {
          // Still pending, poll again after 5 seconds
          attempts++;
          setTimeout(pollOrderStatus, 5000);
        }
      };

      await pollOrderStatus();
    } catch (error) {
      console.error('Payment verification failed:', error);
      setPaymentStatus('failed');
      alert('Có lỗi xảy ra khi xác nhận thanh toán.');
      clearSearchParams();
    }
  };

  const clearSearchParams = () => {
    setSearchParams({});
  };

  const activeBanner = banners[selectedBannerIndex];

  const handleBulkOpen = async () => {
    if (!activeBanner) return;
    try {
      openBlindBag({ bannerId: activeBanner.id, quantity: 10 }, {
        onSuccess: (data) => {
          console.log("Bulk open success", data);
          setIsOpeningBulk(true);
          setOpenedCards(data.data.results);
          setBonusCards(data.data.bonusRewards || []);
        },
      });
    } catch (e) {
      console.error("Failed to open bags", e);
      // Handle error (e.g. not enough tickets)
    }
  };

  const handleCloseBulk = () => {
    setIsOpeningBulk(false);
    if (bonusCards.length > 0) {
      setOpenedCards(bonusCards);
      setIsOpeningSingle(true);
      setBonusCards([]);
    }
  };

  const handleSingleOpen = async () => {
    if (!activeBanner) return;
    try {
      openBlindBag({ bannerId: activeBanner.id, quantity: 1 }, {
        onSuccess: (data) => {
          console.log("Single open success", data);
          setOpenedCards(data.data.results);
          setBonusCards(data.data.bonusRewards || []);
          setIsOpeningSingle(true);
        },
      });
    } catch (e) {
      console.error("Failed to open bag", e);
    }
  }

  const handleCloseSingle = () => {
    setIsOpeningSingle(false);
    setOpenedCards([]);
    setBonusCards([]);
  }

  // Use real ticket count from API if available, fallback to stats (mock or other source)
  const tickets = userState?.ticketCount ?? 0;
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
        onClick={() => setType("intro")}
      >
        <img src="/images/back-icon.png" alt="back-icon" className="w-9 h-9" />
      </div>

      {/* Currency Top Right */}
      <div className="absolute top-0 right-0 flex items-center gap-2 p-4">
        <div
          className="w-20 h-10 lg:w-[96px] lg:h-[48px] bg-cover bg-center bg-no-repeat flex items-center justify-center text-xs lg:text-sm"
          style={{ backgroundImage: `url(/images/score-banner.png)` }}
          onClick={() => setIsBuyingTickets(true)}
        >
          {tickets}

        </div>
        <div className='absolute top-3 left-3 w-8 h-8' style={{
          backgroundImage: "url('/images/collection/ticket.png')",
          backgroundSize: "contain",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}></div>
        <div className='absolute top-6 right-1 w-8 h-8'>+</div>
      </div>

      {/* Header Banner */}
      <div className="flex flex-col items-center gap-2">
        <Banner text="Thu thập thẻ" />
      </div>

      {/* Progress Bar */}
      <div className="mt-8 z-10">
        <CollectionProgress current={collectedCount} max={40} />
      </div>

      <div className='relative z-10 top-0 w-[386px] h-[234px]' style={{
        backgroundImage: "url('/images/collection/bg-inside.png')",
        backgroundSize: "contain",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}>

        {/* Blind Bag Area */}
        <div className="flex-1 w-[386px] flex items-center justify-center relative z-10 mt-10">
          <BlindBagSelector
            banners={banners}
            selectedIndex={selectedBannerIndex}
            onSelect={setSelectedBannerIndex}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-8 z-20 items-center justify-center relative -bottom-7">
          {/* Single Open */}
          <div className="flex flex-col items-center gap-2 relative">
            <Button
              label={isOpening ? "ĐANG XÉ..." : "XÉ TÚI MÙ"}
              size="small"
              lgSize="large"
              className="text-[#F76933]! "
              onClick={handleSingleOpen}
              disabled={isOpening}
              customBgImage="/images/collection/button-white.png"
            />
            <img src="/images/collection/ticket-1.png" alt="ticket" className="absolute -left-2 top-0 w-10 h-7" />

          </div>

          {/* Bulk Open */}
          <div className="flex flex-col items-center gap-2 relative">
            <Button
              label={isOpening ? "ĐANG XÉ..." : "XÉ TÚI MÙ X10"}
              size="small"
              lgSize="large"
              className="text-white"
              containerClassName="bg-contain! w-fit"
              onClick={handleBulkOpen}
              disabled={isOpening}
              customBgImage="/images/collection/button-primary.png"
            />
            <img src="/images/collection/ticket-10.png" alt="ticket" className="absolute -left-5 top-0 w-10 h-7" />

          </div>
        </div>
      </div>

      <BlindBagOpeningOverlay isOpen={isOpeningBulk} onSkip={handleCloseBulk} cards={openedCards} blindBagImage={activeBanner?.imageUrl} />
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

