// Halaman sunyi: hanya angka dan satu kalimat.
const pad = (n) => String(n).padStart(2, "0");

export default function Countdown({ remaining, fading }) {
  const s = Math.max(0, Math.floor(remaining / 1000));
  const units = [
    ["hari", Math.floor(s / 86400)],
    ["jam", Math.floor((s % 86400) / 3600)],
    ["menit", Math.floor((s % 3600) / 60)],
    ["detik", s % 60],
  ];
  return (
    <main className={`cd ${fading ? "fade" : ""}`}>
      <div className="cd-nums">
        {units.map(([l, v]) => (
          <div key={l}><b>{pad(v)}</b><span>{l}</span></div>
        ))}
      </div>
      <p>Tunggu sebentar...</p>
    </main>
  );
}
