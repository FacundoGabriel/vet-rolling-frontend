import { useEffect, useState } from "react";
import TablaProductos from "../components/tablaproductos/TablaProductos";
import clientAxios, { configHeaders } from "../helpers/axios.helpers";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const Carrito = () => {
  const [productos, setProductos] = useState([]);
  const location = useLocation();

  const obtenerProductoDelCarrito = async () => {
    const res = await clientAxios.get("/carritos", configHeaders);
    setProductos(res.data.productos);
  };

  useEffect(() => {
    const procesarPago = async () => {
      const query = new URLSearchParams(location.search);

      if (query.has("success")) {
        try {
          await clientAxios.put("/carritos/vaciarCarrito", {}, configHeaders);
          await obtenerProductoDelCarrito();
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Ocurrió un error",
            text: error.message || "Algo salió mal",
          });
        }
      } else {
        await obtenerProductoDelCarrito();
      }
    };

    procesarPago();
  }, [location.search]);

  return (
    <div>
      <TablaProductos
        idPage="productos"
        array={productos}
        obtenerProductoDelCarrito={obtenerProductoDelCarrito}
      />
    </div>
  );
};

export default Carrito;
