import FramedStoryline from "../../pages/journal/frame-story";

const DialogInfo = ({
  isOpen = true,
  onClose,
  isLoading = false,
  data,
}: {
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
  data: {
    mainImage: string;
    itemImage: string;
    itemName: string;
    title: string;
    description: string;
    characterName?: string;
  };
}) => {
  const BG_PAPER_IMG = "/images/bg-dialog-info.png";
  const FLOWER_IMAGE = "/images/flower.png";
  if (!isOpen) return null;

  return (
    // Lớp phủ mờ (Overlay)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60  p-4">
      <div
        className="relative w-full max-w-[370px] h-[294px] ml-[240px] bg-contain bg-center bg-no-repeat shadow-2xl"
        style={{ backgroundImage: `url(${BG_PAPER_IMG})` }}
      >
        <button className="absolute top-0 -right-6 w-12 h-12" onClick={onClose}>
          <img
            src="/images/close-icon.png"
            alt="close"
            className="w-full h-full object-cover"
          />
        </button>

        {isLoading ? (
          <div className="flex items-center justify-center h-full w-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F76933]"></div>
          </div>
        ) : data ? (
          <>
            <div className="absolute z-10 top-8 -left-[60%]">
              <FramedStoryline
                className="w-[318px] h-[248px] -rotate-12 bg-white"
                info={{
                  avatar: data.mainImage,
                  name: data.characterName || "",
                }}
              />
              <img
                src="/images/elements/cloud-element.png"
                alt="main-image"
                className="w-[54px] h-10 absolute top-15 -left-10"
              />
              <img
                src="/images/elements/start-bold-element.png"
                alt="main-image"
                className="w-16 h-16 absolute bottom-10 z-50 right-0"
              />
              <img
                src="/images/elements/sound-element.png"
                alt="main-image"
                className="w-7 h-7 absolute bottom-10 -right-4"
              />
            </div>
            <div className="absolute w-fit left-[16%] z-20">
              <FramedStoryline
                className="w-[110px] h-[134px]"
                bgImg="/images/note-gift-card.png"
                info={{
                  avatar: data.itemImage,
                  name: data.itemName || "",
                }}
              />
              <img
                src="/images/elements/tag-element.png"
                alt="main-image"
                className="w-[54px] h-[40px] absolute top-2 z-50 -left-2 rotate-120"
              />
            </div>

            <div className="pl-[124px] pr-[50px] pt-7">
              <div className="pl-14 ">
                <img src={FLOWER_IMAGE} alt="flower" className="w-12 h-15" />
                <h2 className="text-sm font-bold text-[#F76933] mt-2">
                  {data.title}
                </h2>
              </div>
              <p className="text-[10px] text-[#667085] mt-6 line-clamp-6">
                {data.description}
              </p>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default DialogInfo;
