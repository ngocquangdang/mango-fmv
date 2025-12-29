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
    <div className="flex flex-col items-center origin-center lg:mt-[30px]">
      {selectedUser && selectedUser.id && (
        <FramedStoryline info={selectedUser} className="w-[202px] h-[158px] lg:w-[440px] lg:h-[340px] top-10 right-2 " />
      )}
      <div className="relative w-[274px] h-[154px] lg:w-[550px] lg:h-[275px] right-10">
        <div className="w-full h-full flex items-center justify-center gap-2">
          {selectedUser && selectedUser.id && (
            <FrameUser key={selectedUser.id} selected={true} avatar={selectedUser.avatar} className='w-[64px] lg:w-[106px]' />
          )}
          {users
            .filter((user) => user.id !== selectedUser.id)
            .map((user) => (
              <FrameUser
                key={user.id}
                avatar={user.avatar}
                selected={false}
                className="w-[42px] lg:w-[70px]"
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
