import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";
import clientAxios, {
  configHeaders,
  configHeadersImage,
} from "../helpers/axios.helpers";
import Swal from "sweetalert2";

const AniadirMascota = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    especie: "",
    raza: "",
    sexo: "",
    peso: "",
    fechaNacimiento: "",
    foto: "url",
  });

  const [nuevaImagenMascota, setNuevaImagenMascota] = useState(null);
  const [errores, setErrores] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrores((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!formData.nombre) nuevosErrores.nombre = "El nombre es obligatorio";
    if (!formData.especie) nuevosErrores.especie = "La especie es obligatoria";
    if (!formData.raza) nuevosErrores.raza = "La raza es obligatoria";
    if (!formData.sexo) nuevosErrores.sexo = "El sexo es obligatorio";
    if (!formData.peso || isNaN(formData.peso) || formData.peso <= 0)
      nuevosErrores.peso = "El peso debe ser un número positivo";
    if (!formData.fechaNacimiento)
      nuevosErrores.fechaNacimiento = "La fecha de nacimiento es obligatoria";

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    try {
      const res = await clientAxios.post(
        "/mascotas/aniadirMascota",
        formData,
        configHeaders
      );

      if (res.status === 200) {
        if (nuevaImagenMascota) {
          const imagenFormData = new FormData();
          imagenFormData.append("foto", nuevaImagenMascota);

          await clientAxios.put(
            `/mascotas/agregarImagen/${res.data.idMascota}`,
            imagenFormData,
            configHeadersImage
          );
        }

        setSuccessMsg("Mascota añadida correctamente!");
        setFormData({
          nombre: "",
          especie: "",
          raza: "",
          sexo: "",
          peso: "",
          fechaNacimiento: "",
          foto: "url",
        });
        setNuevaImagenMascota(null);

        Swal.fire({
          icon: "success",
          title: res.data.msg || "Mascota añadida con éxito",
          confirmButtonColor: "#28a745",
        });

        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.error("Error al añadir mascota:", error);
      setSuccessMsg("");
    }
  };

  return (
    <Container className="my-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Añadir Mascota</h2>

      {successMsg && <Alert variant="success">{successMsg}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            isInvalid={!!errores.nombre}
          />
          <Form.Control.Feedback type="invalid">
            {errores.nombre}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Especie</Form.Label>
          <Form.Control
            type="text"
            name="especie"
            value={formData.especie}
            onChange={handleChange}
            isInvalid={!!errores.especie}
            placeholder="Ej: perro, gato"
          />
          <Form.Control.Feedback type="invalid">
            {errores.especie}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Raza</Form.Label>
          <Form.Control
            type="text"
            name="raza"
            value={formData.raza}
            onChange={handleChange}
            isInvalid={!!errores.raza}
          />
          <Form.Control.Feedback type="invalid">
            {errores.raza}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Sexo</Form.Label>
          <Form.Select
            name="sexo"
            value={formData.sexo}
            onChange={handleChange}
            isInvalid={!!errores.sexo}
          >
            <option value="">-- Seleccioná el sexo --</option>
            <option value="hembra">Hembra</option>
            <option value="macho">Macho</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errores.sexo}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Peso (kg)</Form.Label>
          <Form.Control
            type="number"
            name="peso"
            value={formData.peso}
            onChange={handleChange}
            isInvalid={!!errores.peso}
            min="0"
            step="0.1"
          />
          <Form.Control.Feedback type="invalid">
            {errores.peso}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Fecha de Nacimiento</Form.Label>
          <Form.Control
            type="date"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            isInvalid={!!errores.fechaNacimiento}
          />
          <Form.Control.Feedback type="invalid">
            {errores.fechaNacimiento}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Foto de la mascota</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const ext = file.name.split(".").pop().toLowerCase();
                if (!["jpg", "jpeg", "png"].includes(ext)) {
                  Swal.fire({
                    icon: "error",
                    title: "Formato no válido",
                    text: "Solo se permiten imágenes JPG, JPEG o PNG",
                  });
                  e.target.value = null;
                  return;
                }
                setNuevaImagenMascota(file);
              }
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Añadir Mascota
        </Button>
      </Form>
    </Container>
  );
};

export default AniadirMascota;
