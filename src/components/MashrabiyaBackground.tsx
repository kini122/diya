import React, { useEffect, useRef } from "react";

export const MashrabiyaBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Particle system: dynamic gold stardust & floating embers
    const particleCount = Math.min(width < 768 ? 28 : 55, 60);
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      pulseSpeed: number;
      baseOpacity: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.5,
        speedX: (Math.random() - 0.5) * 0.28,
        speedY: -Math.random() * 0.35 - 0.08,
        opacity: Math.random() * 0.6 + 0.2,
        baseOpacity: Math.random() * 0.5 + 0.2,
        pulseSpeed: Math.random() * 0.025 + 0.01,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity = p.baseOpacity + Math.sin(Date.now() * p.pulseSpeed) * 0.25;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentOpacity = Math.max(0.08, Math.min(0.85, p.opacity));

        // Soft radial glow
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5);
        glow.addColorStop(0, `rgba(224, 199, 122, ${currentOpacity})`);
        glow.addColorStop(1, `rgba(196, 160, 82, 0)`);

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Core star particle
        ctx.fillStyle = `rgba(196, 160, 82, ${currentOpacity + 0.15})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic Gold Dust Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-75"
      />

      {/* Rotating Celestial Gold Rings - Top Right */}
      <div className="absolute -top-28 -right-28 w-80 h-80 sm:w-[480px] sm:h-[480px] pointer-events-none opacity-25 animate-spin-slow">
        <svg viewBox="0 0 500 500" fill="none" className="w-full h-full">
          <circle cx="250" cy="250" r="230" stroke="#C4A052" strokeWidth="0.8" strokeDasharray="4 6" />
          <circle cx="250" cy="250" r="180" stroke="#C4A052" strokeWidth="0.6" />
          <circle cx="250" cy="250" r="130" stroke="#C4A052" strokeWidth="0.8" strokeDasharray="2 4" />
          <polygon points="250,50 390,190 390,310 250,450 110,310 110,190" stroke="#C4A052" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Rotating Celestial Gold Rings - Center Left */}
      <div className="absolute top-[40%] -left-36 w-80 h-80 sm:w-[500px] sm:h-[500px] pointer-events-none opacity-20 animate-spin-reverse">
        <svg viewBox="0 0 550 550" fill="none" className="w-full h-full">
          <circle cx="275" cy="275" r="260" stroke="#C4A052" strokeWidth="0.8" strokeDasharray="5 5" />
          <circle cx="275" cy="275" r="210" stroke="#C4A052" strokeWidth="0.5" />
          <circle cx="275" cy="275" r="160" stroke="#C4A052" strokeWidth="0.7" />
          <circle cx="275" cy="275" r="100" stroke="#C4A052" strokeWidth="0.5" strokeDasharray="3 3" />
        </svg>
      </div>

      {/* Rotating Celestial Gold Rings - Bottom Right */}
      <div className="absolute bottom-6 -right-32 w-72 h-72 sm:w-[420px] sm:h-[420px] pointer-events-none opacity-20 animate-spin-slow">
        <svg viewBox="0 0 450 450" fill="none" className="w-full h-full">
          <circle cx="225" cy="225" r="210" stroke="#C4A052" strokeWidth="0.8" />
          <circle cx="225" cy="225" r="160" stroke="#C4A052" strokeWidth="0.6" strokeDasharray="4 4" />
          <circle cx="225" cy="225" r="110" stroke="#C4A052" strokeWidth="0.8" />
        </svg>
      </div>

      {/* Subtle Geometric Lattice Background Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='%23C4A052' stroke-width='0.8'/%3E%3Ccircle cx='30' cy='30' r='10' fill='none' stroke='%23C4A052' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
};
