// // // import { useState } from 'react'
// // // import reactLogo from './assets/react.svg'
// // // import viteLogo from './assets/vite.svg'
// // // import heroImg from './assets/hero.png'
// // // import AppRoutes from './routes/Approutes'
// // import { react } from 'react'
// // import HomescreenImg from './assets/Homescreen.png'
// // import Homescreen from './pages/Homescreen'

// // // import './App.css'

// // function App() {
// //   const [count, setCount] = useState(0)


// //   // return (
// //   //   <>
// //   //     <section id="center">
// //   //       <div className="hero">
// //   //         <img src={heroImg} className="base" width="170" height="179" alt="" />
// //   //         <img src={reactLogo} className="framework" alt="React logo" />
// //   //         <img src={viteLogo} className="vite" alt="Vite logo" />
// //   //       </div>
// //   //       <div>
// //   //         <h1>Get started</h1>
// //   //         <p>
// //   //           Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
// //   //         </p>
// //   //       </div>
// //   //       <button
// //   //         type="button"
// //   //         className="counter"
// //   //         onClick={() => setCount((count) => count + 1)}
// //   //       >
// //   //         Count is {count}
// //   //       </button>
// //   //     </section>

// //   //     <div className="ticks"></div>

// //   //     <section id="next-steps">
// //   //       <div id="docs">
// //   //         <svg className="icon" role="presentation" aria-hidden="true">
// //   //           <use href="/icons.svg#documentation-icon"></use>
// //   //         </svg>
// //   //         <h2>Documentation</h2>
// //   //         <p>Your questions, answered</p>
// //   //         <ul>
// //   //           <li>
// //   //             <a href="https://vite.dev/" target="_blank">
// //   //               <img className="logo" src={viteLogo} alt="" />
// //   //               Explore Vite
// //   //             </a>
// //   //           </li>
// //   //           <li>
// //   //             <a href="https://react.dev/" target="_blank">
// //   //               <img className="button-icon" src={reactLogo} alt="" />
// //   //               Learn more
// //   //             </a>
// //   //           </li>
// //   //         </ul>
// //   //       </div>
// //   //       <div id="social">
// //   //         <svg className="icon" role="presentation" aria-hidden="true">
// //   //           <use href="/icons.svg#social-icon"></use>
// //   //         </svg>
// //   //         <h2>Connect with us</h2>
// //   //         <p>Join the Vite community</p>
// //   //         <ul>
// //   //           <li>
// //   //             <a href="https://github.com/vitejs/vite" target="_blank">
// //   //               <svg
// //   //                 className="button-icon"
// //   //                 role="presentation"
// //   //                 aria-hidden="true"
// //   //               >
// //   //                 <use href="/icons.svg#github-icon"></use>
// //   //               </svg>
// //   //               GitHub
// //   //             </a>
// //   //           </li>
// //   //           <li>
// //   //             <a href="https://chat.vite.dev/" target="_blank">
// //   //               <svg
// //   //                 className="button-icon"
// //   //                 role="presentation"
// //   //                 aria-hidden="true"
// //   //               >
// //   //                 <use href="/icons.svg#discord-icon"></use>
// //   //               </svg>
// //   //               Discord
// //   //             </a>
// //   //           </li>
// //   //           <li>
// //   //             <a href="https://x.com/vite_js" target="_blank">
// //   //               <svg
// //   //                 className="button-icon"
// //   //                 role="presentation"
// //   //                 aria-hidden="true"
// //   //               >
// //   //                 <use href="/icons.svg#x-icon"></use>
// //   //               </svg>
// //   //               X.com
// //   //             </a>
// //   //           </li>
// //   //           <li>
// //   //             <a href="https://bsky.app/profile/vite.dev" target="_blank">
// //   //               <svg
// //   //                 className="button-icon"
// //   //                 role="presentation"
// //   //                 aria-hidden="true"
// //   //               >
// //   //                 <use href="/icons.svg#bluesky-icon"></use>
// //   //               </svg>
// //   //               Bluesky
// //   //             </a>
// //   //           </li>
// //   //         </ul>
// //   //       </div>
// //   //     </section>

// //   //     <div className="ticks"></div>
// //   //     <section id="spacer"></section>
// //   //   </>
// //   // )
// // }

// // export default App

// // src/App.jsx
// //====================
// import HomeScreen from "./pages/Homescreen";

// function App() {
//   return <HomeScreen />;
// }

// export default App;
import React, { useState } from 'react';
import './App.css';



import Homescreen from './pages/Homescreen';
import Guide from './pages/Guide';
import About from './pages/About';
// import GamePage   from './pages/Gameplay';
const pageAnim = `
  @keyframes fadeDown {
    from { opacity: 0; transform: translateY(-16px); }
    to   { opacity: 1; transform: translateY(0);     }
  }
`;

const PAGES = {
  home: Homescreen,
  panduan: Guide,
  tentang: About,

};

export default function App() {
  const [page, setPage] = useState('home');

  const navigate = (target) => setPage(target);

  const PageComponent = PAGES[page] || Homescreen;

  const pageProps =
    page === 'home'
      ? { onNavigate: navigate }
      : page === 'game'
      ? { onHome: () => navigate('home') }
      : { onBack: () => navigate('home') };

  return (
    <>
      <style>{pageAnim}</style>

      {/* Full-screen gradient background */}
      <div
        style={{
          width: '100%',
          minHeight: '100svh',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(160deg,#a8eddc 0%,#56c8a8 30%,#2db891 60%,#0f8a70 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <PageComponent key={page} {...pageProps} />
      </div>
    </>
  );
}
