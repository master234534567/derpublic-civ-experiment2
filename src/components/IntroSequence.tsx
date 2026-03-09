import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, SkipForward, Volume2, VolumeX, Copy } from "lucide-react";
import { toast } from "sonner";
import introLogo from "@/assets/intro-logo.mp4";
import introCharacters from "@/assets/intro-characters.mp4";

interface IntroSequenceProps {
  onComplete: () => void;
}

const textSequences = [
  // ACT 1 — Cold Open (Logo)
  { text: "", duration: 3000, video: 0 },
  { text: "Every story has a beginning...", duration: 3500, video: 0, size: "text-2xl md:text-4xl" },
  { text: "Every legend starts with a single step...", duration: 3500, video: 0, size: "text-2xl md:text-4xl" },
  { text: "This is ours.", duration: 3000, video: 0, size: "text-3xl md:text-5xl" },
  { text: "", duration: 2000, video: 0 },

  // ACT 2 — The Reveal (Characters)
  { text: "", duration: 2000, video: 1 },
  { text: "Welcome to", duration: 2500, video: 1, size: "text-3xl md:text-5xl" },
  { text: "DURPUBLIC", duration: 5000, video: 1, size: "text-6xl md:text-9xl", rainbow: true },
  { text: "More than a server.", duration: 3000, video: 1, size: "text-2xl md:text-4xl" },
  { text: "A home.", duration: 3000, video: 1, size: "text-4xl md:text-6xl" },
  { text: "", duration: 1500, video: 1 },

  // ACT 3 — Community (Characters)
  { text: "Built by players.", duration: 3000, video: 1, size: "text-3xl md:text-5xl" },
  { text: "For players.", duration: 2500, video: 1, size: "text-3xl md:text-5xl" },
  { text: "", duration: 1000, video: 1 },
  { text: "Real people.", duration: 2500, video: 1 },
  { text: "Real friendships.", duration: 2500, video: 1 },
  { text: "Real memories.", duration: 2500, video: 1 },
  { text: "That last a lifetime.", duration: 3000, video: 1, size: "text-2xl md:text-4xl" },
  { text: "", duration: 2000, video: 1 },

  // ACT 4 — The World
  { text: "A civilization experiment.", duration: 3500, video: 0, size: "text-3xl md:text-5xl" },
  { text: "Nations rise.", duration: 2500, video: 0 },
  { text: "Empires fall.", duration: 2500, video: 0 },
  { text: "And through it all...", duration: 3000, video: 0, size: "text-2xl md:text-4xl" },
  { text: "The community stands.", duration: 3000, video: 0, size: "text-3xl md:text-5xl" },
  { text: "", duration: 2000, video: 0 },

  // ACT 5 — Events Announcement
  { text: "And now...", duration: 2500, video: 1, size: "text-3xl md:text-5xl" },
  { text: "DURPUBLIC PRESENTS", duration: 3500, video: 1, size: "text-3xl md:text-5xl" },
  { text: "LIVE EVENTS", duration: 4000, video: 1, size: "text-5xl md:text-8xl", rainbow: true },
  { text: "Tournaments every week.", duration: 3000, video: 1, size: "text-2xl md:text-4xl" },
  { text: "Build battles that push your creativity.", duration: 3500, video: 1, size: "text-xl md:text-3xl" },
  { text: "Community nights where everyone belongs.", duration: 3500, video: 1, size: "text-xl md:text-3xl" },
  { text: "PvP arenas where legends are born.", duration: 3000, video: 1, size: "text-xl md:text-3xl" },
  { text: "", duration: 1000, video: 1 },
  { text: "Prizes. Glory. Bragging rights.", duration: 3000, video: 1, size: "text-2xl md:text-4xl" },
  { text: "Show up. Compete. Win.", duration: 3000, video: 1, size: "text-3xl md:text-5xl" },
  { text: "", duration: 2000, video: 1 },

  // ACT 6 — MrWinStreak Appreciation
  { text: "But none of this would exist...", duration: 3500, video: 0, size: "text-2xl md:text-4xl" },
  { text: "without the people who gave everything.", duration: 3500, video: 0, size: "text-2xl md:text-4xl" },
  { text: "", duration: 2000, video: 0 },
  { text: "A special thank you to", duration: 2500, video: 1, size: "text-xl md:text-2xl" },
  { text: "MrWinStreak", duration: 5500, video: 1, rainbow: true, size: "text-5xl md:text-8xl" },
  { text: "The backbone of Derpublic.", duration: 3500, video: 1, size: "text-2xl md:text-4xl" },
  { text: "Countless hours spent building.", duration: 3000, video: 1, size: "text-xl md:text-3xl" },
  { text: "Countless hours spent helping.", duration: 3000, video: 1, size: "text-xl md:text-3xl" },
  { text: "Countless hours spent believing.", duration: 3000, video: 1, size: "text-xl md:text-3xl" },
  { text: "", duration: 1500, video: 1 },
  { text: "When things got hard, you stayed.", duration: 3500, video: 1, size: "text-2xl md:text-4xl" },
  { text: "When others left, you built more.", duration: 3500, video: 1, size: "text-2xl md:text-4xl" },
  { text: "You turned a dream into reality.", duration: 3500, video: 1, size: "text-2xl md:text-4xl" },
  { text: "", duration: 1500, video: 1 },
  { text: "This server exists because of you.", duration: 4000, video: 1, size: "text-2xl md:text-4xl" },
  { text: "Thank you, MrWinStreak.", duration: 5000, video: 1, size: "text-3xl md:text-5xl", sub: "From the entire Derpublic community" },
  { text: "", duration: 2500, video: 1 },

  // ACT 7 — The Founders
  { text: "Created by", duration: 2500, video: 0, size: "text-xl md:text-2xl" },
  { text: "Derpamine", duration: 4000, video: 0, rainbow: true, size: "text-4xl md:text-6xl" },
  { text: "& the entire Derpublic family", duration: 3500, video: 0, size: "text-2xl md:text-4xl" },
  { text: "", duration: 2500, video: 0 },

  // ACT 8 — The Call
  { text: "So the question is...", duration: 3000, video: 1, size: "text-2xl md:text-4xl" },
  { text: "Are you ready?", duration: 4000, video: 1, size: "text-4xl md:text-7xl" },
  { text: "", duration: 2000, video: 1 },
  { text: "JOIN NOW", duration: 4000, video: 1, size: "text-5xl md:text-8xl", rainbow: true },
  { text: "durpublic.net", duration: 6000, video: 1, size: "text-3xl md:text-5xl", sub: "Your story starts here." },
];

const videos = [introLogo, introCharacters];

const IntroSequence = ({ onComplete }: IntroSequenceProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([null, null]);
  const [activeVideo, setActiveVideo] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [musicLoading, setMusicLoading] = useState(false);
  const [musicMuted, setMusicMuted] = useState(false);

  // Generate and play background music
  const loadBackgroundMusic = async () => {
    setMusicLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-music`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            prompt: "Epic cinematic orchestral music with heavy drums and powerful bass, building intensity like Believer by Imagine Dragons. Dark, driving, percussive beat with soaring strings and choir. Emotional and triumphant. Perfect for a dramatic movie trailer or gaming montage.",
            duration: 180,
          }),
        }
      );

      if (!response.ok) {
        console.error("Music generation failed:", response.status);
        return;
      }

      const data = await response.json();
      if (data.audioContent) {
        const audioUrl = `data:audio/mpeg;base64,${data.audioContent}`;
        const audio = new Audio(audioUrl);
        audio.loop = true;
        audio.volume = 0.4;
        audioRef.current = audio;
        await audio.play();
      }
    } catch (err) {
      console.error("Failed to load background music:", err);
    } finally {
      setMusicLoading(false);
    }
  };

  useEffect(() => {
    if (!started) return;

    const seq = textSequences[currentIndex];
    if (!seq) { 
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      onComplete(); 
      return; 
    }

    if (seq.video !== activeVideo) {
      setActiveVideo(seq.video);
      videoRefs.current[seq.video]?.play();
    }

    const timer = setTimeout(() => {
      if (currentIndex < textSequences.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
        onComplete();
      }
    }, seq.duration);

    return () => clearTimeout(timer);
  }, [currentIndex, started]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleStart = () => {
    setStarted(true);
    videoRefs.current[0]?.play();
    loadBackgroundMusic();
  };

  const handleSkip = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    onComplete();
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setMusicMuted(!musicMuted);
    }
  };

  const copyServerIP = () => {
    navigator.clipboard.writeText("durpublic.net");
    toast.success("Server IP copied!", { description: "durpublic.net — see you in-game!" });
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
          <span className="text-xs text-white/40 mt-2">Best with sound on</span>
        </motion.button>
      </div>
    );
  }

  const seq = textSequences[currentIndex];
  const isLastSlide = currentIndex === textSequences.length - 1;

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

      {/* Cinematic letterbox bars */}
      <div className="absolute top-0 left-0 right-0 h-[8%] bg-gradient-to-b from-black to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-[8%] bg-gradient-to-t from-black to-transparent z-10" />

      <div className="absolute inset-0 flex items-center justify-center p-8 z-20">
        <AnimatePresence mode="wait">
          {seq?.text && (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.9 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center space-y-4 max-w-4xl"
            >
              <h1
                className={`font-black tracking-tight leading-tight ${
                  seq.size || "text-4xl md:text-6xl"
                } ${
                  seq.rainbow
                    ? "animate-rainbow bg-[length:200%_auto] bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-yellow-400 via-green-400 via-blue-500 via-purple-500 to-red-500"
                    : "text-white"
                }`}
              >
                {seq.text}
              </h1>
              {seq.sub && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg md:text-xl text-white/50 font-light tracking-wide italic"
                >
                  {seq.sub}
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Copy IP button on last slide */}
      {isLastSlide && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="absolute bottom-28 left-0 right-0 flex justify-center z-20"
        >
          <button
            onClick={copyServerIP}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary/20 border border-primary/50 text-primary hover:bg-primary/30 transition-colors text-sm font-semibold"
          >
            <Copy className="h-4 w-4" /> Copy Server IP
          </button>
        </motion.div>
      )}

      <div className="absolute bottom-8 left-0 right-0 px-8 space-y-4 z-20">
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={toggleMute}
            className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
          >
            {musicMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            {musicLoading ? "Loading music..." : musicMuted ? "Unmute" : "Music"}
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
