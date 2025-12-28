import React from "react";


const LeftSide: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold text-gray-700">Collection Stats</h2>
      <p className="text-gray-500">Select a category to view items.</p>
      {/* Add more stats or profile info here */}
    </div>
  );
};

export default LeftSide;
