import { useEffect, useState } from "react";
import clientAxios, { configHeaders } from "../helpers/axios.helpers";
import { Card, Container, Row, Col, Spinner } from "react-bootstrap";
import TablaServicios from "../components/tablaservicios/TablaServicios";
import TablaProductosAdmin from "../components/tablaproductosadmin/TablaProductosAdmin";
import TablaPlanes from "../components/tablaplanes/TablaPlanes";

const PaginaAdmin = () => {
  const [usuario, setUsuario] = useState(null);

  const obtenerUnUsuario = async () => {
    try {
      const res = await clientAxios.get(
        `/usuarios/ver-mi-perfil`,
        configHeaders
      );
      setUsuario(res.data.usuario);
    } catch (err) {
      console.error("Error al obtener usuario:", err);
    }
  };

  useEffect(() => {
    obtenerUnUsuario();
  }, []);

  if (!usuario) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "60vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="mt-5 my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg rounded-4 border-0">
            <Card.Body className="p-5">
              <h2 className="mb-4 text-primary">¡Bienvenido, Administrador!</h2>
              <p className="fs-5">
                Nos alegra verte nuevamente,{" "}
                <strong>{usuario.nombreUsuario}</strong>.
              </p>
              <hr />
              <p>
                <strong>Email:</strong> {usuario.emailUsuario}
              </p>
              <p>
                <strong>Rol:</strong> {usuario.rol}
              </p>
              <p>
                <strong>Telefono:</strong> {usuario.telefono}
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <TablaServicios />
      <TablaProductosAdmin />
      <TablaPlanes />
    </Container>
  );
};

export default PaginaAdmin;
