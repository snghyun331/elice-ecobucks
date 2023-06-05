import { Link } from "react-router-dom";
import { Container, Button} from "react-bootstrap";
import mall from "../../assets/mall.png";
import tip from "../../assets/tip.png";
import challenge from "../../assets/challenge.png";
import TipCarousel from "./TipCarousel";
const HomePage = () => {
  return (
    <div style={{ justifyContent: "center", padding: "60px" }}>
      <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: "70%",
            background: "#4d9e81",
            zIndex: -1
          }}
        ></div>
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
            style={{display:"grid", marginRight: "20px", backgroundColor: "#fff", placeItems: "center",}}
          >
            <img src={mall}></img>
            <span style={{color: "black"}}>떠리몰</span>
          </Button>
        </Link>
        <Link to="/blog">
          <Button
            type="button"
            style={{ display:"grid", marginRight: "20px", backgroundColor: "#fff", placeItems: "center", }}
          >
            <img src={tip}></img>
            <span style={{color: "black"}}>블로그</span>
          </Button>
        </Link>
        <button
          type="button"
          style={{ marginRight: "20px", backgroundColor: "#fff" }}
        >
          <span style={{color:"black"}}>전력 통계</span>
        </button>
        <Link to="/challenge">
          <Button type="button" style={{ display:"grid", backgroundColor: "#fff", placeItems:"center" }}>
          <img src={challenge}></img>
          <span style={{color: "black"}}>챌린지</span>
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
        <TipCarousel />
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
      ></Container>
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
      ></Container>
    </div>
  );
};
export default HomePage;
