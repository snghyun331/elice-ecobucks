import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
const HomePage = () => {
  return (
    <div>
      <h3 style={{ display: "flex", justifyContent: "center" }}>
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
        <button type="button" style={{ backgroundColor: "#07F39E" }}>
          챌린지
        </button>
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
        <span>HOT</span>
      </Container>
    </div>
  );
};
export default HomePage;
