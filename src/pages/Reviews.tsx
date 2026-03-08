import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { Star, MessageSquare, ThumbsUp, Send, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function Reviews() {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const [reviews, setReviews] = useState<any[]>([]);
  const [newText, setNewText] = useState("");
  const [newStars, setNewStars] = useState(5);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    loadReviews();
    if (user) {
      supabase.from("profiles").select("minecraft_username, username").eq("user_id", user.id).single().then(({ data }) => setProfile(data));
    }
  }, [user]);

  const loadReviews = async () => {
    const { data } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
    setReviews(data || []);
  };

  const submitReview = async () => {
    if (!newText.trim() || !user) return;
    const username = profile?.minecraft_username || profile?.username || user.email?.split("@")[0] || "Anonymous";
    const { error } = await supabase.from("reviews").insert({ user_id: user.id, username, stars: newStars, text: newText.trim() });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Review posted!" }); setNewText(""); setNewStars(5); loadReviews(); }
  };

  const deleteReview = async (id: string) => {
    await supabase.from("reviews").delete().eq("id", id);
    toast({ title: "Review deleted" });
    loadReviews();
  };

  const avgRating = reviews.length > 0 ? (reviews.reduce((s, r) => s + r.stars, 0) / reviews.length).toFixed(1) : "0";
  const positivePercent = reviews.length > 0 ? Math.round((reviews.filter((r) => r.stars >= 4).length / reviews.length) * 100) : 0;

  const stats = [
    { label: "Average Rating", value: `${avgRating} / 5`, icon: Star },
    { label: "Total Reviews", value: `${reviews.length}`, icon: MessageSquare },
    { label: "Positive", value: `${positivePercent}%`, icon: ThumbsUp },
  ];

  return (
    <div className="min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-primary/30 bg-primary/5">
            <Star className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary tracking-wide uppercase">Community</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-primary via-orange-400 to-red-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_hsl(45_100%_51%/0.4)]">Player Reviews</span>
          </h1>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-5">
          {stats.map((s) => (
            <div key={s.label} className="text-center p-6 rounded-xl border border-border bg-card/60 backdrop-blur-sm">
              <s.icon className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-black text-foreground">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Submit Review */}
        {user && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 rounded-xl border border-primary/30 bg-card/40 backdrop-blur-sm space-y-4">
            <h3 className="text-lg font-bold text-foreground">Leave a Review</h3>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <button key={s} onClick={() => setNewStars(s)} className="transition-transform hover:scale-110">
                  <Star className={`h-6 w-6 ${s <= newStars ? "text-primary fill-primary" : "text-muted-foreground/30"}`} />
                </button>
              ))}
            </div>
            <Textarea value={newText} onChange={(e) => setNewText(e.target.value)} placeholder="Share your experience..." className="bg-muted/50 resize-none" rows={3} maxLength={500} />
            <Button onClick={submitReview} className="bg-gradient-to-r from-primary to-secondary shadow-[0_0_16px_hsl(45_100%_51%/0.2)] gap-2">
              <Send className="h-4 w-4" /> Post Review
            </Button>
          </motion.div>
        )}

        {/* Reviews */}
        <motion.div variants={container} initial="hidden" animate="visible" className="grid sm:grid-cols-2 gap-5">
          {reviews.map((r) => (
            <motion.div key={r.id} variants={item} className="relative group p-6 rounded-xl border border-border bg-card/60 backdrop-blur-sm hover:border-primary/40 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-foreground">{r.username}</h3>
                    <p className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < r.stars ? "text-primary fill-primary" : "text-muted-foreground/30"}`} />
                      ))}
                    </div>
                    {(isAdmin || r.user_id === user?.id) && (
                      <button onClick={() => deleteReview(r.id)} className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive/80">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed italic">{r.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {reviews.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">No reviews yet. Be the first to leave one!</div>
        )}
      </div>
    </div>
  );
}
