import { Carousel } from "react-bootstrap";
import Logo from "../../assets/logo.png";
const TipCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img src={Logo} className="d-block w-100" alt="logo" />
        <Carousel.Caption style={{ color: "black" }}>
          <h5>First slide label</h5>
          <p>Some representative placeholder content for the first slide.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={Logo} className="d-block w-100" alt="logo" />
        <Carousel.Caption style={{ color: "black" }}>
          <h5>Second slide label</h5>
          <p>Some representative placeholder content for the second slide.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={Logo} className="d-block w-100" alt="logo" />
        <Carousel.Caption style={{ color: "black" }}>
          <h5>Third slide label</h5>
          <p>Some representative placeholder content for the third slide.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};
export default TipCarousel;
