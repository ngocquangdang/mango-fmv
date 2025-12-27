
import React from "react";
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

import type { Card } from "./services/card-collection-service"; // Import Card type

function CardCollectionContent() {
  const { setType } = useVideoPlayerContext();
  const { banners, userState, openBlindBag, isOpening } = useCardCollection();

  const [isOpeningBulk, setIsOpeningBulk] = React.useState(false);
  const [isOpeningSingle, setIsOpeningSingle] = React.useState(false);
  const [isBuyingTickets, setIsBuyingTickets] = React.useState(false);
  const [selectedBannerIndex, setSelectedBannerIndex] = React.useState(0);
  const [openedCards, setOpenedCards] = React.useState<Card[]>([]);
  const [bonusCards, setBonusCards] = React.useState<Card[]>([]);

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
          className="w-20 h-10 lg:w-[164px] lg:h-[82px] bg-cover bg-center bg-no-repeat flex items-center justify-center text-xs lg:text-xl lg:pb-1"
          style={{ backgroundImage: `url(/images/score-banner.png)` }}
          onClick={() => setIsBuyingTickets(true)}
        >
          {tickets}

        </div>
        <div className='absolute top-3 left-3 w-8 h-8 lg:w-12 lg:h-12 lg:top-4 lg:left-5' style={{
          backgroundImage: "url('/images/collection/ticket.png')",
          backgroundSize: "contain",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}></div>
        <div className='absolute top-6 right-1 w-8 h-8 lg:top-8 lg:right-2 lg:w-10 lg:h-10 text-white font-bold text-lg'>+</div>
      </div>

      {/* Header Banner */}
      <div className="flex flex-col items-center gap-2">
        <Banner text="Thu thập thẻ" />
      </div>

      {/* Progress Bar */}
      <div className="mt-8 z-10">
        <CollectionProgress current={collectedCount} max={40} />
      </div>

      <div className='relative z-10 top-0 w-[386px] h-[234px] lg:w-[820px] lg:h-[496px]' style={{
        backgroundImage: "url('/images/collection/bg-inside.png')",
        backgroundSize: "contain",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}>

        {/* Blind Bag Area */}
        <div className="flex-1 w-full h-full flex items-center justify-center relative z-10 lg:mt-8">
          <BlindBagSelector
            banners={banners}
            selectedIndex={selectedBannerIndex}
            onSelect={setSelectedBannerIndex}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-8 lg:gap-14 z-20 items-center justify-center relative -bottom-5 lg:-bottom-[-40px]">
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
            <img src="/images/collection/ticket-1.png" alt="ticket" className="absolute -left-2 top-0 w-10 h-7 lg:w-24 lg:h-[70px] lg:-left-12 lg:-top-2" />

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
            <img src="/images/collection/ticket-10.png" alt="ticket" className="absolute -left-5 top-0 w-10 h-7 lg:w-24 lg:h-[70px] lg:-left-12 lg:-top-2" />

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

