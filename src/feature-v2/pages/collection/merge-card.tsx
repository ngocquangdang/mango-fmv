import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NotebookLayout from "../../components/notebook";
import type { CollectionItem } from "./right-side";
import RightSide, { ItemCard } from "./right-side";
import { useCollectionContext } from "./context/collection-context";
import { useVideoPlayerContext } from "../../../contexts";
import Banner from "../../components/banner";
import Button from "../../components/ui/button";

const DragItem = ({ item, children }: { item: CollectionItem; children: React.ReactNode }) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("application/json", JSON.stringify(item));
    e.dataTransfer.effectAllowed = "copy"; // or move
  };

  return (
    <div draggable={!item.isLocked} onDragStart={handleDragStart} className={item.isLocked ? "" : "cursor-grab active:cursor-grabbing"}>
      {children}
    </div>
  )
}

const MergeCardLeft = () => {
  return (
    <RightSide renderItem={(item) => (
      <DragItem item={item}>
        <ItemCard item={item} borderColorClass="border-orange-200" isLocked={item.isLocked} />
      </DragItem>
    )} />
  )
}

const MergeCardRight = () => {
  const [slots, setSlots] = useState<(CollectionItem | null)[]>([null, null, null]);
  // const { collection } = useVideoPlayerContext();

  const handleDrop = (index: number) => (e: React.DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("application/json");
    if (data) {
      try {
        const item = JSON.parse(data) as CollectionItem;
        const newSlots = [...slots];
        newSlots[index] = item;
        setSlots(newSlots);
      } catch (err) {
        console.error("Failed to parse dropped item", err);
      }
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  }

  const handleRemoveSlot = (index: number) => {
    const newSlots = [...slots];
    newSlots[index] = null;
    setSlots(newSlots);
  }

  return (
    <div className="w-full h-full flex flex-col items-center relative">
      <div className="text-[#E85D04] font-hand font-bold text-xl lg:text-3xl mt-2 mb-4">
        GHÉP THẺ
      </div>

      <div className="flex-1 flex flex-col justify-center items-center gap-4 w-full relative z-10">

        {/* Mystery Card Placeholder */}
        <div className="w-[140px] h-[190px] bg-[#D9D9D9] rounded-lg shadow-inner flex items-center justify-center relative mb-2">
          <span className="text-6xl text-orange-400 font-bold opacity-50">?</span>
        </div>

        {/* Slots */}
        <div className="w-full bg-[#FFFDF5] border border-orange-200 rounded-lg p-4 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-2 rounded-full border border-orange-200 shadow-sm rotate-180">
            <img src="/images/arrow-left.png" alt="merge icon" className="w-6 h-6 object-contain" />
          </div>

          <div className="flex gap-4 justify-center mt-2">
            {slots.map((slot, index) => (
              <div
                key={index}
                className="w-[80px] h-[110px] border-2 border-dashed border-orange-300 rounded bg-white flex items-center justify-center relative"
                onDrop={handleDrop(index)}
                onDragOver={handleDragOver}
              >
                {slot ? (
                  <div className="w-full h-full relative group">
                    <ItemCard item={slot} borderColorClass="border-orange-400" isLocked={false} className="w-full h-full" />
                    <button
                      onClick={() => handleRemoveSlot(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      x
                    </button>
                  </div>
                ) : (
                  <span className="text-orange-300 text-4xl font-bold">+</span>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-4">
            <Button
              label="Ghép ngay"
              className="bg-[#E85D04] text-white px-6 py-1 text-sm shadow-md"
              containerClassName="w-fit"
              onClick={() => console.log("Merge!", slots)}
              disabled={!slots[0] || !slots[1] || !slots[2]}
            />
          </div>
        </div>
      </div>

      {/* Decor */}
      <img src="/images/collection/dog-decor.png" className="absolute bottom-10 left-2 w-16 z-0 hidden lg:block" alt="dog" />
      <img src="/images/collection/star-decor.png" className="absolute bottom-4 right-4 w-8 z-0" alt="star" />

    </div>
  )
}

export default function MergeCardPage() {
  const { setType } = useVideoPlayerContext();
  const navigate = useNavigate();
  const { characters, fetchCollection } = useCollectionContext();
  // const { id: characterId } = useParams(); // Get subpage param which might contain ID?
  // The routing in collection/index.tsx uses wildcard: /collection/*, so params["*"] helps us
  const { "*": subPageParam } = useParams();

  const [selectedTab, setSelectedTab] = useState<string>("");

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
        leftContent={<MergeCardLeft />}
        rightContent={<MergeCardRight />}
      />
    </div>
  )
}
