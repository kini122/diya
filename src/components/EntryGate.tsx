import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Howl } from "howler";

interface EntryGateProps {
  onEnter: () => void;
}

export const EntryGate: React.FC<EntryGateProps> = ({ onEnter }) => {
  const gateRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const archRef = useRef<SVGSVGElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isOpening, setIsOpening] = useState(false);
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    // 1. Initialize background audio with Howler
    const sound = new Howl({
      src: ["/audio/jashn-e-bahara.mp3"],
      html5: true,
      loop: true,
      volume: 0.85,
    });
    soundRef.current = sound;

    // 2. Pause/Stop music when exiting browser, switching tabs, or hiding window
    const handleVisibilityChange = () => {
      if (!soundRef.current) return;
      if (document.hidden) {
        if (soundRef.current.playing()) {
          soundRef.current.pause();
        }
      } else {
        if (sessionStorage.getItem("nikkah_entered") === "true") {
          if (!soundRef.current.playing()) {
            soundRef.current.play();
          }
        }
      }
    };

    const handleBeforeUnload = () => {
      if (soundRef.current) {
        soundRef.current.stop();
        soundRef.current.unload();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("pagehide", handleBeforeUnload);

    // 3. Dedicated Gold Stardust & Twinkle Particles on Loading Gate
    const canvas = canvasRef.current;
    let animationFrameId: number;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const handleResize = () => {
          if (!canvas) return;
          width = canvas.width = window.innerWidth;
          height = canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", handleResize);

        const particles: Array<{
          x: number;
          y: number;
          size: number;
          speedX: number;
          speedY: number;
          opacity: number;
          pulseSpeed: number;
        }> = [];

        for (let i = 0; i < 45; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 2 + 0.6,
            speedX: (Math.random() - 0.5) * 0.25,
            speedY: -Math.random() * 0.4 - 0.1,
            opacity: Math.random() * 0.7 + 0.2,
            pulseSpeed: Math.random() * 0.03 + 0.01,
          });
        }

        const render = () => {
          ctx.clearRect(0, 0, width, height);

          for (const p of particles) {
            p.x += p.speedX;
            p.y += p.speedY;
            p.opacity += Math.sin(Date.now() * p.pulseSpeed) * 0.005;

            if (p.y < -10) {
              p.y = height + 10;
              p.x = Math.random() * width;
            }
            if (p.x < -10) p.x = width + 10;
            if (p.x > width + 10) p.x = -10;

            const currentOpacity = Math.max(0.1, Math.min(0.85, p.opacity));

            // Radial golden glow
            const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
            glow.addColorStop(0, `rgba(224, 199, 122, ${currentOpacity})`);
            glow.addColorStop(1, `rgba(196, 160, 82, 0)`);

            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = `rgba(245, 236, 201, ${currentOpacity + 0.2})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          }

          animationFrameId = requestAnimationFrame(render);
        };

        render();
      }
    }

    // 4. GSAP Entry Animation
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gate-text-item",
        { y: 16, opacity: 0, filter: "blur(4px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.1,
          stagger: 0.15,
          ease: "power2.out",
          delay: 0.2,
        }
      );

      gsap.fromTo(
        ".gate-lantern-item",
        { y: -30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          stagger: 0.2,
          ease: "power2.out",
        }
      );
    }, gateRef);

    return () => {
      ctx.revert();
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("pagehide", handleBeforeUnload);
    };
  }, []);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    sessionStorage.setItem("nikkah_entered", "true");

    // Play background audio
    if (soundRef.current && !soundRef.current.playing()) {
      soundRef.current.play();
      soundRef.current.fade(0, 0.85, 1400);
    }

    onEnter();

    // Cinematic dissolve and gentle scale transition
    const tl = gsap.timeline({
      onComplete: () => {
        if (gateRef.current) {
          gateRef.current.style.display = "none";
        }
      },
    });

    tl.to(contentRef.current, {
      scale: 0.95,
      opacity: 0,
      filter: "blur(6px)",
      duration: 0.5,
      ease: "power2.in",
    });

    tl.to(
      archRef.current,
      {
        scale: 1.08,
        opacity: 0,
        duration: 0.9,
        ease: "power2.inOut",
      },
      "-=0.3"
    );

    tl.to(
      gateRef.current,
      {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.4"
    );
  };

  return (
    <div
      ref={gateRef}
      onClick={handleOpen}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#09221A] text-[#FAF7EE] select-none cursor-pointer overflow-hidden p-4"
      style={{
        touchAction: "manipulation",
        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(196, 160, 82, 0.14) 0%, transparent 70%), linear-gradient(180deg, #0C2B21 0%, #061913 100%)`,
      }}
    >
      {/* 1. Dedicated Gold Stardust Canvas for Loading Screen */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-80"
      />

      {/* 2. Slow-Rotating Celestial Mandala Gold Rings - Top Right */}
      <div className="absolute -top-32 -right-32 w-80 sm:w-96 h-80 sm:h-96 pointer-events-none opacity-25 animate-spin-slow">
        <svg viewBox="0 0 500 500" fill="none" className="w-full h-full">
          <circle cx="250" cy="250" r="230" stroke="#C4A052" strokeWidth="0.8" strokeDasharray="5 5" />
          <circle cx="250" cy="250" r="180" stroke="#C4A052" strokeWidth="0.6" />
          <circle cx="250" cy="250" r="130" stroke="#C4A052" strokeWidth="0.8" strokeDasharray="3 4" />
          <polygon points="250,50 390,190 390,310 250,450 110,310 110,190" stroke="#C4A052" strokeWidth="0.5" />
        </svg>
      </div>

      {/* 3. Slow-Rotating Celestial Mandala Gold Rings - Bottom Left */}
      <div className="absolute -bottom-32 -left-32 w-80 sm:w-96 h-80 sm:h-96 pointer-events-none opacity-20 animate-spin-reverse">
        <svg viewBox="0 0 500 500" fill="none" className="w-full h-full">
          <circle cx="250" cy="250" r="230" stroke="#C4A052" strokeWidth="0.8" strokeDasharray="4 6" />
          <circle cx="250" cy="250" r="170" stroke="#C4A052" strokeWidth="0.6" />
          <circle cx="250" cy="250" r="110" stroke="#C4A052" strokeWidth="0.8" />
        </svg>
      </div>

      {/* 4. Grand Islamic Archway Linework (SVG Frame) */}
      <svg
        ref={archRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-30 z-10"
        viewBox="0 0 400 800"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M 30 800 L 30 240 C 30 110, 120 40, 200 40 C 280 40, 370 110, 370 240 L 370 800"
          stroke="#C4A052"
          strokeWidth="1.2"
          strokeDasharray="4 4"
        />
        <path
          d="M 45 800 L 45 250 C 45 130, 130 60, 200 60 C 270 60, 355 130, 355 250 L 355 800"
          stroke="#C4A052"
          strokeWidth="0.8"
        />
        <circle cx="200" cy="40" r="4" fill="#C4A052" />
        <polygon
          points="200,30 203,36 210,36 205,40 207,46 200,42 193,46 195,40 190,36 197,36"
          fill="#E0C77A"
        />
      </svg>

      {/* 5. Left Hanging Moroccan Lantern (Fanoos) with Gentle Sway */}
      <div className="gate-lantern-item lantern-sway-left absolute top-0 left-6 sm:left-14 pointer-events-none flex flex-col items-center z-20">
        {/* Gold Chain */}
        <div className="w-[1px] h-20 sm:h-28 bg-gradient-to-b from-[#C4A052]/30 via-[#C4A052] to-[#E0C77A]" />
        {/* Lantern Body */}
        <svg
          className="lantern-glow w-10 sm:w-12 h-20 sm:h-24 text-[#C4A052]"
          viewBox="0 0 50 100"
          fill="none"
        >
          {/* Top Cap */}
          <path d="M 25 2 L 32 15 L 18 15 Z" fill="#C4A052" />
          <circle cx="25" cy="2" r="2" fill="#E0C77A" />
          {/* Lantern Glass Chamber with Warm Glowing Candle */}
          <path
            d="M 15 15 L 35 15 L 42 45 L 35 75 L 15 75 L 8 45 Z"
            stroke="#C4A052"
            strokeWidth="1.5"
            fill="rgba(224, 199, 122, 0.22)"
          />
          <circle cx="25" cy="45" r="8" fill="#FFF4C2" opacity="0.85" />
          <circle cx="25" cy="45" r="16" fill="#C4A052" opacity="0.25" />
          {/* Bottom Tassel */}
          <path d="M 25 75 L 25 90" stroke="#C4A052" strokeWidth="1.5" />
          <circle cx="25" cy="92" r="2" fill="#E0C77A" />
        </svg>
      </div>

      {/* 6. Right Hanging Moroccan Lantern (Fanoos) with Gentle Sway */}
      <div className="gate-lantern-item lantern-sway-right absolute top-0 right-6 sm:right-14 pointer-events-none flex flex-col items-center z-20">
        {/* Gold Chain */}
        <div className="w-[1px] h-16 sm:h-24 bg-gradient-to-b from-[#C4A052]/30 via-[#C4A052] to-[#E0C77A]" />
        {/* Lantern Body */}
        <svg
          className="lantern-glow w-9 sm:w-11 h-18 sm:h-22 text-[#C4A052]"
          viewBox="0 0 50 100"
          fill="none"
        >
          <path d="M 25 2 L 32 15 L 18 15 Z" fill="#C4A052" />
          <circle cx="25" cy="2" r="2" fill="#E0C77A" />
          <path
            d="M 15 15 L 35 15 L 42 45 L 35 75 L 15 75 L 8 45 Z"
            stroke="#C4A052"
            strokeWidth="1.5"
            fill="rgba(224, 199, 122, 0.22)"
          />
          <circle cx="25" cy="45" r="7" fill="#FFF4C2" opacity="0.85" />
          <circle cx="25" cy="45" r="14" fill="#C4A052" opacity="0.25" />
          <path d="M 25 75 L 25 88" stroke="#C4A052" strokeWidth="1.5" />
          <circle cx="25" cy="90" r="2" fill="#E0C77A" />
        </svg>
      </div>

      {/* 7. Center Content: Neat Typography & Minimal Tap Prompt */}
      <div
        ref={contentRef}
        className="relative z-20 flex flex-col items-center text-center max-w-xs sm:max-w-sm mx-auto px-4"
      >
        {/* Small Subtle Arabic Bismillah */}
        <div className="gate-text-item font-arabic text-sm sm:text-base text-[#C4A052] mb-3 opacity-90 tracking-wide">
          بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </div>

        {/* Clean, Neat Couple Typography (No Logo) */}
        <h1 className="gate-text-item font-display font-normal text-4xl sm:text-5xl text-[#FAF7EE] tracking-tight leading-[1.1] mb-2 drop-shadow-sm">
          <div>Diya</div>
          <div className="font-script font-normal text-[#C4A052] text-3xl sm:text-4xl my-0.5">
            &
          </div>
          <div>Shalom</div>
        </h1>

        {/* Date Subtext */}
        <p className="gate-text-item font-serif italic text-xs sm:text-sm text-[#FAF7EE]/70 mb-14">
          Saturday, September 19th, 2026
        </p>

        {/* Pure Minimal "tap" Prompt */}
        <div className="gate-text-item animate-tap-prompt flex flex-col items-center gap-1 cursor-pointer">
          <span className="text-[12px] sm:text-[13px] font-sans lowercase tracking-[0.35em] text-[#C4A052] font-medium">
            tap
          </span>
          <span className="text-[#C4A052]/50 text-[10px]">✦</span>
        </div>
      </div>
    </div>
  );
};
