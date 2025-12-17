import { createContext, useContext } from "react";
import type { RankContextType } from "./rank-provider";

export const RankContext = createContext<RankContextType | undefined>(
  undefined
);

export const useRankContext = () => {
  const context = useContext(RankContext);
  if (!context) {
    throw new Error("useRankContext must be used within a RankProvider");
  }
  return context;
};

