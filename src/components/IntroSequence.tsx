import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SkipForward, Volume2, VolumeX } from "lucide-react";
import introLogo from "@/assets/intro-logo.mp4";
import introCharacters from "@/assets/intro-characters.mp4";
import introWorld from "@/assets/intro-world.mp4";

interface IntroSequenceProps {
  onComplete: () => void;
}

const textSequences = [
  { text: "", duration: 2500, video: 0, speak: "" },
  { text: "In a world of blocks...", duration: 3500, video: 0, speak: "In a world of blocks..." },
  { text: "Where legends are forged...", duration: 3500, video: 0, speak: "Where legends are forged..." },
  { text: "", duration: 1500, video: 1, speak: "" },
  { text: "Welcome to the", duration: 3000, video: 1, size: "text-3xl md:text-5xl", speak: "Welcome to the..." },
  { text: "EPIC SERVER", duration: 3500, video: 1, size: "text-5xl md:text-8xl", glow: true, speak: "EPIC SERVER!" },
  { text: "DURPUBLIC", duration: 4500, video: 1, size: "text-6xl md:text-9xl", rainbow: true, speak: "DURPUBLIC!" },
  { text: "", duration: 1500, video: 2, speak: "" },
  { text: "A Civilization Experiment", duration: 3500, video: 2, size: "text-3xl md:text-5xl", speak: "A Civilization Experiment." },
  { text: "Build. Conquer. Thrive.", duration: 3500, video: 2, glow: true, speak: "Build. Conquer. Thrive." },
  { text: "Form alliances...", duration: 3000, video: 2, speak: "Form alliances." },
  { text: "Wage wars...", duration: 3000, video: 2, speak: "Wage wars." },
  { text: "Write history...", duration: 3000, video: 2, speak: "Write history." },
  { text: "", duration: 1000, video: 2, speak: "" },
  { text: "Created by", duration: 2500, video: 2, size: "text-xl md:text-2xl", speak: "Created by" },
  { text: "Derpamine", duration: 3500, video: 2, rainbow: true, size: "text-4xl md:text-6xl", speak: "Derpamine!" },
  { text: "& the Derpublic Community", duration: 3500, video: 2, speak: "and the Derpublic Community." },
  { text: "", duration: 1500, video: 2, speak: "" },
  { text: "Are you ready?", duration: 3500, video: 2, size: "text-4xl md:text-7xl", glow: true, speak: "Are you ready?" },
  { text: "Join Now", duration: 3500, video: 2, size: "text-5xl md:text-8xl", glow: true, speak: "Join Now!" },
  { text: "durpublic.net", duration: 4500, video: 2, size: "text-3xl md:text-5xl", sub: "The adventure awaits...", speak: "durpublic dot net. The adventure awaits." },
];

const videos = [introLogo, introCharacters, introWorld];

const IntroSequence = ({ onComplete }: IntroSequenceProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [muted, setMuted] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([null, null, null]);
  const [activeVideo, setActiveVideo] = useState(0);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  // Initialize speech synthesis and pick a deep male voice
  useEffect(() => {
    synthRef.current = window.speechSynthesis;

    const pickVoice = () => {
      const voices = synthRef.current?.getVoices() || [];
      // Prefer a deep/dramatic male English voice
      const preferred = voices.find(
        (v) => v.lang.startsWith("en") && /male|david|daniel|james|google uk male/i.test(v.name)
      );
      voiceRef.current = preferred || voices.find((v) => v.lang.startsWith("en")) || voices[0] || null;
    };

    pickVoice();
    speechSynthesis.onvoiceschanged = pickVoice;

    // Auto-play first video immediately
    videoRefs.current[0]?.play().catch(() => {});

    return () => {
      synthRef.current?.cancel();
    };
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (!text || muted || !synthRef.current) return;
      synthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      utterance.pitch = 0.8;
      utterance.volume = 1;
      if (voiceRef.current) utterance.voice = voiceRef.current;
      synthRef.current.speak(utterance);
    },
    [muted]
  );

  useEffect(() => {
    const seq = textSequences[currentIndex];
    if (!seq) {
      onComplete();
      return;
    }

    // Switch video if needed
    if (seq.video !== activeVideo) {
      setActiveVideo(seq.video);
      videoRefs.current[seq.video]?.play().catch(() => {});
    }

    // Speak text
    if (seq.speak) speak(seq.speak);

    const timer = setTimeout(() => {
      if (currentIndex < textSequences.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        onComplete();
      }
    }, seq.duration);

    return () => clearTimeout(timer);
  }, [currentIndex, activeVideo, speak, onComplete]);

  const handleSkip = () => {
    synthRef.current?.cancel();
    onComplete();
  };

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    if (next) synthRef.current?.cancel();
    videoRefs.current.forEach((v) => {
      if (v) v.muted = next;
    });
  };

  // Progress
  const totalDuration = textSequences.reduce((s, t) => s + t.duration, 0);
  const elapsed = textSequences.slice(0, currentIndex).reduce((s, t) => s + t.duration, 0);
  const progress = (elapsed / totalDuration) * 100;

  const seq = textSequences[currentIndex];

  return (
    <div className="fixed inset-0 z-[100] bg-black overflow-hidden">
      {/* Video layers */}
      {videos.map((src, i) => (
        <video
          key={i}
          ref={(el) => {
            videoRefs.current[i] = el;
          }}
          src={src}
          muted={muted}
          playsInline
          loop
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            activeVideo === i ? "opacity-60" : "opacity-0"
          }`}
        />
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Vignette */}
      <div className="absolute inset-0" style={{ boxShadow: "inset 0 0 150px 60px rgba(0,0,0,0.8)" }} />

      {/* Text content */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <AnimatePresence mode="wait">
          {seq?.text && (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 40, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.85 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-center space-y-4"
            >
              <h1
                className={`font-black tracking-tight leading-tight ${
                  seq.size || "text-4xl md:text-6xl"
                } ${
                  seq.rainbow
                    ? "animate-rainbow bg-[length:200%_auto] bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-yellow-400 via-green-400 via-blue-500 via-purple-500 to-red-500"
                    : "text-white"
                } ${
                  seq.glow ? "drop-shadow-[0_0_60px_hsl(45,100%,51%,0.7)] text-primary" : "drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
                }`}
              >
                {seq.text}
              </h1>
              {seq.sub && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg md:text-xl text-white/60 font-light tracking-wide"
                >
                  {seq.sub}
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 left-0 right-0 px-8 space-y-4">
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="flex items-center justify-between">
          <button onClick={toggleMute} className="text-white/50 hover:text-white transition-colors">
            {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
          <button
            onClick={handleSkip}
            className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
          >
            Skip Intro <SkipForward className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntroSequence;
