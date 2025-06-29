import { useEffect, useState } from "react";
import clientAxios from "../../helpers/axios.helpers";
import { Card, Container, Row, Col, Button, Badge } from "react-bootstrap";
import { FiClock, FiTag, FiInfo } from "react-icons/fi";

// Mapeo limpio de emojis
const emojiPorServicio = {
  medicina: "⚕️",
  estetica: "✂️",
  estudios: "🔬",
  guardería: "🏠",
  vacunacion: "💉",
};

const obtenerEmoji = (nombre) => {
  const clave = Object.keys(emojiPorServicio).find((key) =>
    nombre.toLowerCase().includes(key)
  );

  return emojiPorServicio[clave] || "🐾";
};

const CardServicios = () => {
  const [servicios, setServicios] = useState([]);

  const obtenerServicios = async () => {
    try {
      const res = await clientAxios.get("/servicios");
      setServicios(res.data.servicios);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    obtenerServicios();
  }, []);

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center text-primary fw-bold fs-1">
        Nuestros Servicios
      </h2>
      <p className="my-2 fw-light text-center fs-4">
        Ofrecemos una amplia gama de servicios veterinarios para mantener a tu
        mascota sana y feliz
      </p>
      <Row className="g-4">
        {servicios.map((servicio, i) => (
          <Col xs={12} md={6} lg={4} key={i}>
            <Card
              className="shadow-lg rounded position-relative py-5 px-5 m-3"
              style={{ borderRadius: "10px", border: "1px solid #0074B8" }}
            >
              <div className="d-flex align-items-center justify-content-start mb-3">
                <div
                  className="d-flex align-items-center justify-content-center me-1"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "10px",
                    backgroundColor: "#f2f2f2",
                    fontSize: "1.5rem",
                  }}
                >
                  {obtenerEmoji(servicio.categoria)}
                </div>

                <Badge bg="light" text="dark" className="fw-semibold me-3">
                  {servicio.categoria}
                </Badge>

                <Badge
                  className="fw-semibold me-3"
                  bg={servicio.disponible ? "success" : "danger"}
                >
                  {servicio.disponible ? "Disponible" : "Servicio en pausa"}
                </Badge>
              </div>

              <Card.Title className="fw-bold">{servicio.nombre}</Card.Title>
              <Card.Text className="text-muted" style={{ fontSize: "0.9rem" }}>
                {servicio.descripcion}
              </Card.Text>

              <div
                className="d-flex justify-content-between my-3 text-muted"
                style={{ fontSize: "0.9rem" }}
              >
                <span>
                  <FiClock className="me-1" /> 30-45 min
                </span>
                <span className="fw-semibold text-primary">
                  <FiTag className="me-1" />
                  Desde ${servicio.precio || 25}
                </span>
              </div>

              <div className="d-flex justify-content-between mt-3">
                <Button
                  variant="outline-primary"
                  className="d-flex align-items-center"
                  size="sm"
                >
                  <FiInfo className="me-1" /> Ver Descripción
                </Button>
                <Button size="sm" variant="success">
                  Agendar
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CardServicios;
