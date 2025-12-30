import React from 'react';
import { createPortal } from 'react-dom';

interface BlockingUsageModalProps {
    isOpen: boolean;
}

const BlockingUsageModal: React.FC<BlockingUsageModalProps> = ({ isOpen }) => {
    if (!isOpen) return null;

    // Use portal to ensure it stays on top of everything, similar to other modals
    // Assuming a 'root' or 'modal-root' exists, otherwise default to document.body
    const mountNode = document.body;

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm pointer-events-auto">
            <div className="bg-[#1A1A1A] border border-white/20 rounded-xl max-w-md w-full p-6 text-center shadow-2xl mx-4">
                <div className="flex justify-center mb-4">
                    <img
                        src="/images/warning-icon.png"
                        alt="Warning"
                        className="w-16 h-16 object-contain opacity-90"
                        onError={(e) => {
                            // Fallback if image doesn't exist
                            e.currentTarget.style.display = 'none';
                        }}
                    />
                    {/* Fallback icon using pure CSS/SVG if image fails or for immediate display */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-16 h-16 text-yellow-500 hidden peer-[:hidden]:block" // Only show if img is hidden (requires complex css or js, simplified here to just render if needed)
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>

                <h2 className="text-xl font-bold text-white mb-2">Đã đạt giới hạn sử dụng</h2>

                <p className="text-gray-300 mb-6">
                    Bạn đã sử dụng hết số lượt tạo voice trong ngày (10/10). <br />
                    Vui lòng quay lại vào ngày mai để tiếp tục trải nghiệm nhé!
                </p>

                {/* No Buttons - Strictly Blocking */}
            </div>
        </div>,
        mountNode
    );
};

export default BlockingUsageModal;
