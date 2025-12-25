import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import NotebookLayout from "../../components/notebook";
import Banner from "../../components/banner";
import { useVideoPlayerContext } from "../../../contexts";
import CardCollection from "../card-collection";
import LeftSide from "./left-side";
import RightSide from "./right-side";
import { CollectionProvider, useCollectionContext } from "./context/collection-context";

export function CollectionPageContent() {
  const { setType } = useVideoPlayerContext();
  const navigate = useNavigate();
  const { characters, fetchCollection } = useCollectionContext();

  const [selectedTab, setSelectedTab] = useState<string>("");

  useEffect(() => {
    if (characters.length > 0 && !selectedTab) {
      setSelectedTab(characters[0].id);
      fetchCollection(characters[0].id);
    }
  }, [characters, selectedTab, fetchCollection]);

  // Handle tab switch
  const handleTabChange = (id: string) => {
    setSelectedTab(id);
    fetchCollection(id);
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
    navigate(`/collection/${id}`);
  }

  const { "*": subPageParam } = useParams();

  if (subPageParam === "card-collection") {
    return <CardCollection />;
  }

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div
        className="absolute top-4 left-4 z-50 cursor-pointer w-9 h-9"
        onClick={() => setType("intro")}
      >
        <img src="/images/back-icon.png" alt="back-icon" className="w-9 h-9" />
      </div>
      <Banner text="Bộ sưu tập" className="absolute! top-4 left-4" />

      <NotebookLayout
        subPages={subPages}
        onSelectSubPage={handleSelectSubPage}
        categories={categories}
        selectedTab={selectedTab}
        setSelectedTab={handleTabChange}
        leftContent={<LeftSide />}
        rightContent={<RightSide />}
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
