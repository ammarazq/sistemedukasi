import { Routes, Route } from 'react-router-dom';
import About from '../pages/About';
import Guide from '../pages/Guide';
import Homescreen from '../pages/Homescreen';
import Gameplay from'../pages/Gameplay';


function AppRoutes() {
  return (
    <Routes>
      <Route path="/About" element={<About />} />
      <Route path="/Guide" element={<Guide />} />
      <Route path="/Homescreen" element={<Homescreen />} />
        <Route path="/Gameplay" element={<Gameplay />} />
    </Routes>
  );
}

export default AppRoutes;