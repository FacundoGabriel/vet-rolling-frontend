import { Col, Container, Row } from "react-bootstrap";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <Container fluid>
        <Row className="bg-footer py-4">
          <Col
            sm="12"
            md="6"
            lg="4"
            className="border border-danger d-flex flex-column align-items-center text-center text-lg-start"
          >
            <img src="#" alt="img-logo" />
          </Col>
          <Col
            sm="12"
            md="6"
            lg="4"
            className="border border-danger d-flex flex-column align-items-center text-center text-lg-start"
          >
            <h5>Veterinaria RollingVet</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="*">Tel: (0381) 456-7890</Link>
              </li>
              <li>
                <Link to="*">Cel: +54 9 381 512-3456</Link>
              </li>
              <li>
                <Link to="*">Email: rollingvet25@gmail.com</Link>
              </li>
              <li>
                <Link to="*">
                  Ubicación: General Paz 576, Piso 9, Oficina 2 San Miguel de
                  Tucumán
                </Link>
              </li>
            </ul>
          </Col>
          <Col
            sm="12"
            md="6"
            lg="4"
            className="border border-danger d-flex flex-column align-items-center text-center text-lg-start"
          >
            <h5>Contacto</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="*"></Link>
              </li>
              <li>
                <Link to="*"></Link>
              </li>
              <li>
                <Link to="*"></Link>
              </li>
              <li>
                <Link to="*"></Link>
              </li>
              <li>
                <Link to="*"></Link>
              </li>
            </ul>
          </Col>
        </Row>
        <Row className="copyright">
          <Col sm="12" md="12" lg="12" className="text-center py-3 pt-4">
            <p>&copy; 2025 Ecommerce. Todos los derechos reservados.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
