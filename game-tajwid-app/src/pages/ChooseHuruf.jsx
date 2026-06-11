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
        <h1 style={{ fontSize: '35px', fontWeight: 800, textAlign: 'center'}}>Pilih Huruf</h1>
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
      background: 'rgba(0,0,0,0.4)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999,
    }}
  >
    <div
      style={{
        background: 'white',
        padding: '24px',
        borderRadius: '16px',
        width: '320px',
        textAlign: 'center',
        boxShadow: '0 8px 24px rgba(0,0,0,.2)',
      }}
    >
      <h3 style={{ marginBottom: '12px' }}>
        Pilih Huruf Dulu
      </h3>

      <p style={{ marginBottom: '20px' }}>
        Silakan pilih salah satu huruf hijaiyah sebelum memulai belajar.
      </p>

      <button
        onClick={() => setShowModal(false)}
        style={{
          padding: '10px 20px',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          background: 'var(--aksen)',
          color: 'green',
          fontWeight: '700',
        }}
      >
        OK
      </button>
    </div>
  </div>
)}
    </div>
  );
}
