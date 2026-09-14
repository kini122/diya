import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import confetti from "canvas-confetti";
import { Send, Heart, Sparkles, MessageCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Blessing {
  id: string;
  name: string;
  relation: string;
  message: string;
  date: string;
}

const INITIAL_BLESSINGS: Blessing[] = [
  {
    id: "1",
    name: "Dr. K. M. Samad & Family",
    relation: "Family Elders",
    message:
      "May Allah bless this union with boundless love, sakinah, and barakah. Congratulations Diya & Shalom!",
    date: "Just now",
  },
  {
    id: "2",
    name: "Faheem & Ayesha",
    relation: "Cousins",
    message:
      "So thrilled for both of you! Counting down the days to celebrate your special day in Oachira.",
    date: "A few hours ago",
  },
  {
    id: "3",
    name: "Rohan & Meera",
    relation: "College Friends",
    message:
      "Wishing you a lifetime filled with laughter, adventures, and endless joy. See you on the 19th!",
    date: "Yesterday",
  },
];

export const BlessingsSection: React.FC = () => {
  const [blessings, setBlessings] = useState<Blessing[]>(INITIAL_BLESSINGS);
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".blessing-reveal", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const triggerGoldConfetti = () => {
    // Luxury gold & emerald sparkle shower
    confetti({
      particleCount: 55,
      spread: 70,
      origin: { y: 0.7 },
      colors: ["#C9A227", "#E8CE7A", "#0F3D2E", "#FFF3C4", "#16533F"],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newBlessing: Blessing = {
      id: Date.now().toString(),
      name: name.trim(),
      relation: relation.trim() || "Guest & Well-wisher",
      message: message.trim(),
      date: "Just now",
    };

    setBlessings([newBlessing, ...blessings]);
    setName("");
    setRelation("");
    setMessage("");
    setIsSubmitted(true);
    triggerGoldConfetti();

    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <section
      ref={containerRef}
      id="blessings"
      className="relative py-20 px-4 sm:px-6 max-w-5xl mx-auto"
    >
      <div className="text-center mb-12">
        <span className="blessing-reveal font-sans text-xs uppercase tracking-[0.3em] text-[#C9A227] font-semibold block mb-2">
          Dua & Well-Wishes
        </span>
        <h2 className="blessing-reveal font-display text-3xl sm:text-4xl md:text-5xl text-[#0F3D2E]">
          Leave Your Blessings
        </h2>
        <p className="blessing-reveal font-serif text-[#2B2620]/80 text-lg mt-2 max-w-lg mx-auto">
          Share your heartfelt prayers and congratulations for the couple.
        </p>
        <div className="blessing-reveal w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#C9A227] to-transparent mx-auto mt-3" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Card */}
        <div className="blessing-reveal lg:col-span-5 stationery-card p-6 sm:p-8">
          <div className="corner-ornament-tl" />
          <div className="corner-ornament-tr" />
          <div className="corner-ornament-bl" />
          <div className="corner-ornament-br" />

          <h3 className="font-display text-2xl text-[#0F3D2E] mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#C9A227]" />
            <span>Send a Blessing</span>
          </h3>

          {isSubmitted && (
            <div className="mb-5 p-3.5 rounded-xl bg-[#0F3D2E]/10 border border-[#C9A227]/60 text-[#0F3D2E] text-xs font-sans flex items-center gap-2 animate-fade-in">
              <Heart className="w-4 h-4 text-[#C9A227] fill-[#C9A227] shrink-0" />
              <span>JazakAllah Khair! Your warm blessing has been shared.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-sans text-sm">
            <div>
              <label className="block text-xs font-semibold text-[#0F3D2E] uppercase tracking-wider mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aysha & Tariq"
                className="w-full px-4 py-2.5 rounded-xl bg-white/80 border border-[#C9A227]/30 text-[#2B2620] placeholder-[#2B2620]/40 focus:outline-none focus:border-[#0F3D2E] focus:ring-1 focus:ring-[#0F3D2E] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0F3D2E] uppercase tracking-wider mb-1">
                Relationship / City (Optional)
              </label>
              <input
                type="text"
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                placeholder="e.g. Friend from Dubai / Kochi"
                className="w-full px-4 py-2.5 rounded-xl bg-white/80 border border-[#C9A227]/30 text-[#2B2620] placeholder-[#2B2620]/40 focus:outline-none focus:border-[#0F3D2E] focus:ring-1 focus:ring-[#0F3D2E] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0F3D2E] uppercase tracking-wider mb-1">
                Your Blessing or Dua *
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="May Allah shower his blessings upon Diya & Shalom..."
                className="w-full px-4 py-2.5 rounded-xl bg-white/80 border border-[#C9A227]/30 text-[#2B2620] placeholder-[#2B2620]/40 focus:outline-none focus:border-[#0F3D2E] focus:ring-1 focus:ring-[#0F3D2E] transition-all resize-none font-serif text-base"
              />
            </div>

            <button
              type="submit"
              className="btn-gold-foil !py-3 w-full mt-2"
            >
              <Send className="w-4 h-4 text-[#09261D]" />
              <span>Send Wishes</span>
            </button>
          </form>
        </div>

        {/* Blessings Stream */}
        <div className="blessing-reveal lg:col-span-7 flex flex-col gap-4 max-h-[480px] overflow-y-auto pr-1">
          <div className="flex items-center justify-between px-2 mb-1">
            <span className="font-sans text-xs uppercase tracking-wider text-[#0F3D2E] font-semibold flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-[#C9A227]" />
              Recent Blessings ({blessings.length})
            </span>
          </div>

          {blessings.map((b) => (
            <div
              key={b.id}
              className="stationery-card p-5 border border-[#C9A227]/25 hover:border-[#C9A227]/50 transition-all text-left"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-display text-lg text-[#0F3D2E] leading-tight">
                    {b.name}
                  </h4>
                  <span className="font-sans text-[11px] text-[#C9A227] font-medium tracking-wide">
                    {b.relation}
                  </span>
                </div>
                <span className="font-sans text-[10px] text-[#2B2620]/50">
                  {b.date}
                </span>
              </div>
              <p className="font-serif text-[#2B2620] text-base leading-relaxed italic">
                "{b.message}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
