import { useEffect, useState } from "react";
import { Table, Image, Button, Container } from "react-bootstrap";
import clientAxios, { configHeaders } from "../../helpers/axios.helpers";
import Swal from "sweetalert2";

const TablaUsuarios = ({ idPage }) => {
  const [usuarios, setUsuarios] = useState([]);

  const obtenerUsuarios = async () => {
    try {
      const res = await clientAxios.get("/usuarios/admin", configHeaders);
      setUsuarios(res.data.usuarios);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

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
          `/usuarios/${idUsuario}`,
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
                <Button variant="warning" size="sm" className="me-2">
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
    </Container>
  );
};

export default TablaUsuarios;
