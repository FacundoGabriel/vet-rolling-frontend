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
import RutasProtegidas from "./components/rutasprotegidas/RutasProtegidas";

const App = () => {
  return (
    <Router>
      <Clima />
      <NavbarC />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistroUsuario />} />
        <Route path="/register-veterinario" element={<RegistroVeterinario />} />
        <Route path="/olvide-contraseña" element={<RecuperarContrasenia />} />
        <Route path="/acerca-de-nosotros" element={<AcercaDeNosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="*" element={<Pagina404 />} />

        <Route
          path="/user"
          element={
            <RutasProtegidas>
              <UserPage />
            </RutasProtegidas>
          }
        />
        <Route
          path="/contratar-plan/:id"
          element={
            <RutasProtegidas>
              <DetallePlanes />
            </RutasProtegidas>
          }
        />
        <Route
          path="/mascotas/añadir-mascota"
          element={
            <RutasProtegidas>
              <AniadirMascota />
            </RutasProtegidas>
          }
        />
        <Route
          path="/user/mis-mascotas"
          element={
            <RutasProtegidas>
              <MisMascotas />
            </RutasProtegidas>
          }
        />
        <Route
          path="/user/mi-perfil"
          element={
            <RutasProtegidas>
              <MiPerfil />
            </RutasProtegidas>
          }
        />
        <Route
          path="/agendar-turno"
          element={
            <RutasProtegidas>
              <CrearTurno />
            </RutasProtegidas>
          }
        />
        <Route
          path="/mis-turnos"
          element={
            <RutasProtegidas>
              <MisTurnos />
            </RutasProtegidas>
          }
        />
        <Route
          path="/user/carrito"
          element={
            <RutasProtegidas>
              <Carrito />
            </RutasProtegidas>
          }
        />
        <Route
          path="/confirmar-turno"
          element={
            <RutasProtegidas>
              <ConfirmarTurno />
            </RutasProtegidas>
          }
        />
        <Route
          path="/administrar-turnos"
          element={
            <RutasProtegidas rolesPermitidos={["admin", "veterinario"]}>
              <TurnosVeterinario />
            </RutasProtegidas>
          }
        />
        <Route
          path="/admin"
          element={
            <RutasProtegidas rolesPermitidos={["admin"]}>
              <PaginaAdmin />
            </RutasProtegidas>
          }
        />
        <Route
          path="/admin/administrar-usuarios"
          element={
            <RutasProtegidas rolesPermitidos={["admin"]}>
              <AdministrarUsuarios />
            </RutasProtegidas>
          }
        />
        <Route
          path="/admin/administrar-veterinarios"
          element={
            <RutasProtegidas rolesPermitidos={["admin"]}>
              <AdministrarVeterinarios />
            </RutasProtegidas>
          }
        />
        <Route
          path="/solicito-veterinario"
          element={
            <RutasProtegidas>
              <AdministrarSolicitoVeterinario />
            </RutasProtegidas>
          }
        />
        <Route
          path="/administrar-planes "
          element={
            <RutasProtegidas rolesPermitidos={["admin"]}>
              <AdministrarPlanesVeterinario />
            </RutasProtegidas>
          }
        />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
