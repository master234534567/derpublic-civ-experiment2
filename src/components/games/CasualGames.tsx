import { useState, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Swords, Coins, Hash, Shuffle, MousePointer, Dices, RotateCcw, Trophy } from "lucide-react";

// ─── Rock Paper Scissors ───
export const RockPaperScissors = () => {
  const choices = ["🪨", "📄", "✂️"];
  const [player, setPlayer] = useState("");
  const [computer, setComputer] = useState("");
  const [result, setResult] = useState("");
  const [wins, setWins] = useState(0);

  const play = (choice: string) => {
    const comp = choices[Math.floor(Math.random() * 3)];
    setPlayer(choice); setComputer(comp);
    if (choice === comp) setResult("Draw!");
    else if ((choice === "🪨" && comp === "✂️") || (choice === "📄" && comp === "🪨") || (choice === "✂️" && comp === "📄")) { setResult("You win!"); setWins((w) => w + 1); }
    else setResult("You lose!");
  };

  return (
    <Card className="backdrop-blur-sm bg-card/50 border-2 border-border hover:border-primary transition-all duration-300 h-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2"><Swords className="h-5 w-5 text-primary" />Rock Paper Scissors</CardTitle>
        <CardDescription>Classic game vs computer</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Badge variant="secondary">Wins: {wins}</Badge>
        <div className="flex gap-3 justify-center">
          {choices.map((c) => (
            <motion.button key={c} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => play(c)} className="w-14 h-14 rounded-xl bg-muted/50 border border-border hover:border-primary/40 text-2xl flex items-center justify-center transition-all">
              {c}
            </motion.button>
          ))}
        </div>
        {result && (
          <div className="text-center space-y-1">
            <p className="text-lg">{player} vs {computer}</p>
            <p className={`font-bold ${result.includes("win") ? "text-accent" : result.includes("lose") ? "text-destructive" : "text-muted-foreground"}`}>{result}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// ─── Coin Flip Streak ───
export const CoinFlipStreak = () => {
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const [flipping, setFlipping] = useState(false);

  const flip = (guess: string) => {
    if (flipping) return;
    setFlipping(true);
    const coin = Math.random() < 0.5 ? "Heads" : "Tails";
    setTimeout(() => {
      setResult(coin);
      if (guess === coin) {
        const ns = streak + 1;
        setStreak(ns);
        if (ns > best) setBest(ns);
      } else {
        setStreak(0);
      }
      setFlipping(false);
    }, 500);
  };

  return (
    <Card className="backdrop-blur-sm bg-card/50 border-2 border-border hover:border-secondary transition-all duration-300 h-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2"><Coins className="h-5 w-5 text-secondary" />Coin Flip Streak</CardTitle>
        <CardDescription>Predict heads or tails, keep your streak!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between"><Badge variant="secondary">Streak: {streak}</Badge><Badge variant="outline">Best: {best}</Badge></div>
        <motion.div animate={flipping ? { rotateY: 360 } : {}} transition={{ duration: 0.5 }} className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl font-bold text-primary-foreground shadow-[0_0_20px_hsl(45_100%_51%/0.3)]">
          {result ? (result === "Heads" ? "H" : "T") : "?"}
        </motion.div>
        <div className="flex gap-3 justify-center">
          <Button onClick={() => flip("Heads")} variant="outline" disabled={flipping}>Heads</Button>
          <Button onClick={() => flip("Tails")} variant="outline" disabled={flipping}>Tails</Button>
        </div>
      </CardContent>
    </Card>
  );
};

// ─── Number Memory ───
export const NumberMemory = () => {
  const [number, setNumber] = useState("");
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState<"idle" | "show" | "input" | "result">("idle");
  const [level, setLevel] = useState(1);
  const [best, setBest] = useState(0);

  const start = (lvl: number = 1) => {
    const num = Array.from({ length: lvl + 2 }, () => Math.floor(Math.random() * 10)).join("");
    setNumber(num);
    setLevel(lvl);
    setPhase("show");
    setInput("");
    setTimeout(() => setPhase("input"), 1500 + lvl * 300);
  };

  const check = () => {
    if (input === number) {
      if (level > best) setBest(level);
      start(level + 1);
    } else {
      setPhase("result");
    }
  };

  return (
    <Card className="backdrop-blur-sm bg-card/50 border-2 border-border hover:border-accent transition-all duration-300 h-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2"><Hash className="h-5 w-5 text-accent" />Number Memory</CardTitle>
        <CardDescription>Remember the number sequence</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between"><Badge variant="secondary">Level: {level}</Badge><Badge variant="outline">Best: {best}</Badge></div>
        {phase === "idle" && <div className="text-center py-4"><Button onClick={() => start(1)} className="bg-gradient-to-r from-accent to-primary">Start</Button></div>}
        {phase === "show" && <motion.p initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="text-3xl font-black text-center text-primary tracking-widest py-4">{number}</motion.p>}
        {phase === "input" && (
          <div className="space-y-2">
            <Input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && check()} placeholder="Enter the number..." className="text-center text-xl bg-muted/50" autoFocus />
            <Button onClick={check} className="w-full" variant="outline">Submit</Button>
          </div>
        )}
        {phase === "result" && (
          <div className="text-center space-y-2 py-2">
            <p className="text-destructive font-bold">Wrong! It was {number}</p>
            <p className="text-muted-foreground">You reached level {level}</p>
            <Button onClick={() => start(1)} variant="outline" size="sm"><RotateCcw className="h-3 w-3 mr-1" />Retry</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// ─── Word Scramble ───
export const WordScramble = () => {
  const words = ["diamond", "creeper", "enderman", "villager", "enchant", "furnace", "pickaxe", "obsidian", "crafting", "survival"];
  const [word, setWord] = useState("");
  const [scrambled, setScrambled] = useState("");
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  const generate = useCallback(() => {
    const w = words[Math.floor(Math.random() * words.length)];
    setWord(w);
    setScrambled(w.split("").sort(() => Math.random() - 0.5).join(""));
    setInput("");
    setFeedback(null);
  }, []);

  useEffect(() => { generate(); }, [generate]);

  const check = () => {
    if (input.toLowerCase() === word) { setScore((s) => s + 1); setFeedback("Correct!"); setTimeout(generate, 500); }
    else setFeedback("Try again!");
  };

  return (
    <Card className="backdrop-blur-sm bg-card/50 border-2 border-border hover:border-primary transition-all duration-300 h-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2"><Shuffle className="h-5 w-5 text-primary" />Word Scramble</CardTitle>
        <CardDescription>Unscramble the Minecraft word</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Badge variant="secondary">Score: {score}</Badge>
        <p className="text-2xl font-black text-center text-primary tracking-widest">{scrambled.toUpperCase()}</p>
        <Input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && check()} placeholder="Your answer..." className="text-center bg-muted/50" />
        <Button onClick={check} variant="outline" className="w-full">Submit</Button>
        {feedback && <p className={`text-center text-sm font-bold ${feedback === "Correct!" ? "text-accent" : "text-destructive"}`}>{feedback}</p>}
      </CardContent>
    </Card>
  );
};

// ─── Speed Click ───
export const SpeedClick = () => {
  const [clicks, setClicks] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [playing, setPlaying] = useState(false);
  const [best, setBest] = useState(0);

  const start = () => { setClicks(0); setTimeLeft(10); setPlaying(true); };

  useEffect(() => {
    if (!playing || timeLeft <= 0) return;
    const t = setInterval(() => setTimeLeft((v) => { if (v <= 1) { setPlaying(false); return 0; } return v - 1; }), 1000);
    return () => clearInterval(t);
  }, [playing, timeLeft]);

  useEffect(() => { if (!playing && clicks > best) setBest(clicks); }, [playing]);

  return (
    <Card className="backdrop-blur-sm bg-card/50 border-2 border-border hover:border-destructive transition-all duration-300 h-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2"><MousePointer className="h-5 w-5 text-destructive" />Speed Click</CardTitle>
        <CardDescription>Click as fast as you can in 10 seconds!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between"><Badge variant="secondary">Clicks: {clicks}</Badge><Badge variant="outline">Best: {best}</Badge></div>
        {!playing ? (
          <div className="text-center py-4 space-y-2">
            {timeLeft === 0 && <p className="text-xl font-bold text-primary">{clicks} clicks! ({(clicks / 10).toFixed(1)} CPS)</p>}
            <Button onClick={start} className="bg-gradient-to-r from-destructive to-primary">{timeLeft === 0 ? "Again" : "Start"}</Button>
          </div>
        ) : (
          <>
            <div className="w-full bg-muted rounded-full h-2"><div className="h-full bg-destructive rounded-full transition-all" style={{ width: `${(timeLeft / 10) * 100}%` }} /></div>
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => setClicks((c) => c + 1)} className="w-full h-28 rounded-xl bg-gradient-to-br from-destructive/20 to-primary/20 border border-destructive/40 text-3xl font-black text-foreground hover:bg-destructive/30 transition-all">
              CLICK! ({timeLeft}s)
            </motion.button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

// ─── Dice Roller ───
export const DiceRoller = () => {
  const [dice, setDice] = useState([1, 1]);
  const [rolling, setRolling] = useState(false);
  const [total, setTotal] = useState(0);
  const [history, setHistory] = useState<number[]>([]);

  const roll = () => {
    setRolling(true);
    setTimeout(() => {
      const d1 = Math.floor(Math.random() * 6) + 1;
      const d2 = Math.floor(Math.random() * 6) + 1;
      setDice([d1, d2]);
      const t = d1 + d2;
      setTotal(t);
      setHistory((h) => [t, ...h.slice(0, 9)]);
      setRolling(false);
    }, 400);
  };

  const dieFaces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

  return (
    <Card className="backdrop-blur-sm bg-card/50 border-2 border-border hover:border-secondary transition-all duration-300 h-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2"><Dices className="h-5 w-5 text-secondary" />Dice Roller</CardTitle>
        <CardDescription>Roll dice for your tabletop sessions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-4 justify-center">
          {dice.map((d, i) => (
            <motion.div key={i} animate={rolling ? { rotate: 360 } : {}} transition={{ duration: 0.4 }} className="w-14 h-14 rounded-xl bg-muted/50 border border-border flex items-center justify-center text-3xl">
              {dieFaces[d - 1]}
            </motion.div>
          ))}
        </div>
        {total > 0 && <p className="text-center font-bold text-primary text-lg">Total: {total}</p>}
        <Button onClick={roll} disabled={rolling} className="w-full bg-gradient-to-r from-secondary to-primary">Roll!</Button>
        {history.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            {history.map((h, i) => <span key={i} className="text-xs px-2 py-0.5 rounded bg-muted/50 text-muted-foreground">{h}</span>)}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
