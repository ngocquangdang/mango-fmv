import * as React from "react";
import { useEffect } from "react";
import { useUserContext } from "../../../features/user/context";
import { QrLoginOverlay } from "../../components/QrLoginOverlay";
import { useInitQrSession } from "../../../features/user/hooks";
import { useNavigate, useLocation } from "react-router-dom";
import LinkDnsePage from "../link-dnse";
import { useToast } from "../../../components/ui/toast-v2/use-toast";
import { saveLocalParams, getLocalParam } from "../../../lib/api/storage";

const QrLoginPage = () => {
  const { refetchProgress, refetchChapter, refetchCollectedRewards } = useUserContext();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { mutate: initQrSession } = useInitQrSession();
  const location = useLocation();
  const isLinkDnse = location.pathname === "/link-dnse" || location.pathname === "/link-dnse/";
  const [ticket, setTicket] = React.useState(getLocalParam("ticket"));

  const [qrSessionId, setQrSessionId] = React.useState<string | null>(null);
  const [qrUrl, setQrUrl] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);

  // Initialize QR Session on mount
  useEffect(() => {
    if (ticket && isLinkDnse) return;
    setLoading(true);
    initQrSession(undefined, {
      onSuccess: (response: any) => {
        const sessionId = response.data.sessionId;
        const generatedQrUrl = `${import.meta.env.VITE_DOMAIN}?sessionId=${sessionId}`;
        setQrSessionId(sessionId);
        setQrUrl(generatedQrUrl);
        setLoading(false);
      },
      onError: () => {
        setLoading(false);
        showToast({ description: "Không thể tạo mã QR. Vui lòng thử lại." });
      },
    });
  }, [initQrSession, showToast, ticket, isLinkDnse]);

  const handleSuccess = (ticket: string) => {
    saveLocalParams({ ticket });
    showToast({ description: "Đăng nhập thành công!" });

    // Refresh data
    refetchChapter();
    refetchProgress();
    refetchCollectedRewards();

    // Navigate to home or previous page
    // Navigate to home or previous page
    if (isLinkDnse) {
      setTicket(ticket);
      return;
    }
    navigate("/");
  };

  const handleError = (error: Error) => {
    console.error("QR Error:", error);
  };

  const handleExpired = () => {
    // Re-init
    setLoading(true);
    initQrSession(undefined, {
      onSuccess: (response: any) => {
        const sessionId = response.data.sessionId;
        const generatedQrUrl = `${import.meta.env.VITE_DOMAIN}?sessionId=${sessionId}`;
        setQrSessionId(sessionId);
        setQrUrl(generatedQrUrl);
        setLoading(false);
      },
    });
  };

  if (ticket && isLinkDnse) {
    return <LinkDnsePage />;
  }

  return (
    <div className="w-full h-screen bg-black/80 flex items-center justify-center">
      {loading ? (
        <div className="text-white">Đang tải mã QR...</div>
      ) : (
        qrSessionId && qrUrl && (
          <QrLoginOverlay
            sessionId={qrSessionId}
            qrUrl={qrUrl}
            onSuccess={handleSuccess}
            onError={handleError}
            onExpired={handleExpired}
          />
        )
      )}
    </div>
  );
};

export default QrLoginPage;
