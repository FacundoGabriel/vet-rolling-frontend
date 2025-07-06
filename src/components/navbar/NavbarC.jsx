import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "./NavbarC.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "/logo.png";

const NavbarC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/" || location.pathname === "/user";
  const token = JSON.parse(sessionStorage.getItem("token")) || null;
  const rolUsuario = JSON.parse(sessionStorage.getItem("rol")) || null;
  const nombreUsuario =
    JSON.parse(sessionStorage.getItem("nombreUsuario")) || null;

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
            <Nav className="ms-auto">
              {token && rolUsuario === "usuario" && (
                <>
                  <NavLink className="nav-link nav-custom" to="/user">
                    Inicio
                  </NavLink>
                  <NavLink
                    className="nav-link nav-custom"
                    to="/acerca-de-nosotros"
                  >
                    Acerca de Nosotros
                  </NavLink>
                  <NavLink className="nav-link nav-custom" to="/contacto">
                    Contacto
                  </NavLink>
                </>
              )}

              {token && rolUsuario === "admin" && (
                <>
                  <NavLink className="nav-link nav-custom" to="/admin">
                    Inicio
                  </NavLink>
                  <NavLink className="nav-link nav-custom" to="/user">
                    Vista usuario
                  </NavLink>
                  <NavDropdown
                    title="Administrar"
                    id="basic-nav-dropdown"
                    className="dropdown-custom"
                  >
                    <NavDropdown.Item>
                      <NavLink
                        className="nav-link nav-drop"
                        to="/admin/administrar-usuarios"
                      >
                        Usuarios
                      </NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <NavLink
                        className="nav-link nav-drop"
                        to="/admin/administrar-planes"
                      >
                        Planes
                      </NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <NavLink
                        className="nav-link nav-drop"
                        to="/admin/administrar-veterinarios"
                      >
                        Veterinarios
                      </NavLink>
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}

              {!token && (
                <>
                  <NavLink className="nav-link nav-custom" to="/">
                    Inicio
                  </NavLink>
                  <NavLink
                    className="nav-link nav-custom"
                    to="/acerca-de-nosotros"
                  >
                    Acerca de Nosotros
                  </NavLink>
                  <NavLink className="nav-link nav-custom" to="/contacto">
                    Contacto
                  </NavLink>
                </>
              )}
            </Nav>

            <Nav className="ms-auto">
              {token ? (
                <NavDropdown
                  title={nombreUsuario}
                  id="basic-nav-dropdown"
                  className="dropdown-custom"
                >
                  {rolUsuario === "usuario" && (
                    <>
                      <NavDropdown.Item>
                        <NavLink
                          className="nav-link nav-drop"
                          to="/user/mi-perfil"
                        >
                          Mi Perfil
                        </NavLink>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <NavLink
                          className="nav-link nav-drop"
                          to="/user/carrito"
                        >
                          Carrito
                        </NavLink>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <NavLink
                          className="nav-link nav-drop"
                          to="/user/mis-mascotas"
                        >
                          Mis mascotas
                        </NavLink>
                      </NavDropdown.Item>
                    </>
                  )}
                  <NavDropdown.Item>
                    <NavLink
                      className="nav-link nav-drop"
                      onClick={handleLogoutUser}
                    >
                      Cerrar Sesión
                    </NavLink>
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <NavLink className="nav-link nav-custom" to="/login">
                    Iniciar Sesión
                  </NavLink>
                  <NavLink className="nav-link nav-custom" to="/register">
                    Registrarse
                  </NavLink>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarC;
