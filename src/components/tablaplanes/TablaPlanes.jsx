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

const opcionesNombres = ["Primeros pasos", "Madurando", "Adultos"];

const TablaPlanes = () => {
  const [planes, setPlanes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [idEditando, setIdEditando] = useState(null);
  const [archivoFoto, setArchivoFoto] = useState(null);

  const [nuevoPlan, setNuevoPlan] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    servicios: "",
    disponible: true,
    imagen: "",
  });

  const obtenerPlanes = async () => {
    try {
      const res = await clientAxios.get(`/planes`, configHeaders);
      setPlanes(res.data.planes || res.data);
    } catch (error) {
      console.error("Error al cargar los planes:", error);
      Swal.fire("Error", "No se pudieron cargar los planes", "error");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerPlanes();
  }, []);

  const handleCambio = (e) => {
    const { name, value, type, checked } = e.target;
    setNuevoPlan({
      ...nuevoPlan,
      [name]: name === "disponible" ? checked : value,
    });
  };

  const limpiarFormulario = () => {
    setNuevoPlan({
      nombre: "",
      descripcion: "",
      precio: "",
      servicios: "",
      disponible: true,
      imagen: "",
    });
    setArchivoFoto(null);
  };

  const handleGuardar = async () => {
    if (
      !nuevoPlan.nombre ||
      !nuevoPlan.descripcion ||
      !nuevoPlan.precio ||
      !nuevoPlan.servicios.trim()
    ) {
      return Swal.fire(
        "Error",
        "Por favor completa todos los campos obligatorios",
        "warning"
      );
    }

    try {
      const body = {
        ...nuevoPlan,
        precio: Number(nuevoPlan.precio),
        servicios: nuevoPlan.servicios
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s.length > 0),
      };

      const res = await clientAxios.post(
        `planes/crearPlan`,
        body,
        configHeaders
      );
      Swal.fire("¡Plan creado!", "", "success");
      setMostrarModal(false);
      limpiarFormulario();

      if (archivoFoto) {
        const formData = new FormData();
        formData.append("imagen", archivoFoto);

        await clientAxios.put(
          `planes/agregarImagen/${res.data.idPlan || res.data._id}`,
          formData,
          configHeadersImage
        );
      }
      obtenerPlanes();
    } catch (error) {
      console.error("Error al crear el plan:", error);
      Swal.fire("Error al crear el plan", "", "error");
    }
  };

  const handleGuardarCambios = async (idPlan) => {
    if (
      !nuevoPlan.nombre ||
      !nuevoPlan.descripcion ||
      !nuevoPlan.precio ||
      !nuevoPlan.servicios.trim()
    ) {
      return Swal.fire(
        "Error",
        "Por favor completa todos los campos obligatorios",
        "warning"
      );
    }
    try {
      const body = {
        ...nuevoPlan,
        precio: Number(nuevoPlan.precio),
        servicios: nuevoPlan.servicios
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s.length > 0),
      };

      await clientAxios.put(`planes/editarPlan/${idPlan}`, body, configHeaders);
      Swal.fire("¡Plan actualizado!", "", "success");
      setMostrarModalEditar(false);
      limpiarFormulario();

      if (archivoFoto) {
        const formData = new FormData();
        formData.append("imagen", archivoFoto);

        await clientAxios.put(
          `planes/agregarImagen/${idPlan}`,
          formData,
          configHeadersImage
        );
      }
      obtenerPlanes();
    } catch (error) {
      console.error("Error al actualizar el plan:", error);
      Swal.fire("Error al actualizar el plan", "", "error");
    }
  };

  const eliminarPlan = async (idPlan) => {
    const confirmacion = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el plan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No",
    });

    if (confirmacion.isConfirmed) {
      try {
        await clientAxios.delete(
          `planes/eliminarPlan/${idPlan}`,
          configHeaders
        );
        Swal.fire("¡Plan eliminado!", "", "success");
        obtenerPlanes();
      } catch (error) {
        console.error("Error al eliminar el plan:", error);
        Swal.fire("Error al eliminar el plan", "", "error");
      }
    }
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4">Administrar Planes</h2>
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
                <th>Servicios</th>
                <th>Disponible</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {planes.map((plan) => (
                <tr key={plan._id}>
                  <td>
                    <Image
                      src={plan.imagen}
                      rounded
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td>{plan.nombre}</td>
                  <td>{plan.descripcion}</td>
                  <td>${plan.precio?.toFixed(2)}</td>
                  <td>{plan.servicios?.join(", ")}</td>
                  <td>
                    <Badge bg={plan.disponible ? "success" : "secondary"}>
                      {plan.disponible ? "Sí" : "No"}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => {
                        setIdEditando(plan._id);
                        setNuevoPlan({
                          nombre: plan.nombre,
                          descripcion: plan.descripcion,
                          precio: plan.precio,
                          servicios: plan.servicios?.join(", ") || "",
                          disponible: plan.disponible,
                          imagen: plan.imagen,
                        });
                        setMostrarModalEditar(true);
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => eliminarPlan(plan._id)}
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
                limpiarFormulario();
                setMostrarModal(true);
              }}
            >
              + Añadir Plan
            </Button>
          </div>
        </>
      )}

      <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Nombre</Form.Label>
              <Form.Select
                name="nombre"
                value={nuevoPlan.nombre}
                onChange={handleCambio}
              >
                <option value="">Selecciona un nombre</option>
                {opcionesNombres.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                name="descripcion"
                value={nuevoPlan.descripcion}
                onChange={handleCambio}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="precio"
                value={nuevoPlan.precio}
                onChange={handleCambio}
                min={0}
                step="0.01"
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Servicios (separados por coma)</Form.Label>
              <Form.Control
                as="textarea"
                name="servicios"
                value={nuevoPlan.servicios}
                onChange={handleCambio}
                placeholder="Ej: servicio1, servicio2, servicio3"
              />
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
                checked={nuevoPlan.disponible}
                onChange={handleCambio}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostrarModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleGuardar}>
            Guardar Plan
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={mostrarModalEditar}
        onHide={() => setMostrarModalEditar(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Nombre</Form.Label>
              <Form.Select
                name="nombre"
                value={nuevoPlan.nombre}
                onChange={handleCambio}
              >
                <option value="">Selecciona un nombre</option>
                {opcionesNombres.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                name="descripcion"
                value={nuevoPlan.descripcion}
                onChange={handleCambio}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="precio"
                value={nuevoPlan.precio}
                onChange={handleCambio}
                min={0}
                step="0.01"
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Servicios (separados por coma)</Form.Label>
              <Form.Control
                as="textarea"
                name="servicios"
                value={nuevoPlan.servicios}
                onChange={handleCambio}
                placeholder="Ej: servicio1, servicio2, servicio3"
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Cambiar imagen</Form.Label>
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
                checked={nuevoPlan.disponible}
                onChange={handleCambio}
              />
            </Form.Group>
          </Form>
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
          >
            Guardar Plan
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TablaPlanes;
