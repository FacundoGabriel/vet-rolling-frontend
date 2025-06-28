import { Eye, EyeOff, UserCircle } from "lucide-react";
import "./RegistroUsuario.css";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import clientAxios, { configHeadersImage } from "../../helpers/axios.helpers";

export const RegistroVeterinario = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [archivoFoto, setArchivoFoto] = useState(null);
  const [previewFoto, setPreviewFoto] = useState(null);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const [form, setForm] = useState({
    username: "",
    email: "",
    telefono: "",
    password: "",
    confirmPassword: "",
    descripcion: "",
    especialidad: "",
    foto: "",
  });

  const manejarClick = (e) => {
    e.preventDefault();
    setTimeout(() => {
      navigate("/register");
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    if (!form.username.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El nombre de usuario es obligatorio",
      });
      return false;
    }

    if (!form.email.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El correo es obligatorio",
      });
      return false;
    }

    if (!form.descripcion.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "La descripcion es obligatoria",
      });
      return false;
    }

    if (!form.especialidad.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "La especialidad es obligatoria",
      });
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      Swal.fire({ icon: "error", title: "Error", text: "Correo inválido" });
      return false;
    }

    if (!form.telefono.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El teléfono es obligatorio",
      });
      return false;
    }

    if (!/^\d{8,15}$/.test(form.telefono)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Teléfono inválido. Debe tener entre 8 y 15 dígitos numéricos.",
      });
      return false;
    }

    if (!form.password) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "La contraseña es obligatoria",
      });
      return false;
    }

    if (form.password.length < 8) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debe tener al menos 8 caracteres",
      });
      return false;
    }

    if (!form.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Repetir contraseña es obligatorio",
      });
      return false;
    }

    if (form.confirmPassword !== form.password) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Las contraseñas no coinciden",
      });
      return false;
    }
    if (!archivoFoto) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debes seleccionar una imagen de perfil.",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const payload = {
        nombreUsuario: form.username,
        emailUsuario: form.email,
        telefono: form.telefono,
        contrasenia: form.password,
        repetirContrasenia: form.confirmPassword,
        descripcion: form.descripcion,
        especialidad: form.especialidad,
      };

      const res = await clientAxios.post("/veterinarios/registro", payload);

      const idUsuario = res.data.idUsuario;

      if (archivoFoto && idUsuario) {
        const formData = new FormData();
        formData.append("foto", archivoFoto);

        await clientAxios.put(
          `/usuarios/agregarImagen/${idUsuario}`,
          formData,
          configHeadersImage
        );
      }
      setLoading(false);

      if (!idUsuario) {
        Swal.fire({
          icon: "error",
          title: "Usuario ya registrado",
          text: "El usuario ya existe o el correo está en uso.",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Cuenta creada con éxito",
          text: res.data.msg,
          timer: 2500,
          showConfirmButton: false,
        });

        setForm({
          username: "",
          email: "",
          telefono: "",
          password: "",
          confirmPassword: "",
          descripcion: "",
          especialidad: "",
          foto: "",
        });
        setArchivoFoto(null);
        document.querySelector('input[type="file"]').value = null;
        setPreviewFoto(null);

        setTimeout(() => {
          navigate("/iniciar-sesion");
        }, 2500);
      }
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error de servidor",
        text: "Hubo un problema al conectar con el servidor.",
      });
    }
  };

  return (
    <>
      <div className="register-wrapper">
        <div className="container-xl container-all">
          <div className="card-info d-flex flex-column">
            <UserCircle className="avatar-icon" />
            <Card.Title className="card-title">Crear una cuenta</Card.Title>
            <Card.Text className="card-text">
              Ingresa tu información para comenzar
            </Card.Text>
          </div>

          <Form className="container-form" onSubmit={handleSubmit}>
            <Form.Group controlId="username" className="mb-3">
              <Form.Label className="label-form">Nombre de usuario</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="ejemplo123"
                value={form.username}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="email" className="mb-3">
              <Form.Label className="label-form">Correo</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="correo@correo.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="telefono" className="mb-3">
              <Form.Label className="label-form">Teléfono</Form.Label>
              <Form.Control
                type="tel"
                name="telefono"
                placeholder="Ej: 1122334455"
                value={form.telefono}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Escribe tu descripcion"
                name="descripcion"
                rows={3}
                value={form.descripcion}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="especialidad" className="mb-3">
              <Form.Label className="label-form">Especialidad</Form.Label>
              <Form.Control
                type="text"
                placeholder="Escribe tu especialidad"
                name="especialidad"
                value={form.especialidad}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label className="label-form">Contraseña</Form.Label>
              <div className="password-container">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="contraseña"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="password-toggle-btn"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </Form.Group>

            <Form.Group controlId="confirmPassword" className="mb-3">
              <Form.Label>Repetir Contraseña</Form.Label>
              <div className="password-container">
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="repetir contraseña"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="password-toggle-btn"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label>Seleccionar foto</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                required
                onChange={(e) => {
                  const file = e.target.files[0];
                  const ext = file?.name.split(".").pop().toLowerCase();
                  if (["jpg", "jpeg", "png"].includes(ext)) {
                    setArchivoFoto(file);
                    setPreviewFoto(URL.createObjectURL(file)); // Genera la vista previa
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: "Formato de imagen inválido",
                      text: "Solo se permiten imágenes JPG, JPEG o PNG.",
                    });
                    setArchivoFoto(null);
                    setPreviewFoto(null);
                    e.target.value = null;
                  }
                }}
              />
              {previewFoto && (
                <div className="mt-3 text-center">
                  <p className="mb-1">Vista previa:</p>
                  <img
                    src={previewFoto}
                    alt="Vista previa"
                    style={{ maxWidth: "200px", borderRadius: "8px" }}
                  />
                </div>
              )}
            </Form.Group>
            <p>
              ¿Eres Cliente?{" "}
              <a href="/register-veterinario" onClick={manejarClick}>
                ¡Regístrate aquí!
              </a>
            </p>

            <Button
              type="submit"
              className="w-100 btn-register"
              disabled={loading}
            >
              {loading ? (
                <Spinner animation="border" variant="light" size="sm" />
              ) : (
                "Registrarse"
              )}
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};
