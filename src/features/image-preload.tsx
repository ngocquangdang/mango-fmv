import React, { memo } from "react";
function ImagePreloader({ imageUrls }: { imageUrls: string[] }) {
  React.useEffect(() => {
    imageUrls.forEach((url: string) => {
      const img = new Image();
      img.src = url;
    });
  }, [imageUrls]);

  return null; // This component doesn't render anything visible
}

export default memo(ImagePreloader);
