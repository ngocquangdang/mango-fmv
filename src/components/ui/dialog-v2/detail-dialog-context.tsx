import React from "react";
import DetailDialog from "./detail-dialog";
import {
  DetailDialogContext,
  type DetailDialogOptions,
} from "./use-detail-dialog";

type DetailDialogState = DetailDialogOptions & {
  isOpen: boolean;
  data: any;
};

export const DetailDialogProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = React.useState<DetailDialogState>({
    isOpen: false,
    data: {},
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
    ({ data, onClose }: DetailDialogOptions) => {
      setState({
        isOpen: true,
        data,
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
        data={state.data}
        onClose={closeDetailDialog}
      />
    </DetailDialogContext.Provider>
  );
};
