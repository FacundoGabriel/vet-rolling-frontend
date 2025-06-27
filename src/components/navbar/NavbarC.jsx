import { Container, Nav, Navbar } from "react-bootstrap";
import "./NavbarC.css";
import { NavLink, useLocation } from "react-router-dom";
import logo from "/logo.png";

const NavbarC = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <Navbar
        expand="lg"
        className={
          isHome
            ? "bg-navbar p-5 navbar-transparente"
            : "bg-navbar p-5 navbar-default"
        }
      >
        <Container>
          <NavLink className="nav-link" to="/">
            <img src={logo} alt="img-logo" width="70" />
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavLink className="nav-link nav-custom" to="/">
                Inicio
              </NavLink>
              <NavLink className="nav-link nav-custom" to="/Acerca-De-Nosotros">
                Acerca de Nosotros
              </NavLink>
              <NavLink className="nav-link nav-custom" to="/contact">
                Contacto
              </NavLink>
            </Nav>
            <Nav className="ms-auto">
              <NavLink className="nav-link nav-custom" to="/login">
                Iniciar Sesión
              </NavLink>
              <NavLink className="nav-link nav-custom" to="/register">
                Registrarse
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarC;
