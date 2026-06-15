import React from 'react';

const keyframes = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

export default function MenuButton({ label, children, onClick, gold = false, delay = '0s', style = {} }) {
  const bgGreen = {
    background: 'linear-gradient(135deg,#2d6e4e 0%,#1a4d35 50%,#0d3a26 100%)',
    borderColor: 'rgba(200,160,60,0.5)',
    boxShadow: '0 4px 0 #0a2a1a, 0 6px 18px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,200,0.12)',
  };
  const bgGold = {
    background: 'linear-gradient(135deg,#c8960c 0%,#a07408 50%,#7a5600 100%)',
    borderColor: 'rgba(255,220,80,0.6)',
    boxShadow: '0 4px 0 #4a3200, 0 6px 18px rgba(180,120,0,0.28), inset 0 1px 0 rgba(255,240,150,0.18)',
  };

  return (
    <>
      <style>{keyframes}</style>
      <button
        onClick={onClick}
        style={{
          position: 'relative',

          width: 'min(280px, 80vw)',
          padding: '12px 20px',

          width: 'clamp(140px, 70vw, 240px)',
          maxWidth: '100%',
          padding: 'clamp(10px, 2vh, 14px) clamp(16px, 3vw, 32px)',

          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          fontFamily: "'Nunito', sans-serif",

          fontSize: 'clamp(14px,2.2vw,18px)',

          fontSize: 'clamp(13px, 2.5vw, 16px)',

          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          animation: `fadeUp 0.7s ${delay} ease both`,
          ...style,
        }}
      >
        <span
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50px',
            border: '2px solid',
            transition: 'transform 0.15s, box-shadow 0.15s',
            ...(gold ? bgGold : bgGreen),
          }}
        />
        <span style={{ position: 'relative', zIndex: 1, color: gold ? '#fff8e0' : '#f5e9c0' }}>
          {label || children}
        </span>
      </button>
    </>
  );
}
