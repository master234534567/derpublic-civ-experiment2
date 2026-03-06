import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { LogIn, LogOut, Shield, User } from "lucide-react";
import { motion } from "framer-motion";

const SettingsPage = () => {
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Auth form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  // Privacy state
  const [showProfile, setShowProfile] = useState(true);
  const [showRank, setShowRank] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) loadPrivacySettings(session.user.id);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) loadPrivacySettings(session.user.id);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadPrivacySettings = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("privacy_show_profile, privacy_show_rank")
      .eq("user_id", userId)
      .single();

    if (data) {
      setShowProfile(data.privacy_show_profile);
      setShowRank(data.privacy_show_rank);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        toast({ title: "Sign Up Failed", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Check your email!", description: "We sent a confirmation link." });
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast({ title: "Login Failed", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Welcome back!" });
      }
    }
    setAuthLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "Logged out" });
  };

  const updatePrivacy = async (field: string, value: boolean) => {
    if (!user) return;
    await supabase
      .from("profiles")
      .update({ [field]: value })
      .eq("user_id", user.id);

    toast({ title: "Privacy updated" });
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen text-muted-foreground">Loading...</div>;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Settings
          </h1>
        </motion.div>

        {/* Auth Section */}
        <Card className="bg-card/50 border-2 border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Account
            </CardTitle>
            <CardDescription>
              {user ? `Logged in as ${user.email}` : "Sign in or create an account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {user ? (
              <Button onClick={handleLogout} variant="destructive" className="w-full">
                <LogOut className="h-4 w-4 mr-2" /> Log Out
              </Button>
            ) : (
              <form onSubmit={handleAuth} className="space-y-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="bg-muted/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="bg-muted/50"
                  />
                </div>
                <Button type="submit" disabled={authLoading} className="w-full bg-gradient-to-r from-primary to-secondary">
                  <LogIn className="h-4 w-4 mr-2" />
                  {isSignUp ? "Sign Up" : "Log In"}
                </Button>
                <Button type="button" variant="ghost" className="w-full" onClick={() => setIsSignUp(!isSignUp)}>
                  {isSignUp ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Privacy Section */}
        {user && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="bg-card/50 border-2 border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-accent" />
                  Privacy
                </CardTitle>
                <CardDescription>Control what others can see about you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Profile Publicly</Label>
                    <p className="text-sm text-muted-foreground">Let other players see your profile</p>
                  </div>
                  <Switch
                    checked={showProfile}
                    onCheckedChange={(v) => {
                      setShowProfile(v);
                      updatePrivacy("privacy_show_profile", v);
                    }}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Rank Publicly</Label>
                    <p className="text-sm text-muted-foreground">Let others see your rank info</p>
                  </div>
                  <Switch
                    checked={showRank}
                    onCheckedChange={(v) => {
                      setShowRank(v);
                      updatePrivacy("privacy_show_rank", v);
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
