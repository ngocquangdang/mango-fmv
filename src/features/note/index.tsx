import { useState, useEffect } from "react";
import NoteLeft from "../../components/note-left";
import Tab, { type TabBlockConfig } from "../../components/tab";
import CharacterCard from "./components/character-card";
import CharacterActiveCard from "./components/character-active-card";
import YieldGrid from "./components/yield-grid";
import NoteGrid from "./components/note-grid";

import Banner from "../../components/banner";
import { DetailDialogProvider } from "../../components/ui/dialog/detail-dialog-context";
import { useDetailDialog } from "../../components/ui/dialog/use-detail-dialog";
import { useCharacters } from "../user/hooks";
import type { Character } from "../../types/chapter";

const tabBlocks: TabBlockConfig[] = [
  {
    key: "tab-standard-0",
    clipId: "clip9_28_52262",
    innerClipId: "clip10_28_52262",
    origin: { x: 30, y: 12 },
    activeClipId: "clip9_28_52262",
    activeInnerClipId: "clip10_28_52262",
    activeOrigin: { x: 30, y: 0 },
    label: "Vật phẩm",
    // labelOffset: { x: 116.5, y: 56 },
    activeLabelFontSize: 18,
  },
  {
    key: "tab-standard-1",
    clipId: "clip0_28_52262",
    innerClipId: "clip1_28_52262",
    origin: { x: 265, y: 12 },
    activeClipId: "clip0_28_52262",
    activeInnerClipId: "clip1_28_52262",
    activeOrigin: { x: 255, y: 0 },
    label: "Nhật ký 72h",
    activeLabelFontSize: 18,
  },
  {
    key: "tab-standard-2",
    clipId: "clip2_28_52262",
    innerClipId: "clip3_28_52262",
    origin: { x: 489, y: 12 },
    activeClipId: "clip2_28_52262",
    activeInnerClipId: "clip3_28_52262",
    activeOrigin: { x: 479, y: 0 },
    label: "Hành trình",
    activeLabelFontSize: 18,
  },
  {
    key: "tab-standard-3",
    clipId: "clip4_28_52262",
    innerClipId: "clip5_28_52262",
    origin: { x: 713, y: 12 },
    activeClipId: "clip4_28_52262",
    activeInnerClipId: "clip5_28_52262",
    activeOrigin: { x: 703, y: 0 },
    label: "Khoảnh khắc",
    activeLabelFontSize: 18,
  },
  {
    key: "tab-standard-4",
    clipId: "clip6_28_52262",
    innerClipId: "clip7_28_52262",
    origin: { x: 937, y: 12 },
    activeClipId: "clip6_28_52262",
    activeInnerClipId: "clip7_28_52262",
    activeOrigin: { x: 927, y: 0 },
    label: "Phần thưởng",
    activeLabelFontSize: 18,
  },
];

const tabContentData: Record<
  string,
  { id: string; label?: string; imageSrc: string; isActive?: boolean }[]
> = {
  "tab-standard-0": [
    {
      id: "1",
      label: "Airpod",
      imageSrc: "https://picsum.photos/seed/airpod/200/200",
      isActive: true,
    },
    {
      id: "2",
      label: "???",
      imageSrc: "https://picsum.photos/seed/unknown1/200/200",
    },
    {
      id: "3",
      label: "???",
      imageSrc: "https://picsum.photos/seed/unknown2/200/200",
    },
    {
      id: "4",
      label: "???",
      imageSrc: "https://picsum.photos/seed/unknown3/200/200",
    },
    {
      id: "5",
      label: "???",
      imageSrc: "https://picsum.photos/seed/unknown4/200/200",
    },
    {
      id: "6",
      label: "???",
      imageSrc: "https://picsum.photos/seed/unknown5/200/200",
    },
    {
      id: "7",
      label: "???",
      imageSrc: "https://picsum.photos/seed/unknown6/200/200",
    },
    {
      id: "8",
      label: "???",
      imageSrc: "https://picsum.photos/seed/unknown7/200/200",
    },
  ],
  "tab-standard-1": [
    {
      id: "1",
      label: "Ảnh Minh Hiếu",
      imageSrc: "https://picsum.photos/seed/hieu/200/200",
      isActive: true,
    },
    {
      id: "2",
      label: "???",
      imageSrc: "https://picsum.photos/seed/unknown8/200/200",
    },
    {
      id: "3",
      label: "???",
      imageSrc: "https://picsum.photos/seed/unknown9/200/200",
    },
    {
      id: "4",
      label: "???",
      imageSrc: "https://picsum.photos/seed/unknown10/200/200",
    },
    {
      id: "5",
      label: "???",
      imageSrc: "https://picsum.photos/seed/unknown11/200/200",
    },
    {
      id: "6",
      label: "???",
      imageSrc: "https://picsum.photos/seed/unknown12/200/200",
    },
    {
      id: "7",
      label: "???",
      imageSrc: "https://picsum.photos/seed/unknown18/200/200",
    },
    {
      id: "8",
      label: "???",
      imageSrc: "https://picsum.photos/seed/unknown19/200/200",
    },
  ],
  "tab-standard-2": [
    {
      id: "1",
      label: "Scene 1",
      imageSrc: "https://picsum.photos/seed/scene1/200/200",
      isActive: true,
    },
    {
      id: "2",
      label: "???",
      imageSrc: "https://picsum.photos/seed/unknown13/200/200",
    },
    {
      id: "3",
      label: "???",
      imageSrc: "https://picsum.photos/seed/unknown14/200/200",
    },
    {
      id: "4",
      label: "???",
      imageSrc: "https://picsum.photos/seed/unknown15/200/200",
    },
    {
      id: "5",
      label: "???",
      imageSrc: "https://picsum.photos/seed/unknown16/200/200",
    },
    {
      id: "6",
      label: "???",
      imageSrc: "https://picsum.photos/seed/unknown17/200/200",
    },
    {
      id: "7",
      label: "???",
      imageSrc: "https://picsum.photos/seed/unknown18/200/200",
    },
    {
      id: "8",
      label: "???",
      imageSrc: "https://picsum.photos/seed/unknown19/200/200",
    },
  ],
};

function Note() {
  const { data: chars } = useCharacters();
  const [activeChar, setActiveChar] = useState<string>(chars?.[0]?.id ?? "");
  const [activeTab, setActiveTab] = useState<string>(tabBlocks[0]?.key ?? "");

  // Set default active character when data loads
  useEffect(() => {
      if (chars?.length > 0 && !activeChar) {
      setActiveChar(chars[0].id);
    }
  }, [chars, activeChar]);

  const { openDetailDialog } = useDetailDialog();

  const handleItemClick = (item: {
    id: string;
    label?: string;
    imageSrc: string;
    isActive?: boolean;
  }) => {
    openDetailDialog({
      type: activeTab === "tab-standard-0" ? "collection" : "image",
      rowLabel: item.label,
      sectionLabel: item.label,
    });
  };

  const selectedChar = chars?.find?.((char: Character) => char.id === activeChar);
  const currentTabContent = tabContentData[activeTab] || [];

  const backgroundImage = "/images/journal-bg.png";

  return (
    <div className=" w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="flex justify-center">
        <Banner
          className="w-[140px]! h-[64px]! lg:w-[280px]! lg:h-[80px]!"
          text="Nhật ký"
        />
      </div>
      <div className="lg:w-[84%] w-fit my-10 mx-auto flex justify-center items-center">
        <div className="relative w-[32%]">
          <NoteLeft
            width={"100%"}
            height={"100%"}
            className="w-full"
            noteImage={
              <img src={selectedChar?.imageUrl} alt={selectedChar?.name} />
            }
            noteName={selectedChar?.name}
            noteInfo={
              <div className="flex flex-col gap-2">
                <div className="text-sm flex items-center">
                  <div className="text-base font-bold min-w-30">Ngày sinh:</div>
                  <div className="text-sm">{selectedChar?.info?.brthDay}</div>
                </div>
                <div className="text-sm flex items-center">
                  <div className="text-base font-bold min-w-30">Chiều cao:</div>
                  <div className="text-sm">{selectedChar?.info?.height}</div>
                </div>
                <div className="text-sm flex items-center">
                  <div className="text-base font-bold min-w-30">Mô tả:</div>
                  <div className="text-sm">{selectedChar?.info?.desc}</div>
                </div>
              </div>
            }
          >
            <div className="flex gap-2 items-end justify-center w-full h-full pb-4">
              {chars?.map?.((char: Character) =>
                char.id === activeChar ? (
                  <CharacterActiveCard
                    key={char.name}
                    src={char.imageUrl}
                    onClick={() => setActiveChar(char.id)}
                  />
                ) : (
                  <CharacterCard
                    key={char.name}
                    src={char.imageUrl}
                    onClick={() => setActiveChar(char.id)}
                  />
                )
              )}
            </div>
          </NoteLeft>
        </div>
        <Tab
          width={"100%"}
          height={"100%"}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabBlocks={tabBlocks}
          className="w-[65%]"
        >
          {activeTab === "tab-standard-0" ? (
            <YieldGrid
              items={currentTabContent}
              onItemClick={handleItemClick}
            />
          ) : (
            <NoteGrid items={currentTabContent} onItemClick={handleItemClick} />
          )}
        </Tab>
      </div>
    </div>
  );
}

export default function NoteInner() {
  return (
    <DetailDialogProvider>
      <Note />
    </DetailDialogProvider>
  );
}
