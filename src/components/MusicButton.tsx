import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const AUDIO_STORAGE_KEY = "world-football-arena-music-enabled";
const AUDIO_SRC = "/audio/stadium-theme.mp3";

const MusicButton = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = 0.22;
    audioRef.current = audio;

    const savedPreference = window.localStorage.getItem(AUDIO_STORAGE_KEY);
    if (savedPreference === "true") {
      setPlaying(true);
    }

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (!playing) {
      audio.pause();
      window.localStorage.setItem(AUDIO_STORAGE_KEY, "false");
      return;
    }

    window.localStorage.setItem(AUDIO_STORAGE_KEY, "true");

    void audio.play().catch(() => {
      setPlaying(false);
      window.localStorage.setItem(AUDIO_STORAGE_KEY, "false");
    });
  }, [playing]);

  const toggle = () => {
    setPlaying((current) => !current);
  };

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-football-card border border-football-neon/40 flex items-center justify-center text-football-neon hover:border-football-neon transition-all group"
      title="CROWD MODE"
    >
      {playing && (
        <span className="absolute inset-0 rounded-full border-2 border-football-neon animate-pulse-ring" />
      )}
      {playing ? <Volume2 size={20} /> : <VolumeX size={20} />}
      <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-football-card border border-football-neon/30 text-football-neon text-[10px] font-heading px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        CROWD MODE {playing ? "ON" : "OFF"}
      </span>
    </button>
  );
};

export default MusicButton;
