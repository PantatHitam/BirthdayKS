import { useEffect, useState } from "react";
import { PARTNER_NAME, HERO_SUB, GREETING } from "../config";
import { Words, Confetti, Hearts, Scene } from "./Decorations";

// Opening: kosong -> latar mekar -> judul -> kalimat -> baru scene lain dibuka
export default function BirthdayHero({ onDone }) {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const t = [
      setTimeout(() => { document.body.dataset.tone = "bloom"; setStage(1); }, 900),
      setTimeout(() => setStage(2), 3000),
      setTimeout(() => { setStage(3); onDone(); }, 5600),
    ];
    return () => t.forEach(clearTimeout);
  }, []); // eslint-disable-line
  return (
    <header className={`hero ${stage >= 1 ? "bloom" : ""}`}>
      {stage >= 2 && <Confetti />}
      {stage >= 1 && <Hearts n={6} />}
      <Words as="h1" className="h1" text={`Happy Birthday, ${PARTNER_NAME} 💗`} show={stage >= 2} step={200} />
      <Words className="sub" text={HERO_SUB} show={stage >= 3} step={100} />
      {stage >= 3 && <div className="cue"><span />Scroll nya pelan-pelan oi</div>}
    </header>
  );
}

export function Greeting() {
  return (
    <Scene tone="warm" className="warm">
      {GREETING.map((t, i) => <Words key={i} text={t} className="wl" step={100} />)}
    </Scene>
  );
}
