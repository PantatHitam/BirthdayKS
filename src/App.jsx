import { useEffect, useState } from "react";
import { BIRTHDAY_DATE } from "./config";
import Countdown from "./components/Countdown";
import BirthdayHero, { Greeting } from "./components/BirthdayHero";
import PhotoStory from "./components/PhotoStory";
import GratitudeSection from "./components/GratitudeSection";
import HopeSection from "./components/HopeSection";
import LoveLetter, { Closing } from "./components/LoveLetter";
import MusicPlayer from "./components/MusicPlayer";

const target = new Date(BIRTHDAY_DATE).getTime();

export default function App() {
  const [now, setNow] = useState(Date.now());
  const [live, setLive] = useState(Date.now() >= target); // birthday mode dirender
  const [ready, setReady] = useState(false); // scene lain baru muncul setelah opening
  const opened = now >= target;

  useEffect(() => {
    if (opened) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [opened]);

  // saat waktu tercapai: countdown memudar dulu, baru masuk birthday mode
  useEffect(() => {
    if (opened && !live) {
      const t = setTimeout(() => setLive(true), 1600);
      return () => clearTimeout(t);
    }
  }, [opened, live]);

  useEffect(() => { if (!live) document.body.dataset.tone = "quiet"; }, [live]);

  if (!live) return <Countdown remaining={target - now} fading={opened} />;

  return (
    <>
      <BirthdayHero onDone={() => setReady(true)} />
      {ready && (
        <>
          <Greeting />
          <PhotoStory />
          <GratitudeSection />
          <HopeSection />
          <LoveLetter />
          <Closing />
        </>
      )}
      <MusicPlayer />
    </>
  );
}
