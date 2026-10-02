import { useState } from "react";
import { HOPES, HOPES_TITLE } from "../config";
import { Scene, Words } from "./Decorations";

// Tiap harapan: lipatan kertas yang terbuka saat diketuk (tetap terbuka)
export default function HopeSection() {
  const [open, setOpen] = useState(() => new Set());
  const toggle = (i) => setOpen((s) => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n; });
  return (
    <Scene tone="hope" className="hopes">
      <Words as="h2" className="h2" text={HOPES_TITLE} />
      <p className="hint2">Buka satu per satu.</p>
      <ul>
        {HOPES.map((h, i) => (
          <li key={i} className={open.has(i) ? "open" : ""}>
            <button className="hbtn" onClick={() => toggle(i)} aria-expanded={open.has(i)}>
              <span className="dot" />{h.title}
              <span className="hope-star" aria-hidden="true">✦</span>
            </button>
            <div className="fold"><div><p>{h.text}</p></div></div>
          </li>
        ))}
      </ul>
    </Scene>
  );
}
