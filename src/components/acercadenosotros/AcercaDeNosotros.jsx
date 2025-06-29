import { Col, Container, Image, Row } from "react-bootstrap";
import "./AcercaDeNosotros.css";
import banner from "/banner.png";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import gabriel from "/gabriel.jpg";
import alvaro from "/alvaro.jpeg";

const AcercaDeNosotros = () => {
  return (
    <>
      <div className="w-100">
        <Image src={banner} fluid className="d-block w-100" />
      </div>
      <div className="titulo-acerca-de-nosotros d-flex justify-content-center align-items-center">
        <h1>Acerca de Nosotros</h1>
      </div>
      <Container fluid className="descripciones fondo-huellas p-5">
        <Row className="descripcion1 rounded-5 m-5">
          <Col
            className="d-flex justify-content-center align-items-center"
            sm="12"
            md="4"
            lg="4"
          >
            <Image src={gabriel} className="img-custom" roundedCircle fluid />
          </Col>
          <Col
            className="d-flex justify-content-center align-items-center flex-column px-5"
            sm="12"
            md="8"
            lg="8"
          >
            <h2 className="titulo-descripcion pb-2">
              Victor Gabriel Fernandez Medina
            </h2>
            <p className="descripcion-grupo text-center">
              Apasionado por la tecnología y los desafíos, estoy formándome como
              desarrollador FullStack en RollingCode. Disfruto trabajar en
              equipo, prestar atención a los detalles y aprender algo nuevo cada
              día. El código me dio una nueva forma de expresar lo que me
              motiva: resolver, crear y mejorar.
            </p>
            <h2 className="titulo-descripcion">Tecnologías dominadas</h2>
            <div className="tecnologias text-center">
              <p className="descripcion-grupo">
                HTML, CSS, C, C++, JavaScript, Bootstrap, React, Node.js,
                MongoDB
              </p>
            </div>
            <h2 className="titulo-descripcion">Dónde encontrarnos</h2>
            <div className="d-flex justify-content-center gap-4">
              <a
                href="https://github.com/VGFernandezMedina"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub size={40} className="icono-redes" />
              </a>
              <a
                href="https://www.linkedin.com/in/victor-gabriel-fernández-medina-331286250"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={40} className="icono-redes" />
              </a>
              <a
                href="https://wa.me/5493816135750"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp size={40} className="icono-redes" />
              </a>
            </div>
          </Col>
        </Row>
        <Row className="descripcion2 rounded-5 m-5">
          <Col
            className="d-flex justify-content-center align-items-center flex-column px-5"
            sm="12"
            md="8"
            lg="8"
          >
            <h2 className="titulo-descripcion pb-2">
              Facundo Gabriel De La Cruz
            </h2>
            <p className="descripcion-grupo text-center">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea qui
              laboriosam odit deleniti aperiam molestiae voluptas maxime
              molestias quam. At laudantium pariatur facere perferendis cumque
              ipsam id sit labore molestias?
            </p>
            <h2 className="titulo-descripcion">Tecnologías dominadas</h2>
            <p className="descripcion-grupo">
              HTML, CSS, JavaScript, Bootstrap, React, Node.js, MongoDB
            </p>
            <h2 className="titulo-descripcion">Dónde encontrarnos</h2>
            <div className="d-flex justify-content-center gap-4">
              <a href="" target="_blank" rel="noopener noreferrer">
                <FaGithub size={40} className="icono-redes" />
              </a>
              <a href="" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={40} className="icono-redes" />
              </a>
              <a href="" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp size={40} className="icono-redes" />
              </a>
            </div>
          </Col>
          <Col
            className="d-flex justify-content-center align-items-center"
            sm="12"
            md="4"
            lg="4"
          >
            <Image src="" className="img-custom" roundedCircle />
          </Col>
        </Row>
        <Row className="descripcion3 rounded-5 m-5">
          <Col
            className="d-flex justify-content-center align-items-center"
            sm="12"
            md="4"
            lg="4"
          >
            <Image src={alvaro} className="img-custom" roundedCircle />
          </Col>
          <Col
            className="d-flex justify-content-center align-items-center flex-column px-5"
            sm="12"
            md="8"
            lg="8"
          >
            <h2 className="titulo-descripcion">Álvaro Maximiliano Córdoba</h2>
            <p className="descripcion-grupo pb-2 text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
              aspernatur quia, ipsam quae adipisci aliquam hic, impedit tempore
              harum voluptas quasi incidunt repellat consequatur labore vero
              asperiores saepe recusandae fugiat?
            </p>
            <h2 className="titulo-descripcion">Tecnologías dominadas</h2>
            <p className="descripcion-grupo">
              HTML, CSS, JavaScript, Bootstrap, React, Node.js, MongoDB
            </p>
            <h2 className="titulo-descripcion">Dónde encontrarnos</h2>
            <div className="d-flex justify-content-center gap-4">
              <a href="" target="_blank" rel="noopener noreferrer">
                <FaGithub size={40} className="icono-redes" />
              </a>
              <a href="" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={40} className="icono-redes" />
              </a>
              <a href="" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp size={40} className="icono-redes" />
              </a>
            </div>
          </Col>
        </Row>
        <Row className="descripcion4 rounded-5 m-5">
          <Col
            className="d-flex justify-content-center align-items-center flex-column px-5"
            sm="12"
            md="8"
            lg="8"
          >
            <h2 className="titulo-descripcion pb-2">
              Leonardo santillan rearte
            </h2>
            <p className="descripcion-grupo text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
              magni quasi, accusamus ad voluptates totam perspiciatis animi,
              quas architecto corrupti nisi molestias explicabo, libero
              inventore suscipit repellendus eaque deserunt cum.
            </p>
            <h2 className="titulo-descripcion">Tecnologías dominadas</h2>
            <p className="descripcion-grupo">
              HTML, CSS, JavaScript, Bootstrap, React, Node.js, MongoDB
            </p>
            <h2 className="titulo-descripcion">Dónde encontrarnos</h2>
            <div className="d-flex justify-content-center gap-4">
              <a href="" target="_blank" rel="noopener noreferrer">
                <FaGithub size={40} className="icono-redes" />
              </a>
              <a href="" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={40} className="icono-redes" />
              </a>
              <a href="" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp size={40} className="icono-redes" />
              </a>
            </div>
          </Col>
          <Col
            className="d-flex justify-content-center align-items-center"
            sm="12"
            md="4"
            lg="4"
          >
            <Image src="" className="img-custom" roundedCircle />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AcercaDeNosotros;
