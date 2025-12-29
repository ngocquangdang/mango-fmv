import Banner from '../../../components/banner';
import { useState, useEffect } from 'react';
import { CardCollectionService } from '../services/card-collection-service';
import { useCardCollection } from '../hooks/use-card-collection';

interface TicketPurchaseOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  currentTickets: number;
}

const TicketPurchaseOverlay = ({
  isOpen,
  onClose,
  currentTickets,
}: TicketPurchaseOverlayProps) => {
  const { ticketPackages } = useCardCollection();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ticketBalance, setTicketBalance] = useState<number>(currentTickets);

  // Auto-dismiss error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000); // 5 seconds

      return () => clearTimeout(timer);
    }
  }, [error]);

  // Fetch user info to get current ticket balance
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!isOpen) return;

      try {
        const response = await CardCollectionService.getUserInfo();
        if (response.data?.ticketBalance !== undefined) {
          setTicketBalance(response.data.ticketBalance);
        }
      } catch (err) {
        console.error('Failed to fetch user info:', err);
        // Fallback to prop value if API fails
        setTicketBalance(currentTickets);
      }
    };

    fetchUserInfo();
  }, [isOpen, currentTickets]);

  if (!isOpen) return null;

  const packages = ticketPackages.length > 0 ? ticketPackages : [];

  const handlePackageClick = async (pkg: typeof packages[0]) => {
    try {
      setIsProcessing(true);
      setError(null);

      // Save pending order info to sessionStorage
      sessionStorage.setItem('pending_ticket_order', JSON.stringify({
        packageId: pkg.id,
        quantity: pkg.quantity, // Number of tickets in the package
        timestamp: Date.now(),
      }));

      // Create order and get payment redirect URL
      // quantity = pkg.quantity (number of tickets to receive after payment)
      // Backend will charge pkg.price (total payment amount)
      const orderResponse = await CardCollectionService.createTicketOrder(pkg.id, pkg.quantity);

      // Redirect to Pay1 payment gateway
      window.location.href = orderResponse.redirectURL;
    } catch (err) {
      console.error('Failed to create ticket order:', err);
      setError(err instanceof Error ? err.message : 'Failed to create order');
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex flex-col items-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
      {/* Header Area */}
      <div className="w-full flex items-center p-4 lg:p-8 relative">
        {/* Back Button */}
        <div
          className="cursor-pointer w-10 h-10 lg:w-12 lg:h-12 z-50 bg-[#FDE047] rounded-md border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,0.2)]"
          onClick={onClose}
        >
          <img src="/images/chevon-left.png" alt="back" className="w-6 h-6 lg:w-8 lg:h-8 object-contain" />
        </div>
        <Banner text="Mua lượt xé" />


        {/* Currency Display */}

        <div className="absolute top-0 right-0 flex items-center gap-2 p-4 mr-">
          <div
            className="w-20 h-10 lg:w-[96px] lg:h-[48px] bg-cover bg-center bg-no-repeat flex items-center justify-center text-xs lg:text-sm"
            style={{ backgroundImage: `url(/images/score-banner.png)` }}
          >
            {ticketBalance}
          </div>
          <div className='absolute top-5 left-3 w-7 h-7 lg:w-8 lg:h-8 lg:top-5 lg:left-3' style={{
            backgroundImage: "url('/images/collection/coin-icon.png')",
            backgroundSize: "contain",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}></div>
        </div>
      </div>

      {/* Content Area - Purchase Options */}
      <div className="flex-1 w-full flex items-center justify-center p-4">
        {error && (
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <p className="font-bold">Server Error</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="ml-4 hover:bg-red-600 rounded-full p-1 transition-colors"
                aria-label="Close error"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {isProcessing && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#FF4820] mx-auto mb-4"></div>
              <p className="text-lg font-bold text-[#112953]">Đang xử lý...</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-5 gap-4 lg:gap-8 max-w-6xl w-full">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative aspect-[3/4.2] flex flex-col items-center justify-center p-6 transition-transform ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 cursor-pointer'
                }`}
              onClick={() => !isProcessing && handlePackageClick(pkg)}
            >
              {/* Background Frame */}
              <img
                src="/images/collection/ticket-frame.png"
                alt="frame"
                className="absolute inset-0 w-full h-full object-fill z-0"
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center w-full h-full pt-4 pb-4">

                {/* Ticket Icon */}
                <div className="flex-1 flex items-center justify-center">
                  <img
                    src="/images/collection/coin-icon.png"
                    alt="ticket"
                    className="w-24 h-auto object-contain drop-shadow-sm transform -rotate-12"
                  />
                </div>

                {/* Quantity */}
                <div className="mt-2 mb-1">
                  <span className="font-[20px] font-bold text-[#FF4820]" style={{ fontFamily: 'var(--font-handwriting, inherit)' }}>
                    x{pkg.quantity}
                  </span>
                </div>

                {/* Divider */}
                <img
                  src="/images/collection/ticket-frame-hr.png"
                  alt="divider"
                  className="w-[80%] h-auto object-contain my-1 opacity-80"
                />

                {/* Price */}
                <div className="mt-1">
                  <span className="text-base font-bold text-[#112953]" style={{ fontFamily: 'var(--font-handwriting, inherit)' }}>
                    {(pkg.price).toLocaleString("vi-VN")} {pkg.currency?.toLowerCase() || 'vnđ'}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div >
  );
};

export default TicketPurchaseOverlay;
