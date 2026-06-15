/**
 * src/screens/PilihHuruf.jsx
 * Grid 28 huruf hijaiyah. Tap huruf → pilih → klik Mulai.
 */
import { useState }     from 'react';
import { HURUF }        from '../data/huruf';
import { bacaProgres }  from '../utils/progres';
import Tombol           from '../pages/MenuButton';
import '../App.css';

export default function PilihHuruf({ hurufDipilih, onPilih, onMulai, onBack }) {
  const progres = bacaProgres();
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)'}}>
      {/* Header */}
      <div style={{
        background: 'var(--card)', padding: 'clamp(12px, 3vw, 20px) clamp(16px, 3vw, 20px) clamp(12px, 2.5vh, 16px)',
        boxShadow: '0 2px 8px rgba(44,24,16,.06)',
      }}>
      <div style={{ width: '100%', marginBottom: 'clamp(8px, 2vh, 12px)', display: 'flex' }}>
        <Tombol
          onClick={onBack}
          style={{
            width: 'clamp(100px, 30vw, 150px)',
            padding: 'clamp(6px, 1.5vh, 8px) clamp(10px, 2vw, 12px)',
            fontSize: 'clamp(12px, 2.2vw, 14px)',
          }}
        >
          ← Kembali
        </Tombol>
      </div>
      <div style={{ textAlign: 'center' }}>
  <div
    style={{
      fontSize: 'clamp(28px, 6vw, 48px)',
      animation: 'bounce 2s infinite'
    }}
  >
     ༺  ﷽ ༻  <br />
    📖🧕🏻
  </div>

  <h1
    style={{
      fontSize: 'clamp(24px, 7vw, 40px)',
      fontWeight: 800,
      color: '#FFC107',
      margin: 'clamp(8px, 2vh, 16px) 0 clamp(6px, 1.5vh, 12px) 0'
    }}
  >
    Pilih Huruf Hijaiyah
  </h1>

  <p
    style={{
      fontSize: 'clamp(13px, 2.5vw, 17px)',
      color: 'var(--muted)'
    }}
  >
    🌟 Ayo pilih huruf yang ingin dipelajari 🌟
  </p>
</div>
        {/* <h1 style={{ fontSize: '35px', fontWeight: 800, textAlign: 'center'}}>Pilih Huruf</h1> */}
        <p  style={{ fontSize: 'clamp(13px, 2.5vw, 17px)', color: 'var(--muted)', marginTop: 'clamp(4px, 1vh, 8px)', textAlign: 'center'}}>
          Tap huruf yang ingin dipelajari
        </p>
      </div>

      {/* Grid huruf */}
      <div className= "huruf-grid"
      style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(70px, 18vw, 90px), 1fr))',
        gap: 'clamp(8px, 2vw, 12px)', padding: 'clamp(12px, 2vw, 16px)', overflowY: 'auto', flex: 1,
        minHeight: 0,
      }}>
        {HURUF.map(h => {
          const dipilih  = hurufDipilih?.arab === h.arab;
          const bintang  = progres[h.arab] || 0;
          return (
            <button
              key     = {h.arab}
              onClick = {() => onPilih(h)}
              style   = {{
                background  : dipilih ? '#FFF3D4' : 'var(--card)',
                border      : `1.5px solid ${dipilih ? 'var(--aksen)' : 'var(--border)'}`,
                borderRadius: 'clamp(8px, 2vw, 12px)',
                padding     : 'clamp(8px, 1.5vw, 10px) clamp(2px, 1vw, 4px) clamp(6px, 1.2vw, 8px)',
                cursor      : 'pointer',
                display     : 'flex',
                flexDirection: 'column',
                alignItems  : 'center',
                gap         : 'clamp(2px, 0.5vw, 4px)',
                position    : 'relative',
                boxShadow   : dipilih ? '0 0 0 2px rgba(212,134,10,.2)' : 'none',
                transform  : dipilih ? 'scale(1.08)' : 'scale(1)',
                transition : 'all 0.15s',
              }}
            >
              {/* Bintang progres */}
              {bintang > 0 && (
                <span style={{
                  position: 'absolute', top: 4, right: 5,
                  fontSize: '9px', color: 'var(--aksen)',
                }}>
                  {'★'.repeat(Math.min(bintang, 3))}
                </span>
              )}
              <span style={{
                fontFamily: 'var(--font-arab)', fontSize: 'clamp(28px, 6vw, 48px)',
                lineHeight: 1.1, color: dipilih ? 'var(--aksen)' : 'var(--teks)',
              }}>
                {h.arab}
              </span>
              <span style={{ fontSize: 'clamp(7px, 1.5vw, 9px)', color: dipilih ? 'var(--aksen)' : 'var(--muted)', fontWeight: 600 }}>
                {h.latin}
              </span>
            </button>
          );
        })}
      </div>

      {/* Footer tombol */}
      <div style={{
        padding: 'clamp(12px, 2vw, 16px)', background: 'var(--card)',
        boxShadow: '0 -2px 8px rgba(44,24,16,.06)',
      }}>
        <Tombol
          blok
          onClick={() => {
            if (!hurufDipilih) {
              setShowModal(true);
              return;
            }
            onMulai();
          }}
        >
          {hurufDipilih
            ? `Belajar ${hurufDipilih.arab} (${hurufDipilih.latin}) →`
            : 'Pilih huruf dulu →'}
        </Tombol>
      </div>
      {showModal && (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.55)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      animation: 'fadeIn .25s ease',
    }}
  >
    <div
      style={{
        width: '90%',
        maxWidth: 'clamp(300px, 85vw, 420px)',
        padding: 'clamp(20px, 4vw, 28px)',
        borderRadius: 'clamp(16px, 4vw, 24px)',
        background:
          'linear-gradient(180deg,#FFFDF7 0%,#FFF4D6 100%)',
        boxShadow:
          '0 15px 40px rgba(0,0,0,.25)',
        textAlign: 'center',
        animation: 'zoomIn .25s ease',
      }}
    >
      {/* Icon */}
      <div
        style={{
          fontSize: 'clamp(40px, 10vw, 56px)',
          marginBottom: 'clamp(8px, 2vw, 10px)',
        }}
      >
        📚✨
      </div>

      {/* Title */}
      <h2
        style={{
          margin: 0,
          fontSize: 'clamp(20px, 5vw, 30px)',
          fontWeight: 800,
          color: '#0f8a70',
          marginBottom: 'clamp(8px, 2vw, 12px)',
        }}
      >
        Pilih Huruf Dulu
      </h2>

      {/* Description */}
      <p
        style={{
          fontSize: 'clamp(13px, 2.5vw, 17px)',
          lineHeight: 1.6,
          color: '#555',
          marginBottom: 'clamp(16px, 3vw, 24px)',
        }}
      >
        Silakan pilih salah satu
        <strong style={{ color: '#0f8a70' }}>
          {' '}huruf hijaiyah{' '}
        </strong>
        sebelum memulai belajar.
      </p>

      {/* Button */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Tombol
          onClick={() => setShowModal(false)}
          gold
          style={{
            width: 'clamp(140px, 50vw, 180px)',
            margin: '0 auto',
          }}
        >
          Mengerti
        </Tombol>
      </div>
    </div>
  </div>
)}
    </div>
  );
}
