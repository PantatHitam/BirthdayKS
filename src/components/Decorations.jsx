import { useEffect, useMemo, useRef, useState } from "react";

// Sekali terlihat -> selamanya "seen" (animasi entrance tidak diulang)
export function useOnce(threshold = 0.35) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (seen) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { threshold });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [seen, threshold]);
  return [ref, seen];
}

// Teks muncul kata demi kata (sekali)
export function Words({ text, as: Tag = "p", className = "", step = 80, show }) {
  const [ref, seen] = useOnce(0.5);
  const on = show ?? seen;
  return (
    <Tag ref={ref} className={`words ${on ? "on" : ""} ${className}`}>
      {text.split(" ").map((w, i) => (
        <span key={i}><span style={{ transitionDelay: `${i * step}ms` }}>{w}</span>{" "}</span>
      ))}
    </Tag>
  );
}

// Satu scene; mengubah warna latar body pelan-pelan saat melewati tengah layar
export function Scene({ tone, className = "", children }) {
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) document.body.dataset.tone = tone;
    }, { rootMargin: "-50% 0px -50% 0px" });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [tone]);
  return <section ref={ref} className={`scene ${className}`}>{children}</section>;
}

// Parallax ringan: elemen bergeser sedikit mengikuti scroll
export function Drift({ speed = 0.1, className = "", children }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; let raf = 0;
    const upd = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--dy", `${-(r.top + r.height / 2 - innerHeight / 2) * speed}px`);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(upd); };
    upd();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => { removeEventListener("scroll", on); removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, [speed]);
  return <div ref={ref} className={`drift ${className}`}>{children}</div>;
}

// Hati (♥) yang naik pelan — hanya dipakai di opening & penutup
export function Hearts({ n = 6 }) {
  const items = useMemo(() => Array.from({ length: n }, (_, i) => ({
    left: 8 + Math.random() * 84, size: 12 + Math.random() * 14,
    dur: 12 + Math.random() * 8, delay: -Math.random() * 12, k: i,
  })), [n]);
  return (
    <div className="hearts" aria-hidden="true">
      {items.map((o) => (
        <i key={o.k} style={{ left: `${o.left}%`, fontSize: o.size, animationDuration: `${o.dur}s`, animationDelay: `${o.delay}s` }}>♥</i>
      ))}
    </div>
  );
}

// Kilau kecil untuk transisi tertentu
export function Sparkles() {
  return <div className="sparkles" aria-hidden="true"><i>✦</i><i>✦</i><i>✦</i></div>;
}

// Confetti satu kali (canvas, tanpa library)
export function Confetti() {
  const ref = useRef(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const c = ref.current, x = c.getContext("2d");
    const w = (c.width = innerWidth), h = (c.height = innerHeight);
    const cols = ["#f4a3bb", "#b0325f", "#f8d7df", "#c98a9e", "#fff7ef"];
    const ps = Array.from({ length: 90 }, () => ({
      x: Math.random() * w, y: -20 - Math.random() * h * 0.5, r: 4 + Math.random() * 4,
      c: cols[(Math.random() * cols.length) | 0], vy: 1.2 + Math.random() * 2,
      vx: (Math.random() - 0.5) * 1.5, a: Math.random() * 6, va: (Math.random() - 0.5) * 0.18,
    }));
    let raf; const t0 = performance.now();
    const loop = (t) => {
      x.clearRect(0, 0, w, h);
      let alive = false;
      ps.forEach((p) => {
        p.x += p.vx + Math.sin(p.a); p.y += p.vy; p.a += p.va;
        if (p.y < h + 20) alive = true;
        x.save(); x.translate(p.x, p.y); x.rotate(p.a); x.fillStyle = p.c;
        x.fillRect(-p.r, -p.r / 2, p.r * 2, p.r); x.restore();
      });
      if (alive && t - t0 < 6000) raf = requestAnimationFrame(loop); else x.clearRect(0, 0, w, h);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} className="confetti" aria-hidden="true" />;
}
