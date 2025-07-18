import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import "./Contacto.css";
import { useState } from "react";
import clientAxios from "../helpers/axios.helpers";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Contacto = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);

    setLoading(true);

    try {
      const res = await clientAxios.post("/contacto/enviar", formData);
      if (res.status === 200) {
        Swal.fire({
          title: "Formulario enviado correctamente!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          const token = sessionStorage.getItem("token");
          navigate(token ? "/user" : "/");
        });
        setFormData({
          nombre: "",
          email: "",
          telefono: "",
          empresa: "",
          mensaje: "",
        });
        setValidated(false);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Lo sentimos, no hemos podido enviar el formulario.",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container fluid className="contenedor-contacto">
        <Row className="contacto rounded">
          <Col sm="12" md="6" lg="6" className="p-0">
            <Form
              className="formulario-contacto"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <h5 className="mb-4 fuente-contacto titulo-contacto">
                Comunicate con nosotros
              </h5>
              <Row>
                <Col sm="12" md="12" lg="6">
                  <Form.Group className="mb-5" controlId="formNombre">
                    <Form.Label>Nombre *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Tu nombre"
                      name="nombre"
                      minLength={5}
                      maxLength={40}
                      pattern="^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Campo obligatorio. Debe contener solo letras (mínimo 5
                      caracteres).
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm="12" md="12" lg="6">
                  <Form.Group className="mb-5" controlId="formCorreo">
                    <Form.Label>Correo electrónico *</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Tu correo"
                      name="email"
                      minLength={10}
                      maxLength={40}
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Ingresá un correo electrónico válido.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col sm="12" md="12" lg="6">
                  <Form.Group className="mb-5" controlId="formTelefono">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Número de teléfono"
                      name="telefono"
                      minLength={9}
                      maxLength={15}
                      pattern="^\d{9,15}$"
                      value={formData.telefono}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      El número debe tener entre 9 y 15 dígitos y solo números.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm="12" md="12" lg="6">
                  <Form.Group className="mb-5" controlId="formEmpresa">
                    <Form.Label>Empresa</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nombre de la empresa"
                      name="empresa"
                      minLength={1}
                      maxLength={50}
                      pattern="^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9&._\\-\\/\\s]+$"
                      value={formData.empresa}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg="12">
                  <Form.Group className="mb-5" controlId="formMensaje">
                    <Form.Label>Mensaje *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Escribí tu mensaje"
                      name="mensaje"
                      minLength={10}
                      maxLength={500}
                      value={formData.mensaje}
                      onChange={handleChange}
                      required
                    />
                    <div className="text-end mt-1 text-muted contador-form">
                      {formData.mensaje.length} / 500
                    </div>
                    <Form.Control.Feedback type="invalid">
                      Campo obligatorio (mínimo 10 caracteres).
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Button
                type="submit"
                className="fuente-contacto"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />{" "}
                    Enviando...
                  </>
                ) : (
                  "Enviar mensaje"
                )}
              </Button>
            </Form>
          </Col>
          <Col sm="12" md="6" lg="6" className="mapa-contacto p-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.106067949495!2d-65.20974192529606!3d-26.836578490025634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d3ad7f30f1d%3A0xf8606cd659b8e3e4!2sRollingCode%20School!5e0!3m2!1ses-419!2sar!4v1751219175261!5m2!1ses-419!2sar"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Contacto;
