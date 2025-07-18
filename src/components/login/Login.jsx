import { Eye, EyeOff, LogIn } from "lucide-react";
import { Button, Card, Form } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import clientAxios from "../../helpers/axios.helpers";
import Swal from "sweetalert2";
import "./Login.css";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [login, setLogin] = useState({
    emailUsuario: "",
    contrasenia: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await clientAxios.post("/usuarios/inicio-sesion", login);

      sessionStorage.setItem("token", JSON.stringify(data.token));
      sessionStorage.setItem("idUsuario", JSON.stringify(data.idUsuario));
      sessionStorage.setItem("rol", JSON.stringify(data.rolUsuario));
      sessionStorage.setItem(
        "nombreUsuario",
        JSON.stringify(data.nombreUsuario)
      );

      Swal.fire({
        icon: "success",
        title: "¡Inicio de sesión exitoso!",
        text: "Redirigiendo...",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        const rol = data.rolUsuario;

        if (rol === "admin") {
          navigate("/admin");
        } else if (rol === "usuario") {
          navigate("/user");
        } else if (rol === "veterinario") {
          navigate("/veterinario");
        } else {
          navigate("/");
        }
      }, 1500);
    } catch (err) {
      const statusCode = err.response?.status;
      const msg = err.response?.data?.msg || "";

      if (statusCode === 403 && msg.toLowerCase().includes("deshabilitada")) {
        Swal.fire({
          icon: "warning",
          title: "Cuenta deshabilitada",
          text: "Tu cuenta está deshabilitada. Contactá con soporte para más información.",
        });
      } else if (
        statusCode === 401 &&
        msg.toLowerCase().includes("usuario y/o contraseña")
      ) {
        Swal.fire({
          icon: "error",
          title: "Credenciales inválidas",
          text: "Correo o contraseña incorrectos.",
        });
      } else if (statusCode === 404) {
        Swal.fire({
          icon: "error",
          title: "Credenciales inválidas",
          text: "Correo o contraseña incorrectos.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error al iniciar sesión",
        });
      }
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="text-center mb-4">
          <LogIn className="avatar-icon mb-2" size={48} />
          <Card.Title className="login-title">Inicia sesión</Card.Title>
          <Card.Text className="login-text">
            Ingresa tus credenciales para acceder
          </Card.Text>
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Correo</Form.Label>
            <Form.Control
              type="email"
              name="emailUsuario"
              placeholder="correo@correo.com"
              value={login.emailUsuario}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="password" className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <div className="password-input-wrapper">
              <Form.Control
                type={showPassword ? "text" : "password"}
                name="contrasenia"
                placeholder="contraseña"
                value={login.contrasenia}
                onChange={handleChange}
                required
              />
              <span
                className="password-icon"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </Form.Group>

          <div className="text-end mb-3">
            <Link to="/olvide-contraseña" className="reset-password-link">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <Button type="submit" className="w-100 btn-login">
            Iniciar sesión
          </Button>
        </Form>
      </div>
    </div>
  );
};
