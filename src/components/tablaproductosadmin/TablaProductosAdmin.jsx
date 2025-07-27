import React, { useEffect, useState } from "react";
import {
  Table,
  Container,
  Spinner,
  Image,
  Button,
  Badge,
  Modal,
  Form,
} from "react-bootstrap";
import clientAxios, {
  configHeaders,
  configHeadersImage,
} from "../../helpers/axios.helpers";
import Swal from "sweetalert2";

const TablaProductosAdmin = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [loadingCrear, setLoadingCrear] = useState(false);
  const [loadingEditar, setLoadingEditar] = useState(false);
  const [idEditando, setIdEditando] = useState(null);
  const [archivoFoto, setArchivoFoto] = useState(null);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    imagen: "",
    estado: "habilitado",
  });
  const [errores, setErrores] = useState({});

  const obtenerProductos = async () => {
    try {
      const res = await clientAxios.get(`/productos`, configHeaders);
      setProductos(res.data.productos);
    } catch (error) {
      console.error("Error al cargar los productos:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const handleCambio = (e) => {
    const { name, value, type, checked } = e.target;
    setNuevoProducto({
      ...nuevoProducto,
      [name]:
        name === "estado" ? (checked ? "habilitado" : "deshabilitado") : value,
    });
  };

  const limpiarFormularioProducto = () => {
    setNuevoProducto({
      nombre: "",
      descripcion: "",
      precio: "",
      imagen: "",
      estado: "habilitado",
    });
    setArchivoFoto(null);
    setErrores({});
  };

  const validarProducto = () => {
    const err = {};

    if (!nuevoProducto.nombre.trim()) {
      err.nombre = "El nombre es obligatorio";
    } else if (nuevoProducto.nombre.length < 5) {
      err.nombre = "Debe tener al menos 5 caracteres";
    } else if (nuevoProducto.nombre.length > 50) {
      err.nombre = "No puede superar los 50 caracteres";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s]+$/.test(nuevoProducto.nombre)) {
      err.nombre = "El nombre solo puede contener letras, números y espacios";
    }

    if (!nuevoProducto.descripcion.trim()) {
      err.descripcion = "La descripción es obligatoria";
    } else if (nuevoProducto.descripcion.length < 10) {
      err.descripcion = "Debe tener al menos 10 caracteres";
    } else if (nuevoProducto.descripcion.length > 500) {
      err.descripcion = "No puede superar los 500 caracteres";
    }

    if (!nuevoProducto.precio || isNaN(nuevoProducto.precio)) {
      err.precio = "El precio es obligatorio y debe ser un número válido";
    } else if (Number(nuevoProducto.precio) <= 0) {
      err.precio = "Debe ser un número positivo";
    }

    setErrores(err);
    return Object.keys(err).length === 0;
  };

  const handleGuardar = async () => {
    if (!validarProducto()) return;
    setLoadingCrear(true);
    try {
      const res = await clientAxios.post(
        `/productos`,
        nuevoProducto,
        configHeaders
      );
      Swal.fire("¡Producto creado!", "", "success");
      setMostrarModal(false);
      limpiarFormularioProducto();

      if (archivoFoto) {
        const formData = new FormData();
        formData.append("imagen", archivoFoto);
        await clientAxios.put(
          `/productos/agregarImagen/${res.data.idProducto}`,
          formData,
          configHeadersImage
        );
      }
      obtenerProductos();
    } catch (error) {
      console.error("Error al crear el producto:", error);
      Swal.fire("Error al crear el producto", "", "error");
    } finally {
      setLoadingCrear(false);
    }
  };

  const handleGuardarCambios = async (idProducto) => {
    if (!validarProducto()) return;
    setLoadingEditar(true);
    try {
      await clientAxios.put(
        `/productos/${idProducto}`,
        nuevoProducto,
        configHeaders
      );
      Swal.fire("¡Producto actualizado!", "", "success");
      setMostrarModalEditar(false);
      limpiarFormularioProducto();

      if (archivoFoto) {
        const formData = new FormData();
        formData.append("imagen", archivoFoto);
        await clientAxios.put(
          `/productos/agregarImagen/${idProducto}`,
          formData,
          configHeadersImage
        );
      }
      obtenerProductos();
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    } finally {
      setLoadingEditar(false);
    }
  };

  const eliminarProducto = async (idProducto) => {
    const confirmacion = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el producto.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No",
    });
    if (confirmacion.isConfirmed) {
      try {
        await clientAxios.delete(`/productos/${idProducto}`, configHeaders);
        Swal.fire("¡Producto eliminado!", "", "success");
        obtenerProductos();
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
      }
    }
  };

  const renderCamposFormulario = () => (
    <>
      <Form.Group className="mb-2">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          name="nombre"
          value={nuevoProducto.nombre}
          onChange={handleCambio}
          isInvalid={!!errores.nombre}
        />
        <Form.Control.Feedback type="invalid">
          {errores.nombre}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          as="textarea"
          name="descripcion"
          value={nuevoProducto.descripcion}
          onChange={handleCambio}
          isInvalid={!!errores.descripcion}
        />
        <Form.Control.Feedback type="invalid">
          {errores.descripcion}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Precio</Form.Label>
        <Form.Control
          type="number"
          name="precio"
          value={nuevoProducto.precio}
          onChange={handleCambio}
          isInvalid={!!errores.precio}
        />
        <Form.Control.Feedback type="invalid">
          {errores.precio}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Subir imagen</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            const ext = file?.name.split(".").pop().toLowerCase();
            if (["jpg", "jpeg", "png"].includes(ext)) {
              setArchivoFoto(file);
            } else {
              Swal.fire({
                icon: "error",
                title: "Formato de imagen inválido",
                text: "Solo se permiten imágenes JPG, JPEG o PNG.",
              });
              setArchivoFoto(null);
              e.target.value = null;
            }
          }}
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Check
          type="checkbox"
          label="Disponible"
          name="estado"
          checked={nuevoProducto.estado === "habilitado"}
          onChange={handleCambio}
        />
      </Form.Group>
    </>
  );

  return (
    <Container className="my-5">
      <h2 className="mb-4">Administrar Productos</h2>
      {cargando ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "200px" }}
        >
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <Table
            striped
            bordered
            hover
            responsive
            className="align-middle text-center"
          >
            <thead className="table-success">
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Disponible</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto._id}>
                  <td>
                    <Image
                      src={producto.imagen}
                      rounded
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td>{producto.nombre}</td>
                  <td>{producto.descripcion}</td>
                  <td>${producto.precio?.toFixed(2)}</td>
                  <td>
                    <Badge
                      bg={
                        producto.estado === "habilitado"
                          ? "success"
                          : "secondary"
                      }
                    >
                      {producto.estado === "habilitado" ? "Sí" : "No"}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => {
                        setIdEditando(producto._id);
                        setNuevoProducto({
                          nombre: producto.nombre,
                          descripcion: producto.descripcion,
                          precio: producto.precio,
                          imagen: producto.imagen,
                          estado: producto.estado,
                        });
                        setErrores({});
                        setMostrarModalEditar(true);
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => eliminarProducto(producto._id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-end mt-3">
            <Button
              variant="primary"
              onClick={() => {
                limpiarFormularioProducto();
                setMostrarModal(true);
              }}
            >
              + Añadir Producto
            </Button>
          </div>
        </>
      )}

      <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>{renderCamposFormulario()}</Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostrarModal(false)}>
            Cancelar
          </Button>

          <Button
            variant="primary"
            onClick={handleGuardar}
            disabled={loadingCrear}
          >
            {loadingCrear ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Guardando...
              </>
            ) : (
              "Guardar Producto"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={mostrarModalEditar}
        onHide={() => setMostrarModalEditar(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>{renderCamposFormulario()}</Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setMostrarModalEditar(false)}
          >
            Cancelar
          </Button>

          <Button
            variant="primary"
            onClick={() => handleGuardarCambios(idEditando)}
            disabled={loadingEditar}
          >
            {loadingEditar ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Guardando...
              </>
            ) : (
              "Guardar Producto"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TablaProductosAdmin;
