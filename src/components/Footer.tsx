import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border bg-card/30">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        {/* Staff Credits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <h3 className="text-lg font-bold text-muted-foreground uppercase tracking-widest">Server Staff</h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {/* Owner - Rainbow text */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Owner:</span>
              <span className="text-lg font-black animate-rainbow bg-[length:200%_auto] bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-yellow-400 via-green-400 via-blue-500 via-purple-500 to-red-500">
                Derpamine
              </span>
              <span>👑</span>
            </div>
            {/* Moderator */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Moderator:</span>
              <span className="text-lg font-bold text-primary">MrWinStreak</span>
              <span>🛡️</span>
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <div className="text-center space-y-3 pt-4 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Derpublic Minecraft Server. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground/70">
            <span>Join the civilization experiment!</span>
            <span>•</span>
            <span>durpublic.net</span>
            <span>•</span>
            <a
              href="https://discord.com/invite/the-derpublic-1316447324490432623"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Discord
            </a>
          </div>
          <p className="text-[10px] text-muted-foreground/50">
            Not affiliated with Mojang or Microsoft. Minecraft is a registered trademark of Mojang Studios.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
