import { useEffect, useState } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import clientAxios, { configHeaders } from "../../helpers/axios.helpers";
import Swal from "sweetalert2";
import {
  FiInfo,
  FiDollarSign,
  FiXCircle,
  FiCheckCircle,
  FiPackage,
  FiTag,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ModalProducto = ({ id, show, handleClose }) => {
  const usuarioLogeado = JSON.parse(sessionStorage.getItem("token")) || null;
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const agregarProducotoCarrito = async () => {
    try {
      if (!usuarioLogeado) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Debes iniciar sesion para agregar al carrito!",
        });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
        return;
      }
      const res = await clientAxios.put(
        `/carritos/agregarProducto/${id}`,
        {},
        configHeaders
      );
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: res.data.msg,
          confirmButtonColor: "#28a745",
        });
      }
    } catch (error) {
      if (error.status === 400) {
        Swal.fire({
          icon: "info",
          title: error.response?.data?.msg,
          confirmButtonColor: "#28a745",
        });
      }
    }
  };

  const obtenerProducto = async () => {
    try {
      const res = await clientAxios.get(`/productos/${id}`);
      setProducto(res.data.producto);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id && show) {
      obtenerProducto();
    }
  }, [id, show]);

  if (!producto) return null;

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <div className="d-flex justify-content-between align-items-center w-100">
          <h5 className="fw-bold mb-0" style={{ color: "#00466E" }}>
            {producto.nombre}
          </h5>
        </div>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#F1F4F8" }}>
        <Row className="mb-4">
          <Col md={5} className="text-center">
            {producto.imagen !== "url" ? (
              <img
                src={producto.imagen}
                alt="Producto"
                style={{
                  maxWidth: "100%",
                  maxHeight: "250px",
                  objectFit: "contain",
                  borderRadius: "8px",
                }}
              />
            ) : (
              <div className="text-muted">
                <FiPackage size={80} />
                <p>Sin imagen</p>
              </div>
            )}
          </Col>
          <Col md={7}>
            <p>
              {producto.estado === "disponible" ? (
                <FiCheckCircle className="me-2" />
              ) : (
                <FiXCircle className="me-2" />
              )}
              <span style={{ fontWeight: "bold", color: "#00466E" }}>
                Estado
              </span>
              :{" "}
              <span
                style={{
                  color:
                    producto.estado === "disponible" ? "#28a745" : "#dc3545",
                }}
              >
                {producto.estado === "disponible"
                  ? "Disponible"
                  : "Deshabilitado"}
              </span>
            </p>
            <p>
              <FiDollarSign className="me-2" style={{ color: "#F16716" }} />
              <span style={{ fontWeight: "bold", color: "#00466E" }}>
                Precio
              </span>
              :{" "}
              <span style={{ color: "#000000" }}>
                ${producto.precio}{" "}
                <span
                  style={{
                    textDecoration: "line-through",
                    color: "#adb5bd",
                    fontSize: "0.9rem",
                  }}
                >
                  ${producto.precio + 1000}
                </span>
              </span>
            </p>
          </Col>
        </Row>
        <div
          className="p-3 rounded shadow-sm"
          style={{ backgroundColor: "#FFFFFF", border: "1px solid #F16716" }}
        >
          <h6 className="fw-bold mb-2" style={{ color: "#F16716" }}>
            <FiInfo className="me-2" /> Descripción
          </h6>
          <p style={{ color: "#000000" }}>{producto.descripcion}</p>
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
        <Button variant="primary" onClick={() => agregarProducotoCarrito()}>
          Agregar al Carrito
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalProducto;
