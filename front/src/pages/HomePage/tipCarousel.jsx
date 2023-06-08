import { Carousel } from "react-bootstrap";
import Logo from "../../assets/logo.png";
import Banner1 from "../../assets/banner1.png"
import Banner2 from "../../assets/banner2.png"
import Banner3 from "../../assets/banner3.png"

const TipCarousel = () => {
  return (
    <Carousel style={{backgroundColor: 'gray', width: '100%', height: '100%', overflow: 'hidden'}}>
      <Carousel.Item>
        <img src={Banner1} className="d-block w-100" alt="logo" />
        <Carousel.Caption style={{ color: "black" }}>
          {/* <h5>First slide label</h5>
          <p>Some representative placeholder content for the first slide.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={Banner2} className="d-block w-100" alt="logo" />
        <Carousel.Caption style={{ color: "black" }}>
          {/* <h5>Second slide label</h5>
          <p>Some representative placeholder content for the second slide.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={Banner3} className="d-block w-100" alt="logo" />
        <Carousel.Caption style={{ color: "black" }}>
          {/* <h5>Third slide label</h5>
          <p>Some representative placeholder content for the third slide.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};
export default TipCarousel;
