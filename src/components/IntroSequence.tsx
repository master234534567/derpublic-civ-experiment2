import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, SkipForward } from "lucide-react";
import introLogo from "@/assets/intro-logo.mp4";
import introCharacters from "@/assets/intro-characters.mp4";

interface IntroSequenceProps {
  onComplete: () => void;
}

const textSequences = [
  { text: "", duration: 2000, video: 0 },
  { text: "In a world of blocks...", duration: 3000, video: 0 },
  { text: "Where legends are forged...", duration: 3000, video: 0 },
  { text: "", duration: 1500, video: 1 },
  { text: "Welcome to the", duration: 2500, video: 1, size: "text-3xl md:text-5xl" },
  { text: "EPIC SERVER", duration: 3000, video: 1, size: "text-5xl md:text-8xl", glow: true },
  { text: "DURPUBLIC", duration: 4000, video: 1, size: "text-6xl md:text-9xl", rainbow: true },
  { text: "", duration: 1500, video: 1 },
  { text: "A Community of Players", duration: 3000, video: 1, size: "text-3xl md:text-5xl" },
  { text: "Build. Connect. Grow.", duration: 3000, video: 1, glow: true },
  { text: "Make friends...", duration: 2500, video: 1 },
  { text: "Share stories...", duration: 2500, video: 1 },
  { text: "Create memories...", duration: 2500, video: 1 },
  { text: "", duration: 1000, video: 1 },
  { text: "Created by", duration: 2000, video: 1, size: "text-xl md:text-2xl" },
  { text: "Derpamine", duration: 3000, video: 1, rainbow: true, size: "text-4xl md:text-6xl" },
  { text: "& the Derpublic Community", duration: 3000, video: 1 },
  { text: "", duration: 1500, video: 1 },
  { text: "Are you ready?", duration: 3000, video: 1, size: "text-4xl md:text-7xl", glow: true },
  { text: "Join Now", duration: 3000, video: 1, size: "text-5xl md:text-8xl", glow: true },
  { text: "durpublic.net", duration: 4000, video: 1, size: "text-3xl md:text-5xl", sub: "The adventure awaits..." },
];

const videos = [introLogo, introCharacters];

const IntroSequence = ({ onComplete }: IntroSequenceProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([null, null]);
  const [activeVideo, setActiveVideo] = useState(0);

  useEffect(() => {
    if (!started) return;

    const seq = textSequences[currentIndex];
    if (!seq) { onComplete(); return; }

    if (seq.video !== activeVideo) {
      setActiveVideo(seq.video);
      videoRefs.current[seq.video]?.play();
    }

    const timer = setTimeout(() => {
      if (currentIndex < textSequences.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        onComplete();
      }
    }, seq.duration);

    return () => clearTimeout(timer);
  }, [currentIndex, started]);

  const handleStart = () => {
    setStarted(true);
    videoRefs.current[0]?.play();
  };

  const totalDuration = textSequences.reduce((s, t) => s + t.duration, 0);
  const elapsed = textSequences.slice(0, currentIndex).reduce((s, t) => s + t.duration, 0);
  const progress = (elapsed / totalDuration) * 100;

  if (!started) {
    return (
      <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStart}
          className="flex flex-col items-center gap-4 text-white"
        >
          <div className="w-24 h-24 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
            <Play className="h-10 w-10 text-primary ml-1" />
          </div>
          <span className="text-xl font-bold tracking-widest uppercase text-primary">Play Intro</span>
        </motion.button>
      </div>
    );
  }

  const seq = textSequences[currentIndex];

  return (
    <div className="fixed inset-0 z-[100] bg-black overflow-hidden">
      {videos.map((src, i) => (
        <video
          key={i}
          ref={(el) => { videoRefs.current[i] = el; }}
          src={src}
          muted
          playsInline
          loop
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${activeVideo === i ? "opacity-60" : "opacity-0"}`}
        />
      ))}

      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute inset-0 flex items-center justify-center p-8">
        <AnimatePresence mode="wait">
          {seq?.text && (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.9 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
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
                  seq.glow
                    ? "drop-shadow-[0_0_40px_hsl(45,100%,51%,0.6)] text-primary"
                    : ""
                }`}
              >
                {seq.text}
              </h1>
              {seq.sub && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg md:text-xl text-white/60 font-light tracking-wide"
                >
                  {seq.sub}
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 left-0 right-0 px-8 space-y-4">
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="flex items-center justify-end">
          <button
            onClick={onComplete}
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
