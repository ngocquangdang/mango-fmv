import { useState } from "react";
import Button from "../../components/ui/button";
import FramedStoryline from "../journal/frame-story";
import DialogVote from "../../components/ui/dialog-vote";
import { useUserContext } from "../../../features/user/context";
import { useRankContext } from "./context";
import type { LeaderboardUser } from "./service/apis";

export default function RankLayout() {
  const [selectedUser, setSelectedUser] = useState<LeaderboardUser | null>(
    null
  );
  const { chapter } = useUserContext();
  const { leaderboard, isLeaderboardLoading } = useRankContext();
  const totalVotes = chapter?.progress?.points || 0;

  const users = leaderboard || [];

  return (
    <div
      className="relative w-[620px] h-[344px] lg:w-[744px] lg:h-[413px] bg-cover bg-center flex items-center justify-center py-8"
      style={{ backgroundImage: "url('/images/rank-bg.png')" }}
    >
      {/* LEFT SIDE: Featured */}
      <div className="w-[40%] relative -rotate-6">
        <FramedStoryline
          className="w-[234px] h-[184px] lg:w-[281px] lg:h-[221px] text-[#26396C] relative z-20"
          info={{
            avatar: users[0]?.characterAvatar || "",
            name: "Nhân Vật Được Yêu Thích Nhất",
          }}
        />
        <img
          src="/images/elements/crown-1-element.png"
          alt="cloud"
          className="w-12 h-10 lg:w-[58px] lg:h-[48px] absolute top-0 left-0 z-20"
        />
        <img
          src="/images/elements/cloud-element.png"
          alt="cloud"
          className="w-12 h-10 lg:w-[58px] lg:h-[48px] absolute bottom-10 left-0 z-20"
        />
        <img
          src="/images/elements/cloud-element.png"
          alt="start-bold"
          className="w-16 h-16 lg:w-[77px] lg:h-[77px] absolute top-15 right-0 z-20"
        />
        <img
          src="/images/elements/tag-element.png"
          alt="tag"
          className="w-[54px] h-[40px] lg:w-[65px] lg:h-[48px] absolute top-15 z-50 -left-4 rotate-60"
        />
      </div>

      {/* RIGHT SIDE: List */}
      <div className="w-[55%] h-full flex flex-col pt-12 pl-4 relative">
        {/* Total Votes Badge */}
        <div className="absolute top-6 right-8 z-20">
          <div
            className="w-20 h-10 lg:w-[96px] lg:h-[48px] bg-cover bg-center bg-no-repeat flex items-center justify-center text-xs lg:text-sm"
            style={{ backgroundImage: `url(/images/score-banner.png)` }}
          >
            10000L
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-4 overflow-y-auto pr-2 h-full custom-scrollbar">
          {isLeaderboardLoading ? (
            <div className="flex items-center justify-center py-4">
              <p className="text-sm text-gray-500">Đang tải...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="flex items-center justify-center py-4">
              <p className="text-sm text-gray-500">Chưa có dữ liệu</p>
            </div>
          ) : (
            users.map((user, index) => (
              <div
                key={user.characterId}
                className="flex items-center justify-between w-full"
              >
                <div className="flex pl-4 pt-2 items-center gap-3 relative">
                  <div className="w-8 flex justify-center">
                    {/* Crown icon or simple number styled */}
                    <span
                      className={`relative z-10 text-2xl font-bold ${index === 0
                        ? "text-yellow-500 scale-125"
                        : "text-slate-500"
                        }`}
                    >
                      {index + 1}
                    </span>
                  </div>
                  <img
                    src={
                      index < 3
                        ? `/images/elements/crown-${index + 1}-element.png`
                        : `/images/elements/crown-element.png`
                    }
                    alt="crown"
                    className={
                      "absolute top-0 left-0 " +
                      (index < 3 ? `w-${11 - index} h-${8 - index}` : "w-8 h-6")
                    }
                  />
                  <div
                    className="w-8 h-8 lg:w-[38.4px] lg:h-[38.4px] bg-cover bg-center bg-no-repeat flex items-center justify-center"
                    style={{
                      backgroundImage: `url('/images/avatar-border.png')`,
                    }}
                  >
                    <img
                      src={user.characterAvatar}
                      alt={user.characterName}
                      className="w-7 h-7 lg:w-[33.6px] lg:h-[33.6px] rounded-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[#3b82f6] text-[10px] lg:text-[12px] font-bold uppercase leading-tight">
                      {user.characterName}
                    </span>
                    <span className="text-[#f97316] text-[10px] lg:text-[12px] font-bold flex items-center gap-1">
                      <img
                        src="/images/heart-icon.png"
                        alt="heart"
                        className="w-4 h-4 lg:w-[19.2px] lg:h-[19.2px]"
                      />{" "}
                      {user.totalPoints || 0}
                    </span>
                  </div>
                </div>

                <Button
                  label="BÌNH CHỌN"
                  size="tiny"
                  lgSize="small"
                  containerClassName="text-[10px]! lg:text-sm p-0! lg:px-4!"
                  onClick={() => setSelectedUser(user)}
                />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Vote Dialog */}
      {selectedUser && (
        <DialogVote
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
          data={{
            id: selectedUser.characterId,
            name: selectedUser.characterName,
            score: totalVotes,
            avatar: selectedUser.characterAvatar,
          }}
          onVote={() => {
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
}
