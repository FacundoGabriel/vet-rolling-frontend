import { Eye, EyeOff, UserCircle } from "lucide-react";
import "./RegistroUsuario.css";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import clientAxios from "../../helpers/axios.helpers";

export const RegistroUsuario = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const [form, setForm] = useState({
    username: "",
    email: "",
    telefono: "",
    password: "",
    confirmPassword: "",
  });

  const manejarClick = (e) => {
    e.preventDefault();
    setTimeout(() => {
      navigate("/register-veterinario");
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
        if (!value.trim()) {
          error = "El correo es obligatorio";
        } else if (
          !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
        ) {
          error = "El formato del correo no es válido";
        }
        break;

      case "telefono":
        if (!value.trim()) {
          error = "El teléfono es obligatorio";
        } else if (!/^(\+54\s?)?(\d{2,4}[-\s]?)?\d{6,8}$/.test(value)) {
          error =
            "Formato inválido. Ej: +54 11 1234-5678, 011 1234-5678 o 12345678";
        }
        break;

      case "password":
        if (!value) {
          error = "La contraseña es obligatoria";
        } else if (value.length < 8) {
          error = "La contraseña debe tener al menos 8 caracteres";
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value)) {
          error =
            "Debe contener al menos una mayúscula, una minúscula y un número";
        }
        break;

      case "confirmPassword":
        if (!value) {
          error = "Confirmar contraseña es obligatorio";
        } else if (value !== form.password) {
          error = "Las contraseñas no coinciden";
        }
        break;

      default:
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
      setErrors({ ...errors, [name]: "", confirmPassword: confirmError });
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

    Object.keys(form).forEach((key) => {
      const error = validarCampo(key, form[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched({
      username: true,
      email: true,
      telefono: true,
      password: true,
      confirmPassword: true,
    });

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      Swal.fire({
        icon: "error",
        title: "Formulario incompleto",
        text: "Por favor corrige los errores antes de continuar",
      });
      return;
    }

    setLoading(true);

    try {
      const payload = {
        nombreUsuario: form.username,
        emailUsuario: form.email,
        telefono: form.telefono,
        contrasenia: form.password,
        repetirContrasenia: form.confirmPassword,
      };

      const response = await clientAxios.post("/usuarios/registro", payload);

      setLoading(false);

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "¡Cuenta creada con éxito!",
          text: "Revisá tu correo para habilitar tu cuenta.",
          timer: 2500,
          showConfirmButton: false,
        });

        setForm({
          username: "",
          email: "",
          telefono: "",
          password: "",
          confirmPassword: "",
        });

        setErrors({});
        setTouched({});

        setTimeout(() => {
          navigate("/login");
        }, 2500);
      }
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
                onBlur={handleBlur}
                isInvalid={touched.username && errors.username}
                required
              />
              {touched.username && errors.username && (
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group controlId="email" className="mb-3">
              <Form.Label className="label-form">Correo</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="correo@correo.com"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.email && errors.email}
                required
              />
              {touched.email && errors.email && (
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group controlId="telefono" className="mb-3">
              <Form.Label className="label-form">Teléfono</Form.Label>
              <Form.Control
                type="tel"
                name="telefono"
                placeholder="Ej: +54 11 1234-5678"
                value={form.telefono}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.telefono && errors.telefono}
                required
              />
              {touched.telefono && errors.telefono && (
                <Form.Control.Feedback type="invalid">
                  {errors.telefono}
                </Form.Control.Feedback>
              )}
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
                  onBlur={handleBlur}
                  isInvalid={touched.password && errors.password}
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
              {touched.password && errors.password && (
                <Form.Control.Feedback
                  type="invalid"
                  style={{ display: "block" }}
                >
                  {errors.password}
                </Form.Control.Feedback>
              )}
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
                  onBlur={handleBlur}
                  isInvalid={touched.confirmPassword && errors.confirmPassword}
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
              {touched.confirmPassword && errors.confirmPassword && (
                <Form.Control.Feedback
                  type="invalid"
                  style={{ display: "block" }}
                >
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <p>
              ¿Eres veterinario?{" "}
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
