import React from "react";

export type DetailDialogOptions = {
  data: any;
  onClose?: () => void;
};

type DetailDialogContextValue = {
  openDetailDialog: (options: DetailDialogOptions) => void;
  closeDetailDialog: () => void;
};

export const DetailDialogContext = React.createContext<
  DetailDialogContextValue | undefined
>(undefined);

export const useDetailDialog = () => {
  const context = React.useContext(DetailDialogContext);

  if (!context) {
    throw new Error(
      "useDetailDialog must be used within a DetailDialogProvider"
    );
  }

  return context;
};
