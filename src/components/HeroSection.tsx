import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-anim-item",
        { y: 22, opacity: 0, filter: "blur(4px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.12,
          ease: "power2.out",
          delay: 0.1,
        }
      );

      if (cardRef.current && sectionRef.current) {
        gsap.to(cardRef.current, {
          yPercent: 7,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative pt-6 pb-20 px-5 sm:px-6 flex flex-col items-center justify-center text-center max-w-md sm:max-w-xl mx-auto w-full"
    >
      {/* 1. Subtle Arabic Calligraphy Header with Delicate Stars */}
      <div className="hero-anim-item flex items-center justify-center gap-2.5 mb-4 opacity-90">
        <span className="text-[#C4A052] text-xs">✧</span>
        <div className="font-arabic text-base sm:text-lg text-[#C4A052] tracking-wider">
          بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </div>
        <span className="text-[#C4A052] text-xs">✧</span>
      </div>

      {/* 2. Large Commanding Stacked Names */}
      <div className="hero-anim-item mb-7">
        <h1 className="font-display font-normal text-6xl sm:text-7xl md:text-8xl text-[#1A3B32] tracking-tight leading-[1.02]">
          <div>
            Diya <span className="font-script font-normal text-[#C4A052] text-5xl sm:text-6xl md:text-7xl ml-1">&</span>
          </div>
          <div>Shalom</div>
        </h1>
      </div>

      {/* 3. Full Formal Invitation Copy with Generous Line Height */}
      <p className="hero-anim-item font-serif text-base sm:text-lg md:text-xl text-[#332E28] max-w-md mx-auto leading-relaxed mb-7 font-normal px-2">
        With the blessings of Allah and our families, we warmly invite you to join us in celebrating our nikkah.
      </p>

      {/* 4. Date Line in Tracking-Wide Gold Caps */}
      <div className="hero-anim-item text-xs sm:text-sm font-sans uppercase tracking-[0.28em] text-[#C4A052] font-semibold mb-10">
        SATURDAY • SEPTEMBER 19TH • 2026
      </div>

      {/* 5. Tilted Double Layered Gold Card Couple Photo (Spacious & Grand) */}
      <div ref={cardRef} className="hero-anim-item tilted-gold-card-wrapper my-2 mb-8 !max-w-[340px] sm:!max-w-[380px]">
        <div className="tilted-gold-card-back" />
        <div className="tilted-gold-card-front !p-3">
          <div className="overflow-hidden rounded-sm">
            <img
              src="/images/couple.jpg"
              alt="Diya & Shalom"
              className="w-full h-auto object-cover block"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
