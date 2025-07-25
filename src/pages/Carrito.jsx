import { useEffect, useState } from "react";
import TablaProductos from "../components/tablaproductos/TablaProductos";
import clientAxios, { configHeaders } from "../helpers/axios.helpers";
import { useLocation } from "react-router-dom";

const Carrito = () => {
  const [productos, setProductos] = useState([]);
  const location = useLocation();

  const obtenerProductoDelCarrito = async () => {
    const res = await clientAxios.get(
      "/carritos/obtenerProductos",
      configHeaders
    );
    setProductos(res.data.productos);
    console.log("Productos después de vaciar:", res.data.productos);
  };

  useEffect(() => {
    const procesarPago = async () => {
      const query = new URLSearchParams(location.search);

      if (query.has("success")) {
        console.log("Detecté ?success en URL, voy a vaciar carrito");
        try {
          await clientAxios.put("/carritos/vaciarCarrito", {}, configHeaders);
          console.log("Carrito vaciado con éxito, vuelvo a cargar productos");
          await obtenerProductoDelCarrito();
        } catch (err) {
          console.error("Error al vaciar carrito:", err);
        }
      } else {
        // Si no hay success, solo obtenemos los productos normalmente
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
