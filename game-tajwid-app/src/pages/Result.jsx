/**
 * src/screens/Hasil.jsx
 * Layar hasil akhir sesi.
 */
import { useEffect, useState } from 'react';
import Tombol from '../pages/MenuButton';
import Kartu  from '../pages/cards.jsx';

export default function Hasil({ hasilAkhir, huruf, onUlang, onGantiHuruf, onHome }) {
  const { bintang, skor, jumlahBenar, jumlahSalah, totalSoal } = hasilAkhir;
  const [skorTampil, setSkorTampil] = useState(0);

  // Animasi skor naik
  useEffect(() => {
    let n = 0;
    const step  = Math.max(1, Math.floor(skor / 25));
    const timer = setInterval(() => {
      n = Math.min(n + step, skor);
      setSkorTampil(n);
      if (n >= skor) clearInterval(timer);
    }, 35);
    return () => clearInterval(timer);
  }, [skor]);

  const INFO = {
    3: { emoji: '🏆', judul: 'Luar Biasa!' },
    2: { emoji: '😊', judul: 'Bagus Sekali!' },
    1: { emoji: '💪', judul: 'Terus Berlatih!' },
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '28px 20px', textAlign: 'center',
      background: 'linear-gradient(160deg,#FDF6EC 0%,#FFF0D0 100%)',
      gap: '8px',
    }}>
      <div style={{ fontSize: 'clamp(50px,12vw,72px)' }}>{INFO[bintang].emoji}</div>
      <div style={{ fontSize: 'clamp(20px,5vw,30px)', fontWeight: 800 }}>{INFO[bintang].judul}</div>
      <div style={{ fontSize: 'clamp(40px,10vw,60px)', fontWeight: 800, color: 'var(--aksen)', lineHeight: 1 }}>
        {skorTampil}
      </div>
      <div style={{ fontSize: '13px', color: 'var(--muted)' }}>dari 100 poin</div>
      <div style={{ fontSize: 'clamp(28px,8vw,40px)' }}>
        {'★'.repeat(bintang)}{'☆'.repeat(3 - bintang)}
      </div>

      <Kartu style={{ width: '100%', maxWidth: 'min(90vw, 420px)' }}>
        {[
          { label: 'Huruf',      val: `${huruf?.arab} (${huruf?.latin})`, cls: '' },
          { label: 'Benar',      val: jumlahBenar, cls: 'hijau' },
          { label: 'Salah',      val: jumlahSalah, cls: 'merah' },
          { label: 'Total Soal', val: totalSoal,   cls: '' },
        ].map(r => (
          <div key={r.label} style={{
            display: 'flex', justifyContent: 'space-between',
            padding: '9px 0', borderBottom: '1px solid var(--bg)',
            fontSize: '14px',
          }}>
            <span style={{ color: 'var(--muted)' }}>{r.label}</span>
            <span style={{
              fontWeight: 700,
              color: r.cls === 'hijau' ? 'var(--aksen2)' : r.cls === 'merah' ? 'var(--bahaya)' : 'inherit',
            }}>{r.val}</span>
          </div>
        ))}
      </Kartu>

      <div style={{ display: 'flex', gap: '12px', width: '100%', maxWidth: '600px', flexWrap: 'wrap', justifyContent: 'center', }}>
        <Tombol
          label="🏠 Beranda"
          style={{ flex: '1 1 180px'}}
          onClick={onHome}
        />
        <Tombol 
          label="Ganti Huruf" 
          style={{ flex: '1 1 180px'}} 
          onClick={onGantiHuruf}
          />
        <Tombol 
          label="Ulangi Lagi ↺"
          gold
          style={{ flex: '1 1 240px' }}
          onClick={onUlang}
          />
      </div>
    </div>
  );
}