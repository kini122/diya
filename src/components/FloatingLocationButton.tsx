import React from "react";
import { MapPin } from "lucide-react";

export const FloatingLocationButton: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <a
        href="https://share.google/LroiLQvErOKhZPJKE"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open venue location in Google Maps"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#0F3D2E] text-[#F5E8BA] border-2 border-[#C9A227] shadow-[0_8px_25px_rgba(15,61,46,0.4)] transition-transform duration-300 hover:scale-110 active:scale-95"
      >
        {/* Pulsing Outer Ring */}
        <span className="pulse-location-ring absolute inset-0 rounded-full border-2 border-[#C9A227] pointer-events-none" />

        {/* Pin Icon with subtle bounce on hover */}
        <MapPin className="w-6 h-6 stroke-[1.8] text-[#E8CE7A] transition-transform duration-300 group-hover:-translate-y-0.5" />

        {/* Tooltip on desktop hover */}
        <span className="absolute right-16 px-3 py-1 bg-[#09261D] text-[#F5E8BA] text-xs font-sans rounded-md border border-[#C9A227]/40 shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden sm:block">
          View Venue Map 📍
        </span>
      </a>
    </div>
  );
};
