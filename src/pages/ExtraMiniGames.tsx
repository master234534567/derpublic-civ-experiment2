import { motion } from "framer-motion";
import { Gamepad2, Crosshair, Brain, Mountain, Trophy, Sparkles } from "lucide-react";

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const item = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const games = [
  { icon: Brain, title: "Trivia", desc: "Quick question rounds with points. Test your Minecraft and Derpublic knowledge.", color: "from-purple-500 to-secondary" },
  { icon: Mountain, title: "Parkour Challenge", desc: "Timed obstacle runs through increasingly difficult courses. Leaderboard tracked.", color: "from-accent to-emerald-400" },
  { icon: Crosshair, title: "Duel Arena", desc: "1v1 PvP matches with Elo-based ranking. Climb the ladder and prove your skill.", color: "from-red-500 to-orange-500" },
  { icon: Sparkles, title: "Build Battle", desc: "Compete to build the best creation in a limited time. Community votes decide the winner.", color: "from-primary to-orange-400" },
];

const steps = [
  "Type the join command in chat (e.g. /join trivia)",
  "Wait in the lobby until the round starts",
  "Winners receive rewards and leaderboard points",
];

export default function ExtraMiniGames() {
  return (
    <div className="min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
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
            Small, repeatable activities to enjoy between sessions. Compete, earn rewards, and climb the leaderboard.
          </p>
        </motion.div>

        {/* Games Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 gap-5"
        >
          {games.map((g) => (
            <motion.div
              key={g.title}
              variants={item}
              whileHover={{ scale: 1.03, boxShadow: "0 0 28px hsl(120 50% 45% / 0.1)" }}
              className="relative group p-6 rounded-xl border border-border bg-card/60 backdrop-blur-sm overflow-hidden hover:border-accent/40 transition-all"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />
              <div className="relative z-10 space-y-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${g.color} flex items-center justify-center shadow-[0_0_14px_hsl(120_50%_45%/0.2)]`}>
                  <g.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{g.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{g.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* How to Join */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="p-6 rounded-xl border border-border bg-card/30 backdrop-blur-sm space-y-5"
        >
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" /> How to Join
          </h2>
          <div className="space-y-3">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-xs font-bold text-primary-foreground shadow-[0_0_10px_hsl(120_50%_45%/0.25)]">
                  {i + 1}
                </span>
                <span className="text-sm text-muted-foreground">{s}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Submit */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center p-8 rounded-xl border border-dashed border-primary/30 bg-primary/5"
        >
          <h3 className="text-lg font-bold text-foreground mb-2">Want to add a game?</h3>
          <p className="text-sm text-muted-foreground">
            Use the Feature Request form on the Forms page with your game rules and mechanics.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
