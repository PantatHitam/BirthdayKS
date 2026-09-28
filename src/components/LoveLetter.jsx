import { useState } from "react";
import { LETTER_INTRO, LETTER, LETTER_SIGN, CLOSING } from "../config";
import { Scene, Words, Hearts } from "./Decorations";

// stage: 0 tertutup -> 1 amplop muncul -> 2 flap terbuka -> 3 kertas keluar -> 4 surat dibaca
export default function LoveLetter() {
  const [stage, setStage] = useState(0);
  const openIt = () => {
    setStage(1);
    setTimeout(() => setStage(2), 1000);
    setTimeout(() => setStage(3), 2000);
    setTimeout(() => setStage(4), 3400);
  };
  return (
    <Scene tone="letter" className="letter">
      <div className="lglow" />
      {stage === 0 && (
        <div className="lin fadein">
          <div className="mail">💌</div>
          <p className="intro">{LETTER_INTRO}</p>
          <button className="cta" onClick={openIt}>Buka surat</button>
        </div>
      )}
      {stage >= 1 && stage < 4 && (
        <div className={`env fadein ${stage >= 2 ? "open" : ""} ${stage >= 3 ? "out" : ""}`}>
          <div className="back" /><div className="sheet" /><div className="front" /><div className="flap" />
        </div>
      )}
      {stage >= 4 && (
        <article className="read fadein">
          {LETTER.map((t, i) => <p key={i} className="lp" style={{ "--i": i }}>{t}</p>)}
          <p className="lp sign" style={{ "--i": LETTER.length }}>{LETTER_SIGN}</p>
        </article>
      )}
    </Scene>
  );
}

export function Closing() {
  return (
    <Scene tone="end" className="closing">
      <Hearts n={5} />
      <Words as="h2" className="h2 cl" text={CLOSING[0]} step={140} />
      <Words className="cl2" text={CLOSING[1]} step={140} />
    </Scene>
  );
}
