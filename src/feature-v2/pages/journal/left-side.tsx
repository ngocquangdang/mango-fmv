import FramedStoryline from "./frame-story";
import FrameUser from "./frame-user";

interface LeftSideProps {
  selectedUser: any;
  setSelectedUser: (user: any) => void;
  users: Array<{
    id: string;
    name: string;
    avatar: string;
  }>;
}

export default function LeftSide({
  selectedUser,
  setSelectedUser,
  users
}: LeftSideProps) {

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {selectedUser && selectedUser.id && (
        <FramedStoryline info={selectedUser} className="w-[202px] h-[158px] lg:w-[242.4px] lg:h-[189.6px] top-10 right-2 " />
      )}
      <div className="relative w-[274px] h-[154px] lg:w-[328.8px] lg:h-[184.8px] right-10">
        <div className="w-full h-full flex items-center justify-center gap-2">
          {selectedUser && selectedUser.id && (
            <FrameUser key={selectedUser.id} selected={true} avatar={selectedUser.avatar} />
          )}
          {users
            .filter((user) => user.id !== selectedUser.id)
            .map((user) => (
              <FrameUser
                key={user.id}
                avatar={user.avatar}
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
