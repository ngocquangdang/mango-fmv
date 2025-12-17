import React from "react";
import type { MgUserInfo } from "../../../types/user";

type DialogUserInfoProps = {
  isOpen: boolean;
  onClose: () => void;
  mgUserInfo: MgUserInfo | null;
};

const DialogUserInfo = ({
  isOpen,
  onClose,
  mgUserInfo,
}: DialogUserInfoProps) => {
  if (!isOpen || !mgUserInfo) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "#00000099" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <textarea className="w-full h-full" value={JSON.stringify(mgUserInfo)} />
      </div>
    </div>
  );
};

export default DialogUserInfo;
