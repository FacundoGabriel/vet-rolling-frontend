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

const TablaServicios = () => {
  const [servicios, setServicios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [idEditando, setIdEditando] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [archivoFoto, setArchivoFoto] = useState(null);
  const [nuevoServicio, setNuevoServicio] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    duracion: "30 minutos",
    categoria: "Medicina",
    imagen: "",
    disponible: true,
  });
  const [errores, setErrores] = useState({});

  const validarServicio = () => {
    const err = {};

    if (!nuevoServicio.nombre.trim()) {
      err.nombre = "El nombre es obligatorio";
    } else if (nuevoServicio.nombre.length < 3) {
      err.nombre = "Debe tener al menos 3 caracteres";
    } else if (nuevoServicio.nombre.length > 50) {
      err.nombre = "No puede superar los 50 caracteres";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s]+$/.test(nuevoProducto.nombre)) {
      err.nombre = "El nombre solo puede contener letras, números y espacios";
    }

    if (!nuevoServicio.descripcion.trim()) {
      err.descripcion = "La descripción es obligatoria";
    } else if (nuevoServicio.descripcion.length < 10) {
      err.descripcion = "Debe tener al menos 10 caracteres";
    } else if (nuevoServicio.descripcion.length > 300) {
      err.descripcion = "No puede superar los 300 caracteres";
    }

    if (!nuevoServicio.precio || isNaN(nuevoServicio.precio)) {
      err.precio = "El precio es obligatorio y debe ser un número";
    } else if (Number(nuevoServicio.precio) <= 0) {
      err.precio = "Debe ser un número positivo";
    }

    if (!nuevoServicio.duracion.trim()) {
      err.duracion = "La duración es obligatoria";
    }

    setErrores(err);
    return Object.keys(err).length === 0;
  };

  const handleCambio = (e) => {
    const { name, value, type, checked } = e.target;
    setNuevoServicio({
      ...nuevoServicio,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const limpiarFormularioServicio = () => {
    setNuevoServicio({
      nombre: "",
      descripcion: "",
      precio: "",
      duracion: "30 minutos",
      categoria: "Medicina",
      imagen: "",
      disponible: true,
    });
    setArchivoFoto(null);
    setErrores({});
  };

  const obtenerServicios = async () => {
    try {
      const res = await clientAxios.get(`/servicios`, configHeaders);
      setServicios(res.data.servicios);
    } catch (error) {
      console.error("Error al cargar los servicios:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerServicios();
  }, []);

  const handleGuardar = async () => {
    if (!validarServicio()) return;
    setGuardando(true);
    try {
      const res = await clientAxios.post(
        `/servicios`,
        nuevoServicio,
        configHeaders
      );
      Swal.fire("¡Servicio creado!", "", "success");
      setMostrarModal(false);
      limpiarFormularioServicio();

      if (archivoFoto) {
        const formData = new FormData();
        formData.append("foto", archivoFoto);
        await clientAxios.put(
          `/servicios/agregarImagen/${res.data.idServicio}`,
          formData,
          configHeadersImage
        );
      }

      obtenerServicios();
    } catch (error) {
      console.error("Error al crear el servicio:", error);
      Swal.fire("Error al crear el servicio", "", "error");
    } finally {
      setGuardando(false);
    }
  };
  const handleGuardarCambios = async (idServicio) => {
    if (!validarServicio()) return;
    setGuardando(true);
    try {
      const res = await clientAxios.put(
        `/servicios/${idServicio}`,
        nuevoServicio,
        configHeaders
      );
      Swal.fire("¡Servicio actualizado!", "", "success");
      setMostrarModalEditar(false);
      limpiarFormularioServicio();

      if (archivoFoto) {
        const formData = new FormData();
        formData.append("foto", archivoFoto);
        await clientAxios.put(
          `/servicios/agregarImagen/${idServicio}`,
          formData,
          configHeadersImage
        );
      }

      obtenerServicios();
    } catch (error) {
      console.error("Error al actualizar el servicio:", error);
    } finally {
      setGuardando(false);
    }
  };

  const eliminarServicio = async (idServicio) => {
    const confirmacion = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminara el servicio.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No",
    });
    if (confirmacion.isConfirmed) {
      try {
        await clientAxios.delete(`/servicios/${idServicio}`, configHeaders);
        Swal.fire("¡Servicio eliminado!", "", "success");
        obtenerServicios();
      } catch (error) {
        console.error("Error al eliminar el servicio:", error);
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
          value={nuevoServicio.nombre}
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
          value={nuevoServicio.descripcion}
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
          value={nuevoServicio.precio}
          onChange={handleCambio}
          isInvalid={!!errores.precio}
        />
        <Form.Control.Feedback type="invalid">
          {errores.precio}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Duración</Form.Label>
        <Form.Control
          type="text"
          name="duracion"
          value={nuevoServicio.duracion}
          onChange={handleCambio}
          isInvalid={!!errores.duracion}
        />
        <Form.Control.Feedback type="invalid">
          {errores.duracion}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Categoría</Form.Label>
        <Form.Select
          name="categoria"
          value={nuevoServicio.categoria}
          onChange={handleCambio}
        >
          <option value="Medicina">Medicina</option>
          <option value="Estética">Estética</option>
          <option value="Estudios">Estudios</option>
          <option value="Guardería">Guardería</option>
          <option value="Vacunacion">Vacunación</option>
        </Form.Select>
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
          name="disponible"
          checked={nuevoServicio.disponible}
          onChange={handleCambio}
        />
      </Form.Group>
    </>
  );

  return (
    <Container className="my-5">
      <h2 className="mb-4">Administrar Servicios</h2>
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
            <thead className="table-primary">
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Duración</th>
                <th>Categoría</th>
                <th>Disponible</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {servicios.map((servicio) => (
                <tr key={servicio._id}>
                  <td>
                    <Image
                      src={servicio.imagen}
                      rounded
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td>{servicio.nombre}</td>
                  <td>{servicio.descripcion}</td>
                  <td>${servicio.precio.toFixed(2)}</td>
                  <td>{servicio.duracion}</td>
                  <td>
                    <Badge bg="info">{servicio.categoria}</Badge>
                  </td>
                  <td>
                    <Badge bg={servicio.disponible ? "success" : "secondary"}>
                      {servicio.disponible ? "Sí" : "No"}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => {
                        setIdEditando(servicio._id);
                        setNuevoServicio({
                          nombre: servicio.nombre,
                          descripcion: servicio.descripcion,
                          precio: servicio.precio,
                          duracion: servicio.duracion,
                          categoria: servicio.categoria,
                          imagen: servicio.imagen,
                          disponible: servicio.disponible,
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
                      onClick={() => eliminarServicio(servicio._id)}
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
                limpiarFormularioServicio();
                setMostrarModal(true);
              }}
            >
              + Añadir Servicio
            </Button>
          </div>
        </>
      )}

      <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Servicio</Modal.Title>
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
            disabled={guardando}
          >
            {guardando ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Guardando...
              </>
            ) : (
              "Guardar Servicio"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={mostrarModalEditar}
        onHide={() => {
          setMostrarModalEditar(false);
          limpiarFormularioServicio();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar Servicio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>{renderCamposFormulario()}</Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setMostrarModalEditar(false);
              limpiarFormularioServicio();
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={() => handleGuardarCambios(idEditando)}
            disabled={guardando}
          >
            {guardando ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Guardando...
              </>
            ) : (
              "Guardar Servicio"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TablaServicios;
