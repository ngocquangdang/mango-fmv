import { useState, useMemo } from "react";
import NotebookLayout from "../../components/notebook";
import { useVideoPlayerContext } from "../../../contexts";
import LeftSide from "./left-side";
import RightSide from "./right-side";
import Banner from "../../components/banner";
import { useUserContext } from "../../../features/user/context";

export default function Journal() {
  const { setType } = useVideoPlayerContext();
  const { collectedRewards } = useUserContext();

  const users = useMemo(() => {
    return Object.values(collectedRewards || {}).map((character: any) => ({
      id: character.id,
      name: character.name,
      avatar: character.imageUrl || character.imagePath,
    }));
  }, [collectedRewards]);

  const [selectedUser, setSelectedUser] = useState<any>(
    users.length > 0
      ? {
          id: users[0].id,
          name: users[0].name,
          avatar: users[0].avatar,
        }
      : {
          id: "",
          name: "",
          avatar: "",
        }
  );

  const [selectedTab, setSelectedTab] = useState<string>(
    Object.values(collectedRewards || {}).length > 0
      ? (collectedRewards || {})[selectedUser.id]?.momentCategories[0].id
      : ""
  );

  const categories = useMemo(() => {
    return (collectedRewards?.[selectedUser.id]?.momentCategories || [])
  }, [collectedRewards, selectedUser.id]);

  const items = useMemo(() => {
    return (collectedRewards?.[selectedUser.id]?.momentCategories || []).find(
      (category: any) => category.id === selectedTab
    )?.momentRewards || [];
  }, [collectedRewards, selectedUser.id, selectedTab]);
  
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div
        className="absolute top-4 left-4 z-50 cursor-pointer w-9 h-9"
        onClick={() => setType("intro")}
      >
        <img src="/images/back-icon.png" alt="back-icon" className="w-9 h-9" />
      </div>
      <Banner text="Nhật ký" className="absolute! top-4 left-4" />
      <NotebookLayout
        categories={categories}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        leftContent={
          <LeftSide
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            users={users}
          />
        }
        rightContent={<RightSide collectedRewards={items} />}
      />
    </div>
  );
}
