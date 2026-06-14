/**
 * src/hooks/useGame.js
 *
 * Custom Hook — semua STATE dan LOGIKA game ada di sini.
 * Komponen screen hanya memanggil hook ini dan me-render hasilnya.
 *
 * State yang dikelola:
 *  - layar aktif (intro | pilih | game | hasil)
 *  - huruf yang dipilih
 *  - soal sesi saat ini
 *  - skor, benar, salah
 *  - status feedback (null | 'benar' | 'salah')
 */
import { useState, useCallback } from 'react';
import { SOAL, CONFIG }          from '../data/soal';
import { simpanProgres }         from '../utils/progres';
import { mainkanAudio, mainkanSfx, stopGameplayMusic } from '../utils/audio';

function acakSoal(jumlah) {
  return [...SOAL].sort(() => Math.random() - 0.5).slice(0, jumlah);
}

function getHurufBerharakat(huruf, gesture) {
  switch (gesture) {
    case 'up':
      return huruf + 'َ'; // fathah

    case 'down':
      return huruf + 'ِ'; // kasrah

    case 'right':
      return huruf + 'ُ'; // dhomah

    case 'up-long':
      return huruf + 'َا'; // mad fathah

    case 'down-long':
      return huruf + 'ِي'; // mad kasrah
    
    case 'right-long':
      return huruf + 'ُو'; // mad dhomah

    default:
      return huruf;
  }
}

export function useGame() {
  // ── Navigasi ──
  const [layar, setLayar] = useState('intro'); // 'intro'|'pilih'|'game'|'hasil'

  // ── Pilih Huruf ──
  const [hurufDipilih, setHurufDipilih] = useState(null);
  const [hurufTampil, setHurufTampil] = useState('');

  // ── Sesi Game ──
  const [soalSesi,   setSoalSesi]   = useState([]);
  const [soalIndex,  setSoalIndex]  = useState(0);
  const [skor,       setSkor]       = useState(0);
  const [jumlahBenar, setJumlahBenar] = useState(0);
  const [jumlahSalah, setJumlahSalah] = useState(0);

  // ── Feedback ──
  const [feedback, setFeedback] = useState(null); // null | { status, teks, sub }
  const [terkunci, setTerkunci] = useState(false);

  // ── Derived ──
  const soalAktif  = soalSesi[soalIndex] ?? null;
  const totalSoal  = soalSesi.length;
  const progPersen = totalSoal ? (soalIndex / totalSoal) * 100 : 0;

  // ─────────────────────────────────────
  // AKSI: MULAI SESI
  // ─────────────────────────────────────
  const mulaiSesi = useCallback(() => {
  if (!hurufDipilih) return;

  const soalBaru = acakSoal(CONFIG.jumlahSoal);

  setSoalSesi(soalBaru);
  setSoalIndex(0);
  setSkor(0);
  setJumlahBenar(0);
  setJumlahSalah(0);
  setFeedback(null);
  setTerkunci(false);

  setHurufTampil(hurufDipilih.arab); // tambah

  setLayar('game');
}, [hurufDipilih]);

  // ─────────────────────────────────────
  // AKSI: CEK JAWABAN (dipanggil dari useGesture)
  // ─────────────────────────────────────
  const cekJawaban = useCallback((arahGestur) => {
    if (terkunci || !soalAktif) return;
    setTerkunci(true);

    const benar = arahGestur === soalAktif.gesture;

    if (benar) {

  // tampilkan harakat pada huruf
  setHurufTampil(
    getHurufBerharakat(
      hurufDipilih.arab,
      soalAktif.gesture
    )
  );

  // setSkor(s => s + soalAktif.poin);
  setJumlahBenar(n => n + 1);
  const totalBenarBaru = jumlahBenar + 1;

  setSkor(
    Math.round(
      (totalBenarBaru / soalSesi.length) * 100
    )
  );
  mainkanSfx('benar');
  mainkanAudio(soalAktif.audio);

  setFeedback({
    status: 'benar',
    teks: 'Benar! 🎉',
    sub: 'Lanjut ke soal berikutnya'
  });
}else {

  setJumlahSalah(n => n + 1);

  setSkor(
    Math.round(
      (jumlahBenar / soalSesi.length) * 100
    )
  );

  mainkanSfx('salah');

  setFeedback({
    status: 'salah',
    teks: 'Kurang tepat',
    sub: `Yang benar: ${soalAktif.panah} ${soalAktif.label}`,
  });

}

    // Tunda ke soal berikutnya
    setTimeout(() => {
      setFeedback(null);
      setSoalIndex(idx => {
        const next = idx + 1;
        if (next >= CONFIG.jumlahSoal) {
          // Sesi selesai → hitung hasil
          const totalBenar = benar
            ? (jumlahBenar + 1)
            : jumlahBenar;
          const persen  = Math.round((totalBenar / CONFIG.jumlahSoal) * 100);
          const bintang = persen >= 80 ? 3 : persen >= 50 ? 2 : 1;
          simpanProgres(hurufDipilih.arab, bintang);

          if (bintang >= 2) {
            mainkanSfx('menang');
          }
          stopGameplayMusic();
          setLayar('hasil');
        }
        return next;
      });
      setHurufTampil(hurufDipilih.arab); // reset tampilan huruf
      setTerkunci(false);
    }, CONFIG.durasiKunci);

  }, [terkunci, soalAktif, jumlahBenar, hurufDipilih]);

  // ─────────────────────────────────────
  // AKSI: NAVIGASI
  // ─────────────────────────────────────
  const kePilih  = () => setLayar('pilih');
  const keIntro  = () => setLayar('intro');

  // ─────────────────────────────────────
  // HITUNG HASIL AKHIR
  // ─────────────────────────────────────
  const hasilAkhir = (() => {
  const persen = totalSoal
    ? Math.round((jumlahBenar / totalSoal) * 100)
    : 0;

  const bintang = persen >= 80 ? 3 : persen >= 50 ? 2 : 1;

  return {
    persen,
    bintang,
    skor: persen,
    jumlahBenar,
    jumlahSalah: totalSoal - jumlahBenar,
    totalSoal,
  };
})();

  return {
    // State
    layar, hurufDipilih, hurufTampil, soalAktif, soalIndex, totalSoal,
    skor, jumlahBenar, jumlahSalah, feedback, terkunci, progPersen,
    hasilAkhir,
    // Aksi
    setHurufDipilih, mulaiSesi, cekJawaban, kePilih, keIntro,
  };
}
