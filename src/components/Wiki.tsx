import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Globe } from "lucide-react";

const Wiki = () => {
  return (
    <section id="wiki" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Server Wiki
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about Derpublic
          </p>
        </div>
        
        <Card className="backdrop-blur-sm bg-card/50 border-2 border-border hover:border-primary transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-3xl flex items-center gap-3">
              <Globe className="h-8 w-8 text-primary" />
              About The Derpublic
            </CardTitle>
            <CardDescription className="flex items-center gap-2 text-base mt-2">
              <Calendar className="h-4 w-4" />
              Server created: December 11th, 2024
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg leading-relaxed text-foreground">
              The Derpublic is the server where <span className="text-primary font-semibold">"civilization"</span> grows and prospers! 
              Player and player alike, dropped into an unfamiliar world where mere survival is a challenge, let alone civilization. 
            </p>
            <p className="text-lg leading-relaxed text-foreground">
              This is where it begins. This is the springboard of modern civilization events. The time is now!
            </p>
            <div className="pt-4 border-t border-border">
              <p className="text-xl font-semibold text-primary">
                Join us, and join the Derpublic Social Experiment series today!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Wiki;
