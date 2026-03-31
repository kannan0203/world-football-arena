import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const quotes = [
  '"Football is not just a game, it\'s a religion" — Pelé',
  '"I learned all about life with a ball at my feet" — Ronaldinho',
  '"Some people think football is a matter of life and death — it\'s much more important" — Bill Shankly',
  '"The ball is round, the game lasts 90 minutes. Everything else is pure theory" — Sepp Herberger',
];

const CountUp = ({ end, suffix, label }: { end: number; suffix: string; label: string }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setVal(end); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [end]);
  return (
    <div className="text-center">
      <div className="font-heading text-4xl md:text-6xl text-football-neon neon-text">
        {val >= 1000 ? (val / 1000).toFixed(1) + suffix.replace(/[\d.]+/, '') : val}{suffix.includes('B') ? '' : suffix.includes('+') ? '+' : ''}
      </div>
      <div className="font-heading text-sm md:text-base tracking-widest text-football-neon/60 mt-1">{label}</div>
    </div>
  );
};

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const balls: { x: number; y: number; speed: number; size: number; opacity: number }[] = [];
    for (let i = 0; i < 40; i++) {
      balls.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height + canvas.height,
        speed: 0.3 + Math.random() * 0.8,
        size: 10 + Math.random() * 14,
        opacity: 0.15 + Math.random() * 0.35,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      balls.forEach((b) => {
        b.y -= b.speed;
        if (b.y < -30) { b.y = canvas.height + 30; b.x = Math.random() * canvas.width; }
        ctx.font = `${b.size}px serif`;
        ctx.globalAlpha = b.opacity;
        ctx.fillText("⚽", b.x, b.y);
      });
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Grass pattern at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 z-10"
        style={{
          background: "linear-gradient(to top, #0a3d0a 0%, transparent 100%)",
          maskImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 60 Q150 0 300 60 Q450 120 600 60 Q750 0 900 60 Q1050 120 1200 60 L1200 120 L0 120Z' fill='white'/%3E%3C/svg%3E\")",
          WebkitMaskImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 60 Q150 0 300 60 Q450 120 600 60 Q750 0 900 60 Q1050 120 1200 60 L1200 120 L0 120Z' fill='white'/%3E%3C/svg%3E\")",
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
        }}
      />

      <div className="relative z-20 text-center px-4 max-w-5xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-heading text-5xl md:text-8xl lg:text-9xl text-football-neon animate-pulse-neon tracking-wider leading-none"
        >
          WORLD FOOTBALL UNIVERSE
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-body text-lg md:text-2xl text-football-cyan mt-4 font-semibold tracking-wide"
        >
          The Beautiful Game — Passion, Glory & Legends
        </motion.p>

        {/* Rolling ball */}
        <div className="overflow-hidden mt-4 h-8">
          <div className="animate-roll-ball text-2xl">⚽</div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex justify-center gap-8 md:gap-16 mt-10"
        >
          <CountUp end={211} suffix="" label="FIFA NATIONS" />
          <CountUp end={3.5} suffix="B" label="FANS WORLDWIDE" />
          <CountUp end={100} suffix="+" label="YEARS OF GLORY" />
        </motion.div>

        {/* CTA */}
        <motion.a
          href="#players"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="inline-block mt-10 font-heading text-xl tracking-widest px-10 py-3 border-2 border-football-neon text-football-neon hover:bg-football-neon hover:text-football-dark transition-all duration-300 rounded-sm"
        >
          KICK OFF
        </motion.a>
      </div>

      {/* Ticker */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-football-dark/80 border-t border-football-neon/20 py-2 overflow-hidden">
        <div className="animate-ticker whitespace-nowrap font-body text-sm text-football-neon/60">
          {quotes.map((q, i) => (
            <span key={i} className="mx-12">{q}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
