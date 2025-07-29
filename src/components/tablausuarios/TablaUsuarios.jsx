import { useEffect, useState } from "react";
import {
  Table,
  Image,
  Button,
  Container,
  Modal,
  Form,
  Spinner,
} from "react-bootstrap";
import clientAxios, { configHeaders } from "../../helpers/axios.helpers";
import Swal from "sweetalert2";

const TablaUsuarios = ({ idPage }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [loadingEdicion, setLoadingEdicion] = useState(false);

  const [form, setForm] = useState({
    nombreUsuario: "",
    emailUsuario: "",
    telefono: "",
    contrasenia: "",
  });
  const [errores, setErrores] = useState({});
  const [touched, setTouched] = useState({});

  const obtenerUsuarios = async () => {
    try {
      const res = await clientAxios.get("/usuarios/admin", configHeaders());
      setUsuarios(res.data.usuarios);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const abrirModal = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setForm({
      nombreUsuario: usuario.nombreUsuario || "",
      emailUsuario: usuario.emailUsuario || "",
      telefono: usuario.telefono || "",
      contrasenia: "",
    });
    setErrores({});
    setTouched({});
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
    setUsuarioSeleccionado(null);
    setErrores({});
    setTouched({});
  };

  const validarCampo = (name, value) => {
    switch (name) {
      case "nombreUsuario":
        if (!value.trim()) return "El nombre de usuario es obligatorio";
        else if (value.length < 3) return "Debe tener al menos 3 caracteres";
        else if (value.length > 30) return "No puede superar los 30 caracteres";
        else if (!/^[A-ZÁÉÍÓÚÑa-záéíóúñ0-9_\- ]+$/.test(value)) return;
        "Solo se permiten letras, números, espacios, guiones y guiones bajos.";
        break;

      case "emailUsuario":
        if (!value.trim()) return "El email es obligatorio";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Formato de email inválido";
        return "";

      case "telefono":
        if (!value.trim()) return "El teléfono es obligatorio";
        if (!/^\+?\d{8,15}$/.test(value.replace(/\s+/g, "")))
          return "Teléfono inválido (debe tener entre 8 y 15 dígitos)";
        return "";

      case "contrasenia":
        if (!value.trim()) return "";
        if (value.length < 8)
          return "La contraseña debe tener al menos 8 caracteres";
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value))
          return "La contraseña debe incluir mayúscula, minúscula y número";
        return "";

      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    setErrores((prev) => ({
      ...prev,
      [name]: validarCampo(name, value),
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    setErrores((prev) => ({
      ...prev,
      [name]: validarCampo(name, value),
    }));
  };

  const handleSubmitEdicion = async () => {
    setLoadingEdicion(true);
    try {
      const datosAEnviar = { ...form };
      if (!form.contrasenia.trim()) {
        delete datosAEnviar.contrasenia;
      }

      const res = await clientAxios.put(
        `/usuarios/editar-usuario/${usuarioSeleccionado._id}`,
        datosAEnviar,
        configHeaders
      );

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Usuario editado",
          text: res.data.msg,
        });
        cerrarModal();
        obtenerUsuarios();
      }
    } catch (error) {
      if (error.response?.status === 409) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.msg || "Conflicto en la edición",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo editar el usuario.",
        });
      }
    } finally {
      setLoadingEdicion(false);
    }
  };

  const deshabilitarVeterinario = async (idUsuario) => {
    const confirmacion = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción deshabilitará al veterinario.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, deshabilitar",
      cancelButtonText: "Cancelar",
    });

    if (confirmacion.isConfirmed) {
      try {
        const res = await clientAxios.put(
          `/veterinarios/deshabilitar-veterinario/${idUsuario}`,
          {},
          configHeaders
        );
        if (res.status === 200) {
          await obtenerUsuarios();

          Swal.fire({
            icon: "success",
            title: "Deshabilitado",
            text: res.data.msg,
            confirmButtonColor: "#3085d6",
          });
        }
      } catch (error) {
        console.error("Error al habilitar usuario:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo habilitar el veterinario.",
        });
      }
    }
  };

  const habilitarVeterinario = async (idUsuario) => {
    const confirmacion = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción habilitará al veterinario.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, habilitar",
      cancelButtonText: "Cancelar",
    });

    if (confirmacion.isConfirmed) {
      try {
        const res = await clientAxios.put(
          `/veterinarios/aprobar-veterinario/${idUsuario}`,
          {},
          configHeaders
        );
        if (res.status === 200) {
          await obtenerUsuarios();

          Swal.fire({
            icon: "success",
            title: "Habilitado",
            text: res.data.msg || "Veterinario habilitado con éxito.",
            confirmButtonColor: "#3085d6",
          });
        }
      } catch (error) {
        console.error("Error al habilitar usuario:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo habilitar el veterinario.",
        });
      }
    }
  };

  const deshabilitarUsuario = async (idUsuario) => {
    const confirmacion = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción deshabilitará al usuario.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, deshabilitar",
      cancelButtonText: "Cancelar",
    });

    if (confirmacion.isConfirmed) {
      try {
        const res = await clientAxios.put(
          `/usuarios/deshabilitar/${idUsuario}`,
          {},
          configHeaders
        );
        if (res.status === 200) {
          await obtenerUsuarios();

          Swal.fire({
            icon: "success",
            title: "Deshabilitado",
            text: res.data.msg,
            confirmButtonColor: "#3085d6",
          });
        }
      } catch (error) {
        console.error("Error al deshabilitar usuario:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo deshabilitar el usuario.",
        });
      }
    }
  };

  const habilitarUsuario = async (idUsuario) => {
    const confirmacion = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción habilitará al usuario.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, habilitar",
      cancelButtonText: "Cancelar",
    });

    if (confirmacion.isConfirmed) {
      try {
        const res = await clientAxios.put(
          `/usuarios/habilitar/${idUsuario}`,
          {},
          configHeaders
        );
        if (res.status === 200) {
          await obtenerUsuarios();

          Swal.fire({
            icon: "success",
            title: "Habilitado",
            text: res.data.msg,
            confirmButtonColor: "#3085d6",
          });
        }
      } catch (error) {
        console.error("Error al habilitar usuario:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo habilitar el usuario.",
        });
      }
    }
  };

  const eliminarUsuario = async (idUsuario) => {
    const confirmacion = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará al usuario permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirmacion.isConfirmed) {
      try {
        const res = await clientAxios.delete(
          `/usuarios/eliminar-cuenta/${idUsuario}`,
          configHeaders
        );
        if (res.status === 200) {
          setUsuarios((prevUsuarios) =>
            prevUsuarios.filter((user) => user._id !== idUsuario)
          );

          Swal.fire({
            icon: "success",
            title: "Eliminado",
            text: res.data.msg,
            confirmButtonColor: "#3085d6",
          });
        }
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo eliminar el usuario.",
        });
      }
    }
  };

  const getColumnHeaders = () => {
    const base = ["Foto", "Nombre", "Email", "Teléfono", "Rol", "Estado"];
    const extra = [];

    if (idPage === "veterinario" || idPage === "solicitoVeterinario") {
      extra.push("Descripción", "Especialidad");
    }

    return [...base, ...extra, "Acciones"];
  };

  const getUsuariosFiltrados = () => {
    if (idPage === "usuario") {
      return usuarios.filter(
        (u) => u.rol === "usuario" && u.solicitoVeterinario !== true
      );
    }
    if (idPage === "veterinario") {
      return usuarios.filter(
        (u) => u.rol === "veterinario" && u.estado === "habilitado"
      );
    }
    if (idPage === "solicitoVeterinario") {
      return usuarios.filter(
        (u) =>
          u.rol === "usuario" &&
          u.estado !== "habilitado" &&
          u.solicitoVeterinario === true
      );
    }
    return usuarios;
  };

  const columnas = getColumnHeaders();
  const usuariosFiltrados = getUsuariosFiltrados();
  const esFormularioValido = () => {
    const camposRequeridos = ["nombreUsuario", "emailUsuario", "telefono"];

    for (let campo of camposRequeridos) {
      const valor = form[campo]?.trim();
      const error = validarCampo(campo, valor);
      if (!valor || error) return false;
    }

    if (form.contrasenia.trim()) {
      const errorContrasenia = validarCampo("contrasenia", form.contrasenia);
      if (errorContrasenia) return false;
    }

    return true;
  };

  return (
    <Container className="my-5">
      <h3 className="mb-4">Lista de Usuarios</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            {columnas.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {usuariosFiltrados.map((usuario) => (
            <tr key={usuario._id}>
              <td>
                <Image
                  src={usuario.foto}
                  roundedCircle
                  width={40}
                  height={40}
                  alt="foto"
                />
              </td>
              <td>{usuario.nombreUsuario}</td>
              <td>{usuario.emailUsuario}</td>
              <td>{usuario.telefono}</td>
              <td>{usuario.rol}</td>
              <td>{usuario.estado}</td>
              {idPage !== "usuario" && (
                <>
                  <td>{usuario.descripcion}</td>
                  <td>{usuario.especialidad}</td>
                </>
              )}
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => abrirModal(usuario)}
                >
                  Editar
                </Button>
                {usuario.estado === "deshabilitado" && idPage === "usuario" && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => habilitarUsuario(usuario._id)}
                    className="me-2"
                  >
                    Habilitar
                  </Button>
                )}
                {usuario.estado === "habilitado" && idPage === "usuario" && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => deshabilitarUsuario(usuario._id)}
                    className="me-2"
                  >
                    Deshabilitar
                  </Button>
                )}
                {usuario.estado === "habilitado" &&
                  idPage === "veterinario" && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => deshabilitarVeterinario(usuario._id)}
                      className="me-2"
                    >
                      Deshabilitar Vet
                    </Button>
                  )}
                {idPage === "solicitoVeterinario" && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => habilitarVeterinario(usuario._id)}
                    className="me-2"
                  >
                    Habilitar Vet
                  </Button>
                )}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => eliminarUsuario(usuario._id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={cerrarModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate>
            <Form.Group className="mb-3" controlId="nombreUsuario">
              <Form.Label>Nombre de Usuario</Form.Label>
              <Form.Control
                type="text"
                name="nombreUsuario"
                value={form.nombreUsuario}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.nombreUsuario && !!errores.nombreUsuario}
              />
              <Form.Control.Feedback type="invalid">
                {errores.nombreUsuario}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="emailUsuario">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="emailUsuario"
                value={form.emailUsuario}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.emailUsuario && !!errores.emailUsuario}
              />
              <Form.Control.Feedback type="invalid">
                {errores.emailUsuario}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="telefono">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.telefono && !!errores.telefono}
              />
              <Form.Control.Feedback type="invalid">
                {errores.telefono}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="contrasenia">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="contrasenia"
                value={form.contrasenia}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.contrasenia && !!errores.contrasenia}
                placeholder="Déjalo vacío para no cambiar"
              />
              <Form.Control.Feedback type="invalid">
                {errores.contrasenia}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModal}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmitEdicion}
            disabled={!esFormularioValido() || loadingEdicion}
          >
            {loadingEdicion ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Guardando...
              </>
            ) : (
              "Guardar cambios"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TablaUsuarios;
