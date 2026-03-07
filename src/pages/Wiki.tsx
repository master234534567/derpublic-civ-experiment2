import { motion } from "framer-motion";
import { BookOpen, Compass, HelpCircle, Scroll, Zap } from "lucide-react";

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const item = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const guides = [
  { icon: Compass, title: "Getting Started", desc: "How to connect, basic rules, and your first steps in the Derpublic world." },
  { icon: Scroll, title: "Roles & Ranks", desc: "Overview of every rank, its permissions, and the path to climb the ladder." },
  { icon: Zap, title: "Commands", desc: "Essential chat and console commands with real examples." },
];

const tutorials = [
  { title: "Beginner Guide", desc: "First-day checklist, recommended settings, and starter tips." },
  { title: "Economy Guide", desc: "How currency works, trading strategies, and safe storage." },
  { title: "Building & PvP", desc: "Best practices, server-specific mechanics, and advanced tactics." },
];

const faqs = [
  { q: "How do I appeal a ban?", a: "Submit a Rank Application or open a ticket with evidence for staff review." },
  { q: "Where are events posted?", a: "Events are announced in #announcements on Discord and on the server website." },
  { q: "Can I suggest features?", a: "Yes — use the Forms page to submit a Feature Request with details." },
];

export default function Wiki() {
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
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-primary/30 bg-primary/5">
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary tracking-wide uppercase">Knowledge Base</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-primary via-orange-400 to-red-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_hsl(45_100%_51%/0.4)]">
              Server Wiki
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Community documentation, guides, and quick references for players and staff.
          </p>
        </motion.div>

        {/* Getting Started Cards */}
        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="text-2xl font-bold mb-6 text-foreground">Getting Started</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {guides.map((g) => (
              <motion.div
                key={g.title}
                variants={item}
                whileHover={{ scale: 1.03, boxShadow: "0 0 30px hsl(45 100% 51% / 0.15)" }}
                className="relative group p-6 rounded-xl border border-border bg-card/60 backdrop-blur-sm overflow-hidden transition-colors hover:border-primary/50"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-orange-500/5" />
                <div className="relative z-10 space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <g.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{g.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{g.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tutorials */}
        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="text-2xl font-bold mb-6 text-foreground">Guides & Tutorials</h2>
          <div className="space-y-4">
            {tutorials.map((t, i) => (
              <motion.div
                key={t.title}
                variants={item}
                whileHover={{ x: 6 }}
                className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card/40 backdrop-blur-sm hover:border-primary/40 transition-all group"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center text-sm font-bold text-primary-foreground shadow-[0_0_12px_hsl(45_100%_51%/0.3)]">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{t.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{t.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-foreground">
            <HelpCircle className="h-6 w-6 text-primary" /> FAQ
          </h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <motion.div
                key={f.q}
                variants={item}
                className="p-5 rounded-xl border border-border bg-card/40 backdrop-blur-sm"
              >
                <h4 className="font-semibold text-foreground">{f.q}</h4>
                <p className="text-sm text-muted-foreground mt-2">{f.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
