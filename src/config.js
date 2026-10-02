// ============================================================
//  SEMUA YANG PERLU KAMU GANTI ADA DI FILE INI
// ============================================================

// Tanggal & jam ulang tahun (+07:00 = WIB)
export const BIRTHDAY_DATE = "2026-08-04T00:00:00+07:00";
export const PARTNER_NAME = "Acaku Sayang";

// Lagu: taruh file di public/music/birthday-song.mp3
export const SONG_TITLE = "Music ini coy";
export const SONG_SRC = "/music/birthday-song.mp3";

// Scene 1 — Opening
export const HERO_SUB =
  "Aduhai Mau Kepala dua nih :v .";

// Scene 2 — Hangat (tiap item muncul bertahap saat di-scroll)
export const GREETING = [
  "Selamat ulang tahun yang ke 19 yahh, sayangku, cinta ku manis ku, calon istri ku, my honey, my wife, my bini, my istri ",

  "Terima Kasih banget lho sudah Hadir dalam hidup aku ",
];

// Scene 3 — Foto kenangan. Taruh file di public/images/
// Foto pertama tampil besar dengan frame; sisanya polaroid. Tambah/kurangi bebas.
export const MEMORY_TITLE = "Sedikit Cerita Tentang Cantikku";
export const MEMORY_PHOTOS = [
{ src: "/images/photo1.jpeg", caption: "Untuk Pertama Kali nya aku tergila gila sama kamu sayang :v" }, 
{ src: "/images/photo2.jpeg", caption: "Ekspresi Sayang kalo lagi marah dan ngamok aaa ngerinyaaa" }, 
{ src: "/images/photo3.jpeg", caption: "Sayang waktu lagi nambah cantik mhehehe" },
];
export const MEMORY_VIDEO_TITLE = "Kerandoman yang biasa kita lakukan :v";
export const MEMORY_VIDEO_SRC = "/videos/memory.mp4";

// Scene 4 — Rasa syukur: urutan kalimat & foto seperti membaca surat.
// { text } = tulisan besar, { photo: n } = foto ke-n dari GRATITUDE_PHOTOS
export const GRATITUDE_PHOTOS = [
  { src: "/images/photo4.jpeg", caption: "Salah Satu Momen Yang aku Banggakan" },
  { src: "/images/photo5.jpeg", caption: "Semoga kita selalu bisa seperti ini yah sayang" },
];
export const GRATITUDE_BEATS = [
  { text: "Aku bersyukur banget..." },
  { text: "karena dari sekian banyak kemungkinan, kita dipertemukan." },
  { photo: 0 },
  { text: "atas semua cerita yang kita punya, termasuk yang cuma kita berdua yang ngerti." },
  { text: "dan atas waktu yang kita habiskan bersama." },
  { photo: 1 },
  { text: "karena kamu udah jadi bagian penting dalam perjalanan hidupku." },
];

// Scene 5 — Harapan (dibuka satu per satu)
export const HOPES_TITLE = "Beberapa Harapan untuk kamu";
export const HOPES = [
  { title: "Untuk kesehatanmu", text: "Jajan kecil nya kurangi yahh sayang, sama jam makan nya lhoo, jgn smpe telat" },
  { title: "Untuk kebahagiaanmu", text: "Semoga sayang menemukan kebahagian di setiap momen dalam hidup sayang yahh" },
  { title: "Untuk kekuatanmu", text: "Sayang sebenarnya pinter dan cepet nangkep kok, agak emosian aja :v coba kendaliin emosinya lagi yahh sayang" },
  { title: "Untuk impianmu", text: "Perlahan lahan pasti bisa kok sayangku, jadi jangan terlalu berkecil hati yahh. kamu udah hebat banget lho di usia ini" },
  { title: "Untuk Tahun Ini", text: "semoga kesampean beli iphone di tahun ini yah sayang" },
  { title: "Untuk Masa Depan", text: "Semoga kamu tetep memilih aku yah, buat selalu berjalan di samping kamu " },
];

// Scene 6 — Surat (klimaks)
export const LETTER_INTRO = "Ada satu hal yang ingin aku sampaikan...";
export const LETTER = [ `Untuk ${PARTNER_NAME},`, "Jujur, aku bukan orang yang selalu pandai menunjukkan perasaan lewat kata-kata. Kadang aku lebih banyak berpikir daripada mengungkapkannya.", "Tapi aku ingin kamu tahu kalau aku benar-benar menghargai kehadiranmu dalam hidupku.", "Aku tahu kita masing-masing punya kesibukan, rasa lelah, dan urusan yang harus diselesaikan. Aku juga tahu aku masih punya banyak hal yang perlu diperbaiki dari diriku sendiri.", "Aku nggak mau menjanjikan bahwa semuanya akan selalu mudah. Tapi aku ingin terus belajar menjadi seseorang yang bisa kamu percaya, yang bisa diajak bertumbuh, dan yang tetap berusaha hadir dalam hubungan ini.", "Aku punya harapan sederhana tentang masa depan. Sebuah kehidupan yang tenang, tempat kita bisa pulang tanpa harus berpura-pura menjadi orang lain. Tempat kita saling menghargai, saling menjaga, dan menikmati hal-hal kecil bersama.", "Dan entah bagaimana nanti perjalanan kita berjalan, aku harap kamu tidak pernah meragukan bahwa hari ini, aku sungguh bersyukur karena kamu ada.", "Selamat bertambah usia, sayangku ❤️." ];
export const LETTER_SIGN = "— Ico";

// Scene 7 — Penutup
export const CLOSING = ["Sekali lagi, selamat ulang tahun.", "Terima kasih sudah ada."];
