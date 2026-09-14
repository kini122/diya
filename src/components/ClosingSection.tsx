import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ClosingSection: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".closing-anim",
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.12,
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
    <footer
      ref={containerRef}
      className="relative pt-12 pb-28 px-5 sm:px-6 max-w-md sm:max-w-xl mx-auto text-center overflow-hidden w-full"
    >
      <div className="flex flex-col items-center">
        {/* 1. Small Delicate Arabic Accent */}
        <div className="closing-anim font-arabic text-base sm:text-lg text-[#C4A052] mb-4 opacity-85">
          بِسْمِ ٱللَّٰهِ
        </div>

        {/* 2. Heading: We cannot wait to celebrate with you. */}
        <h2 className="closing-anim font-display font-normal text-5xl sm:text-6xl text-[#1A3B32] tracking-tight leading-[1.08] mb-6">
          <div>We cannot wait</div>
          <div className="font-script font-normal text-[#C4A052] text-4xl sm:text-5xl my-1">
            to celebrate with
          </div>
          <div>you.</div>
        </h2>

        {/* 3. Subtext */}
        <p className="closing-anim font-serif text-base sm:text-lg text-[#332E28] max-w-sm mx-auto leading-relaxed mb-8 font-normal">
          Your presence and blessings would mean a lot to us.
        </p>

        {/* 4. Sign-off */}
        <div className="closing-anim font-script font-normal text-xl sm:text-2xl text-[#1A3B32] mb-2">
          With love, Diya & Shalom
        </div>

        {/* 5. Date Code */}
        <div className="closing-anim text-xs sm:text-sm font-sans tracking-[0.3em] text-[#C4A052] font-semibold">
          19 • 09 • 2026
        </div>
      </div>
    </footer>
  );
};
