import { Container } from "react-bootstrap";
import "./AdsCarousel.css";
import pedigree from "/pedigree-logo.png";
import royalCanin from "/Royal-Canin-Logo.svg.png";
import bayer from "/bayer-logo.png";
import dogui from "/dogui-logo.png";
import nutribon from "/nutribon-logo.png";
import purina from "/purina-pro-plan-logo.png";
import vitalcan from "/vitalcan-logo.png";
import whiskas from "/whiskas-logo.png";
import zoetis from "/zoetis-logo.png";
import Marquee from "react-fast-marquee";

const AdsCarousel = () => {
  return (
    <>
      <Container fluid className="py-4 px-0 bg-carousel">
        <h1 className="text-center titulo-ads pb-5">
          Nuestras marcas de confianza
        </h1>
        <Marquee className="logos pb-4" speed={40} gradient={false}>
          <img className="carousel-logo" src={pedigree} alt="pedigree-logo" />
          <img
            className="carousel-logo"
            src={royalCanin}
            alt="royalCanin-logo"
          />
          <img className="carousel-logo" src={bayer} alt="bayer-logo" />
          <img className="carousel-logo" src={dogui} alt="dogui-logo" />
          <img className="carousel-logo" src={nutribon} alt="nutribon-logo" />
          <img className="carousel-logo" src={purina} alt="purina-logo" />
          <img className="carousel-logo" src={vitalcan} alt="vitalcan-logo" />
          <img className="carousel-logo" src={whiskas} alt="whiskas-logo" />
          <img className="carousel-logo" src={zoetis} alt="zoetis-logo" />
        </Marquee>
      </Container>
    </>
  );
};

export default AdsCarousel;
