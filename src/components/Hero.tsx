import { Button } from "@/components/ui/button";
import { ExternalLink, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import derpublicLogo from "@/assets/derpublic-logo.png";

const Hero = () => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyIP = () => {
    navigator.clipboard.writeText("durpublic.net");
    setCopied(true);
    toast({ title: "Server IP copied!", description: "durpublic.net" });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-foreground rounded-full animate-twinkle"
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              animationDelay: Math.random() * 3 + "s",
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="animate-float"
        >
          <img 
            src={derpublicLogo} 
            alt="Derpublic Minecraft Server Logo" 
            className="w-full max-w-2xl mx-auto drop-shadow-2xl"
            style={{ filter: "drop-shadow(0 0 30px rgba(255, 193, 7, 0.3))" }}
          />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent leading-tight"
        >
          Derpublic Minecraft Server
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
        >
          Where civilization grows and prospers! Join the social experiment today.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
        >
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-primary hover:shadow-glow transition-all duration-300"
            asChild
          >
            <a href="https://discord.com/invite/the-derpublic-1316447324490432623" target="_blank" rel="noopener noreferrer">
              Join Discord <ExternalLink className="ml-2 h-5 w-5" />
            </a>
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={copyIP}
            className="text-lg px-8 py-6 border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 gap-2"
          >
            {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
            {copied ? "Copied!" : "Copy Server IP!"}
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            className="text-lg px-8 py-6 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            asChild
          >
            <a href="#wiki">
              Learn More
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
