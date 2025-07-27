import { useEffect, useState } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Image,
  Button,
  Form,
  Spinner,
} from "react-bootstrap";
import clientAxios, {
  configHeaders,
  configHeadersImage,
} from "../helpers/axios.helpers";
import Swal from "sweetalert2";

const MiPerfil = () => {
  const [usuario, setUsuario] = useState(null);
  const [editando, setEditando] = useState(false);
  const [cambiarContrasenia, setCambiarContrasenia] = useState(false);
  const [errores, setErrores] = useState({});
  const [touched, setTouched] = useState({});
  const [loadingGuardar, setLoadingGuardar] = useState(false);
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

  useEffect(() => {
    obtenerUnUsuario();
  }, []);

  const obtenerUnUsuario = async () => {
    try {
      const res = await clientAxios.get(
        `/usuarios/ver-mi-perfil`,
        configHeaders
      );
      setUsuario(res.data.usuario);
      setFormulario({
        nombreUsuario: res.data.usuario.nombreUsuario,
        emailUsuario: res.data.usuario.emailUsuario,
        telefono: res.data.usuario.telefono,
        descripcion: res.data.usuario.descripcion,
        foto: res.data.usuario.foto,
        actual: "",
        nueva: "",
      });
    } catch (err) {
      console.error("Error al obtener usuario:", err);
    }
  };

  const validarCampo = (name, value) => {
    let error = "";

    switch (name) {
      case "nombreUsuario":
        if (!value.trim()) {
          error = "El nombre es obligatorio";
        } else if (value.length < 3) {
          error = "El nombre debe tener al menos 3 caracteres";
        } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9_\-\s]+$/.test(value)) {
          error =
            "Solo se permiten letras, números, espacios, guiones y guiones bajos";
        }
        break;

      case "emailUsuario":
        if (!value.trim()) {
          error = "El email es obligatorio";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Formato de email inválido";
        }
        break;

      case "telefono":
        if (!value.trim()) {
          error = "El teléfono es obligatorio";
        } else if (!/^\+?\d{8,15}$/.test(value.replace(/\s+/g, ""))) {
          error = "Teléfono inválido. Debe tener entre 8 y 15 dígitos";
        }
        break;

      case "actual":
        if (cambiarContrasenia && !value.trim()) {
          error = "La contraseña actual es obligatoria para cambiar contraseña";
        }
        break;

      case "nueva":
        if (cambiarContrasenia) {
          if (!value.trim()) {
            error = "La contraseña nueva es obligatoria";
          } else if (value.length < 8) {
            error = "La contraseña nueva debe tener al menos 8 caracteres";
          } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
            error = "La contraseña debe incluir mayúscula, minúscula y número";
          }
        }
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormulario({
      ...formulario,
      [name]: value,
    });

    setErrores((prevErrores) => ({
      ...prevErrores,
      [name]: validarCampo(name, value),
    }));

    if ((name === "actual" || name === "nueva") && cambiarContrasenia) {
      setErrores((prev) => ({
        ...prev,
        actual:
          name === "nueva"
            ? validarCampo("actual", formulario.actual)
            : prev.actual,
        nueva:
          name === "actual"
            ? validarCampo("nueva", formulario.nueva)
            : prev.nueva,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    setErrores((prevErrores) => ({
      ...prevErrores,
      [name]: validarCampo(name, value),
    }));
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    Object.entries(formulario).forEach(([key, value]) => {
      const error = validarCampo(key, value);
      if (error) nuevosErrores[key] = error;
    });
    setErrores(nuevosErrores);
    setTouched(
      Object.keys(formulario).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {})
    );
    return Object.keys(nuevosErrores).length === 0;
  };

  const cambiarContraseniaUsuario = async () => {
    try {
      const res = await clientAxios.put(
        `/usuarios/cambiar-contrasenia`,
        {
          actual: formulario.actual,
          nueva: formulario.nueva,
        },
        configHeaders
      );

      Swal.fire("Éxito", res.data.msg, "success");
      setFormulario((f) => ({ ...f, actual: "", nueva: "" }));
      setCambiarContrasenia(false);

      return true;
    } catch (error) {
      Swal.fire("Error", error.response?.data?.msg || "Hubo un error", "error");
      return false;
    }
  };

  const guardarCambios = async () => {
    if (!validarFormulario()) {
      Swal.fire(
        "Errores en el formulario",
        "Por favor corrige los errores antes de guardar.",
        "error"
      );
      return;
    }

    setLoadingGuardar(true);
    try {
      if (formulario.actual || formulario.nueva) {
        const cambioOk = await cambiarContraseniaUsuario();
        if (!cambioOk) return;
      }

      const datosTexto = {
        nombreUsuario: formulario.nombreUsuario,
        emailUsuario: formulario.emailUsuario,
        telefono: formulario.telefono,
        descripcion: formulario.descripcion,
      };

      const res = await clientAxios.put(
        `/usuarios/editar-mi-perfil`,
        datosTexto,
        configHeaders
      );

      if (archivoFoto) {
        const formData = new FormData();
        formData.append("foto", archivoFoto);

        await clientAxios.put(
          `/usuarios/agregarImagen/${res.data.idUsuario}`,
          formData,
          configHeadersImage
        );
      }

      Swal.fire("Éxito", "Perfil actualizado correctamente", "success");
      setEditando(false);
      setArchivoFoto(null);
      setCambiarContrasenia(false);
      obtenerUnUsuario();
      setErrores({});
      setTouched({});
    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar el perfil", "error");
    } finally {
      setLoadingGuardar(false);
    }
  };
  const eliminarCuenta = async () => {
    const confirmacion = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Esta acción eliminará tu cuenta y no podrás recuperarla!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar cuenta",
      cancelButtonText: "Cancelar",
    });

    if (confirmacion.isConfirmed) {
      try {
        const res = await clientAxios.delete(
          "/usuarios/eliminar-mi-cuenta",
          configHeaders
        );

        Swal.fire("Cuenta eliminada", res.data.msg, "success");

        sessionStorage.clear();
        window.location.href = "/login";
      } catch (error) {
        Swal.fire(
          "Error",
          error.response?.data?.msg || "No se pudo eliminar la cuenta",
          "error"
        );
      }
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
                  onBlur={handleBlur}
                  readOnly={!editando}
                  isInvalid={touched.nombreUsuario && !!errores.nombreUsuario}
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
                  onBlur={handleBlur}
                  readOnly={!editando}
                  isInvalid={touched.emailUsuario && !!errores.emailUsuario}
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
                  onBlur={handleBlur}
                  readOnly={!editando}
                  isInvalid={touched.telefono && !!errores.telefono}
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
                      onBlur={handleBlur}
                      isInvalid={touched.actual && !!errores.actual}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errores.actual}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Contraseña nueva</Form.Label>
                    <Form.Control
                      type="password"
                      name="nueva"
                      value={formulario.nueva}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.nueva && !!errores.nueva}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errores.nueva}
                    </Form.Control.Feedback>
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
                      disabled={
                        loadingGuardar ||
                        Object.values(errores).some((err) => err) ||
                        (cambiarContrasenia &&
                          (!formulario.actual || !formulario.nueva))
                      }
                    >
                      {loadingGuardar ? (
                        <>
                          <Spinner
                            animation="border"
                            size="sm"
                            className="me-2"
                          />
                          Guardando...
                        </>
                      ) : (
                        "Guardar"
                      )}
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
                          descripcion: usuario.descripcion,
                          actual: "",
                          nueva: "",
                        });
                        setArchivoFoto(null);
                        setCambiarContrasenia(false);
                        setErrores({});
                        setTouched({});
                      }}
                    >
                      Cancelar
                    </Button>
                  </>
                )}
              </div>
            </Form>
            <div className="d-flex justify-content-end mt-3">
              <Button variant="danger" onClick={eliminarCuenta}>
                Eliminar mi cuenta
              </Button>
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default MiPerfil;
