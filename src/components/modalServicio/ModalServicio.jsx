import { useEffect, useState } from "react";
import { Modal, Badge, Button, Row, Col } from "react-bootstrap";
import clientAxios from "../../helpers/axios.helpers";
import {
  FiClock,
  FiTag,
  FiInfo,
  FiXCircle,
  FiCheckCircle,
  FiDollarSign,
} from "react-icons/fi";

const ModalServicio = ({ id, show, handleClose }) => {
  const [servicio, setServicio] = useState(null);

  const obtenerServicio = async () => {
    try {
      const res = await clientAxios.get(`/servicios/${id}`);
      setServicio(res.data.servicio);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id && show) {
      obtenerServicio();
    }
  }, [id, show]);

  if (!servicio) return null;

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <div className="d-flex justify-content-between align-items-center w-100">
          <h5 className="fw-bold mb-0" style={{ color: "#00466E" }}>
            {servicio.nombre}
          </h5>
        </div>
      </Modal.Header>
      <Modal.Body>
        <h6 className="fw-bold mb-3" style={{ color: "#F16716" }}>
          Descripción del Servicio
        </h6>
        <p style={{ color: "#000000", fontSize: "1rem" }}>
          Nuestras consultas veterinarias incluyen un examen físico completo,
          evaluación del historial médico, revisión de peso y condición
          corporal, revisión de oídos, ojos y dientes, y recomendaciones
          personalizadas para el cuidado de tu mascota. Nuestros veterinarios
          experimentados utilizan equipos modernos para garantizar un
          diagnóstico preciso.
        </p>
        <Row className="text-muted my-4">
          <Col md={6}>
            <p>
              <FiClock className="me-2" style={{ color: "#F16716" }} />
              <span style={{ fontWeight: "bold" }}>Categoría</span>:{" "}
              <span style={{ color: "#000000" }}>30-45 min</span>
            </p>
            <p>
              {servicio.disponible ? (
                <FiCheckCircle className="me-2" style={{ color: "#28a745" }} />
              ) : (
                <FiXCircle className="me-2" style={{ color: "#dc3545" }} />
              )}
              <strong>Disponibilidad: </strong>
              <span
                style={{
                  color: servicio.disponible ? "#28a745" : "#dc3545",
                  fontWeight: "bold",
                }}
              >
                {servicio.disponible ? "Disponible" : "No disponible"}
              </span>
            </p>
          </Col>
          <Col md={6}>
            <p>
              <FiDollarSign className="me-2" style={{ color: "#F16716" }} />
              <strong>Precio: </strong>
              <span>Desde ${servicio.precio || 25}</span>
            </p>
            <p>
              <FiTag className="me-2" style={{ color: "#F16716" }} />
              <strong>Categoría: </strong>
              <span>{servicio.categoria}</span>
            </p>
          </Col>
        </Row>
        <div
          className="p-3 rounded shadow-sm"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #F16716",
          }}
        >
          <h6 className="fw-bold mb-2" style={{ color: "#F16716" }}>
            <FiInfo className="me-2" />
            Información Importante
          </h6>
          <ul className="mb-0 ps-3" style={{ color: "#000000" }}>
            <li>Llegá 15 minutos antes de tu cita</li>
            <li>Traé el carnet de vacunación</li>
            <li>Mantené a tu mascota en ayunas si es necesario</li>
            <li>Cancelá con 24h de anticipación</li>
          </ul>
        </div>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#F1F4F8" }}>
        <Button
          style={{
            backgroundColor: "#dc3545",
            border: "none",
            color: "#FFFFFF",
          }}
          onClick={handleClose}
        >
          Cerrar
        </Button>
        <Button variant="success">Agendar Cita</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalServicio;
