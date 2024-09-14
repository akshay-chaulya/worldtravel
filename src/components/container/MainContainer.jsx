import React from "react";

const MainContainer = ({ children }) => {
  return (
    <main className="min-h-screen  md:mt-[4.2rem] mt-[4.52rem] flex flex-col items-center justify-center">
      {children}
    </main>
  );
};

export default MainContainer;
