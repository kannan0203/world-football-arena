import { motion } from "framer-motion";

const matches = [
  { home: "Real Madrid", homeFlag: "🇪🇸", away: "Barcelona", awayFlag: "🇪🇸", homeScore: 3, awayScore: 1, comp: "La Liga", date: "Oct 28, 2024", motm: "Vinícius Jr", stadium: "Santiago Bernabéu" },
  { home: "Man City", homeFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", away: "Arsenal", awayFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", homeScore: 2, awayScore: 0, comp: "Premier League", date: "Oct 20, 2024", motm: "Haaland", stadium: "Etihad Stadium" },
  { home: "PSG", homeFlag: "🇫🇷", away: "Bayern Munich", awayFlag: "🇩🇪", homeScore: 1, awayScore: 1, comp: "UCL", date: "Nov 5, 2024", motm: "Mbappé", stadium: "Parc des Princes" },
  { home: "Brazil", homeFlag: "🇧🇷", away: "Argentina", awayFlag: "🇦🇷", homeScore: 2, awayScore: 1, comp: "Friendly", date: "Nov 12, 2024", motm: "Vinícius Jr", stadium: "Maracanã" },
  { home: "Liverpool", homeFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", away: "Chelsea", awayFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", homeScore: 3, awayScore: 2, comp: "Premier League", date: "Oct 15, 2024", motm: "Salah", stadium: "Anfield" },
  { home: "Juventus", homeFlag: "🇮🇹", away: "Inter Milan", awayFlag: "🇮🇹", homeScore: 0, awayScore: 1, comp: "Serie A", date: "Nov 3, 2024", motm: "Lautaro", stadium: "Allianz Stadium" },
  { home: "Dortmund", homeFlag: "🇩🇪", away: "Bayern Munich", awayFlag: "🇩🇪", homeScore: 2, awayScore: 2, comp: "Bundesliga", date: "Nov 10, 2024", motm: "Musiala", stadium: "Signal Iduna Park" },
  { home: "France", homeFlag: "🇫🇷", away: "England", awayFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", homeScore: 1, awayScore: 0, comp: "Nations League", date: "Nov 14, 2024", motm: "Mbappé", stadium: "Stade de France" },
];

const MatchResults = () => (
  <section id="matches" className="py-20 px-4 hexagon-bg">
    <div className="max-w-5xl mx-auto">
      <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="font-heading text-5xl md:text-7xl text-center text-football-neon neon-text mb-12">
        LATEST RESULTS
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {matches.map((m, i) => {
          const isDraw = m.homeScore === m.awayScore;
          const homeWin = m.homeScore > m.awayScore;
          let glow = "";
          if (isDraw) glow = "shadow-[inset_4px_0_0_#FFD700,inset_-4px_0_0_#FFD700]";
          else if (homeWin) glow = "shadow-[inset_4px_0_0_#00FF41]";
          else glow = "shadow-[inset_-4px_0_0_#00FF41]";

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`card-football rounded-lg p-4 ${glow}`}
            >
              <div className="flex items-center justify-between">
                <div className="text-center flex-1">
                  <div className="text-lg">{m.homeFlag}</div>
                  <p className="font-heading text-sm text-football-neon">{m.home}</p>
                </div>
                <div className="font-heading text-3xl text-football-neon neon-text px-4">
                  {m.homeScore} - {m.awayScore}
                </div>
                <div className="text-center flex-1">
                  <div className="text-lg">{m.awayFlag}</div>
                  <p className="font-heading text-sm text-football-neon">{m.away}</p>
                </div>
              </div>
              <div className="mt-2 flex justify-between text-[10px] font-body text-football-neon/40">
                <span>{m.comp}</span>
                <span>⭐ {m.motm}</span>
                <span>{m.date}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default MatchResults;
