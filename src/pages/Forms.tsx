import { motion } from "framer-motion";
import { FileText, Bug, Lightbulb, AlertCircle, Send } from "lucide-react";

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } };

const formTypes = [
  {
    icon: AlertCircle,
    title: "Report a Player",
    color: "from-red-500 to-orange-500",
    borderHover: "hover:border-red-500/40",
    fields: ["Offender's in-game name", "Date & time of incident", "Evidence (screenshots / video links)", "Short description of what happened"],
  },
  {
    icon: Bug,
    title: "Bug Report",
    color: "from-orange-500 to-primary",
    borderHover: "hover:border-orange-500/40",
    fields: ["Steps to reproduce the bug", "Expected vs actual behavior", "Server name & time", "Attachments or screenshots"],
  },
  {
    icon: Lightbulb,
    title: "Feature Request",
    color: "from-primary to-accent",
    borderHover: "hover:border-primary/40",
    fields: ["Feature description", "Why it would benefit the community", "Any implementation ideas or references"],
  },
];

export default function Forms() {
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
            <FileText className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary tracking-wide uppercase">Submissions</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-primary via-orange-400 to-red-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_hsl(45_100%_51%/0.4)]">
              Server Forms
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Submit reports, bug reports, and feature requests using the appropriate form below.
          </p>
        </motion.div>

        {/* Form Type Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {formTypes.map((f) => (
            <motion.div
              key={f.title}
              variants={item}
              whileHover={{ scale: 1.03, boxShadow: "0 0 30px hsl(45 100% 51% / 0.12)" }}
              className={`relative group p-6 rounded-xl border border-border bg-card/60 backdrop-blur-sm overflow-hidden transition-all ${f.borderHover}`}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-orange-500/5" />
              <div className="relative z-10 space-y-4">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${f.color} flex items-center justify-center shadow-[0_0_16px_hsl(45_100%_51%/0.2)]`}>
                  <f.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{f.title}</h3>
                <ul className="space-y-2">
                  {f.fields.map((field) => (
                    <li key={field} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Send className="h-3 w-3 mt-1 text-primary/60 shrink-0" />
                      {field}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* How to Submit */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="p-6 rounded-xl border border-border bg-card/30 backdrop-blur-sm space-y-4"
        >
          <h2 className="text-xl font-bold text-foreground">How to Submit</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {["Open a ticket on Discord", "Fill in all required fields", "Attach evidence & submit"].map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center text-xs font-bold text-primary-foreground shadow-[0_0_10px_hsl(45_100%_51%/0.25)]">
                  {i + 1}
                </span>
                <span className="text-sm text-muted-foreground">{step}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
