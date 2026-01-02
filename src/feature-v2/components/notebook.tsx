import React from "react";

interface Category {
  id: string;
  name: string;
}

interface NotebookLayoutProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  categories?: Category[];
  centerContent?: React.ReactNode;
  selectedTab?: string;
  setSelectedTab?: (tab: string) => void;
  subPages?: { id: string; name: string, slug: string }[];
  onSelectSubPage?: (subPageId: string) => void;
  selectedSubPage?: string;
  extraContent?: React.ReactNode;
}

const NotebookLayout = ({
  leftContent,
  rightContent,
  centerContent,
  categories = [],
  selectedTab,
  setSelectedTab,
  subPages = [],
  onSelectSubPage,
  selectedSubPage,
  extraContent,
}: NotebookLayoutProps) => {
  const BINDING_IMG = "/images/binding.png";
  const MARKER_UNSELECTED_IMG = "/images/tab-unselected.png";
  const MARKER_SELECTED_IMG = "/images/tab-selected.png";

  return (
    <div className="relative scale-[0.8] origin-center">
      <div className="absolute -left-26 lg:-left-[220px] top-4 flex flex-col gap-4">
        {subPages.map((subPage) => {
          const isSelected = selectedSubPage === subPage.id;
          return (
            <div
              key={subPage.id}
              className={`relative ${isSelected ? "z-10" : "z-0"}`}
              onClick={() => onSelectSubPage?.(subPage.id)}
            >
              <img
                src={isSelected ? MARKER_SELECTED_IMG : MARKER_UNSELECTED_IMG}
                alt="marker"
                className={
                  isSelected
                    ? "w-[130px] h-[62px] lg:w-[264px] lg:h-[126px]"
                    : "w-[130px] h-[40px] lg:w-[264px] lg:h-[82px]"
                }
              />
              <button
                className={`absolute top-0 left-0 w-full h-full ${isSelected ? "text-[13px] lg:text-[26px]" : "text-[12px] lg:text-[24px]"
                  }`}
              >
                {subPage.name}
              </button>
            </div>
          );
        })}
      </div>
      <div className="notebook-cover w-[536px] h-[340px] lg:w-[1100px] lg:h-[700px] z-2">
        <div className="notebook-spread">
          {centerContent ? (
            <div className="notebook-page page-center w-full h-full absolute top-0 left-0 z-[11]">
              {centerContent}
            </div>
          ) : (
            <>
              <div className="notebook-page page-left">{leftContent}</div>
              <div className="notebook-page page-right">{rightContent}</div>
            </>
          )}
          <div className="notebook-binding-container">
            <img src={BINDING_IMG} alt="binding-top" className="binding-ring" />
            <img
              src={BINDING_IMG}
              alt="binding-bottom"
              className="binding-ring"
            />
          </div>
        </div>
        {extraContent}
      </div>
      <div className="absolute -right-26 lg:-right-[220px] top-4 flex flex-col gap-4">
        {categories.map((category) => {
          return (
            <div
              key={category.id}
              className={`relative ${selectedTab === category.id ? "z-2" : "z-0"
                }`}
              onClick={() => setSelectedTab?.(category.id)}
            >
              <img
                src={
                  selectedTab === category.id
                    ? MARKER_SELECTED_IMG
                    : MARKER_UNSELECTED_IMG
                }
                alt="marker"
                className={
                  selectedTab === category.id
                    ? "w-[130px] h-[62px] lg:w-[264px] lg:h-[126px]"
                    : "w-[130px] h-[40px] lg:w-[264px] lg:h-[82px]"
                }
              />
              <button
                className={`absolute top-0 left-0 w-full h-full ${selectedTab === category.id ? "text-[13px] lg:text-[26px]" : "text-[12px] lg:text-[24px]"
                  }`}
              >
                {category.name}
              </button>
            </div>
          );
        })}
      </div>
    </div >
  );
};

export default NotebookLayout;
