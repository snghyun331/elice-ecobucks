import { Carousel } from "react-bootstrap";
import Banner1 from "../../assets/banner1.png";
import Banner2 from "../../assets/banner2.png";
import Banner3 from "../../assets/banner3.png";

const BannerCarousel = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Carousel style={{ width: '70%', overflow: 'hidden' }}>
        <Carousel.Item>
          <a href="https://www.recycling-info.or.kr/act4r/main.do" target="_blank" rel="noopener noreferrer">
            <img src={Banner1} className="d-block w-100" alt="logo" />
          </a>
        </Carousel.Item>
        <Carousel.Item>
          <a href="https://ecomileage.seoul.go.kr/home/" target="_blank" rel="noopener noreferrer">
            <img src={Banner2} className="d-block w-100" alt="logo" />
          </a>
        </Carousel.Item>
        <Carousel.Item>
          <a href="https://home.kepco.co.kr/kepco/KO/A/A/KOAAHP00101.do?menuCd=FN05" target="_blank" rel="noopener noreferrer">
            <img src={Banner3} className="d-block w-100" alt="logo" />
          </a>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default BannerCarousel;
