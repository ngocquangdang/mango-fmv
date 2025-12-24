
import React from "react";
import { CardCollectionContext } from "../context/card-collection-context";

export const useCardCollection = () => {
  const context = React.useContext(CardCollectionContext);
  if (!context) {
    throw new Error("useCardCollection must be used within a CardCollectionProvider");
  }
  return context;
};
