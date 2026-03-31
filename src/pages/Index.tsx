import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PlayerCards from "@/components/PlayerCards";
import TrophyCabinet from "@/components/TrophyCabinet";
import StadiumShowcase from "@/components/StadiumShowcase";
import RankingsTable from "@/components/RankingsTable";
import MatchResults from "@/components/MatchResults";
import FootballQuiz from "@/components/FootballQuiz";
import GOATDebate from "@/components/GOATDebate";
import MusicButton from "@/components/MusicButton";

const Index = () => (
  <div className="min-h-screen bg-football-dark text-football-neon">
    <Navbar />
    <Hero />
    <PlayerCards />
    <TrophyCabinet />
    <StadiumShowcase />
    <RankingsTable />
    <MatchResults />
    <FootballQuiz />
    <GOATDebate />
    <MusicButton />
    <footer className="py-8 text-center font-body text-football-neon/30 text-sm border-t border-football-neon/10">
      © 2024 World Football Universe — The Beautiful Game
    </footer>
  </div>
);

export default Index;
