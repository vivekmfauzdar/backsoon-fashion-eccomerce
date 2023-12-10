import React from "react";
import Navigation from "../navigation";
import Footer from "../footer";

function layout({ children }) {
  return (
    <>
      <div className="lg:max-w-[1270px] max-w-[970px] min-w-[600px] mx-auto text-black">
        <Navigation />
        {children}
        <Footer />
      </div>
    </>
  );
}

export default layout;
