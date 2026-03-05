import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Merge, Trophy, CheckCircle, XCircle, Zap, RotateCcw } from "lucide-react";

// ==================== RULES QUIZ ====================
const quizQuestions = [
  { q: "Is NSFW content allowed on the Discord server?", a: false },
  { q: "Must all channel discussions be in English?", a: true },
  { q: "Can you advertise in DMs through Derpublic?", a: false },
  { q: "Do you need to be at least 13 years old to join?", a: true },
  { q: "Is it okay to ping staff whenever you want?", a: false },
  { q: "Can you use clients to see deleted messages?", a: false },
  { q: "Must you record your POV during certain events?", a: true },
  { q: "Can you request general help in Minecraft chat?", a: false },
  { q: "Is Simple Voice Chat sometimes required for events?", a: true },
  { q: "Can you reveal personal information about other players?", a: false },
];

const RulesQuiz = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<boolean | null>(null);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (answer: boolean) => {
    if (answered !== null) return;
    const correct = answer === quizQuestions[currentQ].a;
    if (correct) setScore(s => s + 1);
    setAnswered(correct);
    setTimeout(() => {
      if (currentQ + 1 >= quizQuestions.length) {
        setFinished(true);
      } else {
        setCurrentQ(c => c + 1);
        setAnswered(null);
      }
    }, 1000);
  };

  const reset = () => { setCurrentQ(0); setScore(0); setAnswered(null); setFinished(false); };

  return (
    <Card className="backdrop-blur-sm bg-card/50 border-2 border-border hover:border-primary transition-all duration-300 h-full">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-3">
          <Brain className="h-7 w-7 text-primary" />
          Rules Quiz
        </CardTitle>
        <CardDescription>Test your knowledge of the server rules!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {finished ? (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-4">
            <Trophy className="h-16 w-16 text-primary mx-auto" />
            <p className="text-3xl font-bold text-primary">{score}/{quizQuestions.length}</p>
            <p className="text-muted-foreground">{score >= 8 ? "Rule Expert! 🏆" : score >= 5 ? "Not bad! 📖" : "Read the rules again! 📚"}</p>
            <Button onClick={reset} variant="outline" className="gap-2"><RotateCcw className="h-4 w-4" /> Try Again</Button>
          </motion.div>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <Badge variant="secondary">{currentQ + 1}/{quizQuestions.length}</Badge>
              <Badge variant="outline">Score: {score}</Badge>
            </div>
            <AnimatePresence mode="wait">
              <motion.p key={currentQ} initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="text-lg font-medium min-h-[3rem]">
                {quizQuestions[currentQ].q}
              </motion.p>
            </AnimatePresence>
            <div className="flex gap-3">
              <Button onClick={() => handleAnswer(true)} className="flex-1 gap-2" variant={answered !== null ? (quizQuestions[currentQ].a ? "default" : "outline") : "outline"}>
                <CheckCircle className="h-4 w-4" /> True
              </Button>
              <Button onClick={() => handleAnswer(false)} className="flex-1 gap-2" variant={answered !== null ? (!quizQuestions[currentQ].a ? "default" : "outline") : "outline"}>
                <XCircle className="h-4 w-4" /> False
              </Button>
            </div>
            {answered !== null && (
              <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className={`text-center font-semibold ${answered ? "text-accent" : "text-destructive"}`}>
                {answered ? "Correct! ✅" : "Wrong! ❌"}
              </motion.p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

// ==================== MERGE GAME ====================
type MergeTile = { id: number; value: number; x: number; y: number };

const GRID = 4;
const MergeGame = () => {
  const [tiles, setTiles] = useState<MergeTile[]>([]);
  const [mergeScore, setMergeScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const spawnTile = useCallback((current: MergeTile[]): MergeTile[] => {
    const occupied = new Set(current.map(t => `${t.x},${t.y}`));
    const empty: [number, number][] = [];
    for (let x = 0; x < GRID; x++) for (let y = 0; y < GRID; y++) if (!occupied.has(`${x},${y}`)) empty.push([x, y]);
    if (empty.length === 0) return current;
    const [nx, ny] = empty[Math.floor(Math.random() * empty.length)];
    return [...current, { id: Date.now() + Math.random(), value: Math.random() < 0.9 ? 2 : 4, x: nx, y: ny }];
  }, []);

  const initGame = useCallback(() => {
    let t: MergeTile[] = [];
    t = spawnTile(t);
    t = spawnTile(t);
    setTiles(t);
    setMergeScore(0);
    setGameOver(false);
  }, [spawnTile]);

  useEffect(() => { initGame(); }, [initGame]);

  const move = useCallback((dx: number, dy: number) => {
    if (gameOver) return;
    let newTiles = tiles.map(t => ({ ...t }));
    let scored = 0;
    const sortFn = (a: MergeTile, b: MergeTile) => {
      if (dx === 1) return b.x - a.x;
      if (dx === -1) return a.x - b.x;
      if (dy === 1) return b.y - a.y;
      return a.y - b.y;
    };
    newTiles.sort(sortFn);
    const merged = new Set<number>();
    for (const tile of newTiles) {
      let nx = tile.x, ny = tile.y;
      while (true) {
        const nnx = nx + dx, nny = ny + dy;
        if (nnx < 0 || nnx >= GRID || nny < 0 || nny >= GRID) break;
        const blocker = newTiles.find(t => t !== tile && t.x === nnx && t.y === nny);
        if (blocker) {
          if (blocker.value === tile.value && !merged.has(blocker.id) && !merged.has(tile.id)) {
            blocker.value *= 2;
            scored += blocker.value;
            merged.add(tile.id);
            nx = nnx; ny = nny;
          }
          break;
        }
        nx = nnx; ny = nny;
      }
      tile.x = nx; tile.y = ny;
    }
    newTiles = newTiles.filter(t => !merged.has(t.id));
    const moved = JSON.stringify(tiles.map(t => [t.x, t.y, t.value]).sort()) !== JSON.stringify(newTiles.map(t => [t.x, t.y, t.value]).sort());
    if (moved) {
      newTiles = spawnTile(newTiles);
      setMergeScore(s => s + scored);
    }
    // Check game over
    const occupied = new Set(newTiles.map(t => `${t.x},${t.y}`));
    if (occupied.size >= GRID * GRID) {
      let canMove = false;
      for (const t of newTiles) {
        for (const [ddx, ddy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
          const neighbor = newTiles.find(n => n.x === t.x + ddx && n.y === t.y + ddy);
          if (neighbor && neighbor.value === t.value) canMove = true;
        }
      }
      if (!canMove) setGameOver(true);
    }
    setTiles(newTiles);
  }, [tiles, gameOver, spawnTile]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") move(0, -1);
      else if (e.key === "ArrowDown") move(0, 1);
      else if (e.key === "ArrowLeft") move(-1, 0);
      else if (e.key === "ArrowRight") move(1, 0);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [move]);

  // Touch support
  const [touchStart, setTouchStart] = useState<{x:number,y:number}|null>(null);
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart({x: e.touches[0].clientX, y: e.touches[0].clientY});
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const dx = e.changedTouches[0].clientX - touchStart.x;
    const dy = e.changedTouches[0].clientY - touchStart.y;
    if (Math.abs(dx) > Math.abs(dy)) move(dx > 0 ? 1 : -1, 0);
    else move(0, dy > 0 ? 1 : -1);
    setTouchStart(null);
  };

  const tileColor = (v: number) => {
    const colors: Record<number, string> = {
      2: "bg-muted text-foreground", 4: "bg-muted text-foreground",
      8: "bg-primary/30 text-primary", 16: "bg-primary/50 text-primary-foreground",
      32: "bg-primary/70 text-primary-foreground", 64: "bg-primary text-primary-foreground",
      128: "bg-secondary/70 text-secondary-foreground", 256: "bg-secondary text-secondary-foreground",
      512: "bg-accent/70 text-accent-foreground", 1024: "bg-accent text-accent-foreground",
      2048: "bg-destructive text-destructive-foreground",
    };
    return colors[v] || "bg-primary text-primary-foreground";
  };

  return (
    <Card className="backdrop-blur-sm bg-card/50 border-2 border-border hover:border-secondary transition-all duration-300 h-full">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-3">
          <Merge className="h-7 w-7 text-secondary" />
          2048 Merge
        </CardTitle>
        <CardDescription>Use arrow keys or swipe to merge tiles!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center">
          <Badge variant="secondary">Score: {mergeScore}</Badge>
          <Button size="sm" variant="outline" onClick={initGame} className="gap-1"><RotateCcw className="h-3 w-3" /> Reset</Button>
        </div>
        <div
          className="grid grid-cols-4 gap-1.5 bg-muted/50 p-2 rounded-lg aspect-square"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {Array.from({ length: GRID * GRID }).map((_, i) => {
            const x = i % GRID, y = Math.floor(i / GRID);
            const tile = tiles.find(t => t.x === x && t.y === y);
            return (
              <div key={i} className="bg-muted/30 rounded flex items-center justify-center aspect-square">
                <AnimatePresence mode="popLayout">
                  {tile && (
                    <motion.div
                      key={tile.id + "-" + tile.value}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`w-full h-full rounded flex items-center justify-center font-bold text-xs sm:text-sm ${tileColor(tile.value)}`}
                    >
                      {tile.value}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
        {gameOver && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-destructive font-bold">
            Game Over! Final Score: {mergeScore}
          </motion.p>
        )}
      </CardContent>
    </Card>
  );
};

// ==================== WIN STREAK GAME ====================
const WinStreakGame = () => {
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [target, setTarget] = useState<number | null>(null);
  const [grid, setGrid] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const startRound = useCallback(() => {
    const t = Math.floor(Math.random() * 9) + 1;
    const g = Array.from({ length: 9 }, () => Math.floor(Math.random() * 9) + 1);
    // Ensure target exists
    g[Math.floor(Math.random() * 9)] = t;
    setTarget(t);
    setGrid(g);
    setTimeLeft(3000);
    setPlaying(true);
    setFeedback(null);
  }, []);

  useEffect(() => {
    if (!playing || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 50) {
          setPlaying(false);
          setFeedback("Too slow! 💨");
          setStreak(0);
          return 0;
        }
        return t - 50;
      });
    }, 50);
    return () => clearInterval(timer);
  }, [playing, timeLeft]);

  const handleClick = (val: number) => {
    if (!playing) return;
    if (val === target) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);
      setFeedback("🔥 Streak!");
      setPlaying(false);
      setTimeout(startRound, 600);
    } else {
      setFeedback("Wrong! ❌");
      setStreak(0);
      setPlaying(false);
    }
  };

  return (
    <Card className="backdrop-blur-sm bg-card/50 border-2 border-border hover:border-accent transition-all duration-300 h-full">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-3">
          <Zap className="h-7 w-7 text-accent" />
          Win Streak
        </CardTitle>
        <CardDescription>Find the target number fast! Keep your streak alive! 🏆</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <Badge variant="outline" className="gap-1"><Trophy className="h-3 w-3" /> Best: {bestStreak}</Badge>
          <Badge variant="secondary" className="gap-1"><Zap className="h-3 w-3" /> Streak: {streak}</Badge>
        </div>

        {!playing && !feedback && (
          <div className="text-center py-6">
            <Button onClick={startRound} size="lg" className="gap-2 bg-gradient-to-r from-accent to-accent/80">
              <Zap className="h-5 w-5" /> Start Game
            </Button>
          </div>
        )}

        {(playing || feedback) && target !== null && (
          <>
            <div className="text-center">
              <p className="text-muted-foreground text-sm">Find the number:</p>
              <motion.p key={target} initial={{ scale: 2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-5xl font-black text-primary">
                {target}
              </motion.p>
            </div>
            {playing && (
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <motion.div className="h-full bg-accent" style={{ width: `${(timeLeft / 3000) * 100}%` }} />
              </div>
            )}
            <div className="grid grid-cols-3 gap-2">
              {grid.map((val, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleClick(val)}
                  disabled={!playing}
                  className="aspect-square rounded-lg bg-muted hover:bg-muted/80 text-foreground text-2xl font-bold transition-colors disabled:opacity-50"
                >
                  {val}
                </motion.button>
              ))}
            </div>
          </>
        )}

        {feedback && !playing && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-3">
            <p className="text-xl font-bold">{feedback}</p>
            <Button onClick={startRound} variant="outline" className="gap-2"><RotateCcw className="h-4 w-4" /> Play Again</Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

// ==================== MAIN EXPORT ====================
const MiniGames = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-transparent to-card/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Mini Games
          </h2>
          <p className="text-xl text-muted-foreground">
            Take a break and play some games!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.5 }}>
            <RulesQuiz />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.5 }}>
            <MergeGame />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.5 }}>
            <WinStreakGame />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MiniGames;
