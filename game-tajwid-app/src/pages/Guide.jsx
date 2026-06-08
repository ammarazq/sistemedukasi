import React from 'react';

const HARAKAT_TABLE = [
  { arabic: 'بَ', latin: 'ba' },
  { arabic: 'بِ', latin: 'bi' },
  { arabic: 'بُ', latin: 'bu' },
  { arabic: 'بْ', latin: 'b (sukun)' },
  { arabic: 'بَّ', latin: 'bba (syaddah)' },
  { arabic: 'بً', latin: 'ban' },
  { arabic: 'بٍ', latin: 'bin' },
  { arabic: 'بٌ', latin: 'bun' },
  { arabic: 'بَا', latin: 'baa' },
  { arabic: 'بِي', latin: 'bii' },
];

const STEPS = [
  { num: 1, text: <>Kamu akan melihat <strong style={{ color: '#fef3c7' }}>huruf Arab beserta harakatnya</strong>. Tebak cara membacanya!</> },
  { num: 2, text: <>Pilih <strong style={{ color: '#fef3c7' }}>jawaban yang benar</strong> dari 4 pilihan yang tersedia.</> },
  { num: 3, text: <>Setiap jawaban benar mendapat <strong style={{ color: '#fef3c7' }}>+10 poin</strong>. Salah, kamu kehilangan 1 ❤️.</> },
  { num: 4, text: <>Game berakhir jika <strong style={{ color: '#fef3c7' }}>3 nyawa habis</strong> atau semua soal selesai.</> },
];

export default function PanduanPage({ onBack }) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.18)',
        backdropFilter: 'blur(8px)',
        border: '1.5px solid rgba(255,255,255,0.35)',
        borderRadius: 20,
        padding: 'clamp(16px,4vw,32px)',
        maxWidth: 600,
        width: '100%',
        animation: 'fadeDown 0.6s ease both',
        overflowY: 'auto',
        maxHeight: '80svh',
      }}
    >
      {/* Back */}
      <button onClick={onBack} style={backBtnStyle}>← Kembali</button>

      {/* Title */}
      <h2
        style={{
          fontFamily: "'Cinzel Decorative', serif",
          fontSize: 'clamp(18px,4vw,30px)',
          color: '#fff8e0',
          textAlign: 'center',
          marginBottom: 14,
          textShadow: '0 2px 8px rgba(0,50,30,0.3)',
        }}
      >
        Panduan Bermain
      </h2>

      {/* Steps */}
      {STEPS.map((s) => (
        <div
          key={s.num}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 12,
            marginBottom: 10,
            background: 'rgba(255,255,255,0.15)',
            borderRadius: 14,
            padding: '10px 14px',
          }}
        >
          <span
            style={{
              width: 28, height: 28, minWidth: 28,
              borderRadius: '50%',
              background: '#c8960c',
              color: '#fff8e0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: 13, flexShrink: 0,
            }}
          >
            {s.num}
          </span>
          <p style={{ color: '#fff', fontSize: 'clamp(12px,2vw,15px)', lineHeight: 1.55, fontWeight: 600 }}>
            {s.text}
          </p>
        </div>
      ))}

      {/* Harakat table */}
      <table style={{ width: '100%', marginTop: 14, borderCollapse: 'separate', borderSpacing: 6 }}>
        <thead>
          <tr>
            {HARAKAT_TABLE.map((h, i) => (
              <th
                key={i}
                style={{
                  fontFamily: "'Amiri', serif",
                  fontSize: 'clamp(18px,3.5vw,26px)',
                  color: '#fef3c7',
                  textAlign: 'center',
                  padding: '6px 4px',
                  background: 'rgba(0,0,0,0.2)',
                  borderRadius: 8,
                }}
              >
                {h.arabic}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {HARAKAT_TABLE.map((h, i) => (
              <td
                key={i}
                style={{
                  fontSize: 'clamp(9px,1.5vw,12px)',
                  color: '#e0f7f0',
                  textAlign: 'center',
                  padding: '4px 2px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: 8,
                  fontWeight: 600,
                }}
              >
                {h.latin}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const backBtnStyle = {
  display: 'block',
  marginBottom: 12,
  background: 'rgba(10,61,40,0.55)',
  border: '1.5px solid rgba(200,160,60,0.45)',
  borderRadius: 50,
  color: '#f5e9c0',
  fontFamily: "'Nunito', sans-serif",
  fontSize: 'clamp(11px,1.8vw,14px)',
  fontWeight: 700,
  padding: '6px 14px',
  cursor: 'pointer',
  letterSpacing: '0.06em',
};
