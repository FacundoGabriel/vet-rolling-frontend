import { useEffect, useState } from "react";
import {
  Container,
  Spinner,
  Alert,
  Table,
  Badge,
  Button,
} from "react-bootstrap";
import clientAxios, { configHeaders } from "../helpers/axios.helpers";
import Swal from "sweetalert2";

const MisTurnos = () => {
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
      const res = await clientAxios.get("/turnos/mis-turnos", configHeaders);
      setTurnos(res.data.turnos);
    } catch (err) {
      console.log(err);
      setError("No se pudieron obtener tus turnos.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerTurnos();
  }, []);

  const cancelarTurno = async (idTurno) => {
    const confirmacion = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción cancelará el turno.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "No",
    });

    if (!confirmacion.isConfirmed) return;

    try {
      const res = await clientAxios.delete(
        `/turnos/cancelar-turno/${idTurno}`,
        configHeaders
      );
      if (res.status === 200) {
        Swal.fire("Cancelado", res.data.msg, "success");
        setTurnos((prev) => prev.filter((turno) => turno._id !== idTurno));
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo cancelar el turno.", "error");
    }
  };

  if (cargando) {
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h3 className="mb-4 text-primary text-center">Mis Turnos</h3>

      {turnos.length === 0 ? (
        <Alert variant="info" className="text-center">
          No tenés turnos reservados.
        </Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Servicio</th>
              <th>Mascota</th>
              <th>Veterinario</th>
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
                  <td>{turno.servicio?.nombre || "Servicio"}</td>
                  <td>{turno.mascota?.nombre || "Mascota"}</td>
                  <td>{turno.veterinario?.nombreUsuario || "Veterinario"}</td>
                  <td>
                    <Badge bg={turnoEsFuturo ? "info" : "secondary"}>
                      {turnoEsFuturo ? "Próximo" : "Finalizado"}
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
                        onClick={() => cancelarTurno(turno._id)}
                      >
                        Limpiar turno pasado
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

export default MisTurnos;
