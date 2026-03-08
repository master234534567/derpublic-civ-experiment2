import { motion } from "framer-motion";
import { Gamepad2 } from "lucide-react";
import { MemoryMatch, TicTacToe, SimonSays, PatternMatch } from "@/components/games/PuzzleGames";
import { ReactionTimer, MathBlitz, ColorGuesser, TypingSpeed } from "@/components/games/SpeedGames";
import { RockPaperScissors, CoinFlipStreak, NumberMemory, WordScramble, SpeedClick, DiceRoller } from "@/components/games/CasualGames";

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const games = [
  { Component: MemoryMatch, category: "Puzzle" },
  { Component: TicTacToe, category: "Puzzle" },
  { Component: SimonSays, category: "Puzzle" },
  { Component: PatternMatch, category: "Puzzle" },
  { Component: ReactionTimer, category: "Speed" },
  { Component: MathBlitz, category: "Speed" },
  { Component: ColorGuesser, category: "Speed" },
  { Component: TypingSpeed, category: "Speed" },
  { Component: RockPaperScissors, category: "Casual" },
  { Component: CoinFlipStreak, category: "Casual" },
  { Component: NumberMemory, category: "Casual" },
  { Component: WordScramble, category: "Casual" },
  { Component: SpeedClick, category: "Casual" },
  { Component: DiceRoller, category: "Casual" },
];

export default function ExtraMiniGames() {
  return (
    <div className="min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-accent/30 bg-accent/5">
            <Gamepad2 className="h-5 w-5 text-accent" />
            <span className="text-sm font-medium text-accent tracking-wide uppercase">Activities</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-accent via-primary to-orange-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_hsl(120_50%_45%/0.4)]">
              Extra Mini Games
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            14 playable games right here in your browser. Compete, have fun, and challenge yourself!
          </p>
        </motion.div>

        {/* Games Grid */}
        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {games.map(({ Component }, i) => (
            <motion.div key={i} variants={item}>
              <Component />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
