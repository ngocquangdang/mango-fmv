import Banner from '../../../components/banner';



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
  if (!isOpen) return null;

  // Mock packages based on screenshot
  // All seem to be x10 tickets for 100.000 vnd in the mockup repeated 5 times
  const packages = Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    amount: 10,
    price: "100.000 vnđ",
  }));

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
        <Banner text="Mua lượt xé" />


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
              className="flex flex-col gap-2 transform transition-transform hover:scale-105"
            >
              {/* Card */}
              <div className="bg-[#D9D9D9] border-2 border-white/50 shadow-xl w-full aspect-[3/4] flex flex-col items-center justify-center gap-2 p-4 relative group cursor-pointer hover:bg-[#E5E5E5] transition-colors">
                {/* Ticket Icon Group */}
                <div className="flex justify-center items-center transform -rotate-12 group-hover:rotate-0 transition-transform duration-300">
                  <img src="/images/elements/tag-element.png" alt="ticket" className="w-16 h-12 lg:w-24 lg:h-16 object-contain drop-shadow-md" />
                  <img src="/images/elements/tag-element.png" alt="ticket" className="w-16 h-12 lg:w-24 lg:h-16 object-contain -ml-8 lg:-ml-12 drop-shadow-md" />
                </div>

                {/* Amount Badge */}
                <span className="text-2xl lg:text-4xl font-bold mt-2">x{pkg.amount}</span>
              </div>

              {/* Price Tag */}
              <div className="bg-[#E5E5E5] w-full py-2 px-1 text-center border border-black/10 shadow-sm">
                <span className="font-bold text-sm lg:text-base text-gray-800">{pkg.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TicketPurchaseOverlay;
