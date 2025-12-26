import React from "react";

export interface CollectionItem {
  id: string;
  name: string;
  image: string;
  isLocked: boolean;
  rank?: string;
  count?: number; // Add count to support quantity
}

interface RightSideProps {
  items?: CollectionItem[];
  title?: string;
  renderItem?: (item: CollectionItem) => React.ReactNode;
}

export const ItemCard = ({ item, borderColorClass, isLocked, className = "" }: { item: CollectionItem; borderColorClass: string; isLocked: boolean, className?: string }) => {
  return (
    <div className={`relative rounded w-[44px] h-[60px] overflow-hidden aspect-[3/4.5] ${isLocked ? 'border-opacity-30' : 'border-opacity-60'} ${borderColorClass} ${className}`}>
      {/* Background/Image */}
      <div className="w-full h-full bg-gray-300 relative">
        <img
          src={item.image}
          alt={item.name}
          className={`w-full h-full object-cover ${isLocked ? 'blur-sm grayscale' : ''}`}
        />
        {isLocked && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <img src="/images/padlock.png" alt="locked" className="w-1/3 opacity-80" />
          </div>
        )}
      </div>
    </div>
  );
};

export interface FolderTheme {
  headerBg: string;
  bodyBg: string; // Tailwind class like bg-[#FFF579]
  titleColor: string; // Tailwind text color class
  borderColor: string; // Tailwind border color class
  gridColor: string; // Hex for grid lines
  itemsClass?: string;
}

export const CollectionFolder = ({
  title,
  items,
  theme,
  renderItem
}: {
  title: string;
  items: CollectionItem[];
  theme: FolderTheme;
  renderItem?: (item: CollectionItem, theme: FolderTheme) => React.ReactNode;
}) => {
  return (
    <div className="w-full flex flex-col">
      {/* Folder Header */}
      <div className="relative z-10">
        <div
          className={`inline-block px-1 pt-1.5 rounded-t-lg shadow-sm transform translate-y-1 relative ${theme.headerBg}`}
        >
          <h2 className={`${theme.titleColor} font-hand text-[10px] lg:text-2xl font-bold whitespace-nowrap`}>
            {title}
          </h2>
        </div>
      </div>

      <div className={`w-full relative overflow-hidden ${theme.bodyBg}`}>
        <div className={`flex items-center justify-between relative p-1 z-10 ${theme.itemsClass}`}>
          {items.map((item, index) => (
            renderItem ? renderItem(item, theme) :
              <ItemCard
                key={index}
                item={item}
                borderColorClass={theme.borderColor}
                isLocked={item.isLocked}
              />
          ))}
        </div>
      </div>
    </div>
  );
};

export const URCollectionFolder = ({ items, renderItem }: { items: CollectionItem[], renderItem?: (item: CollectionItem, theme: FolderTheme) => React.ReactNode }) => {
  return (
    <div className="w-full h-[68px] relative mt-6 mb-4">
      {/* Container with orange border and grid bg */}
      <div className="h-[68px] bg-[#FFFDF5] overflow-visible" style={{
        backgroundImage: 'url(/images/collection/ur-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>

        {/* Header "Thẻ giới hạn" */}
        <div className="absolute -top-5 left-1/2  transform -translate-x-1/2 z-0" >
          <div className="bg-[#FFCDB2] px-6 py-1.5 rounded-t-lg relative overflow-hidden">
            {/* Text */}
            <h2 className="font-hand text-[#E85D04] text-[10px] lg:text-2xl font-bold whitespace-nowrap relative z-10">
              Thẻ giới hạn
            </h2>
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-[#3B64E6] rounded-full opacity-60 skew-x-12"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-[#3B64E6] rounded-full opacity-60 -translate-y-0.5"></div>
          </div>
        </div>

        {/* Decorations */}

        {/* Crown - Top Left */}
        {/* Adjusted position to hang off the corner */}
        {/* <img
          src="/images/elements/crown-1-element.png"
          alt="crown"
          className="absolute -top-10 -left-6 w-24 h-24 object-contain z-30 transform -rotate-12"
        /> */}

        {/* Clouds */}
        {/* <img
          src="/images/elements/cloud-element.png"
          alt="cloud"
          className="absolute top-10 -right-8 w-16 object-contain z-30 opacity-90"
        />
        <img
          src="/images/elements/cloud-element.png"
          alt="cloud"
          className="absolute -bottom-4 -left-8 w-14 object-contain z-30 opacity-80"
        /> */}

        {/* Gifts */}
        {/* <div className="absolute top-20 left-2 w-10 h-10 animate-bounce delay-700">
          <img src="/images/elements/start-element.png" className="w-full h-full object-contain text-yellow-400" alt="star" />
        </div>
        <div className="absolute top-12 right-12 w-8 h-8 animate-pulse">
          <img src="/images/elements/start-element.png" className="w-full h-full object-contain" alt="star" />
        </div> */}

        {/* Content */}
        <div className="flex justify-center items-center relative -bottom-2 z-10"
        >
          {items.length === 0 ? (
            <div className="text-[#E85D04]/50 font-bold font-hand text-lg">Chưa mở khóa</div>
          ) : (
            items.map((item, idx) => (
              <div key={idx} className="relative rounded shadow-[0_0_12px_2px_rgba(255,107,53,0.5)]">
                {renderItem ? renderItem(item, {
                  headerBg: "",
                  bodyBg: "",
                  titleColor: "",
                  borderColor: "border-[#FF9F1C]",
                  gridColor: "",
                }) :
                  <ItemCard
                    item={item}
                    borderColorClass="border-[#FF9F1C]" // Orange border for card
                    isLocked={item.isLocked}
                  />}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

import { useCollection } from "./hooks/use-collection";

const RightSide: React.FC<RightSideProps> = ({ renderItem }) => {
  const { data, isLoading } = useCollection();

  // If items are passed via props, use them (legacy/mock support)
  // Otherwise, use data from API

  if (isLoading && !data) {
    return <div className="w-full text-center py-10 font-hand text-gray-500">Đang tải...</div>;
  }

  const groups = data?.groups || [];

  // Helper to map API card to CollectionItem
  const mapCardToItem = (card: any, rank: string): CollectionItem => ({
    id: card.id,
    name: card.name,
    image: card.imageUrl,
    isLocked: !card.isOwned,
    rank: rank,
  });

  // Render folders dynamically based on groups
  return (
    <div className="w-[148px] mx-auto h-full flex flex-col overflow-y-auto pb-4 custom-scrollbar">
      {groups.map((group) => {
        // Customize theme based on tierCode if needed
        let themeProps: FolderTheme = {
          headerBg: "bg-[#FFF579]",
          bodyBg: "bg-[#FCEE3E]",
          titleColor: "text-[#5B4818]",
          borderColor: "border-[#D1C500]",
          gridColor: "#AAA",
        };

        if (group.tierCode === "R" || group.tierCode === "SR") {
          // Rare Theme
          themeProps = {
            headerBg: "bg-[#B8C9FF] w-full",
            bodyBg: "bg-[#3B64E6]",
            titleColor: "text-[#2A4B9B]",
            borderColor: "border-[#88A4FF]",
            gridColor: "#222",
            itemsClass: "justify-center"
          };
        } else if (group.tierCode === "SSR") {
          // Super Rare Theme
          themeProps = {
            headerBg: "bg-[#D6F5A8]",
            bodyBg: "bg-[#95E636]",
            titleColor: "text-[#3F6212]",
            borderColor: "border-[#76B023]",
            gridColor: "#444",
            itemsClass: "justify-center"
          };
        }

        const folderItems = group.cards.map(card => mapCardToItem(card, group.tierCode));

        // Use UR folder for specific tier if needed, or just standard CollectionFolder
        // Assuming UR uses the special folder component
        if (group.tierCode === 'UR') {
          return <URCollectionFolder key={group.tierCode} items={folderItems} renderItem={renderItem} />;
        }

        return (
          <div key={group.tierCode} className="mb-2">
            <CollectionFolder
              title={group.tierName}
              items={folderItems}
              theme={themeProps}
              renderItem={renderItem}
            />
          </div>
        );
      })}

      {/* Fallback or specific hardcoded sections if API returns partial data */}
    </div>
  );
};

export default RightSide;
