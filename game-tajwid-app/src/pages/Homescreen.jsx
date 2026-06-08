// // import bg from "../assets/images/homescreen.png";

// // function HomeScreen({ start, guide, about }) {
// //   return (
// //     <div
// //       style={{
// //         backgroundImage: `url(${bg})`,
// //         height: "100vh",
// //         backgroundSize: "cover",
// //       }}
// //     >
// //       <h1>HARAKATGO</h1>

// //       <button onClick={start}>Mulai Bermain</button>
// //       <button onClick={guide}>Panduan</button>
// //       <button onClick={about}>Tentang</button>
// //     </div>
// //   );
// // }

// // export default HomeScreen;
// //------------------
// import bgImage from "../assets/images/homescreen.png";

// function HomeScreen() {
//   const styles = {
//     container: {
//       width: "100vw",
//       height: "100vh",
//       backgroundImage: `url(${bgImage})`,
//       backgroundSize: "cover",
//       backgroundPosition: "center",
//       backgroundRepeat: "no-repeat",

//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",

//       overflow: "hidden",
//     },

//     content: {
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       textAlign: "center",

//       marginTop: "-120px",
//     },

//     logo: {
//       fontSize: "clamp(2.5rem, 8vw, 5rem)",
//       fontWeight: "bold",
//       color: "#2D6A4F",

//       textShadow: `
//         2px 2px 0px rgba(0,0,0,0.15),
//         4px 4px 8px rgba(0,0,0,0.15)
//       `,

//       margin: 0,
//       padding: 0,
//     },

//     tagline: {
//       fontSize: "clamp(1rem, 2vw, 1.8rem)",
//       color: "#1F2937",
//       marginTop: "10px",
//       marginBottom: "40px",
//     },

//     menu: {
//       display: "flex",
//       flexDirection: "column",
//       gap: "15px",
//     },

//     button: {
//       width: "220px",
//       height: "60px",

//       borderRadius: "40px",

//       border: "3px solid #D4A017",

//       backgroundColor: "#1B4332",

//       color: "white",

//       fontSize: "1.4rem",
//       fontWeight: "600",

//       cursor: "pointer",

//       transition: "all 0.3s ease",
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.content}>
//         <h1 style={styles.logo}>
//           HarakatGo
//         </h1>

//         <p style={styles.tagline}>
//           Belajar Harakat menjadi Menyenangkan
//         </p>

//         <div style={styles.menu}>
//           <button
//             style={styles.button}
//             onClick={() => alert("Mulai")}
//           >
//             MULAI
//           </button>

//           <button
//             style={styles.button}
//             onClick={() => alert("Panduan")}
//           >
//             PANDUAN
//           </button>

//           <button
//             style={styles.button}
//             onClick={() => alert("Tentang")}
//           >
//             TENTANG
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HomeScreen;
import React from 'react';
import MenuButton from './MenuButton';

const bgStyle = {
  position: 'absolute',
  inset: 0,
  background:
    'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(255,255,200,0.18) 0%, transparent 70%)',
  pointerEvents: 'none',
};

const lanternPositions = [
  { left: '3%',  top: '2%',  delay: '0s',    size: 'clamp(26px,5vw,50px)' },
  { left: '11%', top: '0%',  delay: '0.4s',  size: 'clamp(22px,4vw,44px)' },
  { left: '21%', top: '5%',  delay: '0.8s',  size: 'clamp(22px,4vw,44px)' },
  { left: '32%', top: '1%',  delay: '1.2s',  size: 'clamp(18px,3vw,32px)' },
  { left: '66%', top: '1%',  delay: '0.6s',  size: 'clamp(18px,3vw,32px)' },
  { left: '76%', top: '5%',  delay: '1s',    size: 'clamp(22px,4vw,44px)' },
  { left: '86%', top: '0%',  delay: '0.3s',  size: 'clamp(22px,4vw,44px)' },
  { left: '93%', top: '3%',  delay: '0.7s',  size: 'clamp(26px,5vw,50px)' },
];

const leafPositions = [
  { left: '6%',   top: '1%', delay: '0s'   },
  { left: '38%',  top: '3%', delay: '1s'   },
  { right: '5%',  top: '0%', delay: '2s'   },
  { left: '26%',  top: '7%', delay: '1.5s' },
  { right: '22%', top: '5%', delay: '0.5s' },
];

const keyframesStyle = `
  @keyframes sway {
    0%, 100% { transform: rotate(-5deg); }
    50%       { transform: rotate(5deg);  }
  }
  @keyframes floatLeaf {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50%       { transform: translateY(-7px) rotate(10deg); }
  }
`;

export default function Homescreen({ onNavigate }) {
  return (
    <>
      <style>{keyframesStyle}</style>

      {/* Sky glow */}
      <div style={bgStyle} />

      {/* Lanterns */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '40%', pointerEvents: 'none', zIndex: 1 }}>
        {lanternPositions.map((pos, i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              fontSize: pos.size,
              filter: 'drop-shadow(0 4px 10px rgba(200,150,0,0.4))',
              animation: `sway 4s ease-in-out ${pos.delay} infinite`,
              transformOrigin: 'top center',
              left: pos.left,
              right: pos.right,
              top: pos.top,
            }}
          >
            🪔
          </span>
        ))}
      </div>

      {/* Floating leaves */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '30%', pointerEvents: 'none', zIndex: 2 }}>
        {leafPositions.map((pos, i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              fontSize: 'clamp(14px,2.5vw,26px)',
              animation: `floatLeaf 6s ease-in-out ${pos.delay} infinite`,
              opacity: 0.9,
              left: pos.left,
              right: pos.right,
              top: pos.top,
            }}
          >
            {i === 2 ? '🍀' : '🍃'}
          </span>
        ))}
      </div>

      {/* Mosque silhouette */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 'clamp(70px,16vw,150px)', pointerEvents: 'none', zIndex: 3 }}>
        <svg
          style={{ width: '100%', height: '100%', opacity: 0.5 }}
          viewBox="0 0 900 160"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMax meet"
        >
          <g fill="#0a3d28">
            <rect x="20" y="110" width="60" height="50" />
            <ellipse cx="50" cy="110" rx="30" ry="18" />
            <rect x="46" y="88" width="8" height="24" />
            <polygon points="46,88 50,76 54,88" />
            <rect x="330" y="70" width="240" height="90" />
            <ellipse cx="450" cy="70" rx="70" ry="40" />
            <rect x="443" y="26" width="14" height="46" />
            <polygon points="443,26 450,10 457,26" />
            <rect x="290" y="40" width="24" height="120" />
            <ellipse cx="302" cy="40" rx="12" ry="8" />
            <rect x="299" y="20" width="6" height="22" />
            <polygon points="299,20 302,8 305,20" />
            <rect x="586" y="40" width="24" height="120" />
            <ellipse cx="598" cy="40" rx="12" ry="8" />
            <rect x="595" y="20" width="6" height="22" />
            <polygon points="595,20 598,8 601,20" />
            <rect x="820" y="110" width="60" height="50" />
            <ellipse cx="850" cy="110" rx="30" ry="18" />
            <rect x="846" y="88" width="8" height="24" />
            <polygon points="846,88 850,76 854,88" />
            <rect x="0" y="150" width="900" height="20" />
          </g>
        </svg>
      </div>

      {/* Ground plants */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, pointerEvents: 'none', zIndex: 4 }}>
        {[
          { left: '-1%',  size: 'clamp(26px,6vw,64px)' },
          { left: '6%',   size: 'clamp(18px,3.5vw,38px)' },
          { right: '-1%', size: 'clamp(26px,6vw,64px)' },
          { right: '6%',  size: 'clamp(18px,3.5vw,38px)' },
        ].map((p, i) => (
          <span
            key={i}
            style={{ position: 'absolute', bottom: 0, fontSize: p.size, lineHeight: 1, left: p.left, right: p.right }}
          >
            {i % 2 === 0 ? '🌿' : '🌱'}
          </span>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', fontFamily: "'Nunito', sans-serif" }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem', marginTop: '-5rem', animation: 'fadeDown 0.7s ease both' }}>
        <h1
          style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: 'clamp(80px,7.5vw,100px)',
            color: '#1a4d35',
            textShadow: '0 2px 0 rgba(255,255,255,0.35), 0 4px 16px rgba(0,80,40,0.2)',
            textAlign: 'center',
            animation: 'fadeDown 0.8s ease both',
            lineHeight: 1.1,
          }}
        >
          Hara<span style={{ color: '#0d7a50' }}>kat</span>Go
        </h1>
        <p style={{
          fontSize: 'clamp(1.5rem, 2vw, 1.3rem)',
          color: '#1B4332',
          margin: '0.5rem 0 0 0',
          fontWeight: '600'
        }}>
          Belajar Harakat menjadi Menyenangkan
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', zIndex: 10 }}>
        <MenuButton label="▶ MULAI" gold={true} onClick={() => onNavigate('game')} delay="0.2s" />
        <MenuButton label="📖 PANDUAN" onClick={() => onNavigate('panduan')} delay="0.3s" />
        <MenuButton label="ℹ TENTANG" onClick={() => onNavigate('tentang')} delay="0.4s" />
      </div>
    </div>
    </>
  );
}
