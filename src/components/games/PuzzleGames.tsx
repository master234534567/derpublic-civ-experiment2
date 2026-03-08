import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Grid3x3, Layers, Eye, Puzzle, RotateCcw, Trophy } from "lucide-react";

// ─── Memory Match ───
export const MemoryMatch = () => {
  const emojis = ["⚔️", "🛡️", "💎", "🏰", "🔥", "⭐", "🎯", "👑"];
  const [cards, setCards] = useState<{ emoji: string; flipped: boolean; matched: boolean }[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matched, setMatched] = useState(0);

  const init = useCallback(() => {
    const shuffled = [...emojis, ...emojis].sort(() => Math.random() - 0.5).map((emoji) => ({ emoji, flipped: false, matched: false }));
    setCards(shuffled);
    setFlipped([]);
    setMoves(0);
    setMatched(0);
  }, []);

  useEffect(() => { init(); }, [init]);

  const flip = (i: number) => {
    if (flipped.length >= 2 || cards[i].flipped || cards[i].matched) return;
    const newCards = [...cards];
    newCards[i].flipped = true;
    setCards(newCards);
    const newFlipped = [...flipped, i];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      if (newCards[newFlipped[0]].emoji === newCards[newFlipped[1]].emoji) {
        newCards[newFlipped[0]].matched = true;
        newCards[newFlipped[1]].matched = true;
        setCards(newCards);
        setMatched((m) => m + 1);
        setFlipped([]);
      } else {
        setTimeout(() => {
          newCards[newFlipped[0]].flipped = false;
          newCards[newFlipped[1]].flipped = false;
          setCards([...newCards]);
          setFlipped([]);
        }, 800);
      }
    }
  };

  return (
    <Card className="backdrop-blur-sm bg-card/50 border-2 border-border hover:border-primary transition-all duration-300 h-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2"><Layers className="h-5 w-5 text-primary" />Memory Match</CardTitle>
        <CardDescription>Flip cards to find matching pairs</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between"><Badge variant="secondary">Moves: {moves}</Badge><Badge variant="outline">Matched: {matched}/8</Badge></div>
        {matched === 8 ? (
          <div className="text-center py-4 space-y-2">
            <Trophy className="h-10 w-10 text-primary mx-auto" />
            <p className="font-bold text-primary">Completed in {moves} moves!</p>
            <Button onClick={init} variant="outline" size="sm"><RotateCcw className="h-3 w-3 mr-1" />Again</Button>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-1.5">
            {cards.map((c, i) => (
              <motion.button key={i} whileTap={{ scale: 0.95 }} onClick={() => flip(i)} className={`aspect-square rounded-lg text-lg flex items-center justify-center transition-all ${c.flipped || c.matched ? "bg-primary/20 border border-primary/40" : "bg-muted/50 border border-border hover:bg-muted/80"}`}>
                {(c.flipped || c.matched) ? c.emoji : "?"}
              </motion.button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// ─── Tic Tac Toe ───
export const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [xTurn, setXTurn] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  const checkWin = (b: string[]) => {
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (const [a, bI, c] of lines) if (b[a] && b[a] === b[bI] && b[a] === b[c]) return b[a];
    return b.every(Boolean) ? "Draw" : null;
  };

  const play = (i: number) => {
    if (board[i] || winner) return;
    const newBoard = [...board];
    newBoard[i] = "X";
    let w = checkWin(newBoard);
    if (!w) {
      const empty = newBoard.map((v, idx) => v === "" ? idx : -1).filter((v) => v >= 0);
      if (empty.length > 0) { newBoard[empty[Math.floor(Math.random() * empty.length)]] = "O"; w = checkWin(newBoard); }
    }
    setBoard(newBoard);
    setWinner(w);
  };

  const reset = () => { setBoard(Array(9).fill("")); setXTurn(true); setWinner(null); };

  return (
    <Card className="backdrop-blur-sm bg-card/50 border-2 border-border hover:border-accent transition-all duration-300 h-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2"><Grid3x3 className="h-5 w-5 text-accent" />Tic Tac Toe</CardTitle>
        <CardDescription>Beat the computer (you're X)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-3 gap-1.5 max-w-[200px] mx-auto">
          {board.map((cell, i) => (
            <motion.button key={i} whileTap={{ scale: 0.9 }} onClick={() => play(i)} className={`aspect-square rounded-lg text-xl font-bold flex items-center justify-center border transition-all ${cell === "X" ? "bg-primary/20 text-primary border-primary/40" : cell === "O" ? "bg-destructive/20 text-destructive border-destructive/40" : "bg-muted/30 border-border hover:bg-muted/60"}`}>
              {cell}
            </motion.button>
          ))}
        </div>
        {winner && (
          <div className="text-center space-y-2">
            <p className="font-bold text-foreground">{winner === "Draw" ? "It's a draw!" : winner === "X" ? "You win!" : "Computer wins!"}</p>
            <Button onClick={reset} variant="outline" size="sm"><RotateCcw className="h-3 w-3 mr-1" />Again</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// ─── Simon Says ───
export const SimonSays = () => {
  const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500"];
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSeq, setPlayerSeq] = useState<number[]>([]);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [phase, setPhase] = useState<"idle" | "showing" | "input" | "fail">("idle");
  const [score, setScore] = useState(0);

  const showSequence = async (seq: number[]) => {
    setPhase("showing");
    for (let i = 0; i < seq.length; i++) {
      await new Promise((r) => setTimeout(r, 400));
      setActiveIdx(seq[i]);
      await new Promise((r) => setTimeout(r, 400));
      setActiveIdx(null);
    }
    setPhase("input");
    setPlayerSeq([]);
  };

  const start = () => {
    const first = [Math.floor(Math.random() * 4)];
    setSequence(first);
    setScore(0);
    showSequence(first);
  };

  const handleClick = (i: number) => {
    if (phase !== "input") return;
    const newSeq = [...playerSeq, i];
    setPlayerSeq(newSeq);
    if (i !== sequence[newSeq.length - 1]) { setPhase("fail"); return; }
    if (newSeq.length === sequence.length) {
      const next = [...sequence, Math.floor(Math.random() * 4)];
      setSequence(next);
      setScore(next.length - 1);
      setTimeout(() => showSequence(next), 600);
    }
  };

  return (
    <Card className="backdrop-blur-sm bg-card/50 border-2 border-border hover:border-secondary transition-all duration-300 h-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2"><Eye className="h-5 w-5 text-secondary" />Simon Says</CardTitle>
        <CardDescription>Repeat the color pattern</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Badge variant="secondary">Score: {score}</Badge>
        <div className="grid grid-cols-2 gap-2 max-w-[180px] mx-auto">
          {colors.map((color, i) => (
            <motion.button key={i} whileTap={{ scale: 0.9 }} onClick={() => handleClick(i)} className={`aspect-square rounded-lg transition-all ${color} ${activeIdx === i ? "opacity-100 scale-105 shadow-lg" : "opacity-40"}`} />
          ))}
        </div>
        {phase === "idle" && <div className="text-center"><Button onClick={start} size="sm" className="bg-gradient-to-r from-secondary to-primary">Start</Button></div>}
        {phase === "fail" && (
          <div className="text-center space-y-2">
            <p className="font-bold text-destructive">Wrong! Score: {score}</p>
            <Button onClick={start} variant="outline" size="sm"><RotateCcw className="h-3 w-3 mr-1" />Retry</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// ─── Pattern Match ───
export const PatternMatch = () => {
  const [pattern, setPattern] = useState<number[]>([]);
  const [options, setOptions] = useState<number[][]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  const generate = useCallback(() => {
    const base = Math.floor(Math.random() * 5) + 1;
    const step = Math.floor(Math.random() * 4) + 1;
    const seq = Array.from({ length: 4 }, (_, i) => base + step * i);
    const answer = base + step * 4;
    const wrong1 = answer + Math.floor(Math.random() * 3) + 1;
    const wrong2 = answer - Math.floor(Math.random() * 3) - 1;
    const opts = [answer, wrong1, wrong2].sort(() => Math.random() - 0.5);
    setPattern(seq);
    setOptions([opts]);
    setFeedback(null);
    return answer;
  }, []);

  const [correctAnswer, setCorrectAnswer] = useState(0);

  useEffect(() => { setCorrectAnswer(generate()); }, [generate]);

  const handleAnswer = (val: number) => {
    if (val === correctAnswer) {
      setScore((s) => s + 1);
      setFeedback("Correct!");
      setTimeout(() => setCorrectAnswer(generate()), 600);
    } else {
      setFeedback("Wrong!");
      setScore(0);
    }
  };

  return (
    <Card className="backdrop-blur-sm bg-card/50 border-2 border-border hover:border-primary transition-all duration-300 h-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2"><Puzzle className="h-5 w-5 text-primary" />Pattern Match</CardTitle>
        <CardDescription>Find the next number in the sequence</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Badge variant="secondary">Streak: {score}</Badge>
        <div className="flex items-center gap-2 justify-center">
          {pattern.map((n, i) => (
            <span key={i} className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center font-bold text-primary">{n}</span>
          ))}
          <span className="w-10 h-10 rounded-lg bg-muted/50 border border-dashed border-muted-foreground flex items-center justify-center font-bold text-muted-foreground">?</span>
        </div>
        <div className="flex gap-2 justify-center">
          {options[0]?.map((opt) => (
            <Button key={opt} onClick={() => handleAnswer(opt)} variant="outline" size="sm">{opt}</Button>
          ))}
        </div>
        {feedback && <p className={`text-center text-sm font-bold ${feedback === "Correct!" ? "text-accent" : "text-destructive"}`}>{feedback}</p>}
      </CardContent>
    </Card>
  );
};
