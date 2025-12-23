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
    if (qrStatus?.data) {
      console.log('[QR Overlay] Status Update:', {
        status: qrStatus.data.status,
        hasTicket: !!qrStatus.data.ticket,
        timestamp: new Date().toISOString(),
      });
    }
  }, [qrStatus]);

  React.useEffect(() => {
    if (error) {
      console.error('[QR Overlay] Polling Error:', error);
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
          <h2 className="qr-login-title">Scan to Login</h2>
          <p className="qr-login-subtitle">
            Open the Mango+ app and scan this QR code to continue
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
              <span className="step-text">Open Mango+ app on your phone</span>
            </div>
            <div className="instruction-step">
              <span className="step-number">2</span>
              <span className="step-text">Tap the QR scan icon</span>
            </div>
            <div className="instruction-step">
              <span className="step-number">3</span>
              <span className="step-text">Point your camera at this code</span>
            </div>
          </div>

          {qrStatus?.data?.status === "PENDING" && (
            <div className="qr-status-pending">
              <div className="loading-spinner"></div>
              <p>Waiting for scan...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
