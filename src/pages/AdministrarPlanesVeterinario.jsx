import { useState, useEffect } from "react";
import clientAxios, { configHeaders } from "../helpers/axios.helpers";
import { Table, Button, Container, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";

const AdministrarPlanesVeterinario = () => {
  const [planesVet, setPlanesVet] = useState([]);
  const [loading, setLoading] = useState(true);

  const obtenerPlanesVeterinarios = async () => {
    try {
      const res = await clientAxios.get(
        "/planes/planes-veterinario",
        configHeaders
      );
      setPlanesVet(res.data.planes); // Ajusta si la propiedad del backend es diferente
    } catch (error) {
      console.error("Error al obtener los planes:", error);
    } finally {
      setLoading(false);
    }
  };

  const cancelarPlan = async (idMascota) => {
    const confirmacion = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción cancelará el plan del veterinario.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "No",
    });

    if (confirmacion.isConfirmed) {
      try {
        const res = await clientAxios.delete(
          `/planes/cancelarPlanVet/${idMascota}`,
          configHeaders
        );
        if (res.status === 200) {
          setPlanesVet((prev) =>
            prev.filter((plan) => plan.mascota._id !== idMascota)
          );
          Swal.fire("Cancelado", "El plan ha sido cancelado.", "success");
        }
      } catch (error) {
        console.error("Error al cancelar el plan:", error);
        Swal.fire("Error", "No se pudo cancelar el plan.", "error");
      }
    }
  };

  useEffect(() => {
    obtenerPlanesVeterinarios();
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h3 className="mb-4">Planes activos de Veterinarios</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Mascota</th>
            <th>Especie</th>
            <th>Raza</th>
            <th>Nombre del Plan</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {planesVet.map((plan) => (
            <tr key={plan._id}>
              <td>{plan.usuario?.nombreUsuario || "Sin nombre"}</td>
              <td>{plan.usuario?.emailUsuario || "Sin email"}</td>
              <td>{plan.usuario?.telefono || "Sin teléfono"}</td>
              <td>{plan.mascota?.nombre || "Sin especialidad"}</td>
              <td>{plan.mascota?.especie || "Sin especialidad"}</td>
              <td>{plan.mascota?.raza || "Sin especialidad"}</td>
              <td>{plan.plan}</td>
              <td>{plan.estado}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => cancelarPlan(plan.mascota._id)}
                >
                  Cancelar Plan
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdministrarPlanesVeterinario;
