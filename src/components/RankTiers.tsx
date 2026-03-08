import { motion } from "framer-motion";
import { Shield, Crown, Gem, Sword, Star, Users } from "lucide-react";

const ranks = [
  { name: "Newcomer", color: "from-gray-400 to-gray-500", textColor: "text-gray-400", icon: Users, points: "0+", description: "Fresh to the server. Explore, build, and find your place in the civilization." },
  { name: "Citizen", color: "from-green-400 to-emerald-500", textColor: "text-green-400", icon: Shield, points: "100+", description: "A trusted member of the community. Can claim land and participate in votes." },
  { name: "Veteran", color: "from-blue-400 to-cyan-500", textColor: "text-blue-400", icon: Sword, points: "500+", description: "Experienced player who has proven loyalty. Access to special build zones." },
  { name: "Elite", color: "from-purple-400 to-violet-500", textColor: "text-purple-400", icon: Star, points: "1000+", description: "Top-tier contributor. Can host events and access exclusive areas." },
  { name: "Legend", color: "from-yellow-400 to-amber-500", textColor: "text-yellow-400", icon: Gem, points: "2500+", description: "The pinnacle of achievement. Server-wide recognition and custom perks." },
  { name: "Owner", color: "from-red-500 to-rose-600", textColor: "text-red-400", icon: Crown, points: "∞", description: "Server leadership. Manages the civilization experiment." },
];

const RankTiers = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-20 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Rank Tiers
          </h2>
          <p className="text-xl text-muted-foreground">
            Climb the ranks and unlock new privileges
          </p>
        </div>

        <div className="grid gap-4">
          {ranks.map((rank, i) => (
            <motion.div
              key={rank.name}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-xl border border-border bg-card/50 p-5 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_20px_hsl(45_100%_51%/0.1)]"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${rank.color} flex items-center justify-center shrink-0 shadow-lg`}>
                  <rank.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className={`text-lg font-bold ${rank.textColor}`}>{rank.name}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-mono">
                      {rank.points} pts
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{rank.description}</p>
                </div>
              </div>
              <div className={`absolute inset-0 bg-gradient-to-r ${rank.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300`} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default RankTiers;
