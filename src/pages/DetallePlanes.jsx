import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Container,
  Card,
  Button,
  Spinner,
  ListGroup,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import clientAxios, { configHeaders } from "../helpers/axios.helpers";
import Swal from "sweetalert2";

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

const DetallePlan = () => {
  const usuarioLogeado = JSON.parse(sessionStorage.getItem("token")) || null;
  const { id } = useParams();
  const navigate = useNavigate();

  const [plan, setPlan] = useState(null);
  const [mascotas, setMascotas] = useState([]);
  const [veterinarios, setVeterinarios] = useState([]);
  const [errores, setErrores] = useState({});
  const [loading, setLoading] = useState(false);

  const [formulario, setFormulario] = useState({
    mascota: "",
    veterinario: "",
  });

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });

    setErrores({
      ...errores,
      [e.target.name]: "",
    });
  };

  const obtenerUnPlan = async () => {
    try {
      const res = await clientAxios.get(`/planes/obtener-un-plan/${id}`);
      setPlan(res.data.plan);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerMascotas = async () => {
    try {
      const res = await clientAxios.get("/mascotas", configHeaders);
      setMascotas(res.data.mascotas);
    } catch (error) {}
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
    if (!formulario.mascota) nuevosErrores.mascota = "Seleccioná una mascota";
    if (!formulario.veterinario)
      nuevosErrores.veterinario = "Seleccioná un veterinario";

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };
  const aniadirMascotaSinLoguear = async () => {
    try {
      if (!usuarioLogeado) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Debes iniciar sesion para añadir una mascota",
        });
        setTimeout(() => {
          navigate("/");
        });
      }
    } catch (error) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuarioLogeado) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debes iniciar sesion para contratar este plan!",
      });
      setTimeout(() => {
        navigate("/login");
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
      setLoading(true);

      const body = {
        mascota: formulario.mascota,
        plan: plan.nombre,
        veterinario: formulario.veterinario,
      };

      const res = await clientAxios.post(
        "/planes/aniadirPlan",
        body,
        configHeaders
      );

      if (res.status === 201) {
        sessionStorage.setItem("idPlan", JSON.stringify(res.data.idPlan));
        sessionStorage.setItem("idMascota", JSON.stringify(formulario.mascota));
        const pago = await clientAxios.post(
          `/mercadoPago/pagoMercadoPagoPlan/${plan._id}`,
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

      Swal.fire({
        icon: "success",
        title: res.data.msg,
        confirmButtonColor: "#28a745",
      });
    } catch (error) {
      const mensaje =
        error.response?.data?.msg || "Ocurrió un error inesperado";

      if (mensaje === "No puedes contratar 2 planes para una misma mascota") {
        Toast.fire({
          icon: "info",
          title: mensaje,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: mensaje,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerUnPlan();
    obtenerMascotas();
    obtenerVeterinarios();
  }, []);

  if (!plan) {
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Container className="my-5">
      <Row>
        <Col md={7}>
          <Card className="shadow border-0 mb-4 mb-md-0">
            {plan.imagen && (
              <Card.Img
                variant="top"
                src={plan.imagen}
                style={{ height: "300px", objectFit: "cover" }}
              />
            )}
            <Card.Body className="p-4">
              <Card.Title className="text-primary fs-1 text-center mb-3">
                {plan.nombre}
              </Card.Title>
              <Card.Text className="fs-5 text-secondary text-justify mb-4">
                {plan.descripcion}
              </Card.Text>
              <h5 className="fw-bold mb-3">Servicios incluidos:</h5>
              <ListGroup className="mb-4" variant="flush">
                {Array.isArray(plan.servicios) &&
                  plan.servicios.map((servicio, idx) => (
                    <ListGroup.Item key={idx} className="text-muted">
                      ✅ {servicio}
                    </ListGroup.Item>
                  ))}
              </ListGroup>
              <h4 className="text-primary fw-bold text-center">
                Precio: ${plan.precio}
              </h4>
            </Card.Body>
          </Card>
        </Col>

        <Col md={5}>
          <Card className="shadow border-0 h-100">
            <Card.Body className="p-4 d-flex flex-column justify-content-between">
              <div>
                <h4 className="text-center text-primary mb-4">
                  Contratar este plan
                </h4>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Seleccioná el veterinario</Form.Label>
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
                    <Form.Label>Seleccioná tu mascota</Form.Label>
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
                      <Form.Text className="text-danger">
                        {errores.mascota}
                      </Form.Text>
                    )}
                    <p className="my-2">
                      ¿No tienes una mascota registrada?{" "}
                      <Link
                        onClick={() => aniadirMascotaSinLoguear()}
                        to={"/user/añadir-mascota"}
                      >
                        {" "}
                        Añadila aqui
                      </Link>
                    </p>
                  </Form.Group>

                  <div className="d-grid">
                    <Button variant="primary" type="submit" disabled={loading}>
                      {loading ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="me-2"
                          />
                          Procesando...
                        </>
                      ) : (
                        "Confirmar contratación"
                      )}
                    </Button>
                  </div>
                </Form>
              </div>

              <p className="mt-4 text-muted small text-center">
                Te llegará un correo de confirmación al contratar el plan.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DetallePlan;
