// ============================================================
//  SEMUA YANG PERLU KAMU GANTI ADA DI FILE INI
// ============================================================

// Tanggal & jam ulang tahun (+07:00 = WIB)
export const BIRTHDAY_DATE = "2026-08-31T00:00:00+07:00";
export const PARTNER_NAME = "Sayang";

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
export const MEMORY_TITLE = "Sedikit potongan cerita kita";
export const MEMORY_PHOTOS = [
{ src: "/images/photo1.jpg", caption: "Dari sekian banyak hari, ada momen yang selalu menyenangkan untuk diingat." }, { src: "/images/photo2.jpg", caption: "Nggak harus selalu ada sesuatu yang besar untuk membuat sebuah hari berarti." }, { src: "/images/photo3.jpg", caption: "Salah satu bagian kecil dari perjalanan yang masih ingin aku lanjutkan." },
];

// Scene 4 — Rasa syukur: urutan kalimat & foto seperti membaca surat.
// { text } = tulisan besar, { photo: n } = foto ke-n dari GRATITUDE_PHOTOS
export const GRATITUDE_PHOTOS = [
  { src: "/images/photo4.jpg", caption: "Kita, di hari yang biasa saja." },
  { src: "/images/photo5.jpg", caption: "Aku selalu suka yang ini." },
];
export const GRATITUDE_BEATS = [
  { text: "Aku bersyukur..." },
  { text: "karena dari sekian banyak kemungkinan, kita dipertemukan." },
  { photo: 0 },
  { text: "atas semua cerita yang kita punya, termasuk yang cuma kita berdua yang ngerti." },
  { text: "dan atas waktu yang kita habiskan bersama." },
  { photo: 1 },
  { text: "karena kamu jadi bagian penting dalam perjalanan hidupku." },
];

// Scene 5 — Harapan (dibuka satu per satu)
export const HOPES_TITLE = "Harapanku untukmu";
export const HOPES = [
  { title: "Untuk kesehatanmu", text: "Semoga kamu selalu sehat, dan ingat buat istirahat." },
  { title: "Untuk kebahagiaanmu", text: "Semoga kamu makin bahagia, dan segala urusanmu dimudahkan." },
  { title: "Untuk kekuatanmu", text: "Semoga kamu diberi kekuatan buat hal-hal yang sulit. Kamu lebih kuat dari yang kamu kira." },
  { title: "Untuk impianmu", text: "Semoga impian dan cita-citamu perlahan tercapai." },
  { title: "Untuk orang-orang di sekitarmu", text: "Semoga kamu selalu dikelilingi orang yang menyayangimu." },
  { title: "Untuk tahun ini", text: "Semoga tahun ini membawa banyak hal baik." },
];

// Scene 6 — Surat (klimaks)
export const LETTER_INTRO = "Ada satu hal yang ingin aku sampaikan...";
export const LETTER = [ `Untuk ${PARTNER_NAME},`, "Jujur, aku bukan orang yang selalu pandai menunjukkan perasaan lewat kata-kata. Kadang aku lebih banyak berpikir daripada mengungkapkannya.", "Tapi aku ingin kamu tahu kalau aku benar-benar menghargai kehadiranmu dalam hidupku.", "Aku tahu kita masing-masing punya kesibukan, rasa lelah, dan urusan yang harus diselesaikan. Aku juga tahu aku masih punya banyak hal yang perlu diperbaiki dari diriku sendiri.", "Aku nggak mau menjanjikan bahwa semuanya akan selalu mudah. Tapi aku ingin terus belajar menjadi seseorang yang bisa kamu percaya, yang bisa diajak bertumbuh, dan yang tetap berusaha hadir dalam hubungan ini.", "Aku punya harapan sederhana tentang masa depan. Sebuah kehidupan yang tenang, tempat kita bisa pulang tanpa harus berpura-pura menjadi orang lain. Tempat kita saling menghargai, saling menjaga, dan menikmati hal-hal kecil bersama.", "Dan entah bagaimana nanti perjalanan kita berjalan, aku harap kamu tidak pernah meragukan bahwa hari ini, aku sungguh bersyukur karena kamu ada.", "Selamat bertambah usia, sayang. Jangan lupa bahagia untuk dirimu sendiri, bukan hanya untuk orang lain." ];
export const LETTER_SIGN = "— Aku";

// Scene 7 — Penutup
export const CLOSING = ["Sekali lagi, selamat ulang tahun.", "Terima kasih sudah ada."];
