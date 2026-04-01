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
    foto: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
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

    const soloLetrasYEspacios = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const razaRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s'-]+$/;

    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio";
    } else if (formData.nombre.length < 3) {
      nuevosErrores.nombre = "Debe tener al menos 3 caracteres";
    } else if (formData.nombre.length > 20) {
      nuevosErrores.nombre = "No puede superar los 20 caracteres";
    } else if (!soloLetrasYEspacios.test(formData.nombre)) {
      nuevosErrores.nombre = "Solo se permiten letras y espacios";
    }

    const especie = formData.especie?.toLowerCase();
    if (!especie) {
      nuevosErrores.especie = "La especie es obligatoria";
    } else if (!["perro", "gato"].includes(especie)) {
      nuevosErrores.especie = "Solo se permite 'perro' o 'gato'";
    }

    if (!formData.raza.trim()) {
      nuevosErrores.raza = "La raza es obligatoria";
    } else if (formData.raza.length < 2) {
      nuevosErrores.raza = "Debe tener al menos 2 caracteres";
    } else if (formData.raza.length > 30) {
      nuevosErrores.raza = "No puede superar los 30 caracteres";
    } else if (!razaRegex.test(formData.raza)) {
      nuevosErrores.raza =
        "Solo se permiten letras, espacios, guiones y apóstrofes";
    }

    const sexo = formData.sexo?.toLowerCase();
    if (!sexo) {
      nuevosErrores.sexo = "El sexo es obligatorio";
    } else if (!["macho", "hembra"].includes(sexo)) {
      nuevosErrores.sexo = "Debe ser 'macho' o 'hembra'";
    }

    const peso = Number(formData.peso);
    if (!formData.peso || isNaN(peso)) {
      nuevosErrores.peso = "El peso es obligatorio y debe ser un número";
    } else if (peso <= 0) {
      nuevosErrores.peso = "Debe ser un número mayor que 0";
    } else if (especie === "gato" && peso > 15) {
      nuevosErrores.peso = "El peso de un gato no puede superar los 15 kg";
    } else if (especie === "perro" && peso > 100) {
      nuevosErrores.peso = "El peso de un perro no puede superar los 100 kg";
    }

    if (!formData.fechaNacimiento) {
      nuevosErrores.fechaNacimiento = "La fecha de nacimiento es obligatoria";
    } else {
      const hoy = new Date();
      const fechaIngresada = new Date(formData.fechaNacimiento);
      if (fechaIngresada > hoy) {
        nuevosErrores.fechaNacimiento =
          "No se puede seleccionar una fecha futura";
      }
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    try {
      const payload = {
        ...formData,
        nombre: formData.nombre.trim().toLowerCase(),
        especie: formData.especie.toLowerCase(),
        sexo: formData.sexo.toLowerCase(),
      };

      const res = await clientAxios.post("/mascotas", payload, configHeaders);

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
          foto: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
        });
        setNuevaImagenMascota(null);

        Swal.fire({
          icon: "success",
          title: res.data.msg || "Mascota añadida con éxito",
          confirmButtonColor: "#28a745",
        });

        setTimeout(() => {
          navigate("/user/mis-mascotas");
        }, 1000);
      }
    } catch (error) {
      if (error.response?.status === 409) {
        Swal.fire({
          icon: "error",
          title: "No puedes tener dos mascotas con el mismo nombre.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error de servidor",
          text: "Hubo un problema al conectar con el servidor.",
        });
      }
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
          <Form.Select
            name="especie"
            value={formData.especie}
            onChange={handleChange}
            isInvalid={!!errores.especie}
          >
            <option value="">-- Seleccioná la especie --</option>
            <option value="perro">Perro</option>
            <option value="gato">Gato</option>
          </Form.Select>
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
            max={new Date().toISOString().split("T")[0]}
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
