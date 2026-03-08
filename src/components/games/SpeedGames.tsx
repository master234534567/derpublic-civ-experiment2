import { useState, useEffect, useCallback, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Zap, Calculator, Palette, Type, RotateCcw, Trophy } from "lucide-react";

// ─── Reaction Timer ───
export const ReactionTimer = () => {
  const [phase, setPhase] = useState<"idle" | "waiting" | "go" | "result" | "early">("idle");
  const [startTime, setStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState(0);
  const [best, setBest] = useState(999);
  const timeoutRef = useRef<any>(null);

  const start = () => {
    setPhase("waiting");
    const delay = 1000 + Math.random() * 4000;
    timeoutRef.current = setTimeout(() => { setPhase("go"); setStartTime(Date.now()); }, delay);
  };

  const click = () => {
    if (phase === "waiting") { clearTimeout(timeoutRef.current); setPhase("early"); return; }
    if (phase === "go") {
      const rt = Date.now() - startTime;
      setReactionTime(rt);
      if (rt < best) setBest(rt);
      setPhase("result");
    }
  };

  return (
    <Card className="backdrop-blur-sm bg-card/50 border-2 border-border hover:border-destructive transition-all duration-300 h-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2"><Zap className="h-5 w-5 text-destructive" />Reaction Timer</CardTitle>
        <CardDescription>Click when the box turns green</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {best < 999 && <Badge variant="outline">Best: {best}ms</Badge>}
        <motion.button
          onClick={phase === "idle" || phase === "result" || phase === "early" ? start : click}
          whileTap={{ scale: 0.98 }}
          className={`w-full h-32 rounded-xl text-lg font-bold transition-all flex items-center justify-center ${
            phase === "waiting" ? "bg-destructive/30 text-destructive border border-destructive/40" :
            phase === "go" ? "bg-accent text-accent-foreground border border-accent" :
            phase === "result" ? "bg-primary/20 text-primary border border-primary/40" :
            phase === "early" ? "bg-destructive/20 text-destructive border border-destructive/30" :
            "bg-muted/50 text-muted-foreground border border-border hover:bg-muted/80"
          }`}
        >
          {phase === "idle" && "Click to Start"}
          {phase === "waiting" && "Wait for green..."}
          {phase === "go" && "CLICK NOW!"}
          {phase === "result" && `${reactionTime}ms! Click to retry`}
          {phase === "early" && "Too early! Click to retry"}
        </motion.button>
      </CardContent>
    </Card>
  );
};

// ─── Math Blitz ───
export const MathBlitz = () => {
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState("");
  const [problem, setProblem] = useState({ text: "", answer: 0 });
  const [timeLeft, setTimeLeft] = useState(30);
  const [playing, setPlaying] = useState(false);
  const [highScore, setHighScore] = useState(0);

  const genProblem = useCallback(() => {
    const ops = ["+", "-", "×"];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let a = Math.floor(Math.random() * 20) + 1, b = Math.floor(Math.random() * 15) + 1;
    if (op === "-" && a < b) [a, b] = [b, a];
    const ans = op === "+" ? a + b : op === "-" ? a - b : a * b;
    setProblem({ text: `${a} ${op} ${b}`, answer: ans });
    setAnswer("");
  }, []);

  const start = () => { setScore(0); setTimeLeft(30); setPlaying(true); genProblem(); };

  useEffect(() => {
    if (!playing || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => { if (t <= 1) { setPlaying(false); return 0; } return t - 1; }), 1000);
    return () => clearInterval(timer);
  }, [playing, timeLeft]);

  const checkAnswer = (val: string) => {
    setAnswer(val);
    if (parseInt(val) === problem.answer) {
      setScore((s) => { const ns = s + 1; if (ns > highScore) setHighScore(ns); return ns; });
      genProblem();
    }
  };

  return (
    <Card className="backdrop-blur-sm bg-card/50 border-2 border-border hover:border-primary transition-all duration-300 h-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2"><Calculator className="h-5 w-5 text-primary" />Math Blitz</CardTitle>
        <CardDescription>Solve as many as you can in 30s</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between"><Badge variant="secondary">Score: {score}</Badge><Badge variant="outline">Best: {highScore}</Badge></div>
        {!playing ? (
          <div className="text-center py-4 space-y-2">
            {timeLeft === 0 && <p className="text-xl font-bold text-primary">Final: {score}!</p>}
            <Button onClick={start} className="bg-gradient-to-r from-primary to-secondary">{timeLeft === 0 ? "Play Again" : "Start"}</Button>
          </div>
        ) : (
          <>
            <div className="w-full bg-muted rounded-full h-2"><div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(timeLeft / 30) * 100}%` }} /></div>
            <p className="text-3xl font-black text-center text-foreground">{problem.text} = ?</p>
            <Input type="number" value={answer} onChange={(e) => checkAnswer(e.target.value)} placeholder="Answer" className="text-center text-xl bg-muted/50" autoFocus />
          </>
        )}
      </CardContent>
    </Card>
  );
};

// ─── Color Guesser ───
export const ColorGuesser = () => {
  const colorNames: Record<string, string> = {
    "Red": "#EF4444", "Blue": "#3B82F6", "Green": "#22C55E", "Yellow": "#EAB308",
    "Purple": "#A855F7", "Orange": "#F97316", "Pink": "#EC4899", "Teal": "#14B8A6",
  };
  const names = Object.keys(colorNames);
  const [target, setTarget] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  const generate = useCallback(() => {
    const t = names[Math.floor(Math.random() * names.length)];
    const wrong = names.filter((n) => n !== t).sort(() => Math.random() - 0.5).slice(0, 2);
    setTarget(t);
    setOptions([t, ...wrong].sort(() => Math.random() - 0.5));
    setFeedback(null);
  }, []);

  useEffect(() => { generate(); }, [generate]);

  const guess = (name: string) => {
    if (name === target) { setScore((s) => s + 1); setFeedback("Correct!"); setTimeout(generate, 500); }
    else { setFeedback(`Wrong! It was ${target}`); setScore(0); setTimeout(generate, 1000); }
  };

  return (
    <Card className="backdrop-blur-sm bg-card/50 border-2 border-border hover:border-secondary transition-all duration-300 h-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2"><Palette className="h-5 w-5 text-secondary" />Color Guesser</CardTitle>
        <CardDescription>Name the color shown</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Badge variant="secondary">Streak: {score}</Badge>
        <div className="w-full h-20 rounded-xl border border-border" style={{ backgroundColor: colorNames[target] }} />
        <div className="flex gap-2 justify-center flex-wrap">
          {options.map((o) => <Button key={o} onClick={() => guess(o)} variant="outline" size="sm">{o}</Button>)}
        </div>
        {feedback && <p className={`text-center text-sm font-bold ${feedback.startsWith("Correct") ? "text-accent" : "text-destructive"}`}>{feedback}</p>}
      </CardContent>
    </Card>
  );
};

// ─── Typing Speed ───
export const TypingSpeed = () => {
  const words = ["minecraft", "diamond", "creeper", "enchant", "potion", "nether", "dragon", "beacon", "redstone", "obsidian", "emerald", "village", "fortress", "blaze", "wither"];
  const [current, setCurrent] = useState("");
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [playing, setPlaying] = useState(false);

  const start = () => { setScore(0); setTimeLeft(20); setPlaying(true); setCurrent(words[Math.floor(Math.random() * words.length)]); setInput(""); };

  useEffect(() => {
    if (!playing || timeLeft <= 0) return;
    const t = setInterval(() => setTimeLeft((v) => { if (v <= 1) { setPlaying(false); return 0; } return v - 1; }), 1000);
    return () => clearInterval(t);
  }, [playing, timeLeft]);

  const handleInput = (val: string) => {
    setInput(val);
    if (val.toLowerCase() === current.toLowerCase()) {
      setScore((s) => s + 1);
      setCurrent(words[Math.floor(Math.random() * words.length)]);
      setInput("");
    }
  };

  return (
    <Card className="backdrop-blur-sm bg-card/50 border-2 border-border hover:border-accent transition-all duration-300 h-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2"><Type className="h-5 w-5 text-accent" />Typing Speed</CardTitle>
        <CardDescription>Type the Minecraft word quickly!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between"><Badge variant="secondary">Words: {score}</Badge><Badge variant="outline">{timeLeft}s</Badge></div>
        {!playing ? (
          <div className="text-center py-4 space-y-2">
            {timeLeft === 0 && <p className="text-xl font-bold text-primary">{score} words!</p>}
            <Button onClick={start} className="bg-gradient-to-r from-accent to-primary">{timeLeft === 0 ? "Again" : "Start"}</Button>
          </div>
        ) : (
          <>
            <p className="text-2xl font-black text-center text-primary tracking-wider">{current}</p>
            <Input value={input} onChange={(e) => handleInput(e.target.value)} placeholder="Type here..." className="text-center bg-muted/50" autoFocus />
          </>
        )}
      </CardContent>
    </Card>
  );
};
