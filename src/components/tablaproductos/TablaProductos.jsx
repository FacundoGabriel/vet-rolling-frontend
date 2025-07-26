import { Alert, Button, Container, Spinner, Table } from "react-bootstrap";
import "./TablaProductos.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import clientAxios, { configHeaders } from "../../helpers/axios.helpers";
import Swal from "sweetalert2";

const TablaProductos = ({ idPage, array, obtenerProductoDelCarrito }) => {
  const [cantidades, setCantidades] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChangeQuantity = (id, value) => {
    const cantidadNumerica = Math.max(1, parseInt(value) || 1);
    setCantidades((prev) => ({
      ...prev,
      [id]: cantidadNumerica,
    }));
  };

  const borrarProducto = (idProducto) => {
    Swal.fire({
      title: "Deseas eliminar este producto de tu carrito?",
      text: "Puedes volver a añadirlo a tu carrito desde el Inicio",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Si, estoy seguro",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {
          const res = await clientAxios.put(
            `/carritos/eliminarProducto/${idProducto}`,
            {},
            configHeaders
          );
          if (res.status === 200) {
            Swal.fire({
              title: "Tu producto fue eliminado del carrito",
              icon: "success",
            });
          }
          obtenerProductoDelCarrito();
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  const pagarCarritoMp = async () => {
    try {
      setLoading(true);
      const res = await clientAxios.post("/mercadopago/pagoMercadoPagoCarrito");

      const { initPoint } = res.data;

      if (initPoint) {
        window.open(initPoint, "_blank");
      } else {
        Swal.fire("Error", "No se pudo iniciar el pago", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Ocurrió un problema al iniciar el pago", "error");
    } finally {
      setLoading(false);
    }
  };

  const totalCarrito = array.reduce((acum, producto) => {
    const cantidad = cantidades[producto._id] || 1;
    return acum + producto.precio * cantidad;
  }, 0);

  return (
    <Container fluid>
      {array?.length && idPage === "productos" ? (
        <Container fluid className="p-5 table-responsive">
          <h2 className="text-center titulo-carrito pb-2">Mi carrito</h2>
          <Table bordered hover className="text-center">
            <thead>
              <tr>
                <th className="d-none d-md-table-cell">ID</th>
                <th>Nombre</th>
                <th className="d-none d-md-table-cell">Descripción</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Total</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {array.map((producto, i) => (
                <tr key={producto._id} className="align-middle">
                  <td className="d-none d-md-table-cell">{i + 1}</td>
                  <td>{producto.nombre}</td>
                  <td className="d-none d-md-table-cell">
                    {producto.descripcion}
                  </td>
                  <td>${producto.precio}</td>
                  <td className="col-cantidad">
                    <input
                      type="number"
                      value={cantidades[producto._id] || 1}
                      onChange={(e) =>
                        handleChangeQuantity(producto._id, e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <p className="mb-0">
                      $
                      {(
                        (cantidades[producto._id] || 1) * producto.precio
                      ).toFixed(2)}
                    </p>
                  </td>
                  <td>
                    <Link
                      className="btn btn-danger"
                      onClick={() => borrarProducto(producto._id)}
                    >
                      Eliminar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Container className="text-center">
            <h4 className="py-3 total-pagar">
              Total a pagar: ${totalCarrito.toFixed(2)}
            </h4>
            <Container className="w-25">
              <Button onClick={pagarCarritoMp} disabled={loading}>
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />{" "}
                    Redirigiendo...
                  </>
                ) : (
                  "Pagar carrito"
                )}
              </Button>
            </Container>
          </Container>
        </Container>
      ) : (
        <Container fluid className="py-5">
          <h2 className="text-center pb-4">Mi carrito</h2>
          <Alert variant="info" className="text-center">
            No tenés productos en tu carrito.
          </Alert>
        </Container>
      )}
    </Container>
  );
};

export default TablaProductos;
