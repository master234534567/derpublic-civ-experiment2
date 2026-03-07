import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardList, CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function RankApplications() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-secondary/30 bg-secondary/5">
            <ClipboardList className="h-5 w-5 text-secondary" />
            <span className="text-sm font-medium text-secondary tracking-wide uppercase">Apply Now</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-secondary via-primary to-orange-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_hsl(220_70%_50%/0.4)]">
              Rank Applications 📋
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Apply for staff positions or rank promotions. Provide honest answers and evidence to support your application.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              className="space-y-6 p-8 rounded-xl border border-border bg-card/60 backdrop-blur-sm"
            >
              <div className="space-y-2">
                <Label htmlFor="ign" className="text-foreground font-medium">In-game Name</Label>
                <Input
                  id="ign"
                  name="ign"
                  required
                  placeholder="Your Minecraft username"
                  className="bg-muted/50 border-border focus:border-primary focus:ring-primary/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rank" className="text-foreground font-medium">Desired Rank</Label>
                <Input
                  id="rank"
                  name="rank"
                  required
                  placeholder="e.g. Moderator, Builder, Admin"
                  className="bg-muted/50 border-border focus:border-primary focus:ring-primary/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason" className="text-foreground font-medium">Why should you be promoted?</Label>
                <Textarea
                  id="reason"
                  name="reason"
                  required
                  rows={4}
                  placeholder="Explain why you'd be a great fit for this role..."
                  className="bg-muted/50 border-border focus:border-primary focus:ring-primary/20 resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience" className="text-foreground font-medium">Relevant Experience</Label>
                <Textarea
                  id="experience"
                  name="experience"
                  rows={3}
                  placeholder="Previous staff roles, community contributions, etc."
                  className="bg-muted/50 border-border focus:border-primary focus:ring-primary/20 resize-none"
                />
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  className="w-full h-12 text-base font-bold bg-gradient-to-r from-secondary via-primary to-orange-500 hover:opacity-90 shadow-[0_0_20px_hsl(220_70%_50%/0.3)] transition-all"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Submit Application
                </Button>
              </motion.div>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center p-12 rounded-xl border border-accent/30 bg-accent/5 space-y-4"
            >
              <CheckCircle2 className="h-16 w-16 text-accent mx-auto drop-shadow-[0_0_20px_hsl(120_50%_45%/0.4)]" />
              <h2 className="text-2xl font-bold text-foreground">Application Received</h2>
              <p className="text-muted-foreground">Thanks — staff will review your application and contact you soon.</p>
              <Button
                variant="outline"
                onClick={() => setSubmitted(false)}
                className="mt-4 border-accent/30 hover:bg-accent/10"
              >
                Submit Another
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
