import React from "react";

export const HeaderNav: React.FC = () => {
  const scrollToDetails = () => {
    const el = document.getElementById("details");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="w-full max-w-md sm:max-w-xl mx-auto px-5 sm:px-6 pt-8 pb-3 flex items-center justify-end text-xs tracking-widest uppercase font-sans text-[#2D2721] z-30 relative">
      {/* Right Details Link */}
      <button
        onClick={scrollToDetails}
        className="flex items-center gap-1.5 text-xs font-sans font-medium text-[#1A3B32]/85 hover:text-[#1A3B32] tracking-[0.22em] transition-colors cursor-pointer py-1.5 px-2"
      >
        <span>DETAILS</span>
        <span className="text-[#C4A052] text-xs">↓</span>
      </button>
    </header>
  );
};
