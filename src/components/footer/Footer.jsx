import { Col, Container, Row } from "react-bootstrap";
import "./Footer.css";
import { Link } from "react-router-dom";
import {
  FaFacebookSquare,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import { IoIosMail } from "react-icons/io";
import logo from "/logo.png";
import senasa from "/senasa.png";
import colegioVet from "/colegio-de-vet.png";

const Footer = () => {
  return (
    <footer>
      <Container fluid>
        <Row className="bg-footer py-3">
          <Col
            sm="12"
            md="6"
            lg="4"
            className="d-flex flex-column align-items-center text-center py-4"
          >
            <Link>
              <img src={logo} alt="img-logo" className="logo pt-5" />
            </Link>
          </Col>
          <Col
            sm="12"
            md="6"
            lg="4"
            className="d-flex flex-column align-items-center text-center text-lg-start pt-3"
          >
            <h5 className="pb-3">Veterinaria RollingVet</h5>
            <ul className="list-unstyled info">
              <li>
                <Link>
                  <FaPhoneAlt className="icons-footer" />
                </Link>
                <Link to="*">Tel: (0381) 456-7890</Link>
              </li>
              <li>
                <Link>
                  <MdPhoneIphone className="icons-footer" />
                </Link>
                <Link to="*">Cel: +54 9 381 512-3456</Link>
              </li>
              <li>
                <Link>
                  <IoIosMail className="icons-footer" />
                </Link>
                <Link to="*">rollingvet25@gmail.com</Link>
              </li>
              <li>
                <Link>
                  <FaMapMarkerAlt className="icons-footer" />
                </Link>
                <Link to="*">
                  General Paz 576, Piso 9, Oficina 2 San Miguel de Tucumán
                </Link>
              </li>
              <hr />
              <li className="horario">
                <span>Lunes</span>
                <span>9:00 - 18:00</span>
              </li>
              <hr />
              <li className="horario">
                <span>Martes</span>
                <span>9:00 - 18:00</span>
              </li>
              <hr />
              <li className="horario">
                <span>Miércoles</span>
                <span>9:00 - 18:00</span>
              </li>
              <hr />
              <li className="horario">
                <span>Jueves</span>
                <span>9:00 - 18:00</span>
              </li>
              <hr />
              <li className="horario">
                <span>Viernes</span>
                <span>9:00 - 18:00</span>
              </li>
              <hr />
              <li className="horario">
                <span>Sabado</span>
                <span>9:00 - 13:00</span>
              </li>
              <hr />
              <li className="horario">
                <span>Domingo</span>
                <span>Cerrado</span>
              </li>
            </ul>
          </Col>
          <Col
            sm="12"
            md="6"
            lg="4"
            className="d-flex flex-column align-items-center text-center text-lg-start pt-4"
          >
            <ul className="list-unstyled">
              <li className="redes-footer text-center">
                <Link to="*" target="_blank" rel="noopener noreferrer">
                  <FaFacebookSquare size={60} />
                </Link>
                <Link to="*" target="_blank" rel="noopener noreferrer">
                  <FaInstagram size={60} />
                </Link>
                <Link to="*" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin size={60} />
                </Link>
              </li>
              <li className="pt-5 text-center">
                <Link>
                  <img src={senasa} alt="senasa" className="senasa" />
                </Link>
                <Link>
                  <img
                    src={colegioVet}
                    alt="colegio de veterinarios"
                    className="colegioVet"
                  />
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
        <Row className="copyright">
          <Col sm="12" md="12" lg="12" className="text-center py-3 pt-4">
            <p>&copy; 2025 RollingVet. Todos los derechos reservados.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
