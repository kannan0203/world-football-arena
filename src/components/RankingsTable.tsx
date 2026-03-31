import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowUp, ArrowDown, Search } from "lucide-react";

const data = [
  { rank: 1, country: "Argentina", flag: "🇦🇷", points: 1893, change: 0 },
  { rank: 2, country: "France", flag: "🇫🇷", points: 1872, change: 1 },
  { rank: 3, country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", points: 1856, change: -1 },
  { rank: 4, country: "Belgium", flag: "🇧🇪", points: 1832, change: 0 },
  { rank: 5, country: "Brazil", flag: "🇧🇷", points: 1828, change: 2 },
  { rank: 6, country: "Portugal", flag: "🇵🇹", points: 1818, change: -1 },
  { rank: 7, country: "Netherlands", flag: "🇳🇱", points: 1814, change: 0 },
  { rank: 8, country: "Spain", flag: "🇪🇸", points: 1810, change: 1 },
  { rank: 9, country: "Germany", flag: "🇩🇪", points: 1798, change: -1 },
  { rank: 10, country: "Croatia", flag: "🇭🇷", points: 1771, change: 0 },
  { rank: 11, country: "Morocco", flag: "🇲🇦", points: 1745, change: 2 },
  { rank: 12, country: "Colombia", flag: "🇨🇴", points: 1738, change: 1 },
  { rank: 13, country: "Italy", flag: "🇮🇹", points: 1727, change: -2 },
  { rank: 14, country: "USA", flag: "🇺🇸", points: 1692, change: 0 },
  { rank: 15, country: "Mexico", flag: "🇲🇽", points: 1671, change: -1 },
  { rank: 16, country: "Senegal", flag: "🇸🇳", points: 1658, change: 0 },
  { rank: 17, country: "Denmark", flag: "🇩🇰", points: 1643, change: 1 },
  { rank: 18, country: "Switzerland", flag: "🇨🇭", points: 1631, change: -1 },
  { rank: 19, country: "Uruguay", flag: "🇺🇾", points: 1618, change: 0 },
  { rank: 20, country: "India", flag: "🇮🇳", points: 1273, change: 3 },
];

type SortKey = "rank" | "country" | "points" | "change";

const RankingsTable = () => {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("rank");
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(true); }
  };

  const filtered = useMemo(() => {
    let rows = data.filter(r => r.country.toLowerCase().includes(search.toLowerCase()));
    rows.sort((a, b) => {
      const va = a[sortKey], vb = b[sortKey];
      if (typeof va === "string" && typeof vb === "string") return sortAsc ? va.localeCompare(vb) : vb.localeCompare(va);
      return sortAsc ? (va as number) - (vb as number) : (vb as number) - (va as number);
    });
    return rows;
  }, [search, sortKey, sortAsc]);

  const rankBg = (rank: number) => {
    if (rank === 1) return "bg-yellow-500/10 border-l-4 border-l-yellow-400";
    if (rank === 2) return "bg-gray-400/10 border-l-4 border-l-gray-300";
    if (rank === 3) return "bg-amber-700/10 border-l-4 border-l-amber-600";
    return "";
  };

  return (
    <section id="rankings" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="font-heading text-5xl md:text-7xl text-center text-football-neon neon-text mb-8">
          FIFA WORLD RANKINGS 2024
        </motion.h2>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-football-neon/40" size={16} />
          <input
            type="text"
            placeholder="Search country..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-football-card border border-football-neon/20 rounded px-10 py-2 font-body text-football-neon placeholder:text-football-neon/30 focus:outline-none focus:border-football-neon/50"
          />
        </div>
        <div className="overflow-x-auto rounded-lg border border-football-neon/20">
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="bg-football-neon/10">
                {([["rank","#"],["country","Country"],["points","Points"],["change","Change"]] as [SortKey,string][]).map(([key, label]) => (
                  <th key={key} onClick={() => handleSort(key)}
                    className="px-4 py-3 text-left font-heading tracking-wider text-football-neon/80 cursor-pointer hover:text-football-neon select-none">
                    {label} {sortKey === key ? (sortAsc ? "▲" : "▼") : ""}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(row => (
                <tr key={row.rank} className={`border-t border-football-neon/10 hover:bg-football-neon/5 transition-colors ${rankBg(row.rank)}`}>
                  <td className="px-4 py-2 font-heading text-lg text-football-neon">{row.rank}</td>
                  <td className="px-4 py-2"><span className="mr-2">{row.flag}</span>{row.country}</td>
                  <td className="px-4 py-2 font-heading text-football-gold">{row.points}</td>
                  <td className="px-4 py-2">
                    {row.change > 0 && <span className="flex items-center gap-1 text-green-400"><ArrowUp size={14} />+{row.change}</span>}
                    {row.change < 0 && <span className="flex items-center gap-1 text-football-red"><ArrowDown size={14} />{row.change}</span>}
                    {row.change === 0 && <span className="text-football-neon/30">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default RankingsTable;
