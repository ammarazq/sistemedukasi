/**
 * src/components/ui/ZonaGesture.jsx
 *
 * Zona interaktif tempat anak menggeser jari.
 * Menampilkan:
 *  - Panah animasi petunjuk arah
 *  - Progress bar jarak real-time
 *  - Garis threshold Mad (muncul hanya saat soal Mad)
 *  - Overlay feedback benar/salah
 *
 * Props:
 *  - soal      : object soal aktif
 *  - feedback  : null | { status, teks, sub }
 *  - jarakLive : number (dari useGesture)
 *  - gestureRef: ref untuk di-attach ke div zona
 */
import { CONFIG } from '../data/soal';

export default function ZonaGesture({ soal, feedback, jarakLive, gestureRef }) {
  const isMad    = soal?.gesture === 'up-long' || soal?.gesture === 'down-long' || soal?.gesture === 'right-long';
  // const persen   = Math.min(100, Math.round((jarakLive / CONFIG.jarakMad) * 100));
  const targetJarak = isMad
  ? CONFIG.jarakMad
  : CONFIG.jarakPendek;

const persen = Math.min(
  100,
  Math.round(
    (jarakLive / targetJarak) * 100
  )
);
  const barWarna = persen >= 100 ? 'var(--aksen2)' : 'var(--aksen)';

const namaHarakat = {
  up: 'Fathah',
  down: 'Kasrah',
  right: 'Dhomah',
  'up-long': 'Mad',
  'down-long': 'Mad',
  'right-long': 'Mad',
};

const teksProgress =
  isMad
    ? (
        persen >= 100
          ? '✓ Cukup untuk Mad'
          : persen > 40
            ? 'Terus geser...'
            : ''
      )
    : (
        jarakLive >= CONFIG.jarakPendek
          ? `✓ Cukup untuk ${namaHarakat[soal?.gesture]}`
          : ''
      );

  return (
    <div
      ref   = {gestureRef}
      style = {{
        width        : '100%',
        background   : 'var(--card)',
        borderRadius : 'var(--radius)',
        border       : `2px dashed ${feedback ? 'transparent' : 'var(--border)'}`,
        height       : '30vh',
        minHeight    : '220px',
        maxHeight    : '320px',
        display      : 'flex',
        alignItems   : 'center',
        justifyContent: 'center',
        userSelect   : 'none',
        touchAction  : 'none',
        position     : 'relative',
        overflow     : 'hidden',
        cursor       : 'crosshair',
      }}
    >
      {/* Garis threshold Mad */}
      {isMad && (
        <>
          <div style={garisThreshold('bottom', CONFIG.jarakMad)} aria-hidden>
            <span style={garisLabel}>MAD ↑</span>
          </div>

          <div style={garisThreshold('top', CONFIG.jarakMad)} aria-hidden>
            <span style={garisLabel}>MAD ↓</span>
          </div>
        </>
      )}

      {/* Panduan panah */}
      {!feedback && (
        <div style={{ textAlign: 'center', pointerEvents: 'none' }}>
          {teksProgress && (
  <div
    style={{
      marginTop: '12px',
      fontSize: '18px',
      fontWeight: 800,
      color: 'var(--aksen2)',
    }}
  >
    {teksProgress}
  </div>
)}
          <div style={{
            fontSize  : '36px',
            color     : 'var(--aksen)',
            animation : `${soal?.animasi ?? 'panah-atas'} 1.2s ease-in-out infinite`,
          }}>
            {soal?.panah ?? '↑'}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 600, marginTop: 4 }}>
            Geser jari di sini
          </div>
        </div>
      )}

      {/* Progress bar jarak */}
      <div style={{
        position: 'absolute', bottom: 45, left: 14, right: 14,
      }}>
        <div style={{
          fontSize: '12px',
          fontWeight: 800,
          color: persen >= 100
            ? 'var(--aksen2)'
            : 'var(--muted)',
          textAlign: 'right',
          marginBottom: 3,
          minHeight: 16,
        }}>
          {/* {persen >= 100 ? '✓ cukup untuk Mad!' : persen > 40 ? 'terus geser...' : ''} */}
          <div
            style={{
              fontSize: '15px',
              fontWeight: 800,
              color: persen >= 100
                ? 'var(--aksen2)'
                : 'var(--aksen)',
              textAlign: 'center',
              marginBottom: '8px',
            }}
          >
            {/* {teksProgress} */}
          </div>
        </div>
        <div style={{ height: 10, background: 'var(--bg)', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{
            height     : '100%',
            width      : `${persen}%`,
            background : barWarna,
            borderRadius: 999,
            transition : 'width .05s linear, background .2s',
          }} />
        </div>
      </div>

      {/* Overlay feedback */}
      {feedback && (
        <div style={{
          position      : 'absolute',
          inset         : 0,
          display       : 'flex',
          flexDirection : 'column',
          alignItems    : 'center',
          justifyContent: 'center',
          paddingTop     : '60px',
          borderRadius  : 'calc(var(--radius) - 2px)',
          background    : feedback.status === 'benar'
            ? 'rgba(26,127,90,0.93)'
            : 'rgba(192,57,43,0.88)',
          animation     : 'masuk .2s ease',
        }}>
          <div style={{ fontSize: 44, color: '#fff' }}>
            {feedback.status === 'benar' ? '✓' : '✗'}
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginTop: 4 }}>
            {feedback.teks}
          </div>
          <div style={{
            fontSize: 13, color: 'rgba(255,255,255,.85)',
            marginTop: 2, textAlign: 'center', padding: '0 8px',
          }}>
            {feedback.sub}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Helper style ──
function garisThreshold(sisi, nilai) {
  return {
    position   : 'absolute',
    [sisi]     : nilai,
    left: 12, right: 12,
    borderTop  : '1.5px dashed rgba(212,134,10,0.35)',
    pointerEvents: 'none',
    display    : 'flex',
    alignItems : 'center',
    justifyContent: 'flex-end',
  };
}
const garisLabel = {
  fontSize  : '9px',
  color     : 'var(--aksen)',
  fontWeight: 700,
  background: 'var(--card)',
  padding   : '0 4px',
  marginTop : '-8px',
};
