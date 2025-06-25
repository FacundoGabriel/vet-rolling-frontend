import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DetallePlanes from "./pages/DetallePlanes";
import CardPlanes from "./components/cardplanes/CardPlanes";
import AñadirMascota from "./pages/AñadirMascota";
import MisMascotas from "./pages/MisMascotas";
import NavbarC from "./components/navbar/NavbarC";
import Footer from "./components/footer/Footer";
import { Login } from "./components/login/Login";
// import Footer from "./components/footer/Footer";

function App() {
  return (
    <Router>
      <NavbarC />
      <Routes>
        <Route path="/" element={<CardPlanes />} />
        <Route path="/contratar-plan/:id" element={<DetallePlanes />} />
        <Route path="/mascotas/añadir-mascota" element={<AñadirMascota />} />
        <Route path="/mascotas/mis-mascotas" element={<MisMascotas />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
}



export default App;
