import { useEffect, useState } from "react";
import clientAxios from "../../helpers/axios.helpers";
import { Container, Card, Badge, Button, Row, Col } from "react-bootstrap";
import { FaBoxOpen } from "react-icons/fa";
import ModalProducto from "../modalProductos/ModalProductos";

const CardProductos = () => {
  const [productos, setProductos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [idProductoSeleccionado, setIdProductoSeleccionado] = useState(null);

  const obtenerProductos = async () => {
    try {
      const res = await clientAxios.get("/productos");
      setProductos(res.data.productos);
    } catch (error) {
      console.error(error);
    }
  };

  const mostrarModal = (id) => {
    setIdProductoSeleccionado(id);
    setModalVisible(true);
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  console.log(productos);

  return (
    <Container>
      <h2 className="mb-4 text-center text-primary fw-bold fs-1">
        Nuestros Productos
      </h2>
      <p className="my-2 fw-light text-center fs-4">
        Encuentra todo lo que necesitas para el cuidado y bienestar de tu
        mascota
      </p>

      <Row>
        {productos.map((producto) => (
          <Col key={producto._id} xs={12} sm={6} md={4} lg={3}>
            <Card
              style={{
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                height: "100%",
              }}
              className="p-3 m-2"
            >
              <div
                style={{
                  backgroundColor: "#f2f4f8",
                  height: "160px",
                  borderRadius: "8px",
                }}
                className="d-flex align-items-center justify-content-center"
              >
                {producto.imagen !== "url" ? (
                  <img
                    src={producto.imagen}
                    alt="Producto"
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <div className="text-center text-muted">
                    <FaBoxOpen size={60} />
                    <div>Sin imagen</div>
                  </div>
                )}
              </div>
              <Card.Body className="d-flex flex-column justify-content-between">
                <div className="d-flex justify-content-between mb-2">
                  <Badge
                    bg={
                      producto.estado === "deshabilitado" ? "danger" : "success"
                    }
                    style={{ borderRadius: "20px", fontSize: "0.75rem" }}
                  >
                    {producto.estado === "deshabilitado"
                      ? "X Deshabilitado"
                      : "✓ Disponible"}
                  </Badge>
                  <Badge
                    bg="secondary"
                    style={{ borderRadius: "20px", fontSize: "0.75rem" }}
                  >
                    Alimentación
                  </Badge>
                </div>
                <Card.Title style={{ fontSize: "1rem", fontWeight: "600" }}>
                  {producto.nombre}
                </Card.Title>
                <Card.Text style={{ fontSize: "0.85rem", color: "#6c757d" }}>
                  {producto.descripcion}
                </Card.Text>
                <div className="mb-3">
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.25rem",
                      color: "#007bff",
                    }}
                  >
                    ${producto.precio}
                  </span>{" "}
                  <span
                    style={{
                      textDecoration: "line-through",
                      color: "#adb5bd",
                      fontSize: "0.9rem",
                    }}
                  >
                    ${producto.precio + 1000}
                  </span>
                </div>
                <Button
                  variant="outline-primary"
                  className="w-100"
                  onClick={() => mostrarModal(producto._id)}
                >
                  Ver Producto
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {modalVisible && (
        <ModalProducto
          id={idProductoSeleccionado}
          show={modalVisible}
          handleClose={() => setModalVisible(false)}
        />
      )}
    </Container>
  );
};

export default CardProductos;
