import { Button, Container, Table } from "react-bootstrap";
import "./TablaProductos.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clientAxios, { configHeaders } from "../../helpers/axios.helpers";
import Swal from "sweetalert2";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

const TablaProductos = ({ idPage, array, obtenerProductoDelCarrito }) => {
  const [cantidades, setCantidades] = useState({});
  const [preferenceId, setPreferenceId] = useState(null);

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

  useEffect(() => {
    initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY);
  }, []);

  const pagarCarritoMp = async () => {
    try {
      const res = await clientAxios.post("/mercadopago/pagoMercadoPagoCarrito");
      setPreferenceId(res.data.responseMp.id);
      await clientAxios.put("/carritos/vaciarCarrito", {}, configHeaders);
      obtenerProductoDelCarrito();
    } catch (error) {
      console.error(error);
    }
  };

  const totalCarrito = array.reduce((acum, producto) => {
    const cantidad = cantidades[producto._id] || 1;
    return acum + producto.precio * cantidad;
  }, 0);

  return (
    <>
      {array?.length && idPage === "productos" ? (
        <Container fluid className="p-5 table-responsive">
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
            <h4 className="py-3">Total a pagar: ${totalCarrito.toFixed(2)}</h4>
            <Container className="w-25">
              <Button onClick={pagarCarritoMp}>Pagar carrito</Button>
              {preferenceId && (
                <Wallet
                  initialization={{ preferenceId, redirectMode: "modal" }}
                  customization={{ texts: { valueProp: "smart_option" } }}
                />
              )}
            </Container>
          </Container>
        </Container>
      ) : (
        <h2 className="text-center my-5 titulo-carrito">
          No hay productos en tu carrito
        </h2>
      )}
    </>
  );
};

export default TablaProductos;
