import { useEffect, useRef, useState } from "react";
import { MEMORY_VIDEO_SRC, MEMORY_VIDEO_TITLE } from "../config";
import { Scene, Words } from "./Decorations";

export default function MemoryVideo() {
  const [available, setAvailable] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.3;
    }
  }, []);

  return (
    <Scene tone="video" className="memory-video-scene">
      <Words as="h2" className="h2" text={MEMORY_VIDEO_TITLE} />

      <div className="video-memory-card">
        <span className="video-tape" aria-hidden="true" />
        <span className="video-stamp" aria-hidden="true">
          TAKE 01 <i>♥</i>
        </span>
        <span className="video-spark video-spark-one" aria-hidden="true">✦</span>
        <span className="video-spark video-spark-two" aria-hidden="true">✧</span>

        <div className="memory-video-wrap">
          {available ? (
            <video
              ref={videoRef}
              className="memory-video"
              src={MEMORY_VIDEO_SRC}
              controls
              playsInline
              preload="metadata"
              aria-label={MEMORY_VIDEO_TITLE}
              onError={() => setAvailable(false)}
              onVolumeChange={(e) => {
                if (e.currentTarget.volume > 0.3) {
                  e.currentTarget.volume = 0.3;
                }
              }}
            />
          ) : (
            <p className="video-fallback">
              Tambahkan video di <code>public{MEMORY_VIDEO_SRC}</code> untuk menampilkannya di sini.
            </p>
          )}
        </div>

        <p className="video-note">
          Nggak direncanakan, tapi selalu seru kalau sama kamu.
        </p>
      </div>
    </Scene>
  );
}