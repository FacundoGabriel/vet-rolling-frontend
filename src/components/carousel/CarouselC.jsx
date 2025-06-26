import { Carousel } from "react-bootstrap";
import "./CarouselC.css";

const CarouselC = () => {
  return (
    <>
      <Carousel>
        <Carousel.Item>
          <video autoPlay loop muted playsInline>
            <source src="/carousel1.mp4" type="video/mp4" />
          </video>
          {/*           <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption> */}
        </Carousel.Item>
        <Carousel.Item>
          <video autoPlay loop muted playsInline>
            <source src="/carousel2.mp4" type="video/mp4" />
          </video>
          {/*           <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption> */}
        </Carousel.Item>
        <Carousel.Item>
          <video autoPlay loop muted playsInline>
            <source src="/carousel3.mp4" type="video/mp4" />
          </video>
          {/*           <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption> */}
        </Carousel.Item>
        <Carousel.Item>
          <video autoPlay loop muted playsInline>
            <source src="/carousel4.mp4" type="video/mp4" />
          </video>
          {/*           <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption> */}
        </Carousel.Item>
        <Carousel.Item>
          <video autoPlay loop muted playsInline>
            <source src="/carousel5.mp4" type="video/mp4" />
          </video>
          {/*           <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption> */}
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default CarouselC;
