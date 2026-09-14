import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, Clock, MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const EventDetails: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".detail-card-anim",
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.14,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
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
      id="details"
      className="relative py-20 px-5 sm:px-6 max-w-md sm:max-w-xl mx-auto text-center w-full"
    >
      {/* 1. Header & Title */}
      <div className="mb-10">
        <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#C4A052] font-semibold block mb-3">
          THE CELEBRATION
        </span>
        <h2 className="font-display font-normal text-5xl sm:text-6xl text-[#1A3B32] tracking-tight mb-3.5">
          Save the date
        </h2>
        <p className="font-serif text-base sm:text-lg text-[#332E28]/90 max-w-sm mx-auto leading-relaxed italic">
          A few details for the day we begin, surrounded by the people we love.
        </p>
      </div>

      {/* 2. Vertically Stacked 3 Ivory Cards (Spacious & Grand) */}
      <div className="flex flex-col gap-5 w-full">
        {/* Card 1: WHEN */}
        <div className="detail-card-anim ref-card-clean py-7 sm:py-8 px-6 flex flex-col items-center justify-center w-full">
          {/* Circular Thin Gold Icon Badge */}
          <div className="w-12 h-12 rounded-full border border-[#C4A052]/50 bg-[#FCFAF5] flex items-center justify-center text-[#C4A052] mb-3 shadow-xs">
            <Calendar className="w-5 h-5 stroke-[1.3]" />
          </div>

          <span className="text-[11px] font-sans uppercase tracking-[0.28em] text-[#C4A052] font-semibold mb-1.5">
            WHEN
          </span>
          <h3 className="font-display font-normal text-2xl sm:text-3xl text-[#1A3B32]">
            September 19th, 2026
          </h3>
        </div>

        {/* Card 2: NIKKAH */}
        <div className="detail-card-anim ref-card-clean py-7 sm:py-8 px-6 flex flex-col items-center justify-center w-full">
          {/* Circular Thin Gold Icon Badge */}
          <div className="w-12 h-12 rounded-full border border-[#C4A052]/50 bg-[#FCFAF5] flex items-center justify-center text-[#C4A052] mb-3 shadow-xs">
            <Clock className="w-5 h-5 stroke-[1.3]" />
          </div>

          <span className="text-[11px] font-sans uppercase tracking-[0.28em] text-[#C4A052] font-semibold mb-1.5">
            NIKKAH
          </span>
          <h3 className="font-display font-normal text-2xl sm:text-3xl text-[#1A3B32]">
            12:30 PM – 1:30 PM
          </h3>
        </div>

        {/* Card 3: WHERE (Clickable to Google Maps) */}
        <a
          href="https://share.google/LroiLQvErOKhZPJKE"
          target="_blank"
          rel="noopener noreferrer"
          title="Open Oryx Convention Center in Google Maps"
          className="detail-card-anim ref-card-clean py-7 sm:py-8 px-6 flex flex-col items-center justify-center w-full cursor-pointer group no-underline"
        >
          {/* Circular Thin Gold Icon Badge */}
          <div className="w-12 h-12 rounded-full border border-[#C4A052]/50 bg-[#FCFAF5] group-hover:border-[#C4A052] group-hover:bg-[#FAF6EE] flex items-center justify-center text-[#C4A052] mb-3 shadow-xs transition-colors">
            <MapPin className="w-5 h-5 stroke-[1.3] group-hover:scale-110 transition-transform" />
          </div>

          <span className="text-[11px] font-sans uppercase tracking-[0.28em] text-[#C4A052] font-semibold mb-1.5">
            WHERE
          </span>
          <h3 className="font-display font-normal text-2xl sm:text-3xl text-[#1A3B32] group-hover:text-[#0F3D2E] transition-colors">
            Oryx Convention Center, Oachira
          </h3>
        </a>
      </div>
    </section>
  );
};
