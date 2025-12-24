
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
  const { stats, openBlindBag, isOpening } = useCardCollection();

  const [isOpeningBulk, setIsOpeningBulk] = React.useState(false);
  const [isOpeningSingle, setIsOpeningSingle] = React.useState(false);
  const [isBuyingTickets, setIsBuyingTickets] = React.useState(false);

  const handleBulkOpen = async () => {
    try {
      await openBlindBag(10);
      setIsOpeningBulk(true);
    } catch (e) {
      console.error("Failed to open bags", e);
      // Handle error (e.g. not enough tickets)
    }
  };

  const handleSingleOpen = async () => {
    try {
      await openBlindBag(1);
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

  const tickets = stats?.tickets || 0;
  const collectedCount = stats?.collectedCards || 0;
  const totalCards = stats?.totalCards || 40;

  return (
    <div className="w-full h-full flex flex-col items-center relative overflow-hidden">
      {/* Back Button */}
      <div
        className="absolute top-4 left-4 z-50 cursor-pointer w-9 h-9"
        onClick={() => setType("intro")}
      >
        <img src="/images/back-icon.png" alt="back-icon" className="w-9 h-9" />
      </div>

      {/* Currency Top Right */}
      <div className="absolute top-4 right-4 z-50 flex items-center cursor-pointer hover:scale-105 transition-transform" onClick={() => setIsBuyingTickets(true)}>
        <div className="relative">
          <img src="/images/elements/tag-element.png" alt="bg" className="h-10 w-auto absolute -top-1 -left-4 z-[-1]" />
          {/* Placeholder for ticket currency style */}
          <div className="bg-white/90 border-2 border-blue-600 rounded-full h-10 px-4 pl-8 flex items-center gap-2 min-w-[120px] shadow-lg transform -rotate-2">
            <img src="/images/elements/tag-element.png" alt="ticket" className="w-8 h-6 absolute -left-2 top-1" />
            <span className="text-blue-800 font-bold ml-4">{tickets}</span>
            <button className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center text-xs ml-auto">+</button>
          </div>
        </div>
      </div>

      {/* Header Banner */}
      <div className="mt-4">
        <Banner text="Thu thập thẻ" />
      </div>

      {/* Progress Bar */}
      <div className="mt-8 z-10">
        <CollectionProgress current={collectedCount} max={totalCards} />
      </div>

      {/* Blind Bag Area */}
      <div className="flex-1 w-full flex items-center justify-center relative z-10 -mt-8">
        <BlindBagSelector />
      </div>

      {/* Action Buttons */}
      <div className="mb-4 lg:mb-10 flex gap-8 z-20 items-end">
        {/* Single Open */}
        <div className="flex flex-col items-center gap-2">
          <Button
            label={isOpening ? "ĐANG XÉ..." : "XÉ TÚI MÙ"}
            size="medium"
            lgSize="large"
            className="text-black! font-bold uppercase"
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
            className="text-black! font-bold uppercase"
            onClick={handleBulkOpen}
            disabled={isOpening}
          />
          <div className="flex items-center gap-1 bg-white/80 px-2 py-1 rounded-md border border-black/10">
            <span className="font-bold text-xs uppercase">Tốn 10</span>
            <img src="/images/elements/tag-element.png" alt="ticket" className="w-4 h-3" />
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

