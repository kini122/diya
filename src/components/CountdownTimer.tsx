import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

export const CountdownTimer: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);

  // Target: September 19, 2026, 12:30:00 IST (UTC+5:30)
  const targetDate = new Date("2026-09-19T12:30:00+05:30").getTime();

  const calculateTime = (): TimeRemaining => {
    const now = Date.now();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds, isComplete: false };
  };

  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(calculateTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".countdown-elem",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.1,
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

  const formatNumber = (num: number) => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 px-5 sm:px-6 bg-[#0D2A20] text-[#FAF7EE] text-center overflow-hidden my-12"
      style={{
        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(196, 160, 82, 0.1) 0%, transparent 75%), linear-gradient(180deg, #0D2A20 0%, #092018 100%)`,
      }}
    >
      {/* Geometric Diamond / Lattice Linework Overlay */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 0 L80 40 L40 80 L0 40 Z' fill='none' stroke='%23C4A052' stroke-width='0.75'/%3E%3Cpath d='M0 0 L40 40 L0 80' fill='none' stroke='%23C4A052' stroke-width='0.75'/%3E%3Cpath d='M80 0 L40 40 L80 80' fill='none' stroke='%23C4A052' stroke-width='0.75'/%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-md sm:max-w-lg mx-auto flex flex-col items-center">
        {/* Header Tag */}
        <span className="countdown-elem text-[11px] font-sans uppercase tracking-[0.3em] text-[#C4A052] font-medium block mb-3.5">
          UNTIL OUR NIKKAH
        </span>

        {/* Heading in Ivory Cormorant Serif */}
        <h2 className="countdown-elem font-display font-normal text-4xl sm:text-5xl text-[#FAF7EE] tracking-tight mb-10">
          The days are drawing near
        </h2>

        {/* Live Digits Display: 05 : 01 : 17 : 52 */}
        <div className="countdown-elem flex items-center justify-center gap-3 sm:gap-5 mb-4 w-full">
          {/* Days */}
          <div className="flex flex-col items-center">
            <span className="font-display font-normal text-5xl sm:text-6xl text-[#FAF7EE] tracking-tight">
              {formatNumber(timeLeft.days)}
            </span>
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.28em] text-[#C4A052] font-semibold mt-1.5">
              DAYS
            </span>
          </div>

          <span className="font-display text-3xl sm:text-4xl text-[#C4A052] mb-5">:</span>

          {/* Hours */}
          <div className="flex flex-col items-center">
            <span className="font-display font-normal text-5xl sm:text-6xl text-[#FAF7EE] tracking-tight">
              {formatNumber(timeLeft.hours)}
            </span>
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.28em] text-[#C4A052] font-semibold mt-1.5">
              HOURS
            </span>
          </div>

          <span className="font-display text-3xl sm:text-4xl text-[#C4A052] mb-5">:</span>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <span className="font-display font-normal text-5xl sm:text-6xl text-[#FAF7EE] tracking-tight">
              {formatNumber(timeLeft.minutes)}
            </span>
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.28em] text-[#C4A052] font-semibold mt-1.5">
              MINUTES
            </span>
          </div>

          <span className="font-display text-3xl sm:text-4xl text-[#C4A052] mb-5">:</span>

          {/* Seconds */}
          <div className="flex flex-col items-center">
            <span className="font-display font-normal text-5xl sm:text-6xl text-[#FAF7EE] tracking-tight">
              {formatNumber(timeLeft.seconds)}
            </span>
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.28em] text-[#C4A052] font-semibold mt-1.5">
              SECONDS
            </span>
          </div>
        </div>

        {/* Target Time Line in Gold Caps */}
        <div className="countdown-elem text-[11px] sm:text-xs font-sans uppercase tracking-[0.28em] text-[#C4A052] font-semibold mt-8">
          ✦ SEPTEMBER 19, 2026 • 12:30 PM ✦
        </div>
      </div>
    </section>
  );
};
