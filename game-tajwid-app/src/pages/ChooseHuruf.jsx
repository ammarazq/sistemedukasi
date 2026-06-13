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
        background: 'var(--card)', padding: '20px 20px 16px',
        boxShadow: '0 2px 8px rgba(44,24,16,.06)',
      }}>
      <div style={{ maxWidth: '30px', marginBottom: '6px' }}>
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
      <div style={{ textAlign: 'center' }}>
  <div
    style={{
      fontSize: '40px',
      animation: 'bounce 2s infinite'
    }}
  >
     ༺  ﷽ ༻  <br />
    📖🧕🏻
  </div>

  <h1
    style={{
      fontSize: '35px',
      fontWeight: 800,
      color: '#FFC107'
    }}
  >
    Pilih Huruf Hijaiyah
  </h1>

  <p
    style={{
      fontSize: '17px',
      color: 'var(--muted)'
    }}
  >
    🌟 Ayo pilih huruf yang ingin dipelajari 🌟
  </p>
</div>
        {/* <h1 style={{ fontSize: '35px', fontWeight: 800, textAlign: 'center'}}>Pilih Huruf</h1> */}
        <p  style={{ fontSize: '17px', color: 'var(--muted)', marginTop: 2, textAlign: 'center'}}>
          Tap huruf yang ingin dipelajari
        </p>
      </div>

      {/* Grid huruf */}
      <div className= "huruf-grid"
      style={{
        display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
        gap: '10px', padding: '16px', overflowY: 'auto', flex: 1,
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
                borderRadius: '12px',
                padding     : '10px 4px 8px',
                cursor      : 'pointer',
                display     : 'flex',
                flexDirection: 'column',
                alignItems  : 'center',
                gap         : '3px',
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
                fontFamily: 'var(--font-arab)', fontSize: 'clamp(36px,7vw,50px)',
                lineHeight: 1.1, color: dipilih ? 'var(--aksen)' : 'var(--teks)',
              }}>
                {h.arab}
              </span>
              <span style={{ fontSize: '9px', color: dipilih ? 'var(--aksen)' : 'var(--muted)', fontWeight: 600 }}>
                {h.latin}
              </span>
            </button>
          );
        })}
      </div>

      {/* Footer tombol */}
      <div style={{
        padding: '16px', background: 'var(--card)',
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
        maxWidth: '420px',
        padding: '28px',
        borderRadius: '24px',

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
          fontSize: '56px',
          marginBottom: '10px',
        }}
      >
        📚✨
      </div>

      {/* Title */}
      <h2
        style={{
          margin: 0,
          fontSize: '30px',
          fontWeight: 800,
          color: '#0f8a70',
          marginBottom: '12px',
        }}
      >
        Pilih Huruf Dulu
      </h2>

      {/* Description */}
      <p
        style={{
          fontSize: '17px',
          lineHeight: 1.6,
          color: '#555',
          marginBottom: '24px',
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
      width: '180px',
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
