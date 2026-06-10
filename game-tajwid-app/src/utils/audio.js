/**
 * src/utils/audio.js
 * Fungsi pembantu untuk memutar audio.
 * Menggunakan cache sederhana agar file tidak diload ulang setiap kali.
 */
const _cache = {};

export function mainkanAudio(path) {
  try {
    if (!_cache[path]) _cache[path] = new Audio(path);
    const a = _cache[path];
    a.currentTime = 0;
    a.play().catch(() => {}); // abaikan jika autoplay diblokir
  } catch {}
}

export function mainkanSfx(jenis) {
  const map = {
    benar  : '/audio/correct.mp3',
    salah  : '/audio/wrong.mp3',
    levelup: '/audio/level-up.mp3',
    menang   : '/audio/victory.mp3',
  };
  if (map[jenis]) mainkanAudio(map[jenis]);
}
