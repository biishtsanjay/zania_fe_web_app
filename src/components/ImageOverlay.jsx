import React, { useEffect } from "react";

const ImageOverlay = ({ item, onClose }) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div className="overlay" onClick={onClose}>
      <div className="overlay-content">
        <img src={item.picture} alt={item.title} style={{ width: "500px" }} />
      </div>
    </div>
  );
};

export default ImageOverlay;
