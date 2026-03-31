import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  { q: "Who has won the most Ballon d'Or awards?", options: ["Ronaldo", "Messi", "Pelé", "Cruyff"], answer: 1 },
  { q: "Who won the 2022 FIFA World Cup?", options: ["France", "Brazil", "Argentina", "Germany"], answer: 2 },
  { q: "Which club has won the most UCL titles?", options: ["AC Milan", "Barcelona", "Real Madrid", "Bayern"], answer: 2 },
  { q: "When was FIFA founded?", options: ["1900", "1904", "1910", "1920"], answer: 1 },
  { q: "Who scored the 'Hand of God' goal?", options: ["Pelé", "Messi", "Maradona", "Zidane"], answer: 2 },
  { q: "Who is CR7?", options: ["Cristiano Ronaldo", "Carlos Ramos", "Cafu Ronaldo", "Carlos Rivaldo"], answer: 0 },
  { q: "Which country invented modern football?", options: ["Brazil", "Spain", "England", "Italy"], answer: 2 },
  { q: "2022 World Cup Golden Boot winner?", options: ["Messi", "Mbappé", "Giroud", "Ronaldo"], answer: 1 },
  { q: "What does UEFA stand for?", options: ["Union European Football Association", "Union of European Football Associations", "United European Football Alliance", "Universal European Football Association"], answer: 1 },
  { q: "Brazil's all-time top scorer?", options: ["Ronaldo", "Pelé", "Neymar", "Romário"], answer: 2 },
  { q: "First African nation to reach WC semi-final?", options: ["Ghana", "Cameroon", "Morocco", "Nigeria"], answer: 2 },
  { q: "Most Premier League goals all-time?", options: ["Rooney", "Henry", "Alan Shearer", "Lampard"], answer: 2 },
  { q: "Which player famously wore #10 for Brazil?", options: ["Ronaldo", "Pelé", "Cafu", "Roberto Carlos"], answer: 1 },
  { q: "Youngest World Cup winner ever?", options: ["Mbappé", "Pelé", "Ronaldo", "Owen"], answer: 1 },
  { q: "Which country has won the most World Cups?", options: ["Germany", "Italy", "Argentina", "Brazil"], answer: 3 },
];

const ranks = [
  { min: 0, max: 40, label: "SUNDAY LEAGUE PLAYER", emoji: "😅" },
  { min: 41, max: 80, label: "SEMI PRO", emoji: "💪" },
  { min: 81, max: 110, label: "PROFESSIONAL", emoji: "⚡" },
  { min: 111, max: 130, label: "WORLD CLASS", emoji: "🌟" },
  { min: 131, max: 150, label: "FOOTBALL LEGEND", emoji: "👑" },
];

const FootballQuiz = () => {
  const [state, setState] = useState<"idle" | "playing" | "done">("idle");
  const [qi, setQi] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(20);
  const [selected, setSelected] = useState<number | null>(null);
  const [shake, setShake] = useState(false);

  const nextQ = useCallback(() => {
    if (qi + 1 >= questions.length) { setState("done"); return; }
    setQi(q => q + 1);
    setTimer(20);
    setSelected(null);
  }, [qi]);

  useEffect(() => {
    if (state !== "playing" || selected !== null) return;
    if (timer <= 0) { setShake(true); setTimeout(() => { setShake(false); nextQ(); }, 1500); return; }
    const t = setTimeout(() => setTimer(v => v - 1), 1000);
    return () => clearTimeout(t);
  }, [timer, state, selected, nextQ]);

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === questions[qi].answer) setScore(s => s + 10);
    else setShake(true);
    setTimeout(() => { setShake(false); nextQ(); }, 1500);
  };

  const getRank = () => ranks.find(r => score >= r.min && score <= r.max) || ranks[0];

  if (state === "idle") {
    return (
      <section id="quiz" className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-5xl md:text-7xl text-football-neon neon-text mb-6">FOOTBALL GENIUS CHALLENGE</h2>
          <p className="font-body text-football-cyan mb-8">15 questions · 20 seconds each · Can you reach Legend status?</p>
          <button onClick={() => { setState("playing"); setQi(0); setScore(0); setTimer(20); setSelected(null); }}
            className="font-heading text-xl tracking-widest px-10 py-3 border-2 border-football-neon text-football-neon hover:bg-football-neon hover:text-football-dark transition-all rounded-sm">
            START QUIZ
          </button>
        </div>
      </section>
    );
  }

  if (state === "done") {
    const rank = getRank();
    return (
      <section id="quiz" className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-5xl text-football-gold neon-text-gold mb-4">QUIZ COMPLETE!</h2>
          <div className="font-heading text-8xl text-football-neon neon-text">{score}</div>
          <p className="font-heading text-sm text-football-neon/50">/ {questions.length * 10} POINTS</p>
          <div className="mt-6 font-heading text-3xl text-football-gold">{rank.emoji} {rank.label}</div>
          {score > 130 && <div className="mt-4 text-4xl animate-bounce">🎉🏆🎉</div>}
          <button onClick={() => setState("idle")}
            className="mt-8 font-heading text-lg tracking-widest px-8 py-2 border-2 border-football-neon text-football-neon hover:bg-football-neon hover:text-football-dark transition-all rounded-sm">
            PLAY AGAIN
          </button>
        </div>
      </section>
    );
  }

  const q = questions[qi];
  return (
    <section id="quiz" className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-4 font-heading text-sm text-football-neon/60">
          <span>Q{qi + 1}/{questions.length}</span>
          <span>SCORE: {score}</span>
        </div>
        {/* Timer bar */}
        <div className="h-1.5 bg-football-neon/10 rounded-full mb-6 overflow-hidden">
          <motion.div
            className="h-full bg-football-neon rounded-full"
            initial={{ width: "100%" }}
            animate={{ width: `${(timer / 20) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={qi} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
            className={shake ? "animate-[shake_0.3s_ease-in-out]" : ""}>
            <h3 className="font-heading text-2xl md:text-3xl text-football-neon mb-6">{q.q}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {q.options.map((opt, idx) => {
                let cls = "card-football border border-football-neon/20 rounded-lg px-4 py-3 font-body text-football-neon cursor-pointer transition-all hover:border-football-neon/60";
                if (selected !== null) {
                  if (idx === q.answer) cls += " !border-green-400 !bg-green-400/10";
                  else if (idx === selected) cls += " !border-football-red !bg-football-red/10";
                }
                return (
                  <button key={idx} onClick={() => handleAnswer(idx)} className={cls} disabled={selected !== null}>
                    {opt}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FootballQuiz;
