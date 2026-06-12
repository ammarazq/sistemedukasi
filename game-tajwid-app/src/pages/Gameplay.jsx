/**
 * src/screens/Game.jsx
 * Layar permainan utama.
 */
import { useGesture }    from '../hooks/useGesture.js';
import ZonaGesture       from '../pages/ZonaGesture';
import Kartu             from '../pages/cards.jsx';
import { SOAL }          from '../data/soal';

const REF_GESTUR = [
  { panah: '↑',  label: 'Fathah',    g: 'up'        },
  { panah: '↓',  label: 'Kasroh',    g: 'down'      },
  { panah: '→',  label: 'Dhomah',    g: 'right'     },
  { panah: '↑↑', label: 'Mad atas',  g: 'up-long'   },
  { panah: '↓↓', label: 'Mad bawah', g: 'down-long' },
];

export default function Game({
  huruf, hurufTampil, soalAktif, soalIndex, totalSoal,
  skor, feedback, terkunci, progPersen,
  onGesture,
}) {
  const { ref: gestureRef, jarakLive } = useGesture({
    onGesture,
    aktif: !terkunci,
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 16px', background: 'var(--card)',
        boxShadow: '0 2px 8px rgba(44,24,16,.06)',
      }}>
        <div>
          <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 600 }}>
            Huruf {huruf?.arab} ({huruf?.latin})
          </div>
          <div style={{ fontSize: '15px', fontWeight: 800 }}>
            Soal {soalIndex + 1} dari {totalSoal}
          </div>
        </div>
        <div style={{
          background: 'var(--bg)', border: '1.5px solid var(--border)',
          borderRadius: '50px', padding: '6px 14px',
          fontSize: '15px', fontWeight: 800, color: 'var(--aksen)',
        }}>
          {skor}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 5, background: 'var(--border)' }}>
        <div style={{
          height: '100%', width: `${progPersen}%`,
          background: 'linear-gradient(90deg,var(--aksen),#F4A623)',
          transition: 'width .4s ease', borderRadius: '0 3px 3px 0',
        }} />
      </div>

      {/* Body */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', padding: '16px', gap: '14px',
      }}>
        <Kartu style={{ width: '100%', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 600, marginBottom: 4 }}>
            Gestur untuk harakat:
          </div>
          <div style={{ fontSize: '16px', fontWeight: 800 }}>
            {soalAktif?.label}
          </div>
        </Kartu>

        <div style={{
  fontFamily: 'var(--font-arab)',
  fontSize: '100px',
  lineHeight: 1.2,
  textAlign: 'center',
  minHeight: '120px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  color:
    feedback?.status === 'benar'
      ? '#2E7D32'
      : '#D4A017',

  transform:
    feedback?.status === 'benar'
      ? 'scale(1.15)'
      : 'scale(1)',

  transition: 'all .3s ease',

  textShadow:
    '0 0 15px rgba(52,152,219,.4)',
}}>
          {hurufTampil || huruf?.arab}
        </div>

        <div style={{ fontSize: '13px', color: 'var(--muted)', fontStyle: 'italic' }}>
          {soalAktif?.hint}
        </div>

        <ZonaGesture
          soal       = {soalAktif}
          feedback   = {feedback}
          jarakLive  = {jarakLive}
          gestureRef = {gestureRef}
        />

        {/* Referensi gesture */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
          {REF_GESTUR.map(r => (
            <div key={r.g} style={{
              background   : r.g === soalAktif?.gesture ? '#FFF3D4' : 'var(--card)',
              border       : `1.5px solid ${r.g === soalAktif?.gesture ? 'var(--aksen)' : 'var(--border)'}`,
              color        : r.g === soalAktif?.gesture ? 'var(--aksen)' : 'var(--teks)',
              borderRadius : '50px', padding: '5px 12px',
              fontSize: '12px', fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: '5px',
            }}>
              <span>{r.panah}</span>{r.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
