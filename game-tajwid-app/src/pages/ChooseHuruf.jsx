/**
 * src/screens/PilihHuruf.jsx
 * Grid 28 huruf hijaiyah. Tap huruf → pilih → klik Mulai.
 */
import { HURUF }        from '../data/huruf';
import { bacaProgres }  from '../utils/progres';
import Tombol           from '../pages/MenuButton';

export default function PilihHuruf({ hurufDipilih, onPilih, onMulai, onBack }) {
  const progres = bacaProgres();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      {/* Header */}
      <div style={{
        background: 'var(--card)', padding: '20px 20px 16px',
        boxShadow: '0 2px 8px rgba(44,24,16,.06)',
      }}>
        <button
          onClick={onBack}
          style={{
            marginBottom: '12px',
            padding: '8px 14px',
            borderRadius: '30px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '700'
          }}
  >
          ← Kembali
        </button>
        <h2 style={{ fontSize: '18px', fontWeight: 800 }}>Pilih Huruf</h2>
        <p  style={{ fontSize: '13px', color: 'var(--muted)', marginTop: 2 }}>
          Tap huruf yang ingin dipelajari
        </p>
      </div>

      {/* Grid huruf */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(5,1fr)',
        gap: '8px', padding: '16px', overflowY: 'auto', flex: 1,
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
                transition  : 'all .15s',
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
                fontFamily: 'var(--font-arab)', fontSize: '28px',
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
          disabled = {!hurufDipilih}
          onClick  = {onMulai}
        >
          {hurufDipilih
            ? `Belajar ${hurufDipilih.arab} (${hurufDipilih.latin}) →`
            : 'Pilih huruf dulu →'}
        </Tombol>
      </div>
    </div>
  );
}
