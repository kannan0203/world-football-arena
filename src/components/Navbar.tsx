import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#hero", label: "HOME" },
  { href: "#players", label: "LEGENDS" },
  { href: "#trophies", label: "TROPHIES" },
  { href: "#stadiums", label: "STADIUMS" },
  { href: "#rankings", label: "RANKINGS" },
  { href: "#matches", label: "RESULTS" },
  { href: "#quiz", label: "QUIZ" },
  { href: "#goat", label: "GOAT" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-football-dark/90 backdrop-blur-md border-b border-football-neon/20">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
        <a href="#hero" className="font-heading text-2xl text-football-neon tracking-wider">
          ⚽ WFU
        </a>
        <div className="hidden md:flex gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-heading text-sm tracking-widest text-football-neon/70 hover:text-football-neon transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
        <button className="md:hidden text-football-neon" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-football-dark/95 border-t border-football-neon/20 px-4 pb-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2 font-heading text-sm tracking-widest text-football-neon/70 hover:text-football-neon"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
