import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <>
      <h3>
        <span style={{ color: "#00D387", fontSize: "48px" }}>ECOBUCKS</span>
      </h3>
      <span style={{ color: "#FF6B00", fontSize: "24px" }}>
        Make Tomorrow Bright
      </span>
      <div sytle={{ marginBottom: "20px" }}>
        <Link to="/mall">
          <button
            type="button"
            style={{ marginRight: "20px", backgroundColor: "#07F39E" }}
          >
            쇼핑몰로 이동
          </button>
        </Link>
        <Link to="/blog">
          <button
            type="button"
            style={{ marginRight: "20px", backgroundColor: "#07F39E" }}
          >
            블로그로 이동
          </button>
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
      </div>

      <div
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
      </div>
      <div
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
      </div>
    </>
  );
};
export default HomePage;
