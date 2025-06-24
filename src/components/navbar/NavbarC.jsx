import { Container, Nav, Navbar } from "react-bootstrap";
import "./NavbarC.css";
import { NavLink } from "react-router-dom";

const NavbarC = () => {
  return (
    <>
      <Navbar expand="lg" className="bg-navbar">
        <Container>
          <NavLink className="nav-link">
            <img src="#" alt="img-logo" width="60" />
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavLink className={"nav-link"} to="/">
                Inicio
              </NavLink>
              <NavLink className={"nav-link"} to="/Acerca-De-Nosotros">
                Acerca de Nosotros
              </NavLink>
              <NavLink className={"nav-link"} to="/contact">
                Contacto
              </NavLink>
            </Nav>
            <Nav className="ms-auto">
              <NavLink className="nav-link" to="/login">
                Iniciar Sesión
              </NavLink>
              <NavLink className="nav-link" to="/register">
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
