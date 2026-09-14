import React, { useEffect, useRef, useState } from "react";
import { Howl } from "howler";
import { Volume2, VolumeX, Play, Pause, Music } from "lucide-react";

interface AudioPlayerProps {
  autoPlayTrigger: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ autoPlayTrigger }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [isExpanded, setIsExpanded] = useState(false);
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    // Initialize Howl instance with the local audio asset
    const sound = new Howl({
      src: ["/audio/jashn-e-bahara.mp3"],
      html5: true, // Use HTML5 Audio for seamless mobile streaming
      loop: true,
      volume: 0.85,
      preload: true,
      onplay: () => setIsPlaying(true),
      onpause: () => setIsPlaying(false),
      onstop: () => setIsPlaying(false),
      onloaderror: (_id, err) => {
        console.warn("Audio load error:", err);
      },
    });

    soundRef.current = sound;

    return () => {
      sound.unload();
    };
  }, []);

  useEffect(() => {
    if (autoPlayTrigger && soundRef.current) {
      if (!soundRef.current.playing()) {
        soundRef.current.play();
        soundRef.current.fade(0, 0.85, 1800);
      }
    }
  }, [autoPlayTrigger]);

  const togglePlay = () => {
    if (!soundRef.current) return;
    if (isPlaying) {
      soundRef.current.pause();
    } else {
      soundRef.current.play();
    }
  };

  const toggleMute = () => {
    if (!soundRef.current) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundRef.current.mute(nextMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (soundRef.current) {
      soundRef.current.volume(newVol);
      if (newVol === 0) {
        setIsMuted(true);
        soundRef.current.mute(true);
      } else if (isMuted) {
        setIsMuted(false);
        soundRef.current.mute(false);
      }
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
      {/* Expanded control card */}
      {isExpanded && (
        <div className="bg-[#09261D]/90 backdrop-blur-md border border-[#C9A227]/40 rounded-2xl p-3 shadow-2xl text-[#F9F5EC] flex items-center gap-3 animate-fade-in transition-all">
          <div className="flex flex-col">
            <span className="text-[11px] font-sans font-semibold text-[#E8CE7A] uppercase tracking-wider">
              Jashn-e-Bahara
            </span>
            <span className="text-[10px] font-serif italic text-[#F5E8BA]/70">
              Flute rendition
            </span>
          </div>

          {/* Volume slider */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            aria-label="Volume slider"
            className="w-16 h-1.5 bg-[#134837] accent-[#C9A227] rounded-lg cursor-pointer"
          />
        </div>
      )}

      {/* Main Floating Audio Pill */}
      <div className="bg-[#09261D]/90 backdrop-blur-md border border-[#C9A227]/50 rounded-full p-1.5 shadow-[0_8px_25px_rgba(0,0,0,0.35)] flex items-center gap-2 pr-4 transition-all duration-300 hover:border-[#C9A227] hover:shadow-[0_8px_25px_rgba(201,162,39,0.3)]">
        {/* Play/Pause circular button */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause music" : "Play music"}
          className="w-10 h-10 rounded-full bg-gradient-to-r from-[#C9A227] to-[#E8CE7A] text-[#09261D] flex items-center justify-center shadow-md transition-transform hover:scale-105 active:scale-95"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-current" />
          ) : (
            <Play className="w-4 h-4 fill-current ml-0.5" />
          )}
        </button>

        {/* Dancing Equalizer Frequency Bars */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex items-end gap-1 h-5 cursor-pointer px-1 ${
            isPlaying ? "" : "eq-paused opacity-60"
          }`}
          title="Toggle music details"
        >
          <div className="eq-bar" />
          <div className="eq-bar" />
          <div className="eq-bar" />
          <div className="eq-bar" />
          <div className="eq-bar" />
        </div>

        {/* Mute Button */}
        <button
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute sound" : "Mute sound"}
          className="text-[#E8CE7A] hover:text-[#FFF3C4] transition-colors p-1"
        >
          {isMuted || volume === 0 ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </button>

        {/* Small Music Note icon */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[#E8CE7A]/60 hover:text-[#E8CE7A] text-xs transition-colors hidden sm:block"
        >
          <Music className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
