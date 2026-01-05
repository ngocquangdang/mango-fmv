import React from "react";

export interface CollectionItem {
  id: string;
  name: string;
  image: string;
  blurImage?: string; // Optional blur image URL from API
  isLocked: boolean;
  rank?: string;
  count?: number; // Add count to support quantity
}

export interface RightSideProps {
  items?: CollectionItem[];
  title?: string;
  renderItem?: (item: CollectionItem) => React.ReactNode;
  onCardClick?: (item: CollectionItem) => void;
  hideStats?: boolean;
}


export const ItemCard = ({
  item,
  borderColorClass,
  isLocked,
  className = "",
  onClick
}: {
  item: CollectionItem;
  borderColorClass: string;
  isLocked: boolean;
  className?: string;
  onClick?: () => void;
}) => {
  // Use blurImage from API if available and card is locked, otherwise use regular image
  const displayImage = isLocked && item.blurImage ? item.blurImage : item.image;
  // Only apply CSS blur if locked and no blurImage from API
  const shouldApplyCssBlur = isLocked && !item.blurImage;

  return (
    <div
      className={`relative rounded overflow-hidden aspect-[3/4.5] ${isLocked ? 'border-opacity-30' : 'border-opacity-60'} ${borderColorClass} ${className} ${!isLocked ? 'cursor-pointer hover:scale-105 transition-transform' : ''}`}
      onClick={!isLocked ? onClick : undefined}
    >
      {/* Background/Image */}
      <div className="w-full h-full bg-gray-300 relative">
        <img
          src={displayImage}
          alt={item.name}
          className={`w-full h-full object-cover ${shouldApplyCssBlur ? 'blur-sm grayscale' : ''}`}
        />
        {isLocked && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <img src="/images/collection/lock-icon.png" alt="locked" className="w-1/3 opacity-80" />
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


// Navigation Arrow Component
const NavArrow = ({ direction, onClick, disabled }: { direction: 'left' | 'right', onClick: () => void, disabled: boolean }) => {
  if (disabled) return null;
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className={`absolute top-1/2 -translate-y-1/2 z-20 w-6 h-6 flex items-center justify-center bg-white/50 hover:bg-white rounded-full shadow-md text-orange-600 transition-all ${direction === 'left' ? '-left-1' : '-right-1'}`}
    >
      {direction === 'left' ? '‹' : '›'}
    </button>
  );
};

export const CollectionFolder = ({
  title,
  items,
  theme,
  renderItem,
  onCardClick,
  itemsPerPage = 3
}: {
  title: string;
  items: CollectionItem[];
  theme: FolderTheme;
  renderItem?: (item: CollectionItem, theme: FolderTheme) => React.ReactNode;
  onCardClick?: (item: CollectionItem) => void;
  itemsPerPage?: number;
}) => {
  const [page, setPage] = React.useState(0);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePrev = () => setPage(p => Math.max(0, p - 1));
  const handleNext = () => setPage(p => Math.min(totalPages - 1, p + 1));

  const displayItems = items.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  // Reset page if items change significantly
  React.useEffect(() => {
    setPage(0);
  }, [items.length]);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Folder Header */}
      <div className="relative z-10 text-center shrink-0 -mb-1">
        <div
          className={`inline-block px-3 pt-0.5 pb-0.5 rounded-t-lg shadow-sm relative ${theme.headerBg}`}
        >
          <h2 className={`${theme.titleColor} font-hand text-[10px] lg:text-xs font-bold whitespace-nowrap`}>
            {title}
          </h2>
        </div>
      </div>

      <div className={`w-full flex-1 flex flex-col relative rounded-lg overflow-hidden ${theme.bodyBg} p-0.5`}>
        {items.length > itemsPerPage && (
          <>
            <NavArrow direction="left" onClick={handlePrev} disabled={page === 0} />
            <NavArrow direction="right" onClick={handleNext} disabled={page === totalPages - 1} />
          </>
        )}

        <div className={`flex-1 flex items-center justify-center gap-1 relative z-10 min-h-[50px] lg:min-h-[80px] ${theme.itemsClass}`}>
          {items.length === 0 ? null : (
            displayItems.map((item, index) => (
              renderItem ? renderItem(item, theme) :
                <ItemCard
                  key={`${item.id}-${index}`}
                  item={item}
                  borderColorClass={theme.borderColor}
                  isLocked={item.isLocked}
                  className={itemsPerPage === 1 ? 'w-[40px] h-[54px] lg:w-[80px] lg:h-[108px]' : 'w-[28px] h-[38px] lg:w-[45px] lg:h-[68px]'}
                  onClick={() => onCardClick?.(item)}
                />
            )))}
        </div>
      </div>
    </div>
  );
};

export const URCollectionFolder = ({ items, renderItem, onCardClick }: { items: CollectionItem[], renderItem?: (item: CollectionItem, theme: FolderTheme) => React.ReactNode, onCardClick?: (item: CollectionItem) => void }) => {
  const [page, setPage] = React.useState(0);
  const itemsPerPage = 1; // UR usually big, show 1 or 2
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePrev = () => setPage(p => Math.max(0, p - 1));
  const handleNext = () => setPage(p => Math.min(totalPages - 1, p + 1));

  const displayItems = items.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  return (
    <div className="w-full relative">
      {/* Arrows for UR */}
      {items.length > itemsPerPage && (
        <>
          <NavArrow direction="left" onClick={handlePrev} disabled={page === 0} />
          <NavArrow direction="right" onClick={handleNext} disabled={page === totalPages - 1} />
        </>
      )}

      {/* Container with orange border and grid bg */}
      <div className="h-[80px] lg:h-[110px] bg-[#FFFDF5] overflow-visible relative rounded-lg border-2 border-[#FF9F1C]" style={{
        backgroundImage: 'url(/images/collection/ur-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>

        {/* Header "Thẻ giới hạn" */}
        <div className="absolute -top-3.5 lg:-top-4 left-1/2 transform -translate-x-1/2 z-20" >
          <div className="bg-[#FFCDB2] px-3 py-0.5 rounded-t-lg relative shadow-md">
            <h2 className="font-hand text-[#E85D04] text-[10px] lg:text-xs font-bold whitespace-nowrap">
              Thẻ giới hạn
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="flex justify-center items-center relative h-full pt-1">
          {items.length === 0 ? (
            <div className="text-[#E85D04]/50 font-bold font-hand text-sm">Chưa mở khóa</div>
          ) : (
            displayItems.map((item, idx) => (
              <div key={idx} className="relative rounded shadow-[0_0_12px_2px_rgba(255,107,53,0.5)] transform scale-95 lg:scale-100">
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
                    className="w-[44px] h-[60px] lg:w-[64px] lg:h-[88px]"
                    onClick={() => onCardClick?.(item)}
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

const RightSide: React.FC<RightSideProps> = ({ renderItem, onCardClick, title }) => {
  const { data, isLoading, setSelectedCard } = useCollection();

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
    blurImage: card.imageBlurUrl, // Use blur image from API if available
    isLocked: !card.isOwned,
    rank: rank,
    count: card.quantity,
  });

  // Handle card click to show in left panel
  const handleCardClick = (item: CollectionItem) => {
    // If custom handler is provided, use it (e.g. for merge selection)
    if (onCardClick) {
      onCardClick(item);
      return;
    }

    // Find the original card data from groups
    const cardData = groups
      .flatMap(g => g.cards)
      .find(c => c.id === item.id);

    if (cardData && cardData.isOwned) {
      setSelectedCard(cardData);
    }
  };

  const getTierGroup = (code: string) => groups.find(g => g.tierCode === code);

  // Config for tiers
  const rGroup = getTierGroup('R');
  const srGroup = getTierGroup('SR');
  const ssrGroup = getTierGroup('SSR');
  const urGroup = getTierGroup('UR');

  // Hardcode themes based on UI request
  const rTheme: FolderTheme = {
    headerBg: "bg-[#FFF579]",
    bodyBg: "bg-[#FCEE3E]",
    titleColor: "text-[#5B4818]",
    borderColor: "border-[#D1C500]",
    gridColor: "#AAA",
    itemsClass: "justify-center"
  };

  const srTheme: FolderTheme = {
    headerBg: "bg-[#D6F5A8]",
    bodyBg: "bg-[#95E636]",
    titleColor: "text-[#3F6212]",
    borderColor: "border-[#76B023]",
    gridColor: "#444",
    itemsClass: "justify-center"
  };

  const ssrTheme: FolderTheme = {
    headerBg: "bg-[#B8C9FF]",
    bodyBg: "bg-[#A688FA]", // Purple as per image
    titleColor: "text-[#2A4B9B]",
    borderColor: "border-[#88A4FF]",
    gridColor: "#222",
    itemsClass: "justify-center"
  };

  // Render folders dynamically based on groups
  // const stats = data?.stats;

  // // Get current character name based on selectedCharacterId
  // const currentCharacter = characters.find(c => c.id === selectedCharacterId);
  // const currentCharacterName = currentCharacter?.name || "";

  return (
    <div className="mx-[10px] h-full flex flex-col relative">
      {/* Title Header (Optional - for Merge Page) */}
      {title && (
        <div className="absolute top-0 left-2 z-20">
          <div className="bg-[#B5E157] px-3 py-0.5 transform -rotate-2 shadow-sm rounded-sm" style={{ clipPath: 'polygon(0% 0%, 100% 2%, 98% 100%, 2% 98%)' }}>
            <span className="font-hand font-bold text-[#1A4D2E] text-xs lg:text-sm">{title}</span>
            <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20"></div>
          </div>
          {/* <img src="/images/collection/elements/binding.png" className="absolute -top-3 -right-2 w-4 h-4 opacity-80" alt="" /> */}
        </div>
      )}

      {/* Content without scroll */}
      <div className={`flex-1 flex flex-col h-full overflow-hidden px-1 justify-center gap-2 ${title ? 'pt-6 pb-2' : 'pt-1 pb-4'}`}>

        {/* Row 1: R Tier (Yellow) */}
        {rGroup && (
          <div className="flex-shrink-0 w-[70%] mx-auto">
            <CollectionFolder
              title={rGroup.tierName}
              items={rGroup.cards.map(c => mapCardToItem(c, 'R'))}
              theme={rTheme}
              renderItem={renderItem}
              onCardClick={handleCardClick}
              itemsPerPage={3}
            />
          </div>
        )}

        {/* Row 2: SR & SSR (Split Columns) */}
        <div className="grid grid-cols-2 gap-1 flex-shrink-0">
          {/* Left: SR (Green) */}
          <div className="min-w-0 flex flex-col">
            <CollectionFolder
              title={srGroup?.tierName || "Thẻ SR"}
              items={srGroup ? srGroup.cards.map(c => mapCardToItem(c, 'SR')) : []}
              theme={srTheme}
              renderItem={renderItem}
              onCardClick={handleCardClick}
              itemsPerPage={3}
            />
          </div>

          {/* Right: SSR (Purple) */}
          <div className="min-w-0 flex flex-col">
            <CollectionFolder
              title={ssrGroup?.tierName || "Thẻ SSR"}
              items={ssrGroup ? ssrGroup.cards.map(c => mapCardToItem(c, 'SSR')) : []}
              theme={ssrTheme}
              renderItem={renderItem}
              onCardClick={handleCardClick}
              itemsPerPage={3}
            />
          </div>
        </div>


        {/* Row 3: UR Tier (Orange/Special) */}
        {urGroup && (
          <div className="flex-shrink-0 w-[70%] mx-auto mt-3">
            <URCollectionFolder
              items={urGroup.cards.map(c => mapCardToItem(c, 'UR'))}
              renderItem={renderItem}
              onCardClick={handleCardClick}
            />
          </div>
        )}
      </div>

    </div>
  );
};

export default RightSide;
