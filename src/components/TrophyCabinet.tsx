import { motion } from "framer-motion";

const trophies = [
  { emoji: "🏆", name: "FIFA World Cup", holder: "Brazil", count: "5 titles", desc: "The most prestigious trophy in world football, held every 4 years since 1930." },
  { emoji: "🏆", name: "UEFA Champions League", holder: "Real Madrid", count: "15 titles", desc: "Europe's elite club competition, the pinnacle of club football glory." },
  { emoji: "⚽", name: "Ballon d'Or", holder: "Lionel Messi", count: "8 awards", desc: "The most prestigious individual award in football, given annually." },
  { emoji: "🏆", name: "Premier League", holder: "Manchester United", count: "13 titles", desc: "The most watched football league in the world, founded in 1992." },
  { emoji: "🏆", name: "Copa del Rey", holder: "Barcelona", count: "31 titles", desc: "Spain's prestigious domestic cup competition since 1903." },
  { emoji: "🌍", name: "FIFA Club World Cup", holder: "Real Madrid", count: "8 titles", desc: "The global club championship featuring continental champions." },
];

const TrophyCabinet = () => (
  <section id="trophies" className="py-20 px-4">
    <div className="max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-heading text-5xl md:text-7xl text-center text-football-gold neon-text-gold mb-12"
      >
        GLORY & TROPHIES
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {trophies.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="card-football rounded-lg p-6 text-center border border-football-gold/20 neon-border-gold group"
            style={{ perspective: "600px" }}
          >
            <div className="transition-transform duration-700 group-hover:[transform:rotateY(360deg)]">
              <div className="text-6xl mb-4">{t.emoji}</div>
              <h3 className="font-heading text-2xl text-football-gold">{t.name}</h3>
              <div className="font-heading text-4xl text-football-gold mt-2 neon-text-gold">{t.count}</div>
              <p className="font-body text-football-neon/70 mt-1">Record: {t.holder}</p>
              <p className="font-body text-xs text-football-neon/40 mt-3">{t.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrophyCabinet;
