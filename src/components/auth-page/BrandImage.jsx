import React from "react";

const BrandImage = () => {
  return (
    <div className="hidden lg:flex h-full w-full items-center justify-center">
      <img
        className="h-96 w-full rounded-lg object-fill shadow-md"
        src="/LOGO_PLACEHOLDER.png"
        alt="nature image"
      />
    </div>
  );
};

export default BrandImage;
