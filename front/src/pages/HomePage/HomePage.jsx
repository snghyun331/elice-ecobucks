import { Link } from "react-router-dom";
import { Container, Button, Carousel } from "react-bootstrap";
import Logo from "../../assets/logo.png";
// import tipCarousel from "./tipCarousel";
const HomePage = () => {

  return (
    <div style={{ justifyContent: "center" }}>
      <h3
        style={{
          display: "flex",
          justifyContent: "center",
          position: "center",
        }}
      >
        <span style={{ color: "#00D387", fontSize: "48px" }}>ECOBUCKS</span>
      </h3>
      <span
        style={{
          color: "#FF6B00",
          fontSize: "24px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        Make Tomorrow Bright
      </span>
      <Container
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Link to="/mall">
          <Button
            type="button"
            style={{ marginRight: "20px", backgroundColor: "#07F39E" }}
          >
            쇼핑몰로 이동
          </Button>
        </Link>
        <Link to="/blog">
          <Button
            type="button"
            style={{ marginRight: "20px", backgroundColor: "#07F39E" }}
          >
            블로그로 이동
          </Button>
        </Link>
        <button
          type="button"
          style={{ marginRight: "20px", backgroundColor: "#07F39E" }}
        >
          전력 통계
        </button>
        <Link to="/challenge">
          <Button type="button" style={{ backgroundColor: "#07F39E" }}>
            챌린지
          </Button>
        </Link>
      </Container>

      <Container
        style={{
          width: "100%",
          height: "30vh",
          backgroundColor: "#fff",
          border: "1px solid #000",
          borderRadius: "10px",
          padding: "10px",
          marginTop: "10px",
        }}
      >
        <span>전력통계</span>
        <br />
        <span>이미지로 지도를 넣거나</span>
        <br />
        <span>버튼 형식으로 구 별로 데이터 가져오거나</span>
        <div
          className="btn-toolbar"
          role="toolbar"
          aria-label="Toolbar with button groups"
        >
          <div className="btn-group me-2" role="group" aria-label="First group">
            <button type="button" className="btn btn-primary">
              강남구
            </button>
            <button type="button" className="btn btn-primary">
              강동구
            </button>
            <button type="button" className="btn btn-primary">
              강북구
            </button>
            <button type="button" className="btn btn-primary">
              강서구
            </button>
          </div>
        </div>
      </Container>
      <Container
        style={{
          width: "100%",
          height: "30vh",
          backgroundColor: "#fff",
          border: "1px solid #000",
          borderRadius: "10px",
          padding: "10px",
          marginTop: "10px",
        }}
      >
        <span>TIP</span>
        <Carousel>
          <Carousel.Item>
            <img src={Logo} className="d-block w-100" alt="logo" />
            <Carousel.Caption style={{ color: "black" }}>
              <h5>First slide label</h5>
              <p>
                Some representative placeholder content for the first slide.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={Logo} className="d-block w-100" alt="logo" />
            <Carousel.Caption style={{ color: "black" }}>
              <h5>Second slide label</h5>
              <p>
                Some representative placeholder content for the second slide.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={Logo} className="d-block w-100" alt="logo" />
            <Carousel.Caption style={{ color: "black" }}>
              <h5>Third slide label</h5>
              <p>
                Some representative placeholder content for the third slide.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          {/* <Carousel.Prev className="carousel-control-prev" /> */}
          {/* <Carousel.Next className="carousel-control-next" /> */}
        </Carousel>
      </Container>
    </div>
  );
};
export default HomePage;