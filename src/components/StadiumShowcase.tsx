import { useState } from "react";
import { motion } from "framer-motion";

const stadiums = [
  { name: "Camp Nou", city: "Barcelona", country: "Spain", flag: "🇪🇸", capacity: "99,354", team: "FC Barcelona", year: 1957, moment: "Remontada vs PSG 6-1, 2017", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Camp_Nou_1.jpg/640px-Camp_Nou_1.jpg" },
  { name: "Wembley Stadium", city: "London", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", capacity: "90,000", team: "England NT", year: 2007, moment: "1966 World Cup Final — England's finest hour", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Wembley_Stadium_2024.jpg/640px-Wembley_Stadium_2024.jpg" },
  { name: "Maracanã", city: "Rio de Janeiro", country: "Brazil", flag: "🇧🇷", capacity: "78,838", team: "Flamengo / Fluminense", year: 1950, moment: "2014 World Cup Final venue", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Maracana_Stadium_June_2013.jpg/640px-Maracana_Stadium_June_2013.jpg" },
  { name: "Santiago Bernabéu", city: "Madrid", country: "Spain", flag: "🇪🇸", capacity: "81,044", team: "Real Madrid", year: 1947, moment: "Countless Champions League magical nights", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Estadio_Santiago_Bernab%C3%A9u_2022.jpg/640px-Estadio_Santiago_Bernab%C3%A9u_2022.jpg" },
  { name: "Old Trafford", city: "Manchester", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", capacity: "74,310", team: "Manchester United", year: 1910, moment: "Theatre of Dreams — 1999 Treble celebrations", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Old_Trafford_inside_20060726_1.jpg/640px-Old_Trafford_inside_20060726_1.jpg" },
  { name: "Allianz Arena", city: "Munich", country: "Germany", flag: "🇩🇪", capacity: "75,000", team: "Bayern Munich", year: 2005, moment: "2012 Champions League Final venue", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Allianz_Arena_%28night%29.JPG/640px-Allianz_Arena_%28night%29.JPG" },
];

const StadiumCard = ({ stadium, i }: { stadium: typeof stadiums[0]; i: number }) => {
  const [imgErr, setImgErr] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
      whileHover={{ y: -6, boxShadow: "0 0 25px #00FF4133" }}
      className="card-football rounded-lg overflow-hidden"
    >
      {imgErr ? (
        <div className="h-[180px] bg-gradient-to-br from-football-neon/20 to-football-dark flex items-center justify-center">
          <span className="font-heading text-lg text-football-neon/40">{stadium.name}</span>
        </div>
      ) : (
        <img src={stadium.image} alt={stadium.name} className="w-full h-[180px] object-cover" onError={() => setImgErr(true)} loading="lazy" />
      )}
      <div className="p-4">
        <h3 className="font-heading text-xl text-football-neon">{stadium.name}</h3>
        <p className="text-xs font-body text-football-cyan">{stadium.flag} {stadium.city}, {stadium.country}</p>
        <div className="font-heading text-3xl text-football-neon neon-text mt-2">{stadium.capacity}</div>
        <p className="text-xs font-body text-football-neon/50">Capacity</p>
        <p className="text-xs font-body text-football-gold/70 mt-1">🏟️ {stadium.team} · Est. {stadium.year}</p>
        <p className="text-[10px] font-body text-football-neon/40 mt-2 italic">{stadium.moment}</p>
      </div>
    </motion.div>
  );
};

const StadiumShowcase = () => (
  <section id="stadiums" className="py-20 px-4 hexagon-bg">
    <div className="max-w-7xl mx-auto">
      <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="font-heading text-5xl md:text-7xl text-center text-football-neon neon-text mb-12">
        FOOTBALL CATHEDRALS
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stadiums.map((s, i) => <StadiumCard key={s.name} stadium={s} i={i} />)}
      </div>
    </div>
  </section>
);

export default StadiumShowcase;
