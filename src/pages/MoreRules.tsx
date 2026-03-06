import { motion } from "framer-motion";

export default function MoreRules() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <motion.h2
        className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Server Rules
      </motion.h2>

      <motion.p
        className="text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        These rules ensure fairness, safety, and a fun experience for all players
        participating in the Derpublic Civilization Experiment.
      </motion.p>

      <motion.div
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <RuleBlock
          title="1. No Griefing"
          description="Destroying or altering another player's builds without permission is strictly prohibited."
        />

        <RuleBlock
          title="2. No Hacking or Exploits"
          description="Any form of cheating, hacked clients, or exploiting bugs will result in immediate punishment."
        />

        <RuleBlock
          title="3. Respect Other Players"
          description="Harassment, hate speech, or toxic behavior is not tolerated under any circumstances."
        />

        <RuleBlock
          title="4. No Duplication Glitches"
          description="Using duplication exploits to gain unfair advantages is forbidden."
        />

        <RuleBlock
          title="5. Follow Staff Instructions"
          description="Staff decisions are final. Failure to comply may result in penalties."
        />
      </motion.div>
    </motion.section>
  );
}

function RuleBlock({ title, description }) {
  return (
    <motion.div
      className="p-5 border border-border rounded-lg bg-card/50 shadow-sm"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground mt-1">{description}</p>
    </motion.div>
  );
}
