import { createContext, useContext } from "react";
import type { FlowChartContextType } from "./flow-chart-provider";
export const FlowChartContext = createContext<FlowChartContextType | undefined>(
  undefined
);

export const useFlowChart = () => {
  const context = useContext(FlowChartContext);
  if (!context) {
    throw new Error("useFlowChart must be used within a FlowChartProvider");
  }
  return context;
};
