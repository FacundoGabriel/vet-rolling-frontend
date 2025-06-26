import { useState, useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import clientAxios from "../../helpers/axios.helpers";
import "./CardVeterinarios.css";

const CardVeterinarios = () => {
  const [veterinarios, setVeterinarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const obtenerVeterinarios = async () => {
    try {
      const res = await clientAxios.get("/veterinarios");
      setVeterinarios(res.data.veterinarios);
    } catch (error) {
      console.error("Error al obtener veterinarios:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerVeterinarios();
  }, []);

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="text-primary text-center mb-4">
        Conoce nuestros veterinarios
      </h2>
      <Row className="g-4">
        {veterinarios.map((vet) => (
          <Col md={4} sm={6} xs={12} key={vet._id}>
            <div className="vet-card">
              <img
                src={
                  vet.foto ||
                  "https://via.placeholder.com/400x400?text=Veterinario"
                }
                alt={vet.nombreUsuario}
                className="vet-img"
              />
              <div className="vet-info">
                <h5>{vet.nombreUsuario}</h5>
              </div>
              <div className="vet-overlay">
                <div className="vet-overlay-content">
                  <h5>{vet.nombreUsuario}</h5>
                  <p>
                    <strong>Email:</strong> {vet.emailUsuario}
                  </p>
                  <p>
                    <strong>Teléfono:</strong> {vet.telefono || "No disponible"}
                  </p>
                  <p>
                    <strong>Especialidad:</strong> {vet.especialidad}
                  </p>
                  <p>
                    <strong>Descripción:</strong> {vet.descripcion}
                  </p>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CardVeterinarios;
