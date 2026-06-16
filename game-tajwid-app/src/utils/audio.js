<<<<<<< HEAD

// import correct from '../assets/audio/correct.mp3';
// import wrong from '../assets/audio/wrong.mp3';
// import levelUp from '../assets/audio/level-up.mp3';
// import victory from '../assets/audio/victory.mp3';
// import intro from '../assets/audio/intro.mp3';
// import gameplay from '../assets/audio/gameplay.mp3';

// const _cache = {};

// export function mainkanAudio(path) {
//   try {
//     if (!_cache[path]) {
//       _cache[path] = new Audio(path);
//     }

//     const a = _cache[path];
//     a.currentTime = 0;
//     a.play().catch(() => {});
//   } catch {}
// }

// export function hentikanAudio(path) {
//   try {
//     const a = _cache[path];

//     if (!a) return;

//     a.pause();
//     a.currentTime = 0;
//   } catch {}
// }

// export function mainkanLoop(path) {
//   try {
//     if (!_cache[path]) {
//       _cache[path] = new Audio(path);
//     }

//     const a = _cache[path];

//     a.loop = true;
//     a.currentTime = 0;
//     a.play().catch(() => {});
//   } catch {}
// }

// export function mulaiGameplayMusic() {
//   mainkanLoop(gameplay);
// }

// export function stopGameplayMusic() {
//   hentikanAudio(gameplay);
// }

// export function stopIntroMusic() {
//   hentikanAudio(intro);
// }

// export function mainkanSfx(jenis) {
//   const map = {
//     benar: correct,
//     salah: wrong,
//     levelup: levelUp,
//     menang: victory,
//     intro: intro,
//     gameplay: gameplay,
//   };

//   if (map[jenis]) {
//     mainkanAudio(map[jenis]);
//   }
// }

/**
 * src/utils/audio.js
 */

import correct from '../assets/audio/correct.mp3';
import wrong from '../assets/audio/wrong.mp3';
import levelUp from '../assets/audio/level-up.mp3';
import victory from '../assets/audio/victory.mp3';
import intro from '../assets/audio/intro.mp3';
import gameplay from '../assets/audio/gameplay.mp3';

=======
import correct from "../assets/audio/correct.mp3";
import wrong from "../assets/audio/wrong.mp3";
import levelUp from "../assets/audio/level-up.mp3";
import victory from "../assets/audio/victory.mp3";
import intro from "../assets/audio/intro.mp3";
import gameplay from "../assets/audio/gameplay.mp3";
>>>>>>> 023099a7b936e878eb8991e00bd0841b262ce8a4

const _cache = {};

export function mainkanAudio(path) {
  try {
    if (!_cache[path]) {
      _cache[path] = new Audio(path);
    }

    const a = _cache[path];

    a.currentTime = 0;
    a.play().catch(() => {});
<<<<<<< HEAD

  } catch {}
=======
  } catch (e) {
    console.error("audio play error", e);
  }
}

export function hentikanAudio(path) {
  try {
    const a = _cache[path];
    if (!a) return;
    a.pause();
    a.currentTime = 0;
  } catch (e) {
    console.error("audio stop error", e);
  }
}

export function mainkanLoop(path) {
  try {
    if (!_cache[path]) _cache[path] = new Audio(path);
    const a = _cache[path];
    a.loop = true;
    a.currentTime = 0;
    a.play().catch(() => {});
  } catch (e) {
    console.error("audio loop error", e);
  }
}

export function mulaiGameplayMusic() {
  mainkanLoop(gameplay);
}

export function stopGameplayMusic() {
  hentikanAudio(gameplay);
}

export function stopIntroMusic() {
  hentikanAudio(intro);
>>>>>>> 023099a7b936e878eb8991e00bd0841b262ce8a4
}

export function hentikanAudio(path) {
  try {
    const a = _cache[path];

    if (!a) return;

    a.pause();
    a.currentTime = 0;
  } catch {}
}

export function mainkanLoop(path) {
  try {
    if (!_cache[path]) {
      _cache[path] = new Audio(path);
    }

    const a = _cache[path];

    a.loop = true;
    a.currentTime = 0;
    a.play().catch(() => {});


  } catch {}
}

export function hentikanAudio(path) {
  try {
    const a = _cache[path];

    if (!a) return;

    a.pause();
    a.currentTime = 0;
  } catch {}
}

export function mainkanLoop(path) {
  try {
    if (!_cache[path]) {
      _cache[path] = new Audio(path);
    }

    const a = _cache[path];

    a.loop = true;
    a.currentTime = 0;
    a.play().catch(() => {});
  } catch {}
}

export function mulaiGameplayMusic() {
  mainkanLoop(gameplay);
}

export function stopGameplayMusic() {
  hentikanAudio(gameplay);
}

export function stopIntroMusic() {
  hentikanAudio(intro);
}

export function mainkanSfx(jenis) {
  const map = {
<<<<<<< HEAD

    benar: '/audio/correct.mp3',
    salah: '/audio/wrong.mp3',
    levelup: '/audio/level-up.mp3',
    menang: '/audio/victory.mp3',
    intro: '/audio/intro.mp3',

=======
>>>>>>> 023099a7b936e878eb8991e00bd0841b262ce8a4
    benar: correct,
    salah: wrong,
    levelup: levelUp,
    menang: victory,
    intro: intro,
    gameplay: gameplay,
<<<<<<< HEAD

  };

  if (map[jenis]) {
    mainkanAudio(map[jenis]);
  }

}

const GAMEPLAY_AUDIO = '/audio/gameplay.mp3';
const INTRO_AUDIO = '/audio/intro.mp3';

export function mulaiGameplayMusic() {
  mainkanLoop(GAMEPLAY_AUDIO);
}

export function stopGameplayMusic() {
  hentikanAudio(GAMEPLAY_AUDIO);
}

export function stopIntroMusic() {
  hentikanAudio(INTRO_AUDIO);
}

=======
  };

  if (map[jenis]) mainkanAudio(map[jenis]);
}

>>>>>>> 023099a7b936e878eb8991e00bd0841b262ce8a4
export function hentikanSemuaAudio() {
  try {
    Object.values(_cache).forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
      audio.loop = false;
    });
<<<<<<< HEAD
  } catch {}

}
=======
  } catch (e) {
    console.error("stop all audio error", e);
  }
}
>>>>>>> 023099a7b936e878eb8991e00bd0841b262ce8a4
