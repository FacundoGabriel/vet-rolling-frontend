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

export default App;
