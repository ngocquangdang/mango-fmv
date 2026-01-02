import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NotebookLayout from "../../../components/notebook";
import { useCollectionContext } from "../context/collection-context";
import Banner from "../../../components/banner";
import type { CollectionItem } from "../right-side";
import { useToast } from "../../../../components/ui/toast-v2/use-toast";
import SingleBlindBagOverlay from "../../card-collection/components/single-blind-bag-overlay";
import { CardCollectionService, type Card } from "../../card-collection/services/card-collection-service";
import MergeCardLeft from "./left";
import MergeCardRight from "./right";

export default function MergeCardPage() {
  // const { setType } = useVideoPlayerContext();
  const navigate = useNavigate();
  const { fetchCollection } = useCollectionContext();
  // const { id: characterId } = useParams(); // Get subpage param which might contain ID?
  // The routing in collection/index.tsx uses wildcard: /collection/*, so params["*"] helps us
  const { showToast } = useToast();

  const [selectedTab, setSelectedTab] = useState<string>("");
  const [slots, setSlots] = useState<(CollectionItem | null)[]>([null, null, null]);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [resultCard, setResultCard] = useState<Card | null>(null);

  const handleToggleItem = (item: CollectionItem) => {
    // Count how many of this item is currently in slots
    const currentCountInSlots = slots.filter(s => s?.id === item.id).length;
    // Get max available quantity (item comes from collection with count property)
    const maxQuantity = item.count || 1;

    if (currentCountInSlots < maxQuantity) {
      // Add to slots
      // 1. Find first empty slot
      const emptyIndex = slots.findIndex(s => s === null);

      if (emptyIndex !== -1) {
        const newSlots = [...slots];
        newSlots[emptyIndex] = item;
        setSlots(newSlots);
      } else {
        // 2. If full, replace the last slot (user friendly behavior)
        const newSlots = [...slots];
        newSlots[newSlots.length - 1] = item;
        setSlots(newSlots);
      }
    } else {
      // Already reached max quantity -> Remove ONE instance (the last one found)
      // This allows toggling down
      const reversedSlots = [...slots].reverse();
      const indexInReversed = reversedSlots.findIndex(s => s?.id === item.id);

      if (indexInReversed !== -1) {
        // Calculate original index
        const originalIndex = slots.length - 1 - indexInReversed;
        const newSlots = [...slots];
        newSlots[originalIndex] = null;
        setSlots(newSlots);
      }
    }
  };

  const handleRemoveSlot = (index: number) => {
    const newSlots = [...slots];
    newSlots[index] = null;
    setSlots(newSlots);
  }

  const handleMerge = async () => {
    console.log("Merge triggered", slots);

    // Filter out empty slots
    const validItems = slots.filter((s): s is CollectionItem => s !== null);

    // Validate: need at least 2 items (or depends on game rule, logic check implies >= 2 in UI)
    if (validItems.length < 2) {
      showToast({ description: "Cần ít nhất 2 thẻ để ghép" });
      return;
    }

    try {
      const cardIds = validItems.map(item => item.id);

      const response = await CardCollectionService.mergeCards(cardIds);

      if (response.data && response.data.resultCard) {
        setResultCard(response.data.resultCard);
        setIsOverlayOpen(true);
        // Clear slots on success
        setSlots([null, null, null]);

        // Refresh collection to reflect consumed cards and new card
        if (selectedTab) {
          fetchCollection(selectedTab);
        }
      }
    } catch (error: any) {
      console.error("Merge failed:", error);

      let message = "Ghép thẻ thất bại. Vui lòng thử lại.";

      // ApiError from api-client has a 'status' property
      const status = error.status || error.statusCode;

      // Handle 4xx errors (Client errors) - Show specific message
      // ApiClient now correctly extracts the message from nested error objects
      if (status && status >= 400 && status < 500 && error.message) {
        message = error.message;
      }

      showToast({ description: message });
    }
  }

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
    setResultCard(null);
    setSlots([null, null, null]); // Always keep 3 slots
  }

  const handleTabChange = (id: string) => {
    setSelectedTab(id);
    // fetchCollection(id);
    // We might want to keep the URL consistent: /collection/merge-card/{id}
    // navigate(`/collection/merge-card/${id}`); 
  };

  const subPages = [{
    slug: "card-collection",
    name: "Thu thập thẻ",
    id: "card-collection",
  }, {
    slug: "merge-card",
    name: "Ghép thẻ",
    id: "merge-card",
  }];

  const handleSelectSubPage = (id: string) => {
    if (id === "card-collection") navigate(`/collection/${id}`);
    else navigate(`/collection/${id}`);
  }

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div
        className="absolute top-4 left-4 z-50 cursor-pointer w-9 h-9"
        onClick={() => navigate("/collection")}
      >
        <img src="/images/back-icon.png" alt="back-icon" className="w-9 h-9" />
      </div>
      <Banner text="Ghép thẻ" className="absolute! top-4 left-4" />

      <NotebookLayout
        // subPages={subPages}
        // onSelectSubPage={handleSelectSubPage}
        // categories={categories}
        // selectedTab={selectedTab}
        // setSelectedTab={handleTabChange}
        leftContent={
          <MergeCardLeft
            onToggle={handleToggleItem}
            selectedIds={slots.map(s => s?.id || "").filter(Boolean)}
          />
        }
        rightContent={
          <MergeCardRight
            slots={slots}
            onRemoveSlot={handleRemoveSlot}
            onMerge={handleMerge}
          />
        }
      />

      <SingleBlindBagOverlay
        isOpen={isOverlayOpen}
        onConfirm={handleCloseOverlay}
        card={resultCard}
      />
    </div>
  )
}
