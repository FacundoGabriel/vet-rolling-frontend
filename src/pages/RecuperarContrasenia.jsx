import { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import clientAxios, { configHeaders } from "../helpers/axios.helpers";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const RecuperarContrasenia = () => {
  const navigate = useNavigate();
  const token = new URLSearchParams(location.search).get("token");

  const [emailUsuario, setEmailusuario] = useState("");
  const [nuevaContrasenia, setNuevaContrasenia] = useState("");
  const [repContrasenia, setRepContrasenia] = useState("");

  const handleClickEmail = async (ev) => {
    ev.preventDefault();

    const res = await clientAxios.post(
      "/usuarios/recoveryPass",
      { emailUsuario },
      configHeaders
    );
    console.log(res);

    if (res.status === 200) {
      Swal.fire({
        title: "Revisa tu correo!",
        text: `En el correo te hemos enviado los pasos a seguir para recuperar tu contraseña`,
        icon: "success",
      });
    }
  };
  const handleClickRecoveryPass = async (ev) => {
    ev.preventDefault();

    if (nuevaContrasenia === repContrasenia) {
      try {
        const res = await clientAxios.put(
          "/usuarios/changePassUser",
          { nuevaContrasenia },
          {
            headers: {
              "content-type": "application/json",
              authRecovery: `${token}`,
            },
          }
        );

        if (res.status === 200) {
          Swal.fire({
            title: "Contraseña actualizada!",
            text: "Inicia sesion para corroborar",
            icon: "success",
          });
        }
        setNuevaContrasenia("");
        setRepContrasenia("");

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } catch (error) {
        Swal.fire({
          title: "Error",
          text:
            error.response?.data?.mensaje ||
            "Ocurrió un error al cambiar la contraseña",
          icon: "error",
        });
      }
    } else {
      Swal.fire({
        title: "Las contraseñas no coinciden",
        icon: "error",
      });
    }
  };

  return (
    <>
      <Container className="d-flex justify-content-center my-5">
        <div
          className="p-4 rounded shadow-sm"
          style={{
            maxWidth: "500px",
            width: "100%",
          }}
        >
          <h3 className="text-center mb-4">
            {token ? "Restablecer contraseña" : "Recuperar acceso"}
          </h3>

          {token ? (
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nueva contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingresá tu nueva contraseña"
                  required
                  onChange={(ev) => setNuevaContrasenia(ev.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label>Repetir contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Repetí la contraseña"
                  required
                  onChange={(ev) => setRepContrasenia(ev.target.value)}
                />
              </Form.Group>

              <Container className="text-center">
                <Button
                  className="py-2 px-4"
                  variant="primary"
                  type="submit"
                  onClick={handleClickRecoveryPass}
                >
                  Enviar Datos
                </Button>
              </Container>
            </Form>
          ) : (
            <Form>
              <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label>Email del usuario</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Por ej: usuario@dominio.com"
                  required
                  onChange={(ev) => setEmailusuario(ev.target.value)}
                />
              </Form.Group>

              <Container className="text-center">
                <Button
                  className="py-2 px-4"
                  variant="primary"
                  type="submit"
                  onClick={handleClickEmail}
                >
                  Enviar
                </Button>
              </Container>
            </Form>
          )}
        </div>
      </Container>
    </>
  );
};

export default RecuperarContrasenia;
