import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { LogIn, LogOut, Shield, User, Gamepad2, Sun, Moon, Lock, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const SettingsPage = () => {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Auth form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ign, setIgn] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Profile state
  const [profileIgn, setProfileIgn] = useState("");

  // Privacy state
  const [showProfile, setShowProfile] = useState(true);
  const [showRank, setShowRank] = useState(true);

  // Password change
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) loadProfileSettings(session.user.id);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) loadProfileSettings(session.user.id);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadProfileSettings = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("privacy_show_profile, privacy_show_rank, minecraft_username")
      .eq("user_id", userId)
      .single();

    if (data) {
      setShowProfile(data.privacy_show_profile);
      setShowRank(data.privacy_show_rank);
      setProfileIgn(data.minecraft_username || "");
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);

    if (isSignUp) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin },
      });
      if (error) {
        toast({ title: "Sign Up Failed", description: error.message, variant: "destructive" });
      } else {
        if (data.user && ign.trim()) {
          await supabase.from("profiles").update({ minecraft_username: ign.trim() }).eq("user_id", data.user.id);
        }
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
    setProfileIgn("");
    toast({ title: "Logged out" });
  };

  const updatePrivacy = async (field: string, value: boolean) => {
    if (!user) return;
    await supabase.from("profiles").update({ [field]: value }).eq("user_id", user.id);
    toast({ title: "Privacy updated" });
  };

  const updateIgn = async () => {
    if (!user) return;
    await supabase.from("profiles").update({ minecraft_username: profileIgn.trim() }).eq("user_id", user.id);
    toast({ title: "IGN updated!" });
  };

  const changePassword = async () => {
    if (newPassword.length < 6) {
      toast({ title: "Password must be at least 6 characters", variant: "destructive" });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({ title: "Passwords don't match", variant: "destructive" });
      return;
    }
    setChangingPassword(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      toast({ title: "Failed to change password", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Password changed successfully!" });
      setNewPassword("");
      setConfirmPassword("");
    }
    setChangingPassword(false);
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen text-muted-foreground">Loading...</div>;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Account
          </h1>
        </motion.div>

        {/* Auth Section */}
        <Card className="bg-card/50 border-2 border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              {user ? "Your Account" : "Sign In / Sign Up"}
            </CardTitle>
            <CardDescription>
              {user ? `Logged in as ${user.email}` : "Sign in or create an account to access all features"}
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
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className="bg-muted/50" />
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <div className="relative">
                    <Input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} className="bg-muted/50 pr-10" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                {isSignUp && (
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Gamepad2 className="h-4 w-4 text-primary" />
                      What's your IGN (In-Game Name)?
                    </Label>
                    <Input type="text" value={ign} onChange={(e) => setIgn(e.target.value)} placeholder="e.g. Steve_Builder" className="bg-muted/50" />
                    <p className="text-xs text-muted-foreground">Your Minecraft username so we can link your account.</p>
                  </div>
                )}
                <Button type="submit" disabled={authLoading} className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-[0_0_16px_hsl(45_100%_51%/0.2)]">
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

        {/* Appearance */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="bg-card/50 border-2 border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {theme === "dark" ? <Moon className="h-5 w-5 text-primary" /> : <Sun className="h-5 w-5 text-primary" />}
                Appearance
              </CardTitle>
              <CardDescription>Switch between light and dark mode</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Toggle between dark and light theme</p>
                </div>
                <Switch
                  checked={theme === "dark"}
                  onCheckedChange={(v) => setTheme(v ? "dark" : "light")}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* IGN Section (logged in) */}
        {user && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="bg-card/50 border-2 border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gamepad2 className="h-5 w-5 text-accent" />
                  In-Game Name
                </CardTitle>
                <CardDescription>Your Minecraft username linked to this account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <Input value={profileIgn} onChange={(e) => setProfileIgn(e.target.value)} placeholder="Your Minecraft username" className="bg-muted/50 flex-1" />
                  <Button onClick={updateIgn} className="bg-gradient-to-r from-accent to-primary hover:opacity-90 shadow-[0_0_12px_hsl(120_50%_45%/0.2)]">Save</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Change Password */}
        {user && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="bg-card/50 border-2 border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-destructive" />
                  Change Password
                </CardTitle>
                <CardDescription>Update your account password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>New Password</Label>
                  <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" minLength={6} className="bg-muted/50" />
                </div>
                <div className="space-y-2">
                  <Label>Confirm New Password</Label>
                  <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" minLength={6} className="bg-muted/50" />
                </div>
                <Button onClick={changePassword} disabled={changingPassword} variant="destructive" className="w-full">
                  {changingPassword ? "Changing..." : "Change Password"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Privacy Section */}
        {user && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="bg-card/50 border-2 border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-accent" />
                  Privacy & Security
                </CardTitle>
                <CardDescription>Control what others can see and secure your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Profile Publicly</Label>
                    <p className="text-sm text-muted-foreground">Let other players see your profile</p>
                  </div>
                  <Switch checked={showProfile} onCheckedChange={(v) => { setShowProfile(v); updatePrivacy("privacy_show_profile", v); }} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Rank Publicly</Label>
                    <p className="text-sm text-muted-foreground">Let others see your rank info</p>
                  </div>
                  <Switch checked={showRank} onCheckedChange={(v) => { setShowRank(v); updatePrivacy("privacy_show_rank", v); }} />
                </div>
                <Separator />
                <div className="p-4 rounded-xl bg-muted/30 border border-border space-y-2">
                  <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" /> Security Tips
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Use a strong, unique password (8+ characters with numbers and symbols)</li>
                    <li>Never share your password with anyone</li>
                    <li>Log out when using shared computers</li>
                    <li>Change your password regularly</li>
                  </ul>
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
