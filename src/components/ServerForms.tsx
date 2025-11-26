import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileUp, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getSupabase } from "@/integrations/supabase/client";

const ServerForms = () => {
  const { toast } = useToast();
  const [eventFormData, setEventFormData] = useState({
    discordUsername: "",
    minecraftUsername: "",
    eventType: "",
    availability: "",
    additionalInfo: "",
  });

  const [mediaFormData, setMediaFormData] = useState({
    discordUsername: "",
    submissionType: "",
    title: "",
    description: "",
    link: "",
  });

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!import.meta.env.VITE_SUPABASE_URL) {
        toast({
          title: "Configuration Required",
          description: "Lovable Cloud is still provisioning. Please wait a moment and try again.",
          variant: "destructive",
        });
        return;
      }

      const supabase = getSupabase();
      const { data, error } = await supabase.functions.invoke('submit-event-application', {
        body: eventFormData,
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Application Submitted!",
        description: "Your event application has been posted to Discord!",
      });
      
      setEventFormData({
        discordUsername: "",
        minecraftUsername: "",
        eventType: "",
        availability: "",
        additionalInfo: "",
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleMediaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!import.meta.env.VITE_SUPABASE_URL) {
        toast({
          title: "Configuration Required",
          description: "Lovable Cloud is still provisioning. Please wait a moment and try again.",
          variant: "destructive",
        });
        return;
      }

      const supabase = getSupabase();
      const { data, error } = await supabase.functions.invoke('submit-media-submission', {
        body: {
          ...mediaFormData,
          mediaLink: mediaFormData.link, // Rename for edge function
        },
      });

      if (error) throw error;

      toast({
        title: "Media Submitted!",
        description: "Your media submission has been sent to Discord.",
      });
      
      setMediaFormData({
        discordUsername: "",
        submissionType: "",
        title: "",
        description: "",
        link: "",
      });
    } catch (error) {
      console.error('Error submitting media:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your media. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      <Card className="backdrop-blur-sm bg-card/50 border-2 border-border">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-3">
            <Calendar className="h-6 w-6 text-primary" />
            Event Application
          </CardTitle>
          <CardDescription>
            Apply to participate in upcoming Minecraft events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEventSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="event-discord">Discord Username</Label>
              <Input
                id="event-discord"
                placeholder="YourUsername#0000"
                value={eventFormData.discordUsername}
                onChange={(e) => setEventFormData(prev => ({ ...prev, discordUsername: e.target.value }))}
                required
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="event-minecraft">Minecraft Username</Label>
              <Input
                id="event-minecraft"
                placeholder="Your Minecraft IGN"
                value={eventFormData.minecraftUsername}
                onChange={(e) => setEventFormData(prev => ({ ...prev, minecraftUsername: e.target.value }))}
                required
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="event-type">Event Type</Label>
              <Select 
                value={eventFormData.eventType} 
                onValueChange={(value) => setEventFormData(prev => ({ ...prev, eventType: value }))}
              >
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="civilization">Civilization Event</SelectItem>
                  <SelectItem value="pvp">PvP Tournament</SelectItem>
                  <SelectItem value="building">Building Competition</SelectItem>
                  <SelectItem value="survival">Survival Challenge</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="availability">Availability</Label>
              <Input
                id="availability"
                placeholder="e.g., Weekends, evenings EST"
                value={eventFormData.availability}
                onChange={(e) => setEventFormData(prev => ({ ...prev, availability: e.target.value }))}
                required
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="event-info">Additional Information</Label>
              <Textarea
                id="event-info"
                placeholder="Tell us about your experience and what you're looking forward to..."
                value={eventFormData.additionalInfo}
                onChange={(e) => setEventFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
                className="min-h-32 bg-background/50"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-glow transition-all duration-300"
            >
              Submit Event Application
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="backdrop-blur-sm bg-card/50 border-2 border-border">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-3">
            <FileUp className="h-6 w-6 text-accent" />
            File/Media Submission
          </CardTitle>
          <CardDescription>
            Submit videos, screenshots, or other media related to server events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleMediaSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="media-discord">Discord Username</Label>
              <Input
                id="media-discord"
                placeholder="YourUsername#0000"
                value={mediaFormData.discordUsername}
                onChange={(e) => setMediaFormData(prev => ({ ...prev, discordUsername: e.target.value }))}
                required
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="submission-type">Submission Type</Label>
              <Select 
                value={mediaFormData.submissionType} 
                onValueChange={(value) => setMediaFormData(prev => ({ ...prev, submissionType: value }))}
              >
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Select submission type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="screenshot">Screenshot</SelectItem>
                  <SelectItem value="livestream">Livestream VOD</SelectItem>
                  <SelectItem value="other">Other Media</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="media-title">Title</Label>
              <Input
                id="media-title"
                placeholder="Give your submission a title"
                value={mediaFormData.title}
                onChange={(e) => setMediaFormData(prev => ({ ...prev, title: e.target.value }))}
                required
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="media-link">Link to Media</Label>
              <Input
                id="media-link"
                type="url"
                placeholder="https://youtube.com/... or https://imgur.com/..."
                value={mediaFormData.link}
                onChange={(e) => setMediaFormData(prev => ({ ...prev, link: e.target.value }))}
                required
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="media-description">Description</Label>
              <Textarea
                id="media-description"
                placeholder="Describe your submission..."
                value={mediaFormData.description}
                onChange={(e) => setMediaFormData(prev => ({ ...prev, description: e.target.value }))}
                className="min-h-32 bg-background/50"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-accent to-primary hover:shadow-glow transition-all duration-300"
            >
              Submit Media
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServerForms;
