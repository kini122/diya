import React, { useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeaderNav } from "./components/HeaderNav";
import { MashrabiyaBackground } from "./components/MashrabiyaBackground";
import { EntryGate } from "./components/EntryGate";
import { HeroSection } from "./components/HeroSection";
import { EventDetails } from "./components/EventDetails";
import { CountdownTimer } from "./components/CountdownTimer";
import { LocationSection } from "./components/LocationSection";
import { ClosingSection } from "./components/ClosingSection";
import { FloatingLocationButton } from "./components/FloatingLocationButton";

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [, setHasEntered] = useState(false);

  useEffect(() => {
    // Lenis smooth inertia scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  const handleEnterInvitation = () => {
    setHasEntered(true);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 600);
  };

  return (
    <div className="relative min-h-screen selection:bg-[#0F3D2E] selection:text-[#F5E8BA] bg-[#FAF5EB] overflow-x-hidden">
      {/* Background Stardust Particles & Rotating Gold Celestial Rings */}
      <MashrabiyaBackground />

      {/* Entry Gate with Animated Seal Stroke, Audio Start, and Curtain Reveal */}
      <EntryGate onEnter={handleEnterInvitation} />

      {/* Floating Circular Location Button in Right Bottom Corner */}
      <FloatingLocationButton />

      {/* Mobile-First Page Container */}
      <div className="relative z-20 w-full flex flex-col items-center">
        <HeaderNav />
        <main className="w-full">
          <HeroSection />
          <EventDetails />
          <CountdownTimer />
          <LocationSection />
          <ClosingSection />
        </main>
      </div>
    </div>
  );
};

export default App;
