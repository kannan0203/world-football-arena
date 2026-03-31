import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface Player {
  name: string;
  country: string;
  flag: string;
  position: string;
  overall: number;
  image: string;
  pace: number;
  shooting: number;
  dribbling: number;
  trophies: string;
  legend?: boolean;
  clubs: string;
  born: string;
  height: string;
  goals: string;
  famousQuote: string;
}

const players: Player[] = [
  { name: "Lionel Messi", country: "Argentina", flag: "🇦🇷", position: "FWD", overall: 94, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg/440px-Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg", pace: 85, shooting: 92, dribbling: 98, trophies: "WC 2022, UCL x4, Ballon d'Or x8", clubs: "Barcelona, PSG, Inter Miami", born: "June 24, 1987", height: "170cm", goals: "800+", famousQuote: "I start early, and I stay late, day after day." },
  { name: "Cristiano Ronaldo", country: "Portugal", flag: "🇵🇹", position: "FWD", overall: 93, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Cristiano_Ronaldo_2018.jpg/440px-Cristiano_Ronaldo_2018.jpg", pace: 89, shooting: 95, dribbling: 89, trophies: "UCL x5, Ballon d'Or x5", clubs: "Sporting, Man Utd, Real Madrid, Juventus, Al Nassr", born: "Feb 5, 1985", height: "187cm", goals: "900+", famousQuote: "Your love makes me strong, your hate makes me unstoppable." },
  { name: "Kylian Mbappé", country: "France", flag: "🇫🇷", position: "FWD", overall: 92, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/2019-07-17_SG_Dynamo_Dresden_vs._Paris_Saint-Germain_by_Sandro_Halank%E2%80%93074_%28cropped%29.jpg/440px-2019-07-17_SG_Dynamo_Dresden_vs._Paris_Saint-Germain_by_Sandro_Halank%E2%80%93074_%28cropped%29.jpg", pace: 99, shooting: 90, dribbling: 92, trophies: "WC 2018, Ligue 1 x6", clubs: "Monaco, PSG, Real Madrid", born: "Dec 20, 1998", height: "178cm", goals: "300+", famousQuote: "I always want to play and score goals." },
  { name: "Erling Haaland", country: "Norway", flag: "🇳🇴", position: "FWD", overall: 92, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Erling_Haaland_2023_%28cropped%29.jpg/440px-Erling_Haaland_2023_%28cropped%29.jpg", pace: 94, shooting: 96, dribbling: 80, trophies: "UCL 2023, PL 2023", clubs: "Salzburg, Dortmund, Man City", born: "Jul 21, 2000", height: "194cm", goals: "250+", famousQuote: "My goal is to be the best." },
  { name: "Vinícius Jr", country: "Brazil", flag: "🇧🇷", position: "FWD", overall: 91, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Vinicius_Junior_%282022%29.jpg/440px-Vinicius_Junior_%282022%29.jpg", pace: 97, shooting: 85, dribbling: 95, trophies: "UCL x2, La Liga x2", clubs: "Flamengo, Real Madrid", born: "Jul 12, 2000", height: "176cm", goals: "100+", famousQuote: "I play to make people happy." },
  { name: "Jude Bellingham", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "MID", overall: 90, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Jude_Bellingham_2022_%28cropped%29.jpg/440px-Jude_Bellingham_2022_%28cropped%29.jpg", pace: 82, shooting: 85, dribbling: 87, trophies: "La Liga 2024", clubs: "Birmingham, Dortmund, Real Madrid", born: "Jun 29, 2003", height: "186cm", goals: "60+", famousQuote: "I believe in hard work and dedication." },
  { name: "Pedri", country: "Spain", flag: "🇪🇸", position: "MID", overall: 89, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Pedri_2021_%28cropped%29.jpg/440px-Pedri_2021_%28cropped%29.jpg", pace: 78, shooting: 78, dribbling: 90, trophies: "Euro 2024, La Liga x2", clubs: "Las Palmas, Barcelona", born: "Nov 25, 2002", height: "174cm", goals: "30+", famousQuote: "Football is my life." },
  { name: "Kevin De Bruyne", country: "Belgium", flag: "🇧🇪", position: "MID", overall: 91, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Kevin_De_Bruyne_%282022%29.jpg/440px-Kevin_De_Bruyne_%282022%29.jpg", pace: 76, shooting: 86, dribbling: 88, trophies: "UCL 2023, PL x6", clubs: "Genk, Chelsea, Wolfsburg, Man City", born: "Jun 28, 1991", height: "181cm", goals: "120+", famousQuote: "I just try to play my game and help the team." },
  { name: "Mohamed Salah", country: "Egypt", flag: "🇪🇬", position: "FWD", overall: 90, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mohamed_Salah_2018.jpg/440px-Mohamed_Salah_2018.jpg", pace: 93, shooting: 90, dribbling: 91, trophies: "UCL 2019, PL 2020", clubs: "Basel, Chelsea, Fiorentina, Roma, Liverpool", born: "Jun 15, 1992", height: "175cm", goals: "250+", famousQuote: "I always try to be myself and play my football." },
  { name: "Lautaro Martínez", country: "Argentina", flag: "🇦🇷", position: "FWD", overall: 88, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Lautaro_Mart%C3%ADnez_2022.jpg/440px-Lautaro_Mart%C3%ADnez_2022.jpg", pace: 85, shooting: 88, dribbling: 82, trophies: "Serie A x2, Coppa Italia x2", clubs: "Racing Club, Inter Milan", born: "Aug 22, 1997", height: "174cm", goals: "150+", famousQuote: "I work hard every day to improve." },
  { name: "Jamal Musiala", country: "Germany", flag: "🇩🇪", position: "MID", overall: 87, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Jamal_Musiala_2022.jpg/440px-Jamal_Musiala_2022.jpg", pace: 88, shooting: 78, dribbling: 92, trophies: "UCL 2020, Bundesliga x2", clubs: "Bayern Munich", born: "Feb 26, 2003", height: "183cm", goals: "50+", famousQuote: "Football is my passion." },
  { name: "Bruno Fernandes", country: "Portugal", flag: "🇵🇹", position: "MID", overall: 88, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Bruno_Fernandes_2021.jpg/440px-Bruno_Fernandes_2021.jpg", pace: 75, shooting: 85, dribbling: 82, trophies: "EFL Cup 2020, FA Cup 2020", clubs: "Novara, Udinese, Sampdoria, Sporting CP, Man Utd", born: "Sep 8, 1994", height: "179cm", goals: "120+", famousQuote: "I always give my best." },
  { name: "Son Heung-min", country: "South Korea", flag: "🇰🇷", position: "FWD", overall: 89, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Son_Heung-min_2022.jpg/440px-Son_Heung-min_2022.jpg", pace: 92, shooting: 87, dribbling: 88, trophies: "AFC Asian Cup 2015, EFL Cup 2021", clubs: "Hamburger SV, Bayer Leverkusen, Tottenham", born: "Jul 8, 1992", height: "183cm", goals: "200+", famousQuote: "I want to be remembered as a great player." },
  { name: "Neymar Jr", country: "Brazil", flag: "🇧🇷", position: "FWD", overall: 92, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Neymar_2018.jpg/440px-Neymar_2018.jpg", pace: 91, shooting: 85, dribbling: 94, trophies: "UCL 2015, Ligue 1 x4, Copa América 2019", clubs: "Santos, Barcelona, PSG, Al Hilal", born: "Feb 5, 1992", height: "175cm", goals: "400+", famousQuote: "I am not a machine, I am a human being." },
  { name: "Virgil van Dijk", country: "Netherlands", flag: "🇳🇱", position: "DEF", overall: 90, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Virgil_van_Dijk_2019.jpg/440px-Virgil_van_Dijk_2019.jpg", pace: 75, shooting: 60, dribbling: 62, trophies: "UCL 2019, PL 2020, FA Cup 2022", clubs: "Groningen, Celtic, Southampton, Liverpool", born: "Jul 8, 1991", height: "193cm", goals: "50+", famousQuote: "I always try to be the best version of myself." },
  { name: "Alisson Becker", country: "Brazil", flag: "🇧🇷", position: "GK", overall: 89, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Alisson_2018.jpg/440px-Alisson_2018.jpg", pace: 86, shooting: 85, dribbling: 85, trophies: "UCL 2019, PL 2020, Copa América 2019", clubs: "Internacional, Roma, Liverpool", born: "Oct 2, 1992", height: "191cm", goals: "0", famousQuote: "I work hard to be the best goalkeeper." },
  { name: "Trent Alexander-Arnold", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "DEF", overall: 87, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Trent_Alexander-Arnold_2018.jpg/440px-Trent_Alexander-Arnold_2018.jpg", pace: 78, shooting: 78, dribbling: 78, trophies: "UCL 2019, PL 2020, FA Cup 2022", clubs: "Liverpool", born: "Oct 7, 1998", height: "175cm", goals: "20+", famousQuote: "I love playing football and representing my country." },
  { name: "Diego Maradona", country: "Argentina", flag: "🇦🇷", position: "FWD", overall: 99, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Diego_Maradona_2018_%28cropped%29.jpg/440px-Diego_Maradona_2018_%28cropped%29.jpg", pace: 87, shooting: 92, dribbling: 97, trophies: "WC 1986, Ballon d'Or 1986", legend: true, clubs: "Argentinos Juniors, Boca Juniors, Barcelona, Napoli, Sevilla", born: "Oct 30, 1960", height: "165cm", goals: "300+", famousQuote: "I am black or white, I'll never be grey in the drawings I made." },
  { name: "David Beckham", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "MID", overall: 95, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/David_Beckham_2010_%28cropped%29.jpg/440px-David_Beckham_2010_%28cropped%29.jpg", pace: 78, shooting: 82, dribbling: 85, trophies: "UCL x2, PL x6", legend: true, clubs: "Man Utd, Real Madrid, LA Galaxy, PSG", born: "May 2, 1975", height: "183cm", goals: "150+", famousQuote: "I don't have time for hobbies." },
  { name: "Thierry Henry", country: "France", flag: "🇫🇷", position: "FWD", overall: 96, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Thierry_Henry_2010.jpg/440px-Thierry_Henry_2010.jpg", pace: 92, shooting: 88, dribbling: 90, trophies: "WC 1998, Euro 2000, UCL 2009", legend: true, clubs: "Monaco, Juventus, Arsenal, Barcelona, New York Red Bulls", born: "Aug 17, 1977", height: "188cm", goals: "350+", famousQuote: "I am the best in the world at what I do, and what I do isn't very nice." },
  { name: "Ronaldinho", country: "Brazil", flag: "🇧🇷", position: "FWD", overall: 99, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Ronaldinho_2012.jpg/440px-Ronaldinho_2012.jpg", pace: 85, shooting: 88, dribbling: 99, trophies: "WC 2002, UCL 2006, Ballon d'Or x2", legend: true, clubs: "Grêmio, PSG, Barcelona, AC Milan", born: "Mar 21, 1980", height: "181cm", goals: "300+", famousQuote: "I learned everything from joy." },
  { name: "Pelé", country: "Brazil", flag: "🇧🇷", position: "FWD", overall: 99, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Pel%C3%A9_con_Brasil_%28La_Naci%C3%B3n_Argentina%2C_1960%29.jpg/440px-Pel%C3%A9_con_Brasil_%28La_Naci%C3%B3n_Argentina%2C_1960%29.jpg", pace: 88, shooting: 95, dribbling: 96, trophies: "WC x3 (1958, 1962, 1970)", legend: true, clubs: "Santos, New York Cosmos", born: "Oct 23, 1940", height: "173cm", goals: "1000+", famousQuote: "Success is no accident." },
  { name: "Zinedine Zidane", country: "France", flag: "🇫🇷", position: "MID", overall: 99, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Zidane_Zizu.jpg/440px-Zidane_Zizu.jpg", pace: 76, shooting: 85, dribbling: 96, trophies: "WC 1998, UCL x3 (manager)", legend: true, clubs: "Cannes, Bordeaux, Juventus, Real Madrid", born: "Jun 23, 1972", height: "185cm", goals: "150+", famousQuote: "Every day I think about the ball." },
  { name: "Ronaldo Nazário", country: "Brazil", flag: "🇧🇷", position: "FWD", overall: 98, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Ronaldo_Brasil_2002.jpg/440px-Ronaldo_Brasil_2002.jpg", pace: 90, shooting: 95, dribbling: 92, trophies: "WC 2002, UCL 2002, Ballon d'Or x2", legend: true, clubs: "Cruzeiro, PSV, Barcelona, Inter Milan, Real Madrid, AC Milan", born: "Sep 18, 1976", height: "183cm", goals: "400+", famousQuote: "I have two loves: football and my family." },
];

const StatBar = ({ label, value, color = "bg-football-neon" }: { label: string; value: number; color?: string }) => (
  <div className="flex items-center gap-2 text-xs font-body">
    <span className="w-8 text-football-neon/60">{label}</span>
    <div className="flex-1 h-1.5 bg-football-neon/10 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className={`h-full rounded-full ${color}`}
      />
    </div>
    <span className="w-6 text-right text-football-neon/80 font-semibold">{value}</span>
  </div>
);

const PlayerCard = ({ player, onClick }: { player: Player; onClick: () => void }) => {
  const [imgError, setImgError] = useState(false);
  const initials = player.name.split(" ").map(n => n[0]).join("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, boxShadow: "0 0 30px #00FF4144" }}
      onClick={onClick}
      className="card-football rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:border-football-neon/60 relative"
    >
      {player.legend && (
        <div className="absolute top-2 right-2 z-10 bg-football-gold/90 text-football-dark text-[10px] font-heading px-2 py-0.5 rounded">
          LEGEND
        </div>
      )}
      <div className="relative h-[260px] overflow-hidden">
        {imgError ? (
          <div className="h-full bg-gradient-to-br from-football-neon/20 via-football-dark to-football-cyan/20 flex items-center justify-center">
            <span className="font-heading text-5xl text-football-neon/50">{initials}</span>
          </div>
        ) : (
          <img
            src={player.image}
            alt={player.name}
            className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
            onError={() => setImgError(true)}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-football-dark via-football-dark/25 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-football-cyan/80 font-heading">
              {player.country}
            </p>
            <h3 className="font-heading text-2xl text-white leading-tight drop-shadow-[0_0_14px_rgba(0,0,0,0.55)]">
              {player.name}
            </h3>
          </div>
          <div className="rounded-md border border-football-gold/40 bg-football-dark/80 px-3 py-2 text-center backdrop-blur-sm">
            <div className="font-heading text-3xl text-football-gold neon-text-gold leading-none">{player.overall}</div>
            <span className="text-[10px] font-heading tracking-[0.28em] text-football-neon/70">{player.position}</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs text-football-cyan font-body">{player.flag} {player.country}</p>
        <div className="mt-3 space-y-1.5">
          <StatBar label="PAC" value={player.pace} />
          <StatBar label="SHO" value={player.shooting} />
          <StatBar label="DRI" value={player.dribbling} />
          <StatBar label="OVR" value={player.overall} color="bg-football-gold" />
        </div>
        <p className="mt-2 text-[10px] text-football-gold/70 font-body truncate">🏆 {player.trophies}</p>
      </div>
    </motion.div>
  );
};

const PlayerCards = () => {
  const [selected, setSelected] = useState<Player | null>(null);
  const [modalImgError, setModalImgError] = useState(false);

  useEffect(() => {
    setModalImgError(false);
  }, [selected]);

  return (
    <section id="players" className="py-20 px-4 hexagon-bg">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-heading text-5xl md:text-7xl text-center text-football-neon neon-text mb-12"
        >
          FOOTBALL LEGENDS
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {players.map((p) => (
            <PlayerCard key={p.name} player={p} onClick={() => setSelected(p)} />
          ))}
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="bg-football-card border-football-neon/30 text-football-neon max-w-lg max-h-[90vh] overflow-y-auto">
          {selected && (
            <>
              <div className="relative overflow-hidden rounded-lg border border-football-neon/20">
                {modalImgError ? (
                  <div className="h-72 bg-gradient-to-br from-football-neon/20 via-football-dark to-football-cyan/20 flex items-center justify-center">
                    <span className="font-heading text-6xl text-football-neon/50">
                      {selected.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                ) : (
                  <img
                    src={selected.image}
                    alt={selected.name}
                    className="h-72 w-full object-cover object-top"
                    onError={() => setModalImgError(true)}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-football-dark to-transparent" />
              </div>
              <DialogHeader>
                <DialogTitle className="font-heading text-3xl text-football-neon">{selected.name}</DialogTitle>
                <DialogDescription className="text-football-cyan font-body">
                  {selected.flag} {selected.country} · {selected.position} · Overall: {selected.overall}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3 font-body text-sm">
                <p><span className="text-football-gold">Born:</span> {selected.born}</p>
                <p><span className="text-football-gold">Height:</span> {selected.height}</p>
                <p><span className="text-football-gold">Clubs:</span> {selected.clubs}</p>
                <p><span className="text-football-gold">Career Goals:</span> {selected.goals}</p>
                <p><span className="text-football-gold">Trophies:</span> {selected.trophies}</p>
                <div className="mt-4 space-y-2">
                  <StatBar label="PAC" value={selected.pace} />
                  <StatBar label="SHO" value={selected.shooting} />
                  <StatBar label="DRI" value={selected.dribbling} />
                </div>
                <blockquote className="border-l-2 border-football-gold pl-3 italic text-football-cyan/80 mt-4">
                  "{selected.famousQuote}"
                </blockquote>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PlayerCards;
