import { Carousel } from "react-bootstrap";
import "./CarouselC.css";

const CarouselC = () => {
  return (
    <>
      <Carousel fade>
        <Carousel.Item>
          <video autoPlay loop muted playsInline>
            <source src="/carousel1.mp4" type="video/mp4" />
          </video>
        </Carousel.Item>
        <Carousel.Item>
          <video autoPlay loop muted playsInline>
            <source src="/carousel2.mp4" type="video/mp4" />
          </video>
        </Carousel.Item>
        <Carousel.Item>
          <video autoPlay loop muted playsInline>
            <source src="/carousel3.mp4" type="video/mp4" />
          </video>
        </Carousel.Item>
        <Carousel.Item>
          <video autoPlay loop muted playsInline>
            <source src="/carousel4.mp4" type="video/mp4" />
          </video>
        </Carousel.Item>
        <Carousel.Item>
          <video autoPlay loop muted playsInline>
            <source src="/carousel5.mp4" type="video/mp4" />
          </video>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default CarouselC;
