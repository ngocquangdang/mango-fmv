
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

function CardCollectionContent() {
  const { setType } = useVideoPlayerContext();
  const { stats, banners, userState, openBlindBag, isOpening } = useCardCollection();

  const [isOpeningBulk, setIsOpeningBulk] = React.useState(false);
  const [isOpeningSingle, setIsOpeningSingle] = React.useState(false);
  const [isBuyingTickets, setIsBuyingTickets] = React.useState(false);
  const [selectedBannerIndex, setSelectedBannerIndex] = React.useState(0);

  const activeBanner = banners[selectedBannerIndex];

  const handleBulkOpen = async () => {
    if (!activeBanner) return;
    try {
      await openBlindBag(activeBanner.id, 10);
      setIsOpeningBulk(true);
    } catch (e) {
      console.error("Failed to open bags", e);
      // Handle error (e.g. not enough tickets)
    }
  };

  const handleSingleOpen = async () => {
    if (!activeBanner) return;
    try {
      await openBlindBag(activeBanner.id, 1);
      setIsOpeningSingle(true);
    } catch (e) {
      console.error("Failed to open bag", e);
    }
  }

  // const handleCreateOrder = async (packageId: number) => {
  //   try {
  //     await buyTickets(packageId);
  //     // Don't close overlay immediately, maybe show success toast
  //     // setIsBuyingTickets(false); 
  //   } catch (e) {
  //     console.error("Failed to buy tickets", e);
  //   }
  // }

  // Use real ticket count from API if available, fallback to stats (mock or other source)
  const tickets = userState?.ticketCount ?? 0;
  const collectedCount = stats?.collectedCards || 0;
  const totalCards = stats?.totalCards || 0;

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
        >
          {tickets}
        </div>

      </div>

      {/* Header Banner */}
      <div className="flex flex-col items-center gap-2">
        <Banner text="Thu thập thẻ" />
      </div>

      {/* Progress Bar */}
      <div className="mt-8 z-10">
        <CollectionProgress current={collectedCount} max={totalCards} />
      </div>

      <div className='relative z-10 -top-[50px] w-[386px]' style={{
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
        <div className="mb-4 lg:mb-10 flex gap-8 z-20 items-center justify-center">
          {/* Single Open */}
          <div className="flex flex-col items-center gap-2">
            <Button
              label={isOpening ? "ĐANG XÉ..." : "XÉ TÚI MÙ"}
              size="medium"
              lgSize="large"
              className="text-black! "
              onClick={handleSingleOpen}
              disabled={isOpening}
            />
            <div className="flex items-center gap-1 bg-white/80 px-2 py-1 rounded-md border border-black/10">
              <span className="font-bold text-xs uppercase">Tốn 1</span>
              <img src="/images/elements/tag-element.png" alt="ticket" className="w-4 h-3" />
            </div>
          </div>

          {/* Bulk Open */}
          <div className="flex flex-col items-center gap-2">
            <Button
              label={isOpening ? "ĐANG XÉ..." : "XÉ TÚI MÙ X10"}
              size="medium"
              lgSize="large"
              className="text-black!"
              onClick={handleBulkOpen}
              disabled={isOpening}
            />
            <div className="flex items-center gap-1 bg-white/80 px-2 py-1 rounded-md border border-black/10">
              <span className="font-bold text-xs uppercase">Tốn 10</span>
              <img src="/images/elements/tag-element.png" alt="ticket" className="w-4 h-3" />
            </div>
          </div>
        </div>
      </div>

      <BlindBagOpeningOverlay isOpen={isOpeningBulk} onSkip={() => setIsOpeningBulk(false)} />
      <SingleBlindBagOverlay isOpen={isOpeningSingle} onConfirm={() => setIsOpeningSingle(false)} />
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

