import React, { useState } from "react";

const NotebookLayout = ({
  leftContent,
  rightContent,
}: {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
}) => {
  const BINDING_IMG = "/images/binding.png";
  const MARKER_UNSELECTED_IMG = "/images/tab-unselected.png";
  const MARKER_SELECTED_IMG = "/images/tab-selected.png";
  const [selectedTab, setSelectedTab] = useState<number>(1);

  return (
    <div className="relative">
      <div className="notebook-cover w-[536px] h-[340px] z-2">
        <div className="notebook-spread">
          <div className="notebook-page page-left">{leftContent}</div>
          <div className="notebook-page page-right">{rightContent}</div>
          <div className="notebook-binding-container">
            <img src={BINDING_IMG} alt="binding-top" className="binding-ring" />
            <img
              src={BINDING_IMG}
              alt="binding-bottom"
              className="binding-ring"
            />
          </div>
        </div>
      </div>
      <div className="absolute -right-25 top-4 flex flex-col gap-4">
        {[1, 2, 3, 4, 5].map((tab) => (
          <div
            key={tab}
            className={`relative ${selectedTab === tab ? "z-2" : "z-0"}`}
            onClick={() => setSelectedTab(tab)}
          >
            <img
              src={
                selectedTab === tab
                  ? MARKER_SELECTED_IMG
                  : MARKER_UNSELECTED_IMG
              }
              alt="marker"
              className={
                selectedTab === tab
                  ? "w-[130px] h-[62px]"
                  : "w-[120px] h-[40px]"
              }
            />
            <button className="absolute top-0 left-0 w-full h-full">
              item {tab}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotebookLayout;
