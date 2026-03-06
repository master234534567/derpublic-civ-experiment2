import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Search, Sword, Shield, Crown, User } from "lucide-react";
import { motion } from "framer-motion";

const rankIcons: Record<string, React.ReactNode> = {
  Elder: <Crown className="h-6 w-6 text-primary" />,
  Noble: <Shield className="h-6 w-6 text-secondary" />,
  Knight: <Sword className="h-6 w-6 text-accent" />,
  Member: <User className="h-6 w-6 text-muted-foreground" />,
};

const RankLookup = () => {
  const [searchParams] = useSearchParams();
  const [username, setUsername] = useState(searchParams.get("q") || "");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setUsername(q);
      handleSearch(q);
    }
  }, [searchParams]);

  const handleSearch = async (query?: string) => {
    const searchQuery = query || username;
    if (!searchQuery.trim()) return;
    setLoading(true);
    setSearched(true);

    const { data, error } = await supabase
      .from("player_ranks")
      .select("*")
      .ilike("minecraft_username", `%${searchQuery.trim()}%`);

    setResult(data && data.length > 0 ? data : null);
    setLoading(false);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <Trophy className="h-12 w-12 text-primary mx-auto" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Rank Lookup
          </h1>
          <p className="text-muted-foreground">Search for a player to see their rank</p>
        </motion.div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex gap-3"
        >
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Minecraft username..."
            className="bg-muted/50"
          />
          <Button type="submit" disabled={loading}>
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </form>

        {loading && (
          <p className="text-center text-muted-foreground animate-pulse">Searching...</p>
        )}

        {searched && !loading && !result && (
          <Card className="bg-card/50 border-border">
            <CardContent className="py-8 text-center text-muted-foreground">
              No player found with that username.
            </CardContent>
          </Card>
        )}

        {result &&
          result.map((player: any) => (
            <motion.div key={player.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <Card className="bg-card/50 border-2 border-border hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    {rankIcons[player.rank] || <User className="h-6 w-6" />}
                    {player.minecraft_username}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rank</span>
                    <span className="font-bold text-primary">{player.rank}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Points</span>
                    <span className="font-bold">{player.points}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Joined</span>
                    <span>{new Date(player.joined_at).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default RankLookup;
