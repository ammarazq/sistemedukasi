// ammara
import React from 'react';
import Tombol from '../pages/MenuButton';

const FEATURES = [
  { icon: '🎮', label: 'Gamifikasi' },
  { icon: '📈', label: 'Progres Skor' },
  { icon: '🕌', label: 'Islami' },
  { icon: '📱', label: 'Responsif' },
];

export default function TentangPage({ onBack }) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.18)',
        backdropFilter: 'blur(8px)',
        border: '1.5px solid rgba(255,255,255,0.35)',
        borderRadius: 20,
        padding: 'clamp(16px,4vw,32px)',
        width: '100%',
        height: '100%',
        maxWidth: 'none',
        maxHeight: 'none',
        minHeight: '100vh',
        textAlign: 'center',
        animation: 'fadeDown 0.6s ease both',
      }}
    >
      {/* Back */}
      <div style={{ maxWidth: '120px', marginBottom: '12px' }}>
        <Tombol
          onClick={onBack}
          style={{
            width: '120px',
            padding: '8px 12px',
            fontSize: '13px',
          }}
        >
          ← Kembali
        </Tombol>
      </div>

      {/* Logo */}
      <h2
        style={{
          fontFamily: "'Cinzel Decorative', serif",
          fontSize: 'clamp(50px,8vw,72px)',
          color: '#fef3c7',
          textShadow: '0 2px 8px rgba(0,50,30,0.3)',
          marginBottom: 4,
        }}
      >
        Game<span style={{ color: '#a8eddc' }}>Land</span>
      </h2>
      <p style={{ fontSize: 12, color: '#a8eddc', fontWeight: 600, letterSpacing: '0.1em', marginBottom: 16 }}>
        VERSI 1.0
      </p>

      {/* Description */}
      <p
        style={{
          color: '#f7f4e0',
          fontSize: 'clamp(20px,2vw,15px)',
          lineHeight: 1.7,
          marginBottom: 16,
          fontWeight: 600,
        }}
      >
        Gameland adalah aplikasi belajar harakat Al-Quran yang menyenangkan dan interaktif.
        Dirancang untuk pemula yang ingin mengenal tanda baca Arab dengan cara yang mudah dan gamifikasi.
      </p>

      {/* Features grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 8,
          marginBottom: 16,
        }}
      >
        {FEATURES.map((f) => (
          <div
            key={f.label}
            style={{
              background: 'rgba(255,255,255,0.15)',
              borderRadius: 12,
              padding: '10px 8px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 'clamp(18px,3.5vw,26px)', marginBottom: 4 }}>{f.icon}</div>
            <div style={{ color: '#fef3c7', fontSize: 'clamp(15px,2.2vw,18px)', fontWeight: 800 }}>
              {f.label}
            </div>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 'clamp(20px,1.6vw,12px)', color: '#a8eddc', fontWeight: 600, letterSpacing: '0.06em' }}>
        Dibuat dengan ❤️ untuk umat Islam
      </p>
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
