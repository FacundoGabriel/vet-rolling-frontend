import { useEffect, useState } from "react";
import clientAxios from "../../helpers/axios.helpers";

import { Card, Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const Planes = () => {
  const [planes, setPlanes] = useState([]);

  const obtenerPlanes = async () => {
    try {
      const res = await clientAxios.get("/planes");
      setPlanes(res.data.planes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerPlanes();
  }, []);

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center text-success fw-bold">
        Planes Disponibles
      </h2>
      <Row xs={1} sm={2} md={3} className="g-4">
        {planes.map(
          ({ _id, nombre, descripcion, precio, servicios, imagen }) => (
            <Col key={_id}>
              <Card className="shadow-sm h-100 border-success">
                {imagen && (
                  <Card.Img
                    variant="top"
                    src={imagen}
                    alt={nombre}
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                )}
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-success fw-bold fs-4 mb-2">
                    {nombre}
                  </Card.Title>
                  <Card.Text className="text-secondary mb-3">
                    {descripcion.length > 100
                      ? descripcion.slice(0, 100) + "..."
                      : descripcion}
                  </Card.Text>
                  <ul className="list-unstyled mb-3 text-muted">
                    {servicios.slice(0, 2).map((servicio, i) => (
                      <li key={i}>&#10003; {servicio}</li>
                    ))}
                    {servicios.length > 2 && <li>...</li>}
                  </ul>
                  <h5 className="text-success mb-3">Precio: ${precio}</h5>
                  <Link
                    to={`/contratar-plan/${_id}`}
                    className="btn btn-success mt-auto"
                  >
                    Ver Más
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          )
        )}
      </Row>
    </Container>
  );
};

export default Planes;
