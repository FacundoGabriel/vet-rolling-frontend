import { useEffect, useState } from "react";
import TablaProductos from "../components/tablaproductos/TablaProductos";
import clientAxios, { configHeaders } from "../helpers/axios.helpers";

const Carrito = () => {
  const [productos, setProductos] = useState([]);

  const obtenerProductoDelCarrito = async () => {
    const res = await clientAxios.get(
      "/carritos/obtenerProductos",
      configHeaders
    );
    setProductos(res.data.productos);
  };

  useEffect(() => {
    obtenerProductoDelCarrito();
  }, []);

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
