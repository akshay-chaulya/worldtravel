import React from "react";

const OverlayContainer = ({ children, status }) => {
  return (
    <div
      className={`z-[100] bg-black/30 fixed top-0 left-0 right-0 bottom-0 w-full h-full flex items-center justify-center ${
        status ? "" : "hidden"
      }`}
    >
      {children}
    </div>
  );
};

export default OverlayContainer;
