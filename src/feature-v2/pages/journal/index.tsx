import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import NotebookLayout from "../../components/notebook";
import LeftSide from "./left-side";
import RightSide from "./right-side";
import Banner from "../../components/banner";
import { useUserContext } from "../../../features/user/context";
import RewardDetail from "../../components/ui/reward-detail";
import type { MomentReward } from "../../../features/user/apis";

export default function Journal() {
  const navigate = useNavigate();
  const { collectedRewards } = useUserContext();
  const [isRewardDetailOpen, setIsRewardDetailOpen] = useState(false);
  const [selectedRewardImage, setSelectedRewardImage] = useState<string | null>(
    null
  );

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

  const handleOpenRewardDetail = (reward: MomentReward) => {
    if (!reward?.rewardImageUrl) {
      return;
    }

    setSelectedRewardImage(reward.rewardImageUrl);
    setIsRewardDetailOpen(true);
  };

  const handleCloseRewardDetail = () => {
    setIsRewardDetailOpen(false);
    setSelectedRewardImage(null);
  };

  return (
    <>
      <div className="w-full h-full flex items-center justify-center relative">
        <div
          className="absolute top-4 left-4 z-50 cursor-pointer w-9 h-9"
          onClick={() => navigate("/")}
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
          rightContent={
            <RightSide collectedRewards={items} onRewardClick={handleOpenRewardDetail} />
          }
        />
      </div>

      <RewardDetail
        isOpen={isRewardDetailOpen}
        imageUrl={selectedRewardImage}
        onClose={handleCloseRewardDetail}
      />
    </>
  );
}
