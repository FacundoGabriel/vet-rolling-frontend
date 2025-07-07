import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, Button, Spinner, Form } from "react-bootstrap";

import Swal from "sweetalert2";
import clientAxios, { configHeaders } from "../../helpers/axios.helpers";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  showCloseButton: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const HORARIOS_TOTALES = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
];

const FormularioTurno = ({ serviceId }) => {
  const usuarioLogeado = JSON.parse(sessionStorage.getItem("token")) || null;
  const navigate = useNavigate();

  const [servicios, setServicios] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const [veterinarios, setVeterinarios] = useState([]);
  const [errores, setErrores] = useState({});

  const [formulario, setFormulario] = useState({
    fecha: "",
    horario: "",
    mascota: "",
    veterinario: "",
    servicio: "",
  });

  const obtenerDiaSemana = (fechaString) => {
    const [year, month, day] = fechaString.split("-").map(Number);
    const fecha = new Date(year, month - 1, day);
    return fecha.getDay();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "fecha" && value) {
      const diaSemana = obtenerDiaSemana(value);
      if (diaSemana === 0 || diaSemana === 6) {
        Swal.fire({
          icon: "error",
          title: "Fecha inválida",
          text: "No se pueden seleccionar sábados ni domingos.",
        });
        setFormulario((prev) => ({ ...prev, fecha: "" }));
        return;
      }
    }

    setFormulario({
      ...formulario,
      [name]: value,
    });
    setErrores({
      ...errores,
      [name]: "",
    });
  };

  const obtenerServicios = async () => {
    try {
      const res = await clientAxios.get("/servicios", configHeaders);
      setServicios(res.data.servicios);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerMascotas = async () => {
    try {
      const res = await clientAxios.get(
        "/mascotas/tus-mascotas",
        configHeaders
      );
      setMascotas(res.data.mascotas);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerVeterinarios = async () => {
    try {
      const res = await clientAxios.get("/veterinarios");
      setVeterinarios(res.data.veterinarios);
    } catch (error) {
      console.log(error);
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!formulario.fecha) nuevosErrores.fecha = "La fecha es obligatoria";
    if (!formulario.horario)
      nuevosErrores.horario = "El horario es obligatorio";
    if (!formulario.mascota) nuevosErrores.mascota = "Seleccioná una mascota";
    if (!formulario.veterinario)
      nuevosErrores.veterinario = "Seleccioná un veterinario";

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const aniadirMascotaSinLoguear = () => {
    if (!usuarioLogeado) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debes iniciar sesión para añadir una mascota",
      });
      setTimeout(() => {
        navigate("/");
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuarioLogeado) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debes iniciar sesión para reservar un turno!",
      });
      setTimeout(() => {
        navigate("/");
      }, 1000);
      return;
    }

    if (!validarFormulario()) {
      Toast.fire({
        icon: "warning",
        title: "Completá todos los campos requeridos",
      });
      return;
    }

    try {
      const fechaHoraISO = new Date(
        `${formulario.fecha}T${formulario.horario}`
      ).toISOString();

      const body = {
        mascota: formulario.mascota,
        servicio: serviceId,
        fechaHora: fechaHoraISO,
        veterinario: formulario.veterinario,
      };

      const res = await clientAxios.post(
        "/turnos/crear-turno",
        body,
        configHeaders
      );

      sessionStorage.setItem("idTurno", JSON.stringify(res.data.idTurno));

      if (res.status === 201) {
        const pago = await clientAxios.post(
          `/mercadoPago/pagoMercadoPagoServicio/${serviceId}`,
          {},
          configHeaders
        );

        const linkPago = pago.data.responseMp?.init_point;

        if (linkPago) {
          window.location.href = linkPago;
        } else {
          Toast.fire({
            icon: "info",
            title: "Turno creado, pero no se pudo obtener el link de pago.",
          });
        }
      }
    } catch (error) {
      const mensaje =
        error.response?.data?.msg || "Ocurrió un error inesperado";
      Toast.fire({
        icon: "error",
        title: mensaje,
      });
    }
  };

  useEffect(() => {
    obtenerServicios();
    obtenerMascotas();
    obtenerVeterinarios();

    setFormulario((prev) => ({
      ...prev,
      servicio: serviceId,
    }));
  }, []);

  if (!servicios.length) {
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Card className="shadow border-0">
      <Card.Body>
        <h3 className="text-primary text-center mb-4">Reservar un Turno</h3>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="hidden"
              onChange={handleChange}
              name="servicio"
              value={serviceId}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="date"
              name="fecha"
              value={formulario.fecha}
              onChange={handleChange}
              isInvalid={!!errores.fecha}
              min={
                new Date(Date.now() + 24 * 60 * 60 * 1000)
                  .toISOString()
                  .split("T")[0]
              }
            />
            {errores.fecha && (
              <Form.Text className="text-danger">{errores.fecha}</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Horario</Form.Label>
            <Form.Select
              name="horario"
              value={formulario.horario}
              onChange={handleChange}
              isInvalid={!!errores.horario}
            >
              <option value="">-- Seleccioná un horario --</option>
              {HORARIOS_TOTALES.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </Form.Select>
            {errores.horario && (
              <Form.Text className="text-danger">{errores.horario}</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Veterinario</Form.Label>
            <Form.Select
              name="veterinario"
              value={formulario.veterinario}
              onChange={handleChange}
              isInvalid={!!errores.veterinario}
            >
              <option value="">-- Seleccioná un veterinario --</option>
              {veterinarios.map((vet) => (
                <option key={vet._id} value={vet._id}>
                  {vet.nombreUsuario}
                </option>
              ))}
            </Form.Select>
            {errores.veterinario && (
              <Form.Text className="text-danger">
                {errores.veterinario}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tu mascota</Form.Label>
            <Form.Select
              name="mascota"
              value={formulario.mascota}
              onChange={handleChange}
              isInvalid={!!errores.mascota}
            >
              <option value="">-- Seleccioná una mascota --</option>
              {mascotas.map((mascota) => (
                <option key={mascota._id} value={mascota._id}>
                  {mascota.nombre}
                </option>
              ))}
            </Form.Select>
            {errores.mascota && (
              <Form.Text className="text-danger">{errores.mascota}</Form.Text>
            )}
            <p className="my-2">
              ¿No tienes una mascota registrada?{" "}
              <Link
                onClick={() => aniadirMascotaSinLoguear()}
                to={"/user/añadir-mascota"}
              >
                Añadila aquí
              </Link>
            </p>
          </Form.Group>

          <div className="d-grid">
            <Button type="submit" variant="primary">
              Reservar Turno
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default FormularioTurno;
