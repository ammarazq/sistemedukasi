/**
 * src/data/soal.js
 * Bank soal harakat beserta mapping gesture-nya.
 *
 * gesture: 'up' | 'down' | 'right' | 'up-long' | 'down-long'
 */
export const SOAL = [
  {
    id      : 'fathah_pendek',
    label   : 'Fathah pendek (ـَ)',
    gesture : 'up',
    panah   : '↑',
    animasi : 'panah-atas',
    hint    : 'Bunyi "a" — geser ke atas',
    audio   : '/audio/fathah-pendek.mp3',
    // poin    : 20,
  },
  {
    id      : 'kasroh_pendek',
    label   : 'Kasroh pendek (ـِ)',
    gesture : 'down',
    panah   : '↓',
    animasi : 'panah-atas',
    hint    : 'Bunyi "i" — geser ke bawah',
    audio   : '/audio/kasroh-pendek.mp3',
    // poin    : 20,
  },
  {
    id      : 'dhomah_pendek',
    label   : 'Dhomah pendek (ـُ)',
    gesture : 'right',
    panah   : '→',
    animasi : 'panah-kanan',
    hint    : 'Bunyi "u" — geser ke kanan',
    audio   : '/audio/dhomah-pendek.mp3',
    // poin    : 20,
  },
  {
    id      : 'fathah_panjang',
    label   : 'Fathah panjang / Mad (ـَا)',
    gesture : 'up-long',
    panah   : '↑↑',
    animasi : 'panah-atas',
    hint    : 'Bunyi "aa" — geser JAUH ke atas',
    audio   : '/audio/mad-fathah.mp3',
    // poin    : 20,
  },
  {
    id      : 'kasroh_panjang',
    label   : 'Kasroh panjang / Mad (ـِي)',
    gesture : 'down-long',
    panah   : '↓↓',
    animasi : 'panah-atas',
    hint    : 'Bunyi "ii" — geser JAUH ke bawah',
    audio   : '/audio/mad-kasroh.mp3',
    // poin    : 20,
  },
  {
    id      : 'dhomah_panjang',
    label   : 'Dhomah panjang / Mad (ـُو)',
    gesture : 'right-long',
    panah   : '→→',
    animasi : 'panah-kanan',
    hint    : 'Bunyi "uu" — geser JAUH ke kanan',
    audio   : '/audio/mad-dhomah.mp3',
    // poin    : 20,
  }
  //   {
  //   id      : 'jawaban_benar',
  //   label   : 'Jawaban benar',
  //   audio   : '/src/audio/correct.mp3',

  // },
];

export const CONFIG = {
  jumlahSoal  : 6,
  jarakMin    : 15,   // px — gesture terlalu pendek, diabaikan
  jarakPendek : 35,   // px — threshold untuk harakat pendek
  jarakMad    : 55,   // px — threshold untuk harakat panjang
  durasiKunci : 800, // ms — jeda sebelum soal berikutnya
};
