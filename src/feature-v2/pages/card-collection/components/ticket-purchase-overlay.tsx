import Banner from '../../../components/banner';



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

  if (!isOpen) return null;

  const packages = ticketPackages.length > 0 ? ticketPackages : [];

  return (
    <div className="fixed inset-0 z-[60] flex flex-col items-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
      {/* Header Area */}
      <div className="w-full flex items-center justify-between p-4 lg:p-8 relative">
        {/* Back Button */}
        <div
          className="cursor-pointer w-10 h-10 lg:w-12 lg:h-12 z-50 bg-[#FDE047] rounded-md border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,0.2)]"
          onClick={onClose}
        >
          <img src="/images/chevon-left.png" alt="back" className="w-6 h-6 lg:w-8 lg:h-8 object-contain" />
        </div>
        <Banner text="Mua lượt xé" className='left-[unset] translate-x-[unset]' />


        {/* Currency Display */}
        <div className="relative z-50">
          <div className="relative">
            <img src="/images/elements/tag-element.png" alt="bg" className="h-10 w-auto absolute -top-1 -left-4 z-[-1]" />
            <div className="bg-white/90 border-2 border-blue-600 rounded-full h-10 px-4 pl-8 flex items-center gap-2 min-w-[100px] shadow-lg transform -rotate-2">
              <img src="/images/elements/tag-element.png" alt="ticket" className="w-8 h-6 absolute -left-2 top-1" />
              <span className="text-blue-800 font-bold ml-2">{currentTickets}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area - Purchase Options */}
      <div className="flex-1 w-full flex items-center justify-center p-4">
        <div className="grid grid-cols-5 gap-4 lg:gap-8 max-w-6xl w-full">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="relative aspect-[3/4.2] flex flex-col items-center justify-center p-6 transition-transform hover:scale-105 cursor-pointer"
              onClick={() => { /* handle purchase */ }}
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
                    src="/images/collection/ticket.png"
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
                    {(pkg.price * pkg.quantity).toLocaleString("vi-VN")} {pkg.currency?.toLowerCase() || 'vnđ'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TicketPurchaseOverlay;
