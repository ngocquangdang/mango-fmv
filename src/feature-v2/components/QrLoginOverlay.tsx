import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { useQrStatus } from "../../features/user/hooks";
import "./QrLoginOverlay.css";

interface QrLoginOverlayProps {
  sessionId: string;
  qrUrl: string;
  onSuccess: (ticket: string) => void;
  onError: (error: Error) => void;
  onExpired: () => void;
}

export const QrLoginOverlay: React.FC<QrLoginOverlayProps> = ({
  sessionId,
  qrUrl,
  onSuccess,
  onError,
  onExpired,
}) => {
  const { data: qrStatus, error } = useQrStatus(sessionId, true);

  React.useEffect(() => {
    if (error) {
      onError(error as Error);
    }
  }, [error, onError]);

  React.useEffect(() => {
    if (qrStatus?.data?.status === "SUCCESS" && qrStatus.data.ticket) {
      onSuccess(qrStatus.data.ticket);
    } else if (qrStatus?.data?.status === "EXPIRED") {
      onExpired();
    }
  }, [qrStatus, onSuccess, onExpired]);

  return (
    <div className="qr-login-overlay">
      <div className="qr-login-container">
        <div className="qr-login-content">
          <h2 className="qr-login-title">Quét mã để đăng nhập</h2>
          <p className="qr-login-subtitle">
            Mở ứng dụng Mango+ và quét mã QR này để tiếp tục
          </p>

          <div className="qr-code-wrapper">
            <QRCodeSVG
              value={qrUrl}
              size={280}
              level="H"
              includeMargin={true}
              className="qr-code"
            />
          </div>

          <div className="qr-login-instructions">
            <div className="instruction-step">
              <span className="step-number">1</span>
              <span className="step-text">Mở ứng dụng Mango+ trên điện thoại</span>
            </div>
            <div className="instruction-step">
              <span className="step-number">2</span>
              <span className="step-text">Nhấn vào biểu tượng quét QR</span>
            </div>
            <div className="instruction-step">
              <span className="step-number">3</span>
              <span className="step-text">Hướng camera vào mã này</span>
            </div>
          </div>

          {qrStatus?.data?.status === "PENDING" && (
            <div className="qr-status-pending">
              <div className="loading-spinner"></div>
              <p>Đang chờ quét...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
