import { useState } from "react";
import { MEMORY_TITLE, MEMORY_PHOTOS } from "../config";
import { Scene, Drift, Words, Sparkles, useOnce } from "./Decorations";

function Pic({ p, ratio }) {
  const [ok, setOk] = useState(true);
  return (
    <div className="pic" style={{ aspectRatio: ratio }}>
      {ok
        ? <img src={p.src} alt={p.caption} loading="lazy" onError={() => setOk(false)} />
        : <div className="ph">{p.src.split("/").pop()}</div>}
    </div>
  );
}

// Foto besar berframe; terbuka (reveal) sekali saja
export function Frame({ p, small }) {
  const [ref, seen] = useOnce(0.3);
  return (
    <figure ref={ref} className={`frame ${small ? "small" : ""} ${seen ? "seen" : ""}`}>
      <Pic p={p} ratio="4/5" />
      <figcaption>{p.caption}</figcaption>
    </figure>
  );
}

function Polaroid({ p, tilt }) {
  const [ref, seen] = useOnce(0.3);
  return (
    <figure ref={ref} className={`polaroid ${seen ? "seen" : ""}`} style={{ "--t": `${tilt}deg` }}>
      <Pic p={p} ratio="1/1" />
      <figcaption>{p.caption}</figcaption>
    </figure>
  );
}

const Vine = () => (
  <svg className="vine" viewBox="0 0 200 40" aria-hidden="true">
    <path d="M0 24 C30 4 50 44 90 22 S150 6 200 22" fill="none" stroke="currentColor" strokeWidth="1" />
    {[[35, 12], [90, 22], [150, 12]].map(([x, y], i) => (
      <g key={i} fill="none" stroke="currentColor">
        <circle cx={x} cy={y} r="3" /><circle cx={x} cy={y} r="6" opacity=".4" />
      </g>
    ))}
  </svg>
);

export default function PhotoStory() {
  const [first, ...rest] = MEMORY_PHOTOS;
  return (
    <Scene tone="photo" className="photos">
      <Vine />
      <Words as="h2" className="h2" text={MEMORY_TITLE} />
      <Drift speed={0.05}><Frame p={first} /></Drift>
      {rest.map((p, i) => (
        <Drift key={i} speed={0.12 + i * 0.05} className={i % 2 ? "right" : "left"}>
          <Polaroid p={p} tilt={i % 2 ? 4 : -5} />
        </Drift>
      ))}
      <Sparkles />
    </Scene>
  );
}
