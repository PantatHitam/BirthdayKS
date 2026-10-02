import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

const pad = (n) => String(n).padStart(2, "0");
const prizes = [
  { id: "sock", icon: "🧦", name: "Kaos kaki kanan. Yang kiri sedang cuti.", color: "#ec7755" },
  { id: "potato", icon: "🥔", name: "Kentang dengan gelar S.Kent.", color: "#d7a64b" },
  { id: "duck", icon: "🦆", name: "Bebek NPC penjaga parkiran.", color: "#75b39b" },
  { id: "juice", icon: "🧃", name: "Jus rasa keputusan yang salah.", color: "#789fc3" },
  { id: "rock", icon: "🪨", name: "Batu premium, tidak bisa trade.", color: "#a29aab" },
  { id: "cheese", icon: "🧀", name: "Keju dengan aura +3.", color: "#dfc04f" },
  { id: "toothbrush", icon: "🪥", name: "Sikat gigi khusus bos terakhir.", color: "#78bcc0" },
  { id: "dino", icon: "🦖", name: "Dinosaurus mini, baterai tidak termasuk.", color: "#86a76d" },
  { id: "goose", icon: "🪿", name: "Angsa manajer yang tidak diminta.", color: "#e5e5dc" },
  { id: "bread", icon: "🍞", name: "Roti tawar dengan lore panjang.", color: "#c78c61" },
];

const { Bodies, Body, Composite, Engine } = Matter;

export default function Countdown({ remaining, fading }) {
  const canvasRef = useRef(null);
  const pitRef = useRef(null);
  const machineRef = useRef(null);
  const gripRef = useRef(null);
  const engineRef = useRef(null);
  const ballsRef = useRef([]);
  const timersRef = useRef([]);
  const clawPositionRef = useRef(50);
  const [clawPosition, setClawPosition] = useState(50);
  const [cableLength, setCableLength] = useState(32);
  const [phase, setPhase] = useState("idle");
  const [ready, setReady] = useState(false);
  const [result, setResult] = useState(null);
  const [carried, setCarried] = useState(null);
  const [collection, setCollection] = useState({});
  const [collectionOpen, setCollectionOpen] = useState(false);
  const collectionCount = Object.values(collection).reduce((total, count) => total + count, 0);

  const seconds = Math.max(0, Math.floor(remaining / 1000));
  const units = [
    ["hari", Math.floor(seconds / 86400)],
    ["jam", Math.floor((seconds % 86400) / 3600)],
    ["menit", Math.floor((seconds % 3600) / 60)],
    ["detik", seconds % 60],
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const pit = pitRef.current;
    const engine = Engine.create();
    engine.gravity.y = 1.05;
    engine.gravity.x = 0;
    engineRef.current = engine;

    const context = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let walls = [];
    let frame = 0;
    let lastTime = performance.now();
    let dragged = null;
    let lastPointer = null;

    const makeWalls = (w, h) => [
      Bodies.rectangle(w / 2, h + 24, w + 80, 48, { isStatic: true, restitution: 0.35 }),
      Bodies.rectangle(-24, h / 2, 48, h + 80, { isStatic: true, restitution: 0.45 }),
      Bodies.rectangle(w + 24, h / 2, 48, h + 80, { isStatic: true, restitution: 0.45 }),
    ];

    const resize = () => {
      const nextWidth = pit.clientWidth;
      const nextHeight = pit.clientHeight;
      if (!nextWidth || !nextHeight) return;

      const previousWidth = width;
      const previousHeight = height;
      width = nextWidth;
      height = nextHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      if (previousWidth && previousHeight) {
        ballsRef.current.forEach((ball) => {
          Body.setPosition(ball, {
            x: Math.max(ball.circleRadius, Math.min(width - ball.circleRadius, ball.position.x * width / previousWidth)),
            y: Math.min(height - ball.circleRadius, ball.position.y * height / previousHeight),
          });
        });
      }

      if (walls.length) Composite.remove(engine.world, walls);
      walls = makeWalls(width, height);
      Composite.add(engine.world, walls);

      if (!ballsRef.current.length) {
        ballsRef.current = Array.from({ length: 30 }, (_, index) => {
          const radius = 17 + Math.random() * 6;
          const column = index % 7;
          const row = Math.floor(index / 7);
          const x = radius + 8 + column * Math.max(1, (width - radius * 2 - 16) / 6) + (Math.random() - 0.5) * 12;
          const y = height - radius - row * (radius * 1.8) - Math.random() * 8;
          const prize = prizes[Math.floor(Math.random() * prizes.length)];
          const ball = Bodies.circle(x, y, radius, {
            restitution: 0.72,
            friction: 0.035,
            frictionAir: 0.008,
            density: 0.0012,
          });
          ball.prize = prize;
          return ball;
        });
        Composite.add(engine.world, ballsRef.current);
        setReady(true);
      }
    };

    const drawBall = (ball, x = ball.position.x, y = ball.position.y) => {
      const radius = ball.circleRadius;
      const gradient = context.createRadialGradient(
        x - radius * 0.36, y - radius * 0.42, radius * 0.04,
        x, y, radius * 1.12,
      );
      gradient.addColorStop(0, "#ffffff");
      gradient.addColorStop(0.16, ball.prize.color);
      gradient.addColorStop(1, "#344943");
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fillStyle = gradient;
      context.fill();
      context.lineWidth = 1.5;
      context.strokeStyle = "rgba(255,255,255,.85)";
      context.stroke();
      context.font = `${radius * 0.95}px system-ui, sans-serif`;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(ball.prize.icon, x, y + 1);
    };

    const render = (time) => {
      Engine.update(engine, Math.min(time - lastTime, 16.667));
      lastTime = time;
      context.clearRect(0, 0, width, height);
      ballsRef.current.forEach((ball) => drawBall(ball));
      frame = requestAnimationFrame(render);
    };

    const getPoint = (event) => {
      const rect = canvas.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    const onPointerDown = (event) => {
      const point = getPoint(event);
      dragged = [...ballsRef.current].reverse().find((ball) =>
        Math.hypot(ball.position.x - point.x, ball.position.y - point.y) <= ball.circleRadius + 8,
      );
      if (!dragged) return;
      lastPointer = point;
      canvas.setPointerCapture(event.pointerId);
      event.preventDefault();
    };
    const onPointerMove = (event) => {
      if (!dragged) return;
      const point = getPoint(event);
      Body.setPosition(dragged, {
        x: Math.max(dragged.circleRadius, Math.min(width - dragged.circleRadius, point.x)),
        y: Math.max(dragged.circleRadius, Math.min(height - dragged.circleRadius, point.y)),
      });
      Body.setVelocity(dragged, {
        x: Math.max(-12, Math.min(12, (point.x - lastPointer.x) * 0.25)),
        y: Math.max(-12, Math.min(12, (point.y - lastPointer.y) * 0.25)),
      });
      lastPointer = point;
    };
    const onPointerUp = () => {
      dragged = null;
      lastPointer = null;
    };

    const observer = new ResizeObserver(resize);
    observer.observe(pit);
    resize();
    frame = requestAnimationFrame(render);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      ballsRef.current = [];
      Engine.clear(engine);
      engineRef.current = null;
    };
  }, []);

  useEffect(() => () => timersRef.current.forEach(clearTimeout), []);

  const moveClaw = (direction) => {
    if (phase !== "idle") return;
    setClawPosition((current) => {
      const next = Math.max(8, Math.min(92, current + direction * 10));
      clawPositionRef.current = next;
      return next;
    });
  };

  const dropClaw = () => {
    if (phase !== "idle" || !engineRef.current || !ready || !gripRef.current) return;
    timersRef.current.forEach(clearTimeout);
    setResult(null);
    setCarried(null);
    const pit = pitRef.current;
    const canvas = canvasRef.current;
    const canvasRect = canvas.getBoundingClientRect();
    const gripRect = gripRef.current.getBoundingClientRect();
    const pickupY = canvasRect.top + Math.min(pit.clientHeight - 30, pit.clientHeight * 0.58);
    const idleTipY = gripRect.bottom + 8;
    const cableLength = Math.max(32, 32 + pickupY - idleTipY);
    setCableLength(cableLength);
    setPhase("dropping");

    timersRef.current = [setTimeout(() => {
      const canvasBounds = canvas.getBoundingClientRect();
      const gripBounds = gripRef.current.getBoundingClientRect();
      const machine = machineRef.current;
      const width = pit.clientWidth;
      const height = pit.clientHeight;
      const clawX = gripBounds.left + gripBounds.width / 2 - canvasBounds.left;
      const clawY = gripBounds.bottom + 8 - canvasBounds.top;
      const ball = ballsRef.current
        .filter((item) => {
          const dx = Math.abs(item.position.x - clawX);
          const ballTop = item.position.y - item.circleRadius;
          return dx <= Math.min(15, item.circleRadius * 0.65) && Math.abs(ballTop - clawY) <= 13;
        })
        .sort((a, b) => Math.abs(a.position.x - clawX) - Math.abs(b.position.x - clawX))[0];

      setCableLength(32);
      if (!ball) {
        setPhase("missed");
        timersRef.current = [setTimeout(() => {
          setResult({ type: "miss" });
          setPhase("idle");
        }, 420)];
        return;
      }

      const machineRect = machine.getBoundingClientRect();
      const top = canvasBounds.top - machineRect.top + ball.position.y - ball.circleRadius;
      const left = (ball.position.x / width) * 100;
      const lift = gripBounds.top + gripBounds.height / 2 - (canvasBounds.top + ball.position.y);

      Composite.remove(engineRef.current.world, ball);
      ballsRef.current = ballsRef.current.filter((item) => item !== ball);
      setCarried({
        ...ball.prize,
        left: `${left}%`,
        top: `${top}px`,
        shift: `${lift}px`,
      });
      setPhase("lifting");

      timersRef.current = [setTimeout(() => {
        setResult({ type: "prize", prize: ball.prize });
        setCollection((items) => ({ ...items, [ball.prize.id]: (items[ball.prize.id] || 0) + 1 }));
        setCarried(null);
        setPhase("idle");
        const radius = 19 + Math.random() * 5;
        const replacement = Bodies.circle(
          radius + Math.random() * Math.max(1, width - radius * 2),
          radius + 2,
          radius,
          { restitution: 0.72, friction: 0.035, frictionAir: 0.008, density: 0.0012 },
        );
        replacement.prize = prizes[Math.floor(Math.random() * prizes.length)];
        ballsRef.current.push(replacement);
        Composite.add(engineRef.current.world, replacement);
      }, 850)];
    }, 720)];
  };

  const closeResult = () => setResult(null);
  const cableStyle = {
    "--cable-length": `${cableLength}px`,
  };

  useEffect(() => {
    if (!result && !collectionOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        closeResult();
        setCollectionOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [result, collectionOpen]);

  return (
    <main className={`cd ${fading ? "fade" : ""} ${phase !== "idle" ? `is-${phase}` : ""}`}>
      <header className="cd-header">
        <p className="cd-kicker"><span /> WAITING ROOM / 01</p>
        <h1>Belum waktunya.</h1>
        <p className="cd-subtitle">Sambil menunggu, silakan lakukan aktivitas yang tidak penting.</p>
      </header>

      <section className="crane-machine" ref={machineRef} aria-label="Mesin capit gacha">
        <div className="crane-head">
          <button className="head-control" type="button" onClick={() => moveClaw(-0.1)} disabled={phase !== "idle"} aria-label="Geser capit ke kiri">◀</button>
          <div className="crane-track">
            <span className="track-rail" />
            <span className="track-tick tick-a" />
            <span className="track-tick tick-b" />
            <span className="track-tick tick-c" />
            <div className="claw-carriage" style={{ left: `${clawPosition}%`, ...cableStyle }} aria-hidden="true">
              <span className="claw-cable" />
              <span className="claw-grip" ref={gripRef}><i /><b /></span>
            </div>
          </div>
          <button className="head-control" type="button" onClick={() => moveClaw(0.1)} disabled={phase !== "idle"} aria-label="Geser capit ke kanan">▶</button>
          <span className="head-label">HEAD POSITION: {String(Math.round(clawPosition)).padStart(2, "0")}</span>
        </div>

        <div className="machine-body">
          <section className="timer-display" aria-label="Hitung mundur ulang tahun">
            <div className="display-heading"><span>WAKTU SEBELUM MESIN TERBUKA</span><span className="display-live">● LIVE</span></div>
            <div className="cd-nums">
              {units.map(([label, value]) => (
                <div key={label}><b>{pad(value)}</b><span>{label}</span></div>
              ))}
            </div>
            <div className="display-progress"><span /></div>
          </section>
          <p className="machine-instruction">ARAHKAN CAPIT, LALU TEKAN TOMBOL</p>
          <button className="drop-button" type="button" onClick={dropClaw} disabled={!ready || phase !== "idle"}>
            <span className="drop-button-icon" aria-hidden="true">⌄</span>
            {phase === "dropping" ? "MENCAPIT..." : phase === "lifting" ? "MENGANGKAT..." : phase === "missed" ? "KOSONG..." : "CAPIT BOLA"}
          </button>
        </div>

        <footer className="ball-pit" ref={pitRef}>
          <div className="pit-heading">
            <span>BALL PIT / 30</span>
            <span>GESER BOLA UNTUK DIADUK</span>
            <button className="collection-trigger" type="button" onClick={() => setCollectionOpen(true)}>
              KOLEKSI <b>{collectionCount}</b>
            </button>
          </div>
          <canvas ref={canvasRef} className="pit-canvas" role="img" aria-label="Bola-bola gacha bergerak karena gravitasi. Seret bola untuk mengaduknya." />
          <div className="pit-glass" aria-hidden="true" />
        </footer>
        {carried && (
          <span
            className={`carried-prize ${phase === "lifting" ? "lift" : ""}`}
            style={{ left: carried.left, top: carried.top, "--lift-shift": carried.shift, "--prize-color": carried.color }}
            aria-hidden="true"
          >{carried.icon}</span>
        )}
      </section>

      <footer className="cd-footer"><span>EST. KETIDAKSABARAN</span><span>◌ ◌ ◌</span><span>MOHON TETAP SANTAI</span></footer>

      {result && (
        <div className="gacha-modal-backdrop" onClick={closeResult}>
          <section className="gacha-modal" role="dialog" aria-modal="true" aria-labelledby="result-title" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" onClick={closeResult} aria-label="Tutup hasil">×</button>
            {result.type === "prize" ? (
              <>
                <p className="modal-kicker">HASIL TARIKAN / ITEM BARU</p>
                <div className="modal-prize" style={{ "--prize-color": result.prize.color }} aria-hidden="true">{result.prize.icon}</div>
                <h2 id="result-title">Kamu mendapatkan</h2>
                <p className="modal-reward-name">{result.prize.name}</p>
                <button className="modal-confirm" type="button" onClick={closeResult}>OKE, LANJUT NUNGGU</button>
              </>
            ) : (
              <>
                <div className="miss-mark" aria-hidden="true">∅</div>
                <h2 id="result-title">Yah, capitnya kosong.</h2>
                <p className="modal-reward-name">Bola yang kamu bidik tidak masuk di antara rahang capit. Geser sedikit, lalu coba lagi.</p>
                <button className="modal-confirm" type="button" onClick={closeResult}>COBA LAGI</button>
              </>
            )}
          </section>
        </div>
      )}

      {collectionOpen && (
        <div className="gacha-modal-backdrop" onClick={() => setCollectionOpen(false)}>
          <section className="gacha-modal collection-modal" role="dialog" aria-modal="true" aria-labelledby="collection-title" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" onClick={() => setCollectionOpen(false)} aria-label="Tutup koleksi">×</button>
            <p className="modal-kicker">INVENTARIS / {collectionCount} ITEM</p>
            <h2 id="collection-title">Koleksi gacha</h2>
            {collectionCount === 0 ? (
              <p className="collection-empty">Belum ada koleksi. Arahkan capit ke bola dan semoga kali ini masuk.</p>
            ) : (
              <div className="collection-list">
                {prizes.filter((prize) => collection[prize.id]).map((prize) => (
                  <div className="collection-item" key={prize.id}>
                    <span className="collection-icon" style={{ "--prize-color": prize.color }}>{prize.icon}</span>
                    <span className="collection-name">{prize.name}</span>
                    <b className="collection-quantity">×{collection[prize.id]}</b>
                  </div>
                ))}
              </div>
            )}
            <button className="modal-confirm" type="button" onClick={() => setCollectionOpen(false)}>KEMBALI KE MESIN</button>
          </section>
        </div>
      )}
    </main>
  );
}
