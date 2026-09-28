import { GRATITUDE_BEATS, GRATITUDE_PHOTOS } from "../config";
import { Scene, Words } from "./Decorations";
import { Frame } from "./PhotoStory";

// Seperti membaca surat: satu beat per layar, banyak ruang kosong
export default function GratitudeSection() {
  return (
    <Scene tone="grat" className="grat">
      {GRATITUDE_BEATS.map((b, i) => (
        <div className="beat" key={i}>
          {b.text
            ? <Words className="big" text={b.text} step={110} />
            : <Frame small p={GRATITUDE_PHOTOS[b.photo]} />}
        </div>
      ))}
    </Scene>
  );
}
