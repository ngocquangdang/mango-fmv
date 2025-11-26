import React from "react";
import DetailDialog from "./detail-dialog";
import { DetailDialogContext, type DetailDialogOptions } from "./use-detail-dialog";

type DetailDialogState = DetailDialogOptions & {
  isOpen: boolean;
};

export const DetailDialogProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = React.useState<DetailDialogState>({
    isOpen: false,
    type: "image",
  });

  const closeDetailDialog = React.useCallback(() => {
    setState((prev) => {
      prev.onClose?.();
      return {
        ...prev,
        isOpen: false,
        onClose: undefined,
      };
    });
  }, []);

  const openDetailDialog = React.useCallback(
    ({ type, rowLabel, sectionLabel, onClose }: DetailDialogOptions) => {
      setState({
        isOpen: true,
        type,
        rowLabel,
        sectionLabel,
        onClose,
      });
    },
    []
  );

  const value = React.useMemo(
    () => ({
      openDetailDialog,
      closeDetailDialog,
    }),
    [openDetailDialog, closeDetailDialog]
  );

  return (
    <DetailDialogContext.Provider value={value}>
      {children}
      <DetailDialog
        isOpen={state.isOpen}
        type={state.type}
        rowLabel={state.rowLabel}
        sectionLabel={state.sectionLabel}
        onClose={closeDetailDialog}
      />
    </DetailDialogContext.Provider>
  );
};
