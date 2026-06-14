// /**
//  * src/utils/audio.js
//  * Fungsi pembantu untuk memutar audio.
//  * Menggunakan cache sederhana agar file tidak diload ulang setiap kali.
//  */
// const _cache = {};

// export function mainkanAudio(path) {
//   try {
//     if (!_cache[path]) _cache[path] = new Audio(path);
//     const a = _cache[path];
//     a.currentTime = 0;
//     a.play().catch(() => {}); // abaikan jika autoplay diblokir
//   } catch {}
// }

// export function mainkanSfx(jenis) {
//   const map = {
//     benar  : '/audio/correct.mp3',
//     salah  : '/audio/wrong.mp3',
//     levelup: '/audio/level-up.mp3',
//     menang   : '/audio/victory.mp3',
//   };
//   if (map[jenis]) mainkanAudio(map[jenis]);
// }

import correct from '../assets/audio/correct.mp3';
import wrong from '../assets/audio/wrong.mp3';
import levelUp from '../assets/audio/level-up.mp3';
import victory from '../assets/audio/victory.mp3';
import intro from '../assets/audio/intro.mp3';

const _cache = {};

export function mainkanAudio(path) {
  try {
    if (!_cache[path]) {
      _cache[path] = new Audio(path);
    }

    const a = _cache[path];
    a.currentTime = 0;
    a.play().catch(() => {});
  } catch {}
}

export function mainkanSfx(jenis) {
  const map = {
    benar: correct,
    salah: wrong,
    levelup: levelUp,
    menang: victory,
    intro: intro,
  };

  if (map[jenis]) {
    mainkanAudio(map[jenis]);
  }
}