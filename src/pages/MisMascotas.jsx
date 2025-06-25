import React, { useEffect, useState } from "react";
import { Card, Container, Spinner, Alert, Button, Form } from "react-bootstrap";
import clientAxios, {
  configHeaders,
  configHeadersImage,
} from "../helpers/axios.helpers";
import Swal from "sweetalert2";

const MisMascotas = () => {
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [nuevaImagen, setNuevaImagen] = useState(null);

  const obtenerMascotas = async () => {
    try {
      const res = await clientAxios.get(
        "/mascotas/tus-mascotas",
        configHeaders
      );
      setMascotas(res.data.mascotas || []);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar las mascotas.");
    } finally {
      setLoading(false);
    }
  };

  const eliminarMascotaPorId = async (idMascota) => {
    try {
      const res = await clientAxios.delete(
        `/mascotas/${idMascota}`,
        configHeaders
      );
      if (res.status === 200) {
        setMascotas((prev) => prev.filter((m) => m._id !== idMascota));
        Swal.fire({
          icon: "success",
          title: res.data.msg,
          confirmButtonColor: "#28a745",
        });
      }
    } catch (error) {
      console.error("Error al eliminar mascota:", error);
      Swal.fire({
        icon: "error",
        title: "No se pudo eliminar la mascota",
        confirmButtonColor: "#dc3545",
      });
    }
  };

  const cancelarPlan = async (idMascota) => {
    try {
      const res = await clientAxios.delete(
        `/planes/cancelarPlan/${idMascota}`,
        configHeaders
      );
      if (res.status === 200) {
        setMascotas((prev) =>
          prev.map((m) =>
            m._id === idMascota ? { ...m, plan: "Sin plan" } : m
          )
        );
        Swal.fire({
          icon: "success",
          title: res.data.msg,
          confirmButtonColor: "#28a745",
        });
      }
    } catch (error) {
      console.error("Error al cancelar el plan:", error);
      Swal.fire({
        icon: "error",
        title: "No se pudo cancelar el plan",
        confirmButtonColor: "#dc3545",
      });
    }
  };

  const handleEditar = (mascota) => {
    setEditandoId(mascota._id);
    setEditForm({ ...mascota });
    setNuevaImagen(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleImagenChange = (e) => {
    setNuevaImagen(e.target.files[0]);
  };

  const guardarCambios = async (id) => {
    try {
      const { nombre, especie, raza, sexo, peso, fechaNacimiento } = editForm;
      await clientAxios.put(
        `/mascotas/${id}`,
        { nombre, especie, raza, sexo, peso, fechaNacimiento },
        configHeaders
      );

      if (nuevaImagen) {
        const formData = new FormData();
        formData.append("foto", nuevaImagen);
        await clientAxios.put(
          `/mascotas/agregarImagen/${id}`,
          formData,
          configHeadersImage
        );
      }

      setEditandoId(null);
      obtenerMascotas();
    } catch (err) {
      console.error("Error al guardar cambios:", err);
    }
  };

  useEffect(() => {
    obtenerMascotas();
  }, []);

  if (loading)
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  if (error)
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );

  return (
    <Container className="my-5">
      <h2 className="mb-4">Mis Mascotas</h2>
      {mascotas.map((mascota) => (
        <Card
          key={mascota._id}
          className="mb-3 shadow-sm border-0"
          style={{ borderRadius: "12px" }}
        >
          <div className="d-flex">
            <div
              style={{
                width: "160px",
                height: "160px",
                overflow: "hidden",
                borderRadius: "12px 0 0 12px",
              }}
            >
              <Card.Img
                src={
                  editandoId === mascota._id && nuevaImagen
                    ? URL.createObjectURL(nuevaImagen)
                    : mascota.foto ||
                      "https://via.placeholder.com/160x160.png?text=Sin+Imagen"
                }
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <Card.Body
              className="d-flex flex-column justify-content-between"
              style={{ flex: 1 }}
            >
              {editandoId === mascota._id ? (
                <Form>
                  <Form.Group className="mb-2">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      name="nombre"
                      value={editForm.nombre}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Especie</Form.Label>
                    <Form.Control
                      name="especie"
                      value={editForm.especie}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Raza</Form.Label>
                    <Form.Control
                      name="raza"
                      value={editForm.raza}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Sexo</Form.Label>
                    <Form.Control
                      name="sexo"
                      value={editForm.sexo}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Peso</Form.Label>
                    <Form.Control
                      name="peso"
                      value={editForm.peso}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Fecha Nacimiento</Form.Label>
                    <Form.Control
                      name="fechaNacimiento"
                      type="date"
                      value={editForm.fechaNacimiento?.slice(0, 10)}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Imagen</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        const ext = file?.name.split(".").pop().toLowerCase();
                        if (["jpg", "jpeg", "png"].includes(ext)) {
                          setNuevaImagen(file);
                        } else {
                          Swal.fire({
                            icon: "error",
                            title: "Formato de imagen inválido",
                            text: "Solo se permiten imágenes JPG, JPEG o PNG.",
                          });
                          setNuevaImagen(null);
                          e.target.value = null;
                        }
                      }}
                    />
                  </Form.Group>
                </Form>
              ) : (
                <>
                  <Card.Title className="mb-1">{mascota.nombre}</Card.Title>
                  <Card.Text
                    className="mb-2 text-muted"
                    style={{ fontSize: "0.95rem" }}
                  >
                    <strong>Especie:</strong> {mascota.especie} <br />
                    <strong>Raza:</strong> {mascota.raza} <br />
                    <strong>Sexo:</strong> {mascota.sexo} <br />
                    <strong>Peso:</strong> {mascota.peso} kg <br />
                    <strong>Nacimiento:</strong>{" "}
                    {new Date(mascota.fechaNacimiento).toLocaleDateString()}{" "}
                    <br />
                    <strong>Plan:</strong> {mascota.plan}
                  </Card.Text>
                </>
              )}
              <div className="d-flex gap-2 flex-wrap">
                {editandoId === mascota._id ? (
                  <>
                    <Button
                      size="sm"
                      variant="success"
                      onClick={() => guardarCambios(mascota._id)}
                    >
                      Guardar
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setEditandoId(null)}
                    >
                      Cancelar
                    </Button>
                  </>
                ) : (
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() => handleEditar(mascota)}
                  >
                    Editar
                  </Button>
                )}
                {mascota.plan !== "Sin plan" ? (
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => {
                      Swal.fire({
                        icon: "error",
                        title:
                          "Primero debes cancelar el plan antes de eliminar la mascota!",
                        confirmButtonColor: "#dc3545",
                      });
                    }}
                  >
                    Eliminar
                  </Button>
                ) : (
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => eliminarMascotaPorId(mascota._id)}
                  >
                    Eliminar
                  </Button>
                )}
                {mascota.plan !== "Sin plan" && (
                  <Button
                    variant="outline-warning"
                    size="sm"
                    onClick={() => cancelarPlan(mascota._id)}
                  >
                    Cancelar Plan
                  </Button>
                )}
              </div>
            </Card.Body>
          </div>
        </Card>
      ))}
    </Container>
  );
};

export default MisMascotas;
