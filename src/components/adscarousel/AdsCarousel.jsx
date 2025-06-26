import { Container } from "react-bootstrap";
import "./AdsCarousel.css";
import pedigree from "/public/pedigree-logo.png";
import royalCanin from "/public/Royal-Canin-Logo.svg.png";
import bayer from "/public/bayer-logo.png";
import dogui from "/public/dogui-logo.png";
import nutribon from "/public/nutribon-logo.png";
import purina from "/public/purina-pro-plan-logo.png";
import vitalcan from "/public/vitalcan-logo.png";
import whiskas from "/public/whiskas-logo.png";
import zoetis from "/public/zoetis-logo.png";
import Marquee from "react-fast-marquee";

const AdsCarousel = () => {
  return (
    <>
      <Container fluid className="py-4 px-0 bg-carousel">
        <h1 className="text-center pb-5">Nuestras marcas de confianza</h1>
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
