import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import NotebookLayout from "../../components/notebook";
import Banner from "../../components/banner";
// import CardCollection from "../card-collection";
import MergeCardPage from "./merge-card";
import LeftSide from "./left-side";
import RightSide from "./right-side";
import { CollectionProvider, useCollectionContext } from './context/collection-context';
import CollectionLeaderboard from "./components/leaderboard";
import CollectionLimited from "./components/limited-card";
import { HistoryLeft, HistoryRight } from "./components/history";
import Button from '../../components/ui/button';


export function CollectionPageContent() {
  const navigate = useNavigate();
  const { characters, fetchCollection } = useCollectionContext();

  const [selectedTab, setSelectedTab] = useState<string>("");

  // Handle tab switch
  const handleTabChange = (id: string) => {
    setSelectedTab(id);
    fetchCollection(id);
  };

  const categories = characters.map((char) => ({
    id: char.id,
    name: char.name
  }));

  const subPages = [
    {
      name: "Bộ Sưu Tập",
      id: "card-collection",
      slug: "card-collection"
    },
    {
      name: "Bảng xếp hạng",
      id: "leaderboard",
      slug: "leaderboard"
    },
    {
      name: "Thẻ giới hạn",
      id: "limited",
      slug: "limited"
    },
    {
      name: "Lịch sử Giao dịch",
      id: "history",
      slug: "history"
    }
  ];

  const handleSelectSubPage = (id: string) => {
    // Navigate to the subpage. 
    // If it's card-collection, we might want to preserve the selected tab if possible, or default.
    navigate(`/collection/${id}`);
  }

  const { "*": subPageParam } = useParams();

  // Determine current active subpage. default to card-collection
  const currentSubPageId = subPageParam?.split('/')[0] || "card-collection";

  // Effect to handle initial load or URL changes for tabs
  useEffect(() => {
    // If we are in card-collection, handle character selection logic
    if (currentSubPageId === "card-collection") {
      if (characters.length > 0 && !selectedTab) {
        setSelectedTab(characters[0].id);
        fetchCollection(characters[0].id);
      }
    }
  }, [characters, selectedTab, fetchCollection, currentSubPageId]);

  // If we are on merge-card page, render it directly as it handles its own layout
  if (currentSubPageId === "merge-card") {
    return <MergeCardPage />;
  }

  // Logic to determine content
  let centerContent = null;
  let showCategories = false;
  let leftContentToRender = <LeftSide />;
  let rightContentToRender = <RightSide />;

  if (currentSubPageId === "leaderboard") {
    centerContent = <CollectionLeaderboard />;
  } else if (currentSubPageId === "limited") {
    centerContent = <CollectionLimited />;
  } else if (currentSubPageId === "history") {
    leftContentToRender = <HistoryLeft />;
    rightContentToRender = <HistoryRight />;
  } else {
    // Default: card-collection
    showCategories = true;
    // Keep existing left/right content behavior
  }

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div
        className="absolute top-4 left-4 z-50 cursor-pointer w-9 h-9"
        onClick={() => navigate("/")}
      >
        <img src="/images/back-icon.png" alt="back-icon" className="w-9 h-9" />
      </div>
      <Banner text={subPages.find(p => p.id === currentSubPageId)?.name || "Bộ sưu tập"} className="absolute! top-4 left-4" />

      <NotebookLayout
        subPages={subPages}
        onSelectSubPage={handleSelectSubPage}
        selectedSubPage={currentSubPageId}
        // Only pass categories if we are in collection mode
        categories={showCategories ? categories : undefined}
        selectedTab={selectedTab}
        setSelectedTab={handleTabChange}
        leftContent={leftContentToRender}
        rightContent={rightContentToRender}
        centerContent={centerContent}
        extraContent={
          <div className="absolute -bottom-2 lg:-bottom-12 left-0 w-full flex justify-center gap-24 lg:gap-40 z-20 pointer-events-none">
            <Button
              label="Ghép thẻ"
              size="small"
              lgSize="large"
              className="text-white! text-xs pl-8 pr-2"
              containerClassName="text-white! text-xs p-2 pointer-events-auto"
              onClick={() => navigate("/collection/merge-card")}
              customBgImage="/images/collection/button-primary.png"
            />
            <Button
              label="Sưu tập thẻ"
              size="small"
              lgSize="large"
              className="text-[#F76933]! text-xs pl-8 pr-2"
              containerClassName="text-[#F76933]! text-xs pointer-events-auto"
              onClick={() => navigate("/card-collection")}
              customBgImage="/images/collection/button-white.png"
            />
          </div>
        }
      />
    </div>
  );
}

export default function CollectionPage() {
  return (
    <CollectionProvider>
      <CollectionPageContent />
    </CollectionProvider>
  );
}
