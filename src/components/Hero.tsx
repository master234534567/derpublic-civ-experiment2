import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import derpublicLogo from "@/assets/derpublic-logo.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Animated stars background */}
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
        <div className="animate-float">
          <img 
            src={derpublicLogo} 
            alt="Derpublic Minecraft Server Logo" 
            className="w-full max-w-2xl mx-auto drop-shadow-2xl"
            style={{ filter: "drop-shadow(0 0 30px rgba(255, 193, 7, 0.3))" }}
          />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent leading-tight">
          Derpublic Minecraft Server
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
          Where civilization grows and prospers! Join the social experiment today.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
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
            className="text-lg px-8 py-6 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            asChild
          >
            <a href="#wiki">
              Learn More
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
