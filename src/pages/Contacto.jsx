import { Col, Container, Form, Row } from "react-bootstrap";
import "./Contacto.css";
import { Link } from "react-router-dom";

const Contacto = () => {
  return (
    <>
      <Container fluid className="contenedor-contacto">
        <Row className="contacto rounded">
          <Col sm="12" md="6" lg="6" className="p-0">
            <Form className="formulario-contacto p-4">
              <h5 className="mb-4 fuente-contacto titulo-contacto">
                Comunicate con nosotros
              </h5>
              <Row>
                <Col sm="12" md="12" lg="6">
                  <Form.Group className="mb-5" controlId="formNombre">
                    <Form.Label>Nombre *</Form.Label>
                    <Form.Control type="text" placeholder="Tu nombre" />
                  </Form.Group>
                </Col>
                <Col sm="12" md="12" lg="6">
                  <Form.Group className="mb-5" controlId="formCorreo">
                    <Form.Label>Correo electrónico *</Form.Label>
                    <Form.Control type="email" placeholder="Tu correo" />
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
                    />
                  </Form.Group>
                </Col>
                <Col sm="12" md="12" lg="6">
                  <Form.Group className="mb-5" controlId="formEmpresa">
                    <Form.Label>Empresa</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nombre de la empresa"
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
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Link className="btn btn-primary fuente-contacto">
                Enviar mensaje
              </Link>
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
