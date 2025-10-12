import React, { useState } from "react";

export function ImageWithFallback({ src, fallback, alt, ...props }) {
  const [imgSrc, setImgSrc] = useState(src || fallback);

  return (
    <img
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => {
        console.warn(`Image failed to load: ${src}. Falling back to default.`);
        setImgSrc(fallback);
      }}
    />
  );
}
