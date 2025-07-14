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

  const [form, setForm] = useState({
    username: "",
    email: "",
    telefono: "",
    password: "",
    confirmPassword: "",
    descripcion: "",
    especialidad: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const manejarClick = (e) => {
    e.preventDefault();
    setTimeout(() => {
      navigate("/register");
    }, 1000);
  };

  const validarCampo = (name, value) => {
    let error = "";
    switch (name) {
      case "username":
        if (!value.trim()) error = "El nombre de usuario es obligatorio";
        else if (value.length < 3) error = "Debe tener al menos 3 caracteres";
        else if (value.length > 30)
          error = "No puede superar los 30 caracteres";
        else if (!/^[A-ZÁÉÍÓÚÑa-záéíóúñ0-9_\- ]+$/.test(value))
          error =
            "Solo se permiten letras, números, espacios, guiones y guiones bajos.";
        break;
      case "email":
        if (!value.trim()) error = "El correo es obligatorio";
        else if (!/^\S+@\S+\.\S+$/.test(value))
          error = "Formato de correo inválido";
        break;
      case "telefono":
        if (!value.trim()) error = "El teléfono es obligatorio";
        else if (!/^\d{8,15}$/.test(value))
          error = "Debe tener entre 8 y 15 dígitos numéricos";
        break;
      case "password":
        if (!value) error = "La contraseña es obligatoria";
        else if (value.length < 8) error = "Debe tener al menos 8 caracteres";
        else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value))
          error = "Debe incluir una mayúscula, una minúscula y un número";
        break;
      case "confirmPassword":
        if (!value) error = "Debes confirmar la contraseña";
        else if (value !== form.password)
          error = "Las contraseñas no coinciden";
        break;
      case "descripcion":
        if (!value.trim()) error = "La descripción es obligatoria";
        else if (value.length < 10) error = "Debe tener al menos 10 caracteres";
        else if (value.length > 200)
          error = "No puede superar los 200 caracteres";
        break;

      case "especialidad":
        if (!value.trim()) error = "La especialidad es obligatoria";
        else if (value.length > 100)
          error = "No puede superar los 100 caracteres";
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (touched[name]) {
      const error = validarCampo(name, value);
      setErrors({ ...errors, [name]: error });
    }

    if (name === "password" && touched.confirmPassword) {
      const confirmError = validarCampo(
        "confirmPassword",
        form.confirmPassword
      );
      setErrors((prev) => ({ ...prev, confirmPassword: confirmError }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    const error = validarCampo(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const validate = () => {
    const newErrors = {};
    let isValid = true;

    Object.entries(form).forEach(([key, value]) => {
      const error = validarCampo(key, value);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    if (!archivoFoto) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debes seleccionar una imagen de perfil.",
      });
      isValid = false;
    }

    setErrors(newErrors);
    setTouched(Object.fromEntries(Object.keys(form).map((k) => [k, true])));
    return isValid;
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
      });
      setArchivoFoto(null);
      setPreviewFoto(null);
      document.querySelector('input[type="file"]').value = null;

      setTimeout(() => navigate("/login"), 2500);
    } catch (error) {
      setLoading(false);

      if (error.response?.status === 400) {
        const serverErrors = error.response.data;

        if (serverErrors.message) {
          Swal.fire({
            icon: "error",
            title: "Error de validación",
            text: serverErrors.message,
          });
        } else if (serverErrors.errors) {
          const mappedErrors = {};
          serverErrors.errors.forEach((err) => {
            if (err.path === "nombreUsuario")
              mappedErrors.username = err.message;
            if (err.path === "emailUsuario") mappedErrors.email = err.message;
            if (err.path === "telefono") mappedErrors.telefono = err.message;
            if (err.path === "contrasenia") mappedErrors.password = err.message;
          });

          setErrors(mappedErrors);
          setTouched({
            username: true,
            email: true,
            telefono: true,
            password: true,
            confirmPassword: true,
          });
        }
      } else if (error.response?.status === 409) {
        Swal.fire({
          icon: "error",
          title: "Usuario ya registrado",
          text: "El nombre de usuario o correo ya están en uso.",
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
          {[
            ["username", "Nombre de usuario", "text"],
            ["email", "Correo", "email"],
            ["telefono", "Teléfono", "tel"],
            ["especialidad", "Especialidad", "text"],
          ].map(([name, label, type]) => (
            <Form.Group controlId={name} className="mb-3" key={name}>
              <Form.Label className="label-form">{label}</Form.Label>
              <Form.Control
                type={type}
                name={name}
                placeholder={label}
                value={form[name]}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched[name] && errors[name]}
                required
              />
              {touched[name] && errors[name] && (
                <Form.Control.Feedback type="invalid">
                  {errors[name]}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          ))}

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              name="descripcion"
              placeholder="Escribe tu descripción"
              value={form.descripcion}
              rows={3}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.descripcion && errors.descripcion}
            />
            {touched.descripcion && errors.descripcion && (
              <Form.Control.Feedback type="invalid">
                {errors.descripcion}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          {["password", "confirmPassword"].map((field, idx) => (
            <Form.Group controlId={field} className="mb-3" key={field}>
              <Form.Label className="label-form">
                {field === "password" ? "Contraseña" : "Repetir Contraseña"}
              </Form.Label>
              <div className="password-container">
                <Form.Control
                  type={
                    field === "password" && showPassword
                      ? "text"
                      : field === "confirmPassword" && showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name={field}
                  placeholder={
                    field === "password" ? "Contraseña" : "Repetir contraseña"
                  }
                  value={form[field]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched[field] && errors[field]}
                  required
                />
                <button
                  type="button"
                  onClick={
                    field === "password"
                      ? togglePasswordVisibility
                      : toggleConfirmPasswordVisibility
                  }
                  className="password-toggle-btn"
                >
                  {(
                    field === "password" ? showPassword : showConfirmPassword
                  ) ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {touched[field] && errors[field] && (
                <Form.Control.Feedback
                  type="invalid"
                  style={{ display: "block" }}
                >
                  {errors[field]}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          ))}

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
                  setPreviewFoto(URL.createObjectURL(file));
                } else {
                  Swal.fire({
                    icon: "error",
                    title: "Formato inválido",
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
            <a href="/register" onClick={manejarClick}>
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
  );
};
