import { motion } from "framer-motion";
import { Star, MessageSquare, ThumbsUp, Quote } from "lucide-react";

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } };

const reviews = [
  { name: "BlockMaster_99", rank: "Veteran", stars: 5, text: "Best civilization experiment server I've ever played on. The community is amazing and events are always exciting!", date: "2 weeks ago" },
  { name: "CraftQueen", rank: "Elite", stars: 5, text: "Love the economy system and nation building. Staff are responsive and the server runs smooth. 10/10 would recommend.", date: "1 month ago" },
  { name: "ShadowPvP", rank: "Citizen", stars: 4, text: "Great PvP balance and the duel arena is addictive. Only wish there were more mini-games. Still an amazing server though!", date: "1 month ago" },
  { name: "BuilderSteve", rank: "Veteran", stars: 5, text: "The building community here is incredible. Showcases and build battles keep me coming back every day.", date: "3 weeks ago" },
  { name: "NoobSlayer42", rank: "Citizen", stars: 4, text: "Joined a week ago and already feel at home. The beginner guide on the wiki helped a ton. Friendly players everywhere.", date: "5 days ago" },
  { name: "RedstoneWiz", rank: "Elite", stars: 5, text: "As a redstone enthusiast, this server gives me the freedom to build complex contraptions. No unnecessary restrictions. Perfect.", date: "2 months ago" },
];

const stats = [
  { label: "Average Rating", value: "4.8 / 5", icon: Star },
  { label: "Total Reviews", value: "127+", icon: MessageSquare },
  { label: "Positive", value: "96%", icon: ThumbsUp },
];

export default function Reviews() {
  return (
    <div className="min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-primary/30 bg-primary/5">
            <Star className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary tracking-wide uppercase">Community</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-primary via-orange-400 to-red-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_hsl(45_100%_51%/0.4)]">
              Player Reviews
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what players are saying about the Derpublic Civilization Experiment.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-3 gap-5">
          {stats.map((s) => (
            <motion.div key={s.label} variants={item} className="text-center p-6 rounded-xl border border-border bg-card/60 backdrop-blur-sm">
              <s.icon className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-black text-foreground">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Reviews Grid */}
        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid sm:grid-cols-2 gap-5">
          {reviews.map((r) => (
            <motion.div key={r.name} variants={item} whileHover={{ scale: 1.02, boxShadow: "0 0 24px hsl(45 100% 51% / 0.1)" }} className="relative group p-6 rounded-xl border border-border bg-card/60 backdrop-blur-sm overflow-hidden hover:border-primary/40 transition-all">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-orange-500/5" />
              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-foreground">{r.name}</h3>
                    <span className="text-xs text-primary font-medium">{r.rank}</span>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < r.stars ? "text-primary fill-primary" : "text-muted-foreground/30"}`} />
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Quote className="h-4 w-4 text-primary/40 shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground leading-relaxed italic">{r.text}</p>
                </div>
                <p className="text-xs text-muted-foreground/60">{r.date}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
