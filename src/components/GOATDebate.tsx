import { useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { label: "Career Goals", messi: 830, ronaldo: 900 },
  { label: "Assists", messi: 380, ronaldo: 250 },
  { label: "Trophies", messi: 44, ronaldo: 35 },
  { label: "Ballon d'Or", messi: 8, ronaldo: 5 },
  { label: "World Cups", messi: 1, ronaldo: 0 },
  { label: "UCL Titles", messi: 4, ronaldo: 5 },
  { label: "Club Goals", messi: 720, ronaldo: 770 },
  { label: "Int'l Goals", messi: 110, ronaldo: 130 },
];

const GOATDebate = () => {
  const [messiVotes, setMessiVotes] = useState(52);
  const [ronaldoVotes, setRonaldoVotes] = useState(48);
  const [voted, setVoted] = useState(false);

  const vote = (who: "messi" | "ronaldo") => {
    if (voted) return;
    setVoted(true);
    if (who === "messi") setMessiVotes(v => v + 1);
    else setRonaldoVotes(v => v + 1);
  };

  const total = messiVotes + ronaldoVotes;
  const messiPct = Math.round((messiVotes / total) * 100);
  const ronaldoPct = 100 - messiPct;

  return (
    <section id="goat" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="font-heading text-5xl md:text-7xl text-center text-football-gold neon-text-gold mb-12">
          THE ETERNAL DEBATE
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Messi */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="card-football rounded-lg p-6 text-center border border-football-gold/30">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-2 border-football-gold">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg/440px-Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg"
                alt="Messi" className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            </div>
            <h3 className="font-heading text-3xl text-football-gold">LIONEL MESSI</h3>
            <p className="font-body text-football-neon/60 text-sm">🇦🇷 Argentina · The Magician</p>
            <button onClick={() => vote("messi")} disabled={voted}
              className="mt-4 font-heading tracking-widest px-6 py-2 border-2 border-football-gold text-football-gold hover:bg-football-gold hover:text-football-dark transition-all rounded-sm disabled:opacity-50">
              VOTE MESSI
            </button>
          </motion.div>
          {/* Ronaldo */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="card-football rounded-lg p-6 text-center border border-blue-500/30">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-2 border-blue-500">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Cristiano_Ronaldo_2018.jpg/440px-Cristiano_Ronaldo_2018.jpg"
                alt="Ronaldo" className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            </div>
            <h3 className="font-heading text-3xl text-blue-400">CRISTIANO RONALDO</h3>
            <p className="font-body text-football-neon/60 text-sm">🇵🇹 Portugal · The Machine</p>
            <button onClick={() => vote("ronaldo")} disabled={voted}
              className="mt-4 font-heading tracking-widest px-6 py-2 border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition-all rounded-sm disabled:opacity-50">
              VOTE RONALDO
            </button>
          </motion.div>
        </div>

        {/* Vote bar */}
        <div className="mb-8">
          <div className="flex justify-between font-heading text-sm mb-1">
            <span className="text-football-gold">MESSI {messiPct}%</span>
            <span className="text-blue-400">RONALDO {ronaldoPct}%</span>
          </div>
          <div className="h-4 rounded-full overflow-hidden flex bg-football-card border border-football-neon/10">
            <motion.div className="bg-football-gold h-full" animate={{ width: `${messiPct}%` }} transition={{ duration: 0.5 }} />
            <motion.div className="bg-blue-500 h-full" animate={{ width: `${ronaldoPct}%` }} transition={{ duration: 0.5 }} />
          </div>
        </div>

        {/* Stats comparison */}
        <div className="space-y-3">
          {stats.map((s) => {
            const max = Math.max(s.messi, s.ronaldo);
            return (
              <div key={s.label} className="flex items-center gap-2 font-body text-sm">
                <div className="flex-1 flex justify-end items-center gap-2">
                  <span className="text-football-gold font-heading">{s.messi}</span>
                  <div className="w-24 md:w-40 h-2 bg-football-neon/10 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-football-gold rounded-full ml-auto"
                      initial={{ width: 0 }} whileInView={{ width: `${(s.messi / max) * 100}%` }}
                      viewport={{ once: true }} transition={{ duration: 1 }} />
                  </div>
                </div>
                <span className="w-24 text-center text-football-neon/60 text-xs">{s.label}</span>
                <div className="flex-1 flex items-center gap-2">
                  <div className="w-24 md:w-40 h-2 bg-football-neon/10 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-blue-500 rounded-full"
                      initial={{ width: 0 }} whileInView={{ width: `${(s.ronaldo / max) * 100}%` }}
                      viewport={{ once: true }} transition={{ duration: 1 }} />
                  </div>
                  <span className="text-blue-400 font-heading">{s.ronaldo}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GOATDebate;
