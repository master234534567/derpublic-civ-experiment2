import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ApplicationForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    minecraftUsername: "",
    experience: "",
    reason: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application Submitted!",
      description: "We'll review your application and get back to you soon on Discord.",
    });
    setFormData({
      username: "",
      email: "",
      minecraftUsername: "",
      experience: "",
      reason: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="apply" className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Join Our Community
          </h2>
          <p className="text-xl text-muted-foreground">
            Apply to become part of the Derpublic civilization
          </p>
        </div>
        
        <Card className="backdrop-blur-sm bg-card/50 border-2 border-border">
          <CardHeader>
            <CardTitle className="text-2xl">Application Form</CardTitle>
            <CardDescription>
              Fill out this form to join our Minecraft server
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">Discord Username</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="YourUsername#0000"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="bg-background/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-background/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="minecraftUsername">Minecraft Username</Label>
                <Input
                  id="minecraftUsername"
                  name="minecraftUsername"
                  placeholder="Your Minecraft IGN"
                  value={formData.minecraftUsername}
                  onChange={handleChange}
                  required
                  className="bg-background/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="experience">Minecraft Experience</Label>
                <Input
                  id="experience"
                  name="experience"
                  placeholder="How long have you been playing?"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  className="bg-background/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reason">Why do you want to join?</Label>
                <Textarea
                  id="reason"
                  name="reason"
                  placeholder="Tell us about yourself and why you'd like to join the Derpublic..."
                  value={formData.reason}
                  onChange={handleChange}
                  required
                  className="min-h-32 bg-background/50"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-glow transition-all duration-300"
                size="lg"
              >
                Submit Application <Send className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ApplicationForm;
