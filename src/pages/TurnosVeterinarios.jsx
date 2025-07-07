import { useEffect, useState } from "react";
import {
  Container,
  Table,
  Spinner,
  Button,
  Badge,
  Alert,
} from "react-bootstrap";
import clientAxios, { configHeaders } from "../helpers/axios.helpers";
import Swal from "sweetalert2";

const TurnosVeterinario = () => {
  const [turnos, setTurnos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const formatearFecha = (fechaIso) => {
    const fecha = new Date(fechaIso);
    return fecha.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatearHora = (fechaIso) => {
    const fecha = new Date(fechaIso);
    return fecha.toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const esFuturo = (fechaIso) => {
    return new Date(fechaIso) > new Date();
  };

  const obtenerTurnos = async () => {
    try {
      const res = await clientAxios.get(
        "/turnos/turnos-veterinario",
        configHeaders
      );
      setTurnos(res.data.turnos);
    } catch (error) {
      console.error("Error al obtener los turnos:", error);
      setError("No se pudieron obtener los turnos.");
    } finally {
      setCargando(false);
    }
  };

  const cancelarTurno = async (idTurno) => {
    const confirmacion = await Swal.fire({
      title: "¿Cancelar turno?",
      text: "Esta acción eliminará el turno definitivamente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "No",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (!confirmacion.isConfirmed) return;

    try {
      const res = await clientAxios.delete(
        `/turnos/cancelar-turno-vet/${idTurno}`,
        configHeaders
      );

      if (res.status === 200) {
        setTurnos((prev) => prev.filter((t) => t._id !== idTurno));
        Swal.fire("Cancelado", res.data.msg, "success");
      }
    } catch (error) {
      console.error("Error al cancelar turno:", error);
      Swal.fire("Error", "No se pudo cancelar el turno.", "error");
    }
  };
  const LimpiarTurno = async (idTurno) => {
    const confirmacion = await Swal.fire({
      title: "¿Limpiar el turno?",
      text: "Esta acción limpiara el turno definitivamente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, Limpiar",
      cancelButtonText: "No",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (!confirmacion.isConfirmed) return;

    try {
      const res = await clientAxios.delete(
        `/turnos/cancelar-turno-vet/${idTurno}`,
        configHeaders
      );

      if (res.status === 200) {
        setTurnos((prev) => prev.filter((t) => t._id !== idTurno));
        Swal.fire("Cancelado", res.data.msg, "success");
      }
    } catch (error) {
      console.error("Error al cancelar turno:", error);
      Swal.fire("Error", "No se pudo cancelar el turno.", "error");
    }
  };

  useEffect(() => {
    obtenerTurnos();
  }, []);

  return (
    <Container className="my-5">
      <h3 className="mb-4 text-center">Mis Turnos como Veterinario</h3>

      {cargando ? (
        <div className="d-flex justify-content-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : turnos.length === 0 ? (
        <Alert variant="info" className="text-center">
          No tienes turnos asignados.
        </Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Mascota</th>
              <th>Especie</th>
              <th>Raza</th>
              <th>Servicio</th>
              <th>Cliente</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {turnos.map((turno) => {
              const turnoEsFuturo = esFuturo(turno.fechaHora);
              return (
                <tr key={turno._id}>
                  <td>{formatearFecha(turno.fechaHora)}</td>
                  <td>{formatearHora(turno.fechaHora)}</td>
                  <td>{turno.mascota?.nombre || "Sin nombre"}</td>
                  <td>{turno.mascota?.especie || "Desconocido"}</td>
                  <td>{turno.mascota?.raza || "Desconocida"}</td>
                  <td>{turno.servicio?.nombre || "Sin servicio"}</td>
                  <td>{turno.usuario?.nombreUsuario || "Sin cliente"}</td>
                  <td>{turno.usuario?.emailUsuario || "Sin email"}</td>
                  <td>{turno.usuario?.telefono || "Sin teléfono"}</td>
                  <td>
                    <Badge bg={turnoEsFuturo ? "info" : "secondary"}>
                      {turnoEsFuturo ? turno.estado : "Finalizado"}
                    </Badge>
                  </td>
                  <td>
                    {turnoEsFuturo ? (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => cancelarTurno(turno._id)}
                      >
                        Cancelar
                      </Button>
                    ) : (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => LimpiarTurno(turno._id)}
                      >
                        Limpiar turno
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default TurnosVeterinario;
