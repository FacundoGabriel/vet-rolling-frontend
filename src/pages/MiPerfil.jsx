import { useEffect, useState } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Image,
  Button,
  Form,
} from "react-bootstrap";
import clientAxios, {
  configHeaders,
  configHeadersImage,
} from "../helpers/axios.helpers";
import Swal from "sweetalert2";

const MiPerfil = () => {
  const idUsuario = JSON.parse(sessionStorage.getItem("idUsuario")) || null;
  const [usuario, setUsuario] = useState(null);
  const [editando, setEditando] = useState(false);
  const [cambiarContrasenia, setCambiarContrasenia] = useState(false);
  const [errores, setErrores] = useState({});
  const [formulario, setFormulario] = useState({
    nombreUsuario: "",
    emailUsuario: "",
    telefono: "",
    descripcion: "",
    foto: "",
    actual: "",
    nueva: "",
  });
  const [archivoFoto, setArchivoFoto] = useState(null);

  const obtenerUnUsuario = async () => {
    try {
      const res = await clientAxios.get(
        `/usuarios/${idUsuario}`,
        configHeaders
      );
      setUsuario(res.data.usuario);
      setFormulario({
        nombreUsuario: res.data.usuario.nombreUsuario,
        emailUsuario: res.data.usuario.emailUsuario,
        telefono: res.data.usuario.telefono,
        descripcion: res.data.usuario.descripcion,
        foto: res.data.usuario.foto,
      });
    } catch (err) {
      console.error("Error al obtener usuario:", err);
    }
  };
  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!formulario.nombreUsuario)
      nuevosErrores.nombreUsuario = "El nombre es obligatoria";
    if (!formulario.emailUsuario)
      nuevosErrores.emailUsuario = "El email es obligatorio";
    if (!formulario.telefono)
      nuevosErrores.telefono = "El telefono es obligatorio";

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  useEffect(() => {
    if (idUsuario) {
      obtenerUnUsuario();
    }
  }, []);

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const cambiarContraseniaUsuario = async () => {
    try {
      const res = await clientAxios.put(
        `/usuarios/cambiar-contrasenia/${idUsuario}`,
        {
          actual: formulario.actual,
          nueva: formulario.nueva,
        },
        configHeaders
      );

      Swal.fire("Éxito", res.data.msg, "success");
      setFormulario({ ...formulario, actual: "", nueva: "" });
      setCambiarContrasenia(false);

      return true;
    } catch (error) {
      Swal.fire("Error", error.response?.data?.msg || "Hubo un error", "error");
      return false;
    }
  };
  const guardarCambios = async () => {
    try {
      if (formulario.actual && formulario.nueva) {
        const cambioEstaBien = await cambiarContraseniaUsuario();
        if (!cambioEstaBien) return;
      }

      const datosTexto = {
        nombreUsuario: formulario.nombreUsuario,
        emailUsuario: formulario.emailUsuario,
        telefono: formulario.telefono,
        descripcion: formulario.descripcion,
      };

      const res = await clientAxios.put(
        `/usuarios/editar-usuario/${idUsuario}`,
        datosTexto,
        configHeaders
      );

      if (archivoFoto) {
        const formData = new FormData();
        formData.append("foto", archivoFoto);

        await clientAxios.put(
          `/usuarios/agregarImagen/${idUsuario}`,
          formData,
          configHeadersImage
        );
      }

      Swal.fire("Éxito", "Perfil actualizado correctamente", "success");
      setEditando(false);
      setArchivoFoto(null);
      setCambiarContrasenia(false);
      obtenerUnUsuario();
    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar el perfil", "error");
    }
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4">Mi Perfil</h2>
      <Card className="p-4 shadow-sm">
        <Row className="align-items-center">
          <Col xs={12} sm={6} md={4} className="text-center mb-3">
            <Image
              src={
                archivoFoto ? URL.createObjectURL(archivoFoto) : formulario.foto
              }
              alt="Foto de perfil"
              fluid
              className="rounded shadow-sm"
            />
            {editando && (
              <Form.Group className="mt-3">
                <Form.Label>Cambiar foto</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    const ext = file?.name.split(".").pop().toLowerCase();
                    if (["jpg", "jpeg", "png"].includes(ext)) {
                      setArchivoFoto(file);
                    } else {
                      Swal.fire({
                        icon: "error",
                        title: "Formato de imagen inválido",
                        text: "Solo se permiten imágenes JPG, JPEG o PNG.",
                      });
                      setArchivoFoto(null);
                      e.target.value = null;
                    }
                  }}
                />
              </Form.Group>
            )}
          </Col>
          <Col md={8}>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombreUsuario"
                  value={formulario.nombreUsuario}
                  onChange={handleChange}
                  readOnly={!editando}
                  isInvalid={!!errores.nombreUsuario}
                />
                <Form.Control.Feedback type="invalid">
                  {errores.nombreUsuario}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="emailUsuario"
                  value={formulario.emailUsuario}
                  onChange={handleChange}
                  readOnly={!editando}
                  isInvalid={!!errores.emailUsuario}
                />
                <Form.Control.Feedback type="invalid">
                  {errores.emailUsuario}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="text"
                  name="telefono"
                  value={formulario.telefono}
                  onChange={handleChange}
                  readOnly={!editando}
                  isInvalid={!!errores.telefono}
                />
                <Form.Control.Feedback type="invalid">
                  {errores.telefono}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  name="descripcion"
                  rows={3}
                  value={formulario.descripcion}
                  onChange={handleChange}
                  readOnly={!editando}
                />
              </Form.Group>

              {editando && (
                <Button
                  onClick={() => setCambiarContrasenia(true)}
                  variant="link"
                  size="sm"
                >
                  Cambiar contraseña
                </Button>
              )}

              {cambiarContrasenia && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Contraseña actual</Form.Label>
                    <Form.Control
                      type="password"
                      name="actual"
                      value={formulario.actual}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Contraseña nueva</Form.Label>
                    <Form.Control
                      type="password"
                      name="nueva"
                      value={formulario.nueva}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </>
              )}

              <div className="d-flex justify-content-end">
                {!editando ? (
                  <Button onClick={() => setEditando(true)}>
                    Editar perfil
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="primary"
                      className="me-2"
                      onClick={guardarCambios}
                    >
                      Guardar
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setEditando(false);
                        setFormulario({
                          nombreUsuario: usuario.nombreUsuario,
                          emailUsuario: usuario.emailUsuario,
                          telefono: usuario.telefono,
                          descripcion: usuario.descripcion,
                          foto: usuario.foto,
                        });
                        setArchivoFoto(null);
                        setCambiarContrasenia(false);
                      }}
                    >
                      Cancelar
                    </Button>
                  </>
                )}
              </div>
            </Form>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default MiPerfil;
