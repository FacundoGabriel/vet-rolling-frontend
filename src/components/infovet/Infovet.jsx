import { Col, Container, Row } from "react-bootstrap";
import "./Infovet.css";
import img2 from "/mascotas2-info.png";
import { Link } from "react-router";

const Infovet = () => {
  return (
    <>
      <Container fluid>
        <Row className="bg">
          <Col
            sm="6"
            md="6"
            lg="6"
            className="texto d-flex flex-column justify-content-center align-items-center text-center"
          >
            <p className="texto-naranja">Cuidamos con amor y experiencia</p>
            <p className="texto-blanco">
              En nuestra veterinaria tratamos a tus compañeros peludos con todo
              el cariño y profesionalismo que se merecen.
            </p>
            <Link to="#" className="btn btn-primary px-5 py-2 rounded-pill">
              Contáctanos
            </Link>
          </Col>
          <Col
            sm="6"
            md="6"
            lg="6"
            className="d-flex justify-content-center align-items-center"
          >
            <img className="img-fluid" src={img2} alt="" />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Infovet;
