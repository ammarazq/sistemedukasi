/**
 * src/hooks/useGesture.js
 *
 * Custom Hook — mendeteksi gesture swipe di sebuah elemen.
 *
 * Cara pakai:
 *   const { ref, jarakLive } = useGesture({ onGesture: (arah) => ... });
 *   <div ref={ref}>...</div>
 *
 * Mengembalikan:
 *  - ref       : attach ke elemen zona gesture
 *  - jarakLive : jarak px real-time selama jari bergerak (untuk progress bar)
 */
import { useRef, useState, useEffect, useCallback } from 'react';
import { CONFIG } from '../data/soal';

export function useGesture({ onGesture, aktif = true }) {
  const ref       = useRef(null);
  const startX    = useRef(0);
  const startY    = useRef(0);
  const isDragging = useRef(false);
  const [jarakLive, setJarakLive] = useState(0);

  const hitung = useCallback((endX, endY) => {
    const dx = endX - startX.current;
    const dy = endY - startY.current;

    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < CONFIG.jarakPendek) return;

    const panjang = dist >= CONFIG.jarakMad;

    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    let arah;

    // lebih toleran untuk geser kanan
// dominan horizontal
    if (absX > absY * 0.8) {

      if (dx > 0) {
        arah = panjang ? 'right-long' : 'right';
      } else {
        arah = 'left';
      }

    } else {

      if (dy < 0) {
        arah = panjang ? 'up-long' : 'up';
      } else {
        arah = panjang ? 'down-long' : 'down';
      }

    }

    onGesture(arah);

    setJarakLive(0);

  }, [onGesture]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !aktif) return;

    const onStart = (x, y) => {
      startX.current  = x;
      startY.current  = y;
      isDragging.current = true;
      setJarakLive(0);
    };
    const onMove = (x, y) => {
      if (!isDragging.current) return;
      const dx = x - startX.current;
      const dy = y - startY.current;
      setJarakLive(Math.sqrt(dx * dx + dy * dy));
    };
    const onEnd = (x, y) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      hitung(x, y);
    };

    // Touch
    const tStart = e => { e.preventDefault(); const t = e.touches[0]; onStart(t.clientX, t.clientY); };
    const tMove  = e => { e.preventDefault(); const t = e.touches[0]; onMove(t.clientX, t.clientY);  };
    const tEnd   = e => { const t = e.changedTouches[0]; onEnd(t.clientX, t.clientY); };

    // Mouse (untuk testing di desktop)
    const mDown = e => onStart(e.clientX, e.clientY);
    const mMove = e => onMove(e.clientX, e.clientY);
    const mUp   = e => onEnd(e.clientX, e.clientY);

    el.addEventListener('touchstart', tStart, { passive: false });
    el.addEventListener('touchmove',  tMove,  { passive: false });
    el.addEventListener('touchend',   tEnd);
    el.addEventListener('mousedown',  mDown);
    el.addEventListener('mousemove',  mMove);
    el.addEventListener('mouseup',    mUp);

    return () => {
      el.removeEventListener('touchstart', tStart);
      el.removeEventListener('touchmove',  tMove);
      el.removeEventListener('touchend',   tEnd);
      el.removeEventListener('mousedown',  mDown);
      el.removeEventListener('mousemove',  mMove);
      el.removeEventListener('mouseup',    mUp);
    };
  }, [aktif, hitung]);

  return { ref, jarakLive };
}
