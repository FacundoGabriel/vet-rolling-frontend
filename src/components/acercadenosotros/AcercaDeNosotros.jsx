import { Col, Container, Image, Row } from "react-bootstrap";
import "./AcercaDeNosotros.css";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import gabriel from "/gabriel.jpg";
import alvaro from "/alvaro.jpeg";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const AcercaDeNosotros = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <>
      <Container fluid className="descripciones fondo-huellas text-center">
        <Row className="rounded-5" data-aos="fade-right">
          <Col
            className="d-flex justify-content-center align-items-center"
            sm="12"
            md="5"
            lg="4"
          >
            <Image src={gabriel} className="img-custom" roundedCircle fluid />
          </Col>
          <Col
            className="d-flex justify-content-center align-items-center flex-column col-info"
            sm="12"
            md="7"
            lg="8"
          >
            <h2 className="titulo-descripcion pb-2">
              Victor Gabriel Fernandez Medina
            </h2>
            <p className="descripcion-grupo">
              Apasionado por la tecnología y los desafíos, estoy formándome como
              desarrollador FullStack en RollingCode. Disfruto trabajar en
              equipo, prestar atención a los detalles y aprender algo nuevo cada
              día. El código me dio una nueva forma de expresar lo que me
              motiva: resolver, crear y mejorar.
            </p>
            <h2 className="titulo-descripcion">Tecnologías dominadas</h2>
            <div className="tecnologias">
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
        <Row className="rounded-5" data-aos="fade-left">
          <Col
            className="d-flex justify-content-center align-items-center flex-column col-info"
            sm="12"
            md="7"
            lg="8"
          >
            <h2 className="titulo-descripcion pb-2">
              Facundo Gabriel De La Cruz
            </h2>
            <p className="descripcion-grupo">
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
            md="5"
            lg="4"
          >
            <Image src="" className="img-custom" roundedCircle fluid />
          </Col>
        </Row>
        <Row className="rounded-5" data-aos="fade-right">
          <Col
            className="d-flex justify-content-center align-items-center"
            sm="12"
            md="5"
            lg="4"
          >
            <Image src={alvaro} className="img-custom" roundedCircle fluid />
          </Col>
          <Col
            className="d-flex justify-content-center align-items-center flex-column col-info"
            sm="12"
            md="7"
            lg="8"
          >
            <h2 className="titulo-descripcion">Álvaro Maximiliano Córdoba</h2>
            <p className="descripcion-grupo pb-2">
              Soy estudiante de desarrollo Full Stack en RollingCode, con
              conocimientos en HTML, CSS, Bootstrap JavaScript, React, Node.js,
              Express, MongoDB y Mongoose. Me gusta la programación no solo por
              el desafío técnico, sino también porque me permite expresar mi
              creatividad. Disfruto encontrar soluciones, construir cosas desde
              cero y aprender constantemente.
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
        <Row className="rounded-5" data-aos="fade-left">
          <Col
            className="d-flex justify-content-center align-items-center flex-column col-info"
            sm="12"
            md="7"
            lg="8"
          >
            <h2 className="titulo-descripcion pb-2">
              Leonardo santillan rearte
            </h2>
            <p className="descripcion-grupo">
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
            md="5"
            lg="4"
          >
            <Image src="" className="img-custom" roundedCircle fluid />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AcercaDeNosotros;
