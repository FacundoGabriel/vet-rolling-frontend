import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarC from "./components/navbar/NavbarC";
import Footer from "./components/footer/Footer";
import { Login } from "./components/login/Login";
import { RegistroUsuario } from "./components/registro/RegistroUsuario";
import { RegistroVeterinario } from "./components/registro/RegistroVeterinario";
import AcercaDeNosotros from "./components/acercadenosotros/AcercaDeNosotros";

import AdministrarUsuarios from "./pages/AdministrarUsuarios";
import AniadirMascota from "./pages/AniadirMascota";
import MisMascotas from "./pages/MisMascotas";
import DetallePlanes from "./pages/DetallePlanes";
import AdministrarVeterinarios from "./pages/AdministrarVeterinarios";
import HomePage from "./pages/HomePage";
import AdministrarSolicitoVeterinario from "./pages/AdministrarSolicitoVeterinario";

import UserPage from "./pages/UserPage";
import MiPerfil from "./pages/MiPerfil";
import AdministrarPlanesVeterinario from "./pages/AdministrarPlanesVeterinario";
import RecuperarContrasenia from "./pages/RecuperarContrasenia";
import CrearTurno from "./pages/CrearTurno";
import MisTurnos from "./pages/MisTurnos";
import TurnosVeterinario from "./pages/TurnosVeterinarios";
import Contacto from "./pages/Contacto";
import Pagina404 from "./pages/pagina404";
import Clima from "./components/clima/Clima";
import PaginaAdmin from "./pages/PaginaAdmin";
import Carrito from "./pages/Carrito";
import ConfirmarTurno from "./pages/ConfirmarTurno";

const App = () => {
  return (
    <Router>
      <Clima />
      <NavbarC />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/contratar-plan/:id" element={<DetallePlanes />} />
        <Route path="/mascotas/añadir-mascota" element={<AniadirMascota />} />
        <Route path="/user/mis-mascotas" element={<MisMascotas />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistroUsuario />} />
        <Route path="/register-veterinario" element={<RegistroVeterinario />} />
        <Route
          path="/admin/administrar-usuarios"
          element={<AdministrarUsuarios />}
        />
        <Route
          path="/admin/administrar-veterinarios"
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
        <Route path="/user/mi-perfil" element={<MiPerfil />} />
        <Route path="/olvide-contraseña" element={<RecuperarContrasenia />} />
        <Route path="/agendar-turno" element={<CrearTurno />} />
        <Route path="/mis-turnos" element={<MisTurnos />} />
        <Route path="/administrar-turnos" element={<TurnosVeterinario />} />
        <Route path="/acerca-de-nosotros" element={<AcercaDeNosotros />} />
        <Route path="/contacto" element={<Contacto />} />

        <Route path="*" element={<Pagina404 />} />

        <Route path="/admin" element={<PaginaAdmin />} />
        <Route path="/user/carrito" element={<Carrito />} />
        <Route path="/confirmar-turno" element={<ConfirmarTurno />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
