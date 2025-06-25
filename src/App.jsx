<<<<<<< feature/administrar-mascotas
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import DetallePlanes from "./pages/DetallePlanes";
import CardPlanes from "./components/cardplanes/CardPlanes";
import AñadirMascota from "./pages/AñadirMascota";
import MisMascotas from "./pages/MisMascotas";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CardPlanes />} />
        <Route path="/contratar-plan/:id" element={<DetallePlanes />} />
        <Route path="/mascotas/añadir-mascota" element={<AñadirMascota />} />
        <Route path="/mascotas/mis-mascotas" element={<MisMascotas />} />
      </Routes>
    </Router>
  );
}
=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarC from "./components/navbar/NavbarC";
import Footer from "./components/footer/Footer";
import { Login } from "./components/login/Login";
// import Footer from "./components/footer/Footer";

const App = () => {
  return (
    <Router>
      <NavbarC />
      <Routes>
        <Route />
          <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
};
>>>>>>> dev

export default App;
