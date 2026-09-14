import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const LocationSection: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".venue-card-anim",
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 95%",
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="location"
      className="relative py-16 px-5 sm:px-6 max-w-md sm:max-w-xl mx-auto text-center w-full"
    >
      <div className="venue-card-anim ref-card-clean p-9 sm:p-12 relative overflow-hidden flex flex-col items-center w-full">
        {/* Delicate Inner Frame Accent */}
        <div className="absolute inset-2.5 border border-[#C4A052]/25 pointer-events-none rounded-sm" />

        {/* Diamond Ornament */}
        <div className="text-[#C4A052] text-base mb-3">
          ✦
        </div>

        {/* Tag */}
        <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.3em] text-[#C4A052] font-semibold mb-3.5">
          JOIN US THERE
        </span>

        {/* Large Stacked Venue Title */}
        <h2 className="font-display font-normal text-4xl sm:text-5xl text-[#1A3B32] tracking-tight leading-[1.08] mb-2">
          <div>Oryx</div>
          <div>Convention</div>
          <div>Center</div>
        </h2>

        {/* Location Subtitle */}
        <p className="font-script font-normal text-xl sm:text-2xl text-[#C4A052] mb-4">
          Oachira
        </p>

        {/* Quote */}
        <p className="font-serif text-base sm:text-lg text-[#332E28]/85 max-w-sm mx-auto leading-relaxed mb-8 font-normal">
          Your presence is the most beautiful gift.
        </p>

        {/* Get Directions Button */}
        <a
          href="https://share.google/LroiLQvErOKhZPJKE"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full border border-[#C4A052] bg-[#FCFAF5] text-[#1A3B32] font-sans font-semibold text-xs tracking-[0.22em] uppercase shadow-xs transition-all duration-300 hover:bg-[#1A3B32] hover:text-[#FAF7EE] hover:border-[#1A3B32] active:scale-95"
        >
          <MapPin className="w-4 h-4 text-[#C4A052] group-hover:text-[#FAF7EE] transition-colors" />
          <span>GET DIRECTIONS</span>
        </a>
      </div>
    </section>
  );
};
