import { Container, Nav, Navbar } from "react-bootstrap";
import "./NavbarC.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "/logo.png";

const NavbarC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/" || location.pathname === "/user";
  const token = JSON.parse(sessionStorage.getItem("token")) || null;
  const rolUsuario = JSON.parse(sessionStorage.getItem("rol")) || null;

  const handleLogoutUser = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("rol");
    sessionStorage.removeItem("idUsuario");

    setTimeout(() => {
      navigate("/");
    }, 500);
  };

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
          <NavLink className="nav-link" to={token ? "/user" : "/"}>
            <img src={logo} alt="img-logo" width="70" />
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {token && rolUsuario === "usuario" ? (
              <>
                <Nav className="ms-auto">
                  <NavLink className="nav-link nav-custom" to="/user">
                    Inicio
                  </NavLink>
                  <NavLink
                    className="nav-link nav-custom"
                    to="/acerca-de-nosotros"
                  >
                    Acerca de Nosotros
                  </NavLink>
                  <NavLink className="nav-link nav-custom" to="/user/contact">
                    Contacto
                  </NavLink>
                  <NavLink className="nav-link nav-custom" to="/user/mi-perfil">
                    Mi Perfil
                  </NavLink>
                  <NavLink className="nav-link nav-custom" to="/user/cart">
                    Carrito
                  </NavLink>
                </Nav>
              </>
            ) : token && rolUsuario === "admin" ? (
              <>
                <Nav className="ms-auto">
                  <NavLink className="nav-link nav-custom" to="/admin">
                    Inicio
                  </NavLink>
                  <NavLink
                    className="nav-link nav-custom"
                    to="/admin/administrar-usuarios"
                  >
                    Administrar usuarios
                  </NavLink>
                  <NavLink
                    className="nav-link nav-custom"
                    to="/admin/administrar-planes"
                  >
                    Administrar planes
                  </NavLink>
                  <NavLink className="nav-link nav-custom" to="/user">
                    Vista usuario
                  </NavLink>
                </Nav>
              </>
            ) : (
              <>
                <Nav className="ms-auto">
                  <NavLink className="nav-link nav-custom" to="/">
                    Inicio
                  </NavLink>
                  <NavLink
                    className="nav-link nav-custom"
                    to="/acerca-de-nosotros"
                  >
                    Acerca de Nosotros
                  </NavLink>
                  <NavLink className="nav-link nav-custom" to="/contact">
                    Contacto
                  </NavLink>
                </Nav>
              </>
            )}
            {token ? (
              <>
                <Nav className="ms-auto">
                  <NavLink
                    className="nav-link nav-custom"
                    to="#"
                    onClick={handleLogoutUser}
                  >
                    Cerrar Sesion
                  </NavLink>
                </Nav>
              </>
            ) : (
              <>
                <Nav className="ms-auto">
                  <NavLink className="nav-link nav-custom" to="/login">
                    Iniciar Sesión
                  </NavLink>
                  <NavLink className="nav-link nav-custom" to="/register">
                    Registrarse
                  </NavLink>
                </Nav>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarC;
