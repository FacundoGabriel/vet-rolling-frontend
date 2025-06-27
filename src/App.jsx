import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarC from "./components/navbar/NavbarC";
import Footer from "./components/footer/Footer";
import HomePage from "./pages/HomePage";
import DetallePlanes from "./pages/DetallePlanes";
import AniadirMascota from "./pages/AniadirMascota";
import MisMascotas from "./pages/MisMascotas";
import { Login } from "./components/login/Login";
import AdministrarUsuarios from "./pages/AdministrarUsuarios";
import AdministrarVeterinarios from "./pages/AdministrarVeterinarios";
import AdministrarSolicitoVeterinario from "./pages/AdministrarSolicitoVeterinario";
import AdministrarPlanesVeterinario from "./pages/administrarPlanesVeterinario";

const App = () => {
  return (
    <Router>
      <NavbarC />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contratar-plan/:id" element={<DetallePlanes />} />
        <Route path="/mascotas/añadir-mascota" element={<AniadirMascota />} />
        <Route path="/mascotas/mis-mascotas" element={<MisMascotas />} />
        <Route path="/login" element={<Login />} />
        <Route path="/administrar-usuarios" element={<AdministrarUsuarios />} />
        <Route
          path="/administrar-veterinarios"
          element={<AdministrarVeterinarios />}
        />
        <Route
          path="/solicito-veterinario"
          element={<AdministrarSolicitoVeterinario />}
        />
        <Route
          path="/administrar-planes"
          element={<AdministrarPlanesVeterinario />}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
