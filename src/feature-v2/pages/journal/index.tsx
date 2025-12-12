import { useState } from "react";
import NotebookLayout from "../../components/ui/notebook";
import FramedStoryline from "./frame-story";
import FrameUser from "./frame-user";

export default function Journal() {
  const [selectedUser, setSelectedUser] = useState<number>(0);
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
  const LeftSide = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <FramedStoryline className="w-[202px] h-[158px]  top-10 right-2 " />
      <div className="relative w-[274px] h-[154px] right-10">
        <div className="w-full h-full flex items-center justify-center gap-2">
          <FrameUser key={selectedUser} selected={true} />
          {users
            .filter((user) => user.id !== selectedUser)
            .map((user) => (
              <FrameUser key={user.id} selected={false} />
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

  // 2. Định nghĩa nội dung Trang Phải
  const RightSide = (
    <div className="relative">
      <div className="flex flex-row items-center justify-center h-full">
        <p>ba</p>
        <div className="grid grid-cols-3 gap-2">
          {new Array(9).fill(0).map((item, index) => (
            <div>
              <FramedStoryline
                key={index}
                className="w-[54px] h-[64px] -rotate-12"
                bgImg="/images/note-gift-card.png"
              />
            </div>
          ))}
        </div>
        <p>ne</p>
      </div>
      <div className="absolute bottom-2 left-4">
        <span className='text-[10px]'>
          Bạn đã sưu tầm được {1}/{3} vật phẩm
        </span>
      </div>
    </div>
  );
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <NotebookLayout leftContent={LeftSide} rightContent={RightSide} />
    </div>
  );
}
