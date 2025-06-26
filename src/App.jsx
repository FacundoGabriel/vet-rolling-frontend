import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarC from "./components/navbar/NavbarC";
import Footer from "./components/footer/Footer";
import DetallePlanes from "./pages/DetallePlanes";
import CardPlanes from "./components/cardplanes/CardPlanes";
import AniadirMascota from "./pages/AniadirMascota";
import MisMascotas from "./pages/MisMascotas";
import { Login } from "./components/login/Login";
// import Footer from "./components/footer/Footer";

const App = () => {
  return (
    <Router>
      <NavbarC />
      <Routes>
        <Route />
        <Route path="/" element={<CardPlanes />} />
        <Route path="/contratar-plan/:id" element={<DetallePlanes />} />
        <Route path="/mascotas/añadir-mascota" element={<AniadirMascota />} />
        <Route path="/mascotas/mis-mascotas" element={<MisMascotas />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
