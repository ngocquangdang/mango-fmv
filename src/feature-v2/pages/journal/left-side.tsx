import { useState } from "react";
import FramedStoryline from "./frame-story";
import FrameUser from "./frame-user";

export default function LeftSide() {
  const [selectedUser, setSelectedUser] = useState<any>({
    id: 0,
    name: "User 1",
    avatar: "https://picsum.photos/200/120",
  });

  const users = [
    {
      id: 0,
      name: "User 1",
      avatar: "https://picsum.photos/200/120",
    },
    {
      id: 1,
      name: "User 2",
      avatar: "https://picsum.photos/200/120",
    },
    {
      id: 2,
      name: "User 3",
      avatar: "https://picsum.photos/200/120",
    },
    {
      id: 3,
      name: "User 4",
      avatar: "https://picsum.photos/200/120",
    },
    {
      id: 4,
      name: "User 5",
      avatar: "https://picsum.photos/200/120",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <FramedStoryline info={selectedUser} className="w-[202px] h-[158px]  top-10 right-2 " />
      <div className="relative w-[274px] h-[154px] right-10">
        <div className="w-full h-full flex items-center justify-center gap-2">
          <FrameUser key={selectedUser.id} selected={true}  />
          {users
            .filter((user) => user.id !== selectedUser.id)
            .map((user) => (
              <FrameUser
                key={user.id}
                selected={false}
                onClick={() => setSelectedUser(user)}
              />
            ))}
        </div>
        <img
          src="/images/note-pager.png"
          alt="Frame"
          className="absolute bottom-0 block w-full h-full pointer-events-none"
        />
      </div>
    </div>
  );
}
