import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ApplicationForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    minecraftUsername: "",
    experience: "",
    reason: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check if user is logged in
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        // Send via edge function for authenticated users
        const { error } = await supabase.functions.invoke("submit-application", {
          body: formData,
        });
        if (error) throw error;
      } else {
        // For non-authenticated users, construct mailto link as fallback
        const subject = encodeURIComponent(`Server Application - ${formData.minecraftUsername}`);
        const body = encodeURIComponent(
          `Discord Username: ${formData.username}\nEmail: ${formData.email}\nMinecraft IGN: ${formData.minecraftUsername}\nExperience: ${formData.experience}\nReason: ${formData.reason}`
        );
        window.open(`mailto:mrwinstreak@derpublic.net?subject=${subject}&body=${body}`, "_blank");
      }

      toast({
        title: "Application Submitted!",
        description: "We'll review your application and get back to you soon.",
      });
      setFormData({ username: "", email: "", minecraftUsername: "", experience: "", reason: "" });
    } catch (err) {
      toast({
        title: "Submission Failed",
        description: "Please try again or email mrwinstreak@derpublic.net directly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
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
              Fill out this form to join our Minecraft server. Applications are sent to <span className="text-primary font-medium">mrwinstreak@derpublic.net</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">Discord Username</Label>
                <Input id="username" name="username" placeholder="YourUsername#0000" value={formData.username} onChange={handleChange} required maxLength={100} className="bg-background/50" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="your.email@example.com" value={formData.email} onChange={handleChange} required maxLength={255} className="bg-background/50" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="minecraftUsername">Minecraft Username</Label>
                <Input id="minecraftUsername" name="minecraftUsername" placeholder="Your Minecraft IGN" value={formData.minecraftUsername} onChange={handleChange} required maxLength={50} className="bg-background/50" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="experience">Minecraft Experience</Label>
                <Input id="experience" name="experience" placeholder="How long have you been playing?" value={formData.experience} onChange={handleChange} required maxLength={500} className="bg-background/50" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reason">Why do you want to join?</Label>
                <Textarea id="reason" name="reason" placeholder="Tell us about yourself and why you'd like to join the Derpublic..." value={formData.reason} onChange={handleChange} required className="min-h-32 bg-background/50" maxLength={1000} />
              </div>
              
              <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-glow transition-all duration-300" size="lg">
                {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Send className="mr-2 h-5 w-5" />}
                {loading ? "Sending..." : "Submit Application"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ApplicationForm;
