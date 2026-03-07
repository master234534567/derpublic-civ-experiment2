import { motion } from "framer-motion";
import { Ticket, Clock, CheckCircle2, AlertCircle, MessageSquare } from "lucide-react";

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } };

const ticketTypes = [
  { icon: AlertCircle, title: "General Support", desc: "Questions about the server, accounts, or anything else.", color: "from-primary to-orange-500" },
  { icon: MessageSquare, title: "Player Report", desc: "Report rule-breaking behavior with evidence.", color: "from-red-500 to-orange-500" },
  { icon: CheckCircle2, title: "Ban Appeal", desc: "Appeal a ban with your case and supporting evidence.", color: "from-secondary to-primary" },
];

const steps = [
  { step: "Open a Ticket", desc: "Use /ticket create <message> in-game or open a ticket on Discord." },
  { step: "Describe Your Issue", desc: "Provide all relevant details — IGN, time, evidence, and context." },
  { step: "Wait for Response", desc: "Staff will respond within 24–48 hours. Check your ticket status." },
  { step: "Resolution", desc: "Once resolved, the ticket is closed. You'll be notified of the outcome." },
];

export default function Tickets() {
  return (
    <div className="min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-secondary/30 bg-secondary/5">
            <Ticket className="h-5 w-5 text-secondary" />
            <span className="text-sm font-medium text-secondary tracking-wide uppercase">Support</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-secondary via-primary to-orange-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_hsl(220_70%_50%/0.4)]">
              Tickets
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Need help? Open a support ticket and our staff team will assist you.
          </p>
        </motion.div>

        {/* Ticket Types */}
        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-3 gap-5">
          {ticketTypes.map((t) => (
            <motion.div key={t.title} variants={item} whileHover={{ scale: 1.03, boxShadow: "0 0 28px hsl(220 70% 50% / 0.12)" }} className="relative group p-6 rounded-xl border border-border bg-card/60 backdrop-blur-sm overflow-hidden hover:border-secondary/40 transition-all">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5" />
              <div className="relative z-10 space-y-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${t.color} flex items-center justify-center shadow-[0_0_14px_hsl(220_70%_50%/0.2)]`}>
                  <t.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{t.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Process */}
        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
            <Clock className="h-6 w-6 text-primary" /> Ticket Process
          </h2>
          <div className="space-y-4">
            {steps.map((s, i) => (
              <motion.div key={s.step} variants={item} whileHover={{ x: 6 }} className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card/40 backdrop-blur-sm hover:border-secondary/30 transition-all">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-sm font-bold text-primary-foreground shadow-[0_0_10px_hsl(220_70%_50%/0.25)]">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-foreground">{s.step}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Note */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="p-6 rounded-xl border border-border bg-card/30 backdrop-blur-sm">
          <p className="text-sm text-muted-foreground italic leading-relaxed">
            Please be patient and respectful when communicating with staff. False reports or spam tickets may result in penalties. All ticket conversations are logged.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
