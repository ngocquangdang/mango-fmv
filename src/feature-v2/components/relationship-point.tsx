import { useEffect, useState } from "react";
import PhotoFrame from "./ui/photo-frame";

export type RelationshipPointItem = {
  imageUrl: string;
  points: number;
};

type RelationshipPointProps = {
  items: RelationshipPointItem[];
  isVisible: boolean;
  onClose?: () => void;
};

export default function RelationshipPoint({
  items,
  isVisible,
  onClose,
}: RelationshipPointProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isVisible || items.length === 0) {
      setIsOpen(false);
      return;
    }

    setIsOpen(true);

    const timer = setTimeout(() => {
      setIsOpen(false);
      if (onClose) {
        onClose();
      }
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [isVisible, items, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2"
      role="status"
      aria-label="Relationship points earned"
    >
      {items.map((item, index) => (
        <PhotoFrame
          key={index}
          imageSrc={item.imageUrl}
          score={item.points}
          className="w-24 h-24 lg:w-[115.2px] lg:h-[115.2px]"
        />
      ))}
    </div>
  );
}
