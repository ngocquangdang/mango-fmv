import { useState } from "react";
import NoteLeft from "../../components/note-left";
import Tab, { type TabBlockConfig } from "../../components/tab";
import CharacterCard from "./components/character-card";
import CharacterActiveCard from "./components/character-active-card";
import YieldGrid from "./components/yield-grid";
import NoteGrid from "./components/note-grid";
import DetailDialog from "../../components/detail-dialog";

import Banner from "../../components/banner";

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
  ],
};

export default function Note() {
  const [activeChar, setActiveChar] = useState<string>("Thái Lê Minh Hiếu");
  const [activeTab, setActiveTab] = useState<string>(tabBlocks[0]?.key ?? "");

  const chars = [
    {
      name: "Thái Lê Minh Hiếu",
      info: {
        brthDay: "12/12/2222",
        height: "1m2",
        desc: "Nổi trội với visual và vũ đạo",
      },
      imageSrc: "https://picsum.photos/200/300",
    },
    {
      name: "Ngiuyen A",
      info: {
        brthDay: "12/12/2222",
        height: "1m2",
        desc: "Nổi trội với visual và vũ đạo",
      },
      imageSrc: "https://picsum.photos/200/300",
    },
    {
      name: "Ngiuyen B",
      info: {
        brthDay: "12/12/2222",
        height: "1m2",
        desc: "Nổi trội với visual và vũ đạo",
      },
      imageSrc: "https://picsum.photos/200/300",
    },
    {
      name: "Ngiuyen C",
      info: {
        brthDay: "12/12/2222",
        height: "1m2",
        desc: "Nổi trội với visual và vũ đạo",
      },
      imageSrc: "https://picsum.photos/200/300",
    },
    {
      name: "Ngiuyen D",
      info: {
        brthDay: "12/12/2222",
        height: "1m2",
        desc: "Nổi trội với visual và vũ đạo",
      },
      imageSrc: "https://picsum.photos/200/300",
    },
  ];
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    id: string;
    label?: string;
    imageSrc: string;
    isActive?: boolean;
  } | null>(null);

  const handleItemClick = (item: {
    id: string;
    label?: string;
    imageSrc: string;
    isActive?: boolean;
  }) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

  const selectedChar = chars.find((char) => char.name === activeChar);
  const currentTabContent = tabContentData[activeTab] || [];


  return (
    <div className="flex relative w-full justify-center items-center">
      <div style={{ width: "fit-content" }}>
        <Banner
          className="fixed top-0 left-[37%] z-10 "
          text="Nhật ký"
        />
      </div>
      <div className="w-[84%] mx-auto flex justify-center items-center">
        <div className="relative ">
          <NoteLeft
            className="w-full h-full"
            noteImage={
              <img src={selectedChar?.imageSrc} alt={selectedChar?.name} />
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
              {chars.map((char) =>
                char.name === activeChar ? (
                  <CharacterActiveCard
                    key={char.name}
                    src={char.imageSrc}
                    onClick={() => setActiveChar(char.name)}
                  // className="w-20"
                  />
                ) : (
                  <CharacterCard
                    key={char.name}
                    src={char.imageSrc}
                    onClick={() => setActiveChar(char.name)}
                  // className="w-20"
                  />
                )
              )}
            </div>
          </NoteLeft>

        </div>
        <Tab
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabBlocks={tabBlocks}
        >
          <div className="h-full w-fit py-14 flex items-center justify-between">
            <div className="flex-1 px-4 mx-auto">
              {activeTab === "tab-standard-0" ? (
                <YieldGrid items={currentTabContent} onItemClick={handleItemClick} />
              ) : (
                <NoteGrid items={currentTabContent} onItemClick={handleItemClick} />
              )}
            </div>
          </div>
        </Tab>

        <DetailDialog
          isOpen={dialogOpen}
          onClose={() => setDialogOpen(false)}
          type={activeTab === "tab-standard-0" ? "collection" : "image"}
          rowLabel={selectedItem?.label}
          sectionLabel={selectedItem?.label}
        />
      </div>
    </div >
  );
}
