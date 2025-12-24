import React from 'react';
import { Delete, Check } from 'lucide-react';

interface VirtualNumPadProps {
  value: string;
  onChange: (value: string) => void;
  onConfirm?: () => void;
  maxLength?: number;
  className?: string;
}

export const VirtualNumPad: React.FC<VirtualNumPadProps> = ({
  value,
  onChange,
  onConfirm,
  maxLength = 10,
  className = "",
}) => {
  const handleNumberClick = (num: number) => {
    if (value.length < maxLength) {
      onChange(value + num.toString());
    }
  };

  const handleDelete = () => {
    if (value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
  };

  const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className={`grid grid-cols-3 gap-2 p-2 bg-gray-100 rounded-lg ${className}`} style={{ touchAction: 'manipulation' }}>
      {keys.map((num) => (
        <button
          key={num}
          onClick={() => handleNumberClick(num)}
          className="h-14 flex items-center justify-center bg-white rounded shadow text-xl font-medium active:bg-gray-200 active:scale-90 transition-all duration-100 select-none"
          type="button"
        >
          {num}
        </button>
      ))}

      <button
        onClick={handleDelete}
        className="h-14 flex items-center justify-center bg-gray-200 rounded shadow active:bg-gray-300 active:scale-90 transition-all duration-100 select-none"
        type="button"
      >
        <Delete className="w-6 h-6" />
      </button>

      <button
        onClick={() => handleNumberClick(0)}
        className="h-14 flex items-center justify-center bg-white rounded shadow text-xl font-medium active:bg-gray-200 active:scale-90 transition-all duration-100 select-none"
        type="button"
      >
        0
      </button>

      <button
        onClick={handleConfirm}
        className="h-14 flex items-center justify-center bg-blue-500 text-white rounded shadow active:bg-blue-600 active:scale-90 transition-all duration-100 select-none"
        type="button"
        disabled={!onConfirm}
      >
        <Check className="w-6 h-6" />
      </button>
    </div>
  );
};
