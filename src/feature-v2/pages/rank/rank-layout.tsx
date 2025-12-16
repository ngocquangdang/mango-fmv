import { useState } from "react";
import Button from "../../components/ui/button";
import FramedStoryline from "../journal/frame-story";
import DialogVote from "../../components/ui/dialog-vote";

const users = [
  {
    id: 1,
    name: "THÁI LÊ MINH HIẾU",
    score: "1.555.555",
    avatar: "https://picsum.photos/id/64/100/100",
  },
  {
    id: 2,
    name: "CƯỜNG BẠCH",
    score: "1.555.555",
    avatar: "https://picsum.photos/id/65/100/100",
  },
  {
    id: 3,
    name: "PHÚC NGUYÊN",
    score: "1.555.555",
    avatar: "https://picsum.photos/id/66/100/100",
  },
  {
    id: 4,
    name: "HỒ ĐỒNG QUÂN",
    score: "1.555.555",
    avatar: "https://picsum.photos/id/67/100/100",
  },
  {
    id: 5,
    name: "LÂM ANH",
    score: "1.555.555",
    avatar: "https://picsum.photos/id/68/100/100",
  },
];

export default function RankLayout() {
  const [selectedUser, setSelectedUser] = useState<typeof users[0] | null>(null);

  return (
    <div
      className="relative w-[620px] h-[344px] bg-cover bg-center flex items-center justify-center py-8"
      style={{ backgroundImage: "url('/images/rank-bg.png')" }}
    >
      {/* LEFT SIDE: Featured */}
      <div className="w-[40%] relative le -rotate-6">
        <FramedStoryline
          className="w-[234px] h-[184px]"
          info={{
            avatar: "https://picsum.photos/id/64/100/100",
            name: "Nhân Vật Được Yêu Thích Nhất",
          }}
        />
      </div>

      {/* RIGHT SIDE: List */}
      <div className="w-[55%] h-full flex flex-col pt-12 pl-4 relative">
        {/* Total Votes Badge */}
        <div className="absolute top-6 right-8 z-20">
          <div
            className="w-20 h-10 bg-cover bg-center bg-no-repeat flex items-center justify-center text-xs"
            style={{ backgroundImage: `url(/images/score-banner.png)` }}
          >
            100
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-4 overflow-y-auto pr-2 h-full custom-scrollbar">
          {users.map((user, index) => (
            <div
              key={user.id}
              className="flex items-center justify-between w-full"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 flex justify-center">
                  {/* Crown icon or simple number styled */}
                  <span
                    className={`text-3xl font-bold ${
                      index === 0
                        ? "text-yellow-500 scale-125"
                        : "text-slate-500"
                    }`}
                  >
                    {index + 1}
                  </span>
                </div>
                <div
                  className="w-8 h-8 bg-cover bg-center bg-no-repeat flex items-center justify-center"
                  style={{ backgroundImage: `url('/images/avatar-border.png')` }}
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#3b82f6] text-[10px] font-bold uppercase leading-tight">
                    {user.name}
                  </span>
                  <span className="text-[#f97316] text-[10px] font-bold flex items-center gap-1">
                    ♥ {user.score}
                  </span>
                </div>
              </div>

              <Button
                label="BÌNH CHỌN"
                size="tiny"
                className="text-[10px] p-0!"
                onClick={() => setSelectedUser(user)}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Vote Dialog */}
      {selectedUser && (
        <DialogVote
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
          data={selectedUser}
          onVote={() => {
            console.log("Voted for:", selectedUser.name);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
}
