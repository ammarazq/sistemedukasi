import { useState } from 'react';
import { useGame } from './hooks/useGame';
import { useEffect } from 'react';

import Homescreen from './pages/Homescreen';
import Guide from './pages/Guide';
import About from './pages/About';
import ChooseHuruf from './pages/ChooseHuruf';
import Gameplay from './pages/Gameplay';
import Result from './pages/Result';

export default function App() {
  const [layar, setLayar] = useState('menu');

  const game = useGame();

  // Jika game selesai, pindah ke halaman hasil
  useEffect(() => {
    if (game.layar === 'hasil') {
      setLayar('hasil');
    }
  }, [game.layar]);

  const handleMulai = () => {
  game.setHurufDipilih(null);
  setLayar('pilih');
  };

  const handlePanduan = () => {
    setLayar('panduan');
  };

  const handleTentang = () => {
    setLayar('tentang');
  };

  const handlePilihMulai = () => {
    game.mulaiSesi();
    setLayar('game');
  };

  const handleGesture = (arah) => {
    game.cekJawaban(arah);

    setTimeout(() => {
      if (game.layar === 'hasil') {
        setLayar('hasil');
      }
    }, 1600);
  };

  const handleUlang = () => {
    game.mulaiSesi();
    setLayar('game');
  };

  const handleGantiHuruf = () => {
    setLayar('pilih');
  };

  const resetDanKeMenu = () => {
  game.setHurufDipilih(null);
  setLayar('menu');
  };
  const handleBackToMenu = () => {
    game.setHurufDipilih(null);
    setLayar('menu');
  };

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        position: 'relative',
        overflowX: 'hidden',
        background:
          'linear-gradient(160deg,#a8eddc 0%,#56c8a8 30%,#2db891 60%,#0f8a70 100%)',
      }}
    >
      {layar === 'menu' && (
        <Homescreen
          onMulai={handleMulai}
          onPanduan={handlePanduan}
          onTentang={handleTentang}
        />
      )}

      {layar === 'panduan' && (
        <Guide onBack={() => setLayar('menu')} />
      )}

      {layar === 'tentang' && (
        <About onBack={resetDanKeMenu} />
      )}

      {layar === 'pilih' && (
        <ChooseHuruf
          hurufDipilih={game.hurufDipilih}
          onPilih={game.setHurufDipilih}
          onMulai={handlePilihMulai}
          onBack={resetDanKeMenu}
        />
)}

      {layar === 'game' && (
        <Gameplay
          huruf={game.hurufDipilih}
          hurufTampil={game.hurufTampil}
          soalAktif={game.soalAktif}
          soalIndex={game.soalIndex}
          totalSoal={game.totalSoal}
          skor={game.skor}
          feedback={game.feedback}
          terkunci={game.terkunci}
          progPersen={game.progPersen}
          onGesture={handleGesture}
        />
      )}

      {layar === 'hasil' && (
        <Result
          hasilAkhir={game.hasilAkhir}
          huruf={game.hurufDipilih}
          onUlang={handleUlang}
          onGantiHuruf={handleGantiHuruf}
          onHome={resetDanKeMenu}
        />
      )}
    </div>
  );
}