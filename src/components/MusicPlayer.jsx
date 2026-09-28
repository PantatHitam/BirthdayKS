import { useEffect, useRef, useState } from "react";
import { SONG_SRC, SONG_TITLE } from "../config";

// Kontrol kecil melayang: "♪ judul" (bars bergerak saat main);
// musik mencoba mulai setelah interaksi pertama user.
export default function MusicPlayer() {
  const audio = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [open, setOpen] = useState(false);
  const [prog, setProg] = useState(0);
  const [vol, setVol] = useState(0.7);

  // Coba mulai musik setelah interaksi pertama user.
  // Browser biasanya memblokir autoplay sebelum ada user interaction.
  useEffect(() => {
    const start = () => {
      const a = audio.current;

      if (!a || !a.paused) return;

      a.volume = vol;

      a.play()
        .then(() => setPlaying(true))
        .catch(() => {
          // Autoplay tetap bisa ditolak browser.
          // User masih bisa menekan tombol Putar secara manual.
        });
    };

    const events = ["pointerdown", "keydown", "touchstart"];

    events.forEach((event) => {
      window.addEventListener(event, start, { once: true });
    });

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, start);
      });
    };
  }, [vol]);

  useEffect(() => {
    if (audio.current) {
      audio.current.volume = vol;
    }
  }, [vol]);

  const toggle = () => {
    const a = audio.current;

    if (!a) return;

    if (a.paused) {
      a.play()
        .then(() => setPlaying(true))
        .catch(() => {});
    } else {
      a.pause();
      setPlaying(false);
    }
  };

  const seek = (e) => {
    const a = audio.current;

    if (a?.duration) {
      a.currentTime = (e.target.value / 100) * a.duration;
    }
  };

  return (
    <div className={`music ${playing ? "on" : ""} ${open ? "open" : ""}`}>
      <audio
        ref={audio}
        src={SONG_SRC}
        loop
        preload="auto"
        onTimeUpdate={(e) => {
          const current = e.currentTarget.currentTime;
          const duration = e.currentTarget.duration || 1;

          setProg((current / duration) * 100);
        }}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />

      {open && (
        <div className="mpanel">
          <button onClick={toggle}>
            {playing ? "Jeda" : "Putar"}
          </button>

          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={prog}
            onChange={seek}
            aria-label="Progress"
          />

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={vol}
            onChange={(e) => setVol(Number(e.target.value))}
            aria-label="Volume"
          />
        </div>
      )}

      <button
        className="mbtn"
        onClick={() => setOpen((o) => !o)}
        aria-label="Kontrol musik"
        aria-expanded={open}
      >
        {playing ? (
          <span className="bars">
            <i />
            <i />
            <i />
          </span>
        ) : (
          <span>♪</span>
        )}

        <span className="mname">{SONG_TITLE}</span>
      </button>
    </div>
  );
}