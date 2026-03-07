import { motion } from "framer-motion";
import { BookOpen, Compass, HelpCircle, Scroll, Zap, Coins, Sword, Map, Shield, Wrench, Users } from "lucide-react";

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const guides = [
  { icon: Compass, title: "Getting Started", desc: "How to connect, basic rules, and your first steps in the Derpublic world." },
  { icon: Scroll, title: "Roles & Ranks", desc: "Overview of every rank, its permissions, and the path to climb the ladder." },
  { icon: Zap, title: "Commands", desc: "Essential chat and console commands with real examples." },
  { icon: Map, title: "Server Map", desc: "How to navigate the world, claim land, and find key locations." },
];

const commands = [
  { cmd: "/spawn", desc: "Teleport back to the main spawn point." },
  { cmd: "/tpa <player>", desc: "Send a teleport request to another player." },
  { cmd: "/home", desc: "Teleport to your set home location." },
  { cmd: "/sethome", desc: "Set your current location as home." },
  { cmd: "/bal", desc: "Check your current balance." },
  { cmd: "/pay <player> <amount>", desc: "Send money to another player." },
  { cmd: "/msg <player> <message>", desc: "Send a private message." },
  { cmd: "/ticket create <message>", desc: "Open a support ticket with staff." },
];

const ranks = [
  { name: "Newcomer", color: "text-muted-foreground", perks: "Basic chat, /spawn, /home (1 home)" },
  { name: "Citizen", color: "text-accent", perks: "2 homes, access to /auction, colored chat" },
  { name: "Veteran", color: "text-secondary", perks: "3 homes, /nick, priority queue, /fly in hub" },
  { name: "Elite", color: "text-primary", perks: "5 homes, /hat, particle effects, special tag" },
  { name: "Staff", color: "text-red-400", perks: "Moderation tools, /vanish, /ban, /mute, /kick" },
];

const tutorials = [
  { icon: Shield, title: "Beginner Guide", desc: "First-day checklist: set your spawn, read rules, claim your first plot, and get starter gear. Recommended video settings and OptiFine tips included." },
  { icon: Coins, title: "Economy Guide", desc: "Currency is earned through jobs, trading, and events. Use /auction to sell items, /shop to buy essentials. Banks offer interest on savings over 1,000 coins." },
  { icon: Sword, title: "Building & PvP", desc: "Build in claimed territory to stay protected. PvP is enabled in the Warzone and Duel Arena. Use /duel to challenge players. Enchant limits apply in ranked matches." },
  { icon: Users, title: "Nations & Alliances", desc: "Form nations with other players, claim territory, establish trade routes, and participate in civilization events. Nation leaders can set taxes and manage roles." },
  { icon: Wrench, title: "Mods & Resource Packs", desc: "Approved mods include OptiFine, Simple Voice Chat, and Replay Mod. Custom resource packs are auto-downloaded on join. Unapproved mods may trigger anti-cheat." },
];

const faqs = [
  { q: "How do I appeal a ban?", a: "Submit a Rank Application or open a ticket with evidence for staff review. Include your IGN, ban reason, and why you should be unbanned." },
  { q: "Where are events posted?", a: "Events are announced in #announcements on Discord and on the server website. Major events have a 1-week notice period." },
  { q: "Can I suggest features?", a: "Yes — use the Forms page to submit a Feature Request with details about your idea and how it benefits the community." },
  { q: "How do I earn money?", a: "Take on jobs with /jobs, sell items on /auction, participate in events, or trade directly with other players." },
  { q: "What mods are allowed?", a: "OptiFine, Simple Voice Chat, and Replay Mod are approved. Anything that gives unfair advantages (X-ray, fly hacks) is banned." },
  { q: "How do I claim land?", a: "Use a golden shovel to select corners of your claim area. You earn more claim blocks by playing. Type /claimslist to see your claims." },
];

export default function Wiki() {
  return (
    <div className="min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center space-y-4">
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
            Everything you need to know about the Derpublic Civilization Experiment — guides, commands, ranks, and more.
          </p>
        </motion.div>

        {/* Getting Started */}
        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="text-2xl font-bold mb-6 text-foreground">Getting Started</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {guides.map((g) => (
              <motion.div key={g.title} variants={item} whileHover={{ scale: 1.03, boxShadow: "0 0 30px hsl(45 100% 51% / 0.15)" }} className="relative group p-6 rounded-xl border border-border bg-card/60 backdrop-blur-sm overflow-hidden transition-colors hover:border-primary/50">
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

        {/* Commands Reference */}
        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" /> Commands Reference
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {commands.map((c) => (
              <motion.div key={c.cmd} variants={item} className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card/40 backdrop-blur-sm">
                <code className="text-primary font-mono text-sm bg-primary/10 px-2 py-1 rounded shrink-0">{c.cmd}</code>
                <span className="text-sm text-muted-foreground">{c.desc}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Ranks */}
        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
            <Scroll className="h-6 w-6 text-primary" /> Rank Progression
          </h2>
          <div className="space-y-3">
            {ranks.map((r, i) => (
              <motion.div key={r.name} variants={item} whileHover={{ x: 6 }} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card/40 backdrop-blur-sm hover:border-primary/30 transition-all">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center text-xs font-bold text-primary-foreground shadow-[0_0_10px_hsl(45_100%_51%/0.25)]">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <h3 className={`font-bold ${r.color}`}>{r.name}</h3>
                  <p className="text-sm text-muted-foreground">{r.perks}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Guides & Tutorials */}
        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="text-2xl font-bold mb-6 text-foreground">Guides & Tutorials</h2>
          <div className="space-y-4">
            {tutorials.map((t, i) => (
              <motion.div key={t.title} variants={item} whileHover={{ x: 6 }} className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card/40 backdrop-blur-sm hover:border-primary/40 transition-all group">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center shadow-[0_0_12px_hsl(45_100%_51%/0.2)]">
                  <t.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{t.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{t.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-foreground">
            <HelpCircle className="h-6 w-6 text-primary" /> Frequently Asked Questions
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {faqs.map((f) => (
              <motion.div key={f.q} variants={item} className="p-5 rounded-xl border border-border bg-card/40 backdrop-blur-sm">
                <h4 className="font-semibold text-foreground">{f.q}</h4>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{f.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
