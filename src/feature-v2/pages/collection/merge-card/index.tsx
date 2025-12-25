import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NotebookLayout from "../../../components/notebook";
import { useCollectionContext } from "../context/collection-context";
import { useVideoPlayerContext } from "../../../../contexts";
import Banner from "../../../components/banner";
import type { CollectionItem } from "../right-side";
import SingleBlindBagOverlay from "../../card-collection/components/single-blind-bag-overlay";
import type { Card } from "../../card-collection/services/card-collection-service";
import MergeCardLeft from "./left";
import MergeCardRight from "./right";

export default function MergeCardPage() {
  const { setType } = useVideoPlayerContext();
  const navigate = useNavigate();
  const { characters, fetchCollection } = useCollectionContext();
  // const { id: characterId } = useParams(); // Get subpage param which might contain ID?
  // The routing in collection/index.tsx uses wildcard: /collection/*, so params["*"] helps us
  const { "*": subPageParam } = useParams();

  const [selectedTab, setSelectedTab] = useState<string>("");
  const [slots, setSlots] = useState<(CollectionItem | null)[]>([null, null, null]);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [resultCard, setResultCard] = useState<Card | null>(null);

  const handleToggleItem = (item: CollectionItem) => {
    // Check if item is already in slots
    const existingIndex = slots.findIndex(s => s?.id === item.id);
    if (existingIndex !== -1) {
      // Remove if exists
      const newSlots = [...slots];
      newSlots[existingIndex] = null;
      setSlots(newSlots);
    } else {
      // Add to first empty slot
      const emptyIndex = slots.findIndex(s => s === null);
      if (emptyIndex !== -1) {
        const newSlots = [...slots];
        newSlots[emptyIndex] = item;
        setSlots(newSlots);
      } else {
        // Full? Maybe replace the second slot or just ignore.
        // For better UX, let's shift: [0] -> replaced by [1], [1] -> new item?
        // Or simple: Replace the last one? 
        // Let's implement: Replace the second "unlocked" slot or just the last slot.
        // User requirement: "trường hợp trùng id thì loại bỏ hình đó bên phải" -> handled.
        // "thêm vào bên phải" -> handled.

        // NOTE: Optional behavior if full, replace 2nd slot.
        const newSlots = [...slots];
        newSlots[1] = item;
        setSlots(newSlots);
      }
    }
  };

  const handleRemoveSlot = (index: number) => {
    const newSlots = [...slots];
    newSlots[index] = null;
    setSlots(newSlots);
  }

  const handleMerge = () => {
    console.log("Merge triggered", slots);
    // Logic to determine result card (Mocking for now as per request "hiển thị SingleBlindBagOverlay")
    // In real scenario, this would come from API response
    // Let's us the first slot as the "result" or a mock card
    if (slots[0]) {
      const mockResult: Card = {
        id: slots[0].id,
        name: slots[0].name,
        imageUrl: slots[0].image,
        tier: slots[0].rank as any, // assuming rank matches tier roughly
        isOwned: true
      };
      setResultCard(mockResult);
      setIsOverlayOpen(true);
    }
  }

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
    setResultCard(null);
    setSlots([null, null]); // Clear slots after merge?
  }

  // Parse character ID from URL or fallback
  // We need to parse parent logic properly.

  // Actually, in NotebookLayout, the left side and right side are just contents. 
  // We want to maintain the "Character Tabs" on the right (which are Categories).

  useEffect(() => {
    if (characters.length > 0) {
      // Extract character ID from subPageParam "merge-card/{id}"
      if (subPageParam && subPageParam.startsWith("merge-card/")) {
        const id = subPageParam.split("/")[1];
        if (id && id !== selectedTab) {
          setSelectedTab(id);
          fetchCollection(id);
        }
      } else if (!selectedTab) {
        // Default to first char
        const firstId = characters[0].id;
        setSelectedTab(firstId);
        fetchCollection(firstId);
        // Update URL to match
        navigate(`/collection/merge-card/${firstId}`, { replace: true });
      }
    }
  }, [characters, subPageParam, fetchCollection, navigate, selectedTab]);

  const handleTabChange = (id: string) => {
    setSelectedTab(id);
    fetchCollection(id);
    // We might want to keep the URL consistent: /collection/merge-card/{id}
    navigate(`/collection/merge-card/${id}`);
  };

  const categories = characters.map(char => ({
    id: char.id,
    name: char.name
  }));

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
    else navigate(`/collection/${id}/${selectedTab || characters[0]?.id}`);
  }

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div
        className="absolute top-4 left-4 z-50 cursor-pointer w-9 h-9"
        onClick={() => setType("intro")}
      >
        <img src="/images/back-icon.png" alt="back-icon" className="w-9 h-9" />
      </div>
      <Banner text="Ghép thẻ" className="absolute! top-4 left-4" />

      <NotebookLayout
        subPages={subPages}
        onSelectSubPage={handleSelectSubPage}
        categories={categories}
        selectedTab={selectedTab}
        setSelectedTab={handleTabChange}
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
