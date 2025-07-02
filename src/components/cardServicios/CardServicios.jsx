import { useEffect, useState } from "react";
import clientAxios, { configHeaders } from "../../helpers/axios.helpers";
import { Card, Container, Row, Col, Button, Badge } from "react-bootstrap";
import { FiClock, FiTag } from "react-icons/fi";

import ModalServicio from "../modalServicio/ModalServicio";

const emojiPorServicio = {
  medicina: "⚕️",
  estetica: "✂️",
  estudios: "🔬",
  guardería: "🏠",
  vacunacion: "💉",
};

const obtenerEmoji = (categoria) => {
  return emojiPorServicio[categoria.toLowerCase()] || "🐾";
};

const CardServicios = () => {
  const [servicios, setServicios] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [idServicioSeleccionado, setIdServicioSeleccionado] = useState(null);

  const obtenerServicios = async () => {
    try {
      const res = await clientAxios.get("/servicios", configHeaders);
      setServicios(res.data.servicios);
    } catch (error) {
      console.error(error);
    }
  };

  const mostrarModal = (id) => {
    setIdServicioSeleccionado(id);
    setModalVisible(true);
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

              <Row className="g-2">
                <Col>
                  <Button
                    variant="outline-primary"
                    className="w-100"
                    onClick={() => mostrarModal(servicio._id)}
                  >
                    Ver Servicio
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>

      {modalVisible && (
        <ModalServicio
          id={idServicioSeleccionado}
          show={modalVisible}
          handleClose={() => setModalVisible(false)}
        />
      )}
    </Container>
  );
};

export default CardServicios;
