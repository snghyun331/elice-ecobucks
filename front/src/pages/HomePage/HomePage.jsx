import { Link } from "react-router-dom";
import { Container, Button, Dropdown, DropdownButton} from "react-bootstrap";
import map from "../../../../data/seoul_map/seoulMap.png";
import DomesticAverage from "../../../../data/DomesticAverage.png";
import DomesticDistrict from "../../../../data/DomesticDistrict.png";
import Industry from "../../../../data/Industry.png";
import mall from "../../assets/mall.png";
import tip from "../../assets/tip.png";
import challenge from "../../assets/challenge.png";
import TipCarousel from "./TipCarousel";
import { useState } from "react";
const HomePage = () => {
  const [currentImg, setCurrentImg] = useState(map);
  const handleButtonClick = (img) => {
    setCurrentImg(img);
  };

  const districts = {
    1: "강남구",
    2: "강동구",
    3: "강북구",
    4: "강서구",
    5: "관악구",
    6: "광진구",
    7: "구로구",
    8: "금천구",
    9: "노원구",
    10: "도봉구",
    11: "동대문구",
    12: "동작구",
    13: "마포구",
    14: "서대문구",
    15: "서초구",
    16: "성동구",
    17: "성북구",
    18: "송파구",
    19: "양천구",
    20: "영등포구",
    21: "용산구",
    22: "은평구",
    23: "종로구",
    24: "중구",
    25: "중랑구"
  };


  return (
    <div style={{ justifyContent: "center", padding: "60px" }}>
      <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: "60%",
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
      <span>전력통계</span>
      <Container
        style={{
          width: "100%",
          height: "50vh",
          backgroundColor: "#fff",
          border: "1px solid #000",
          borderRadius: "10px",
          padding: "10px",
          marginTop: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={currentImg}  style={{width:"50%", height:"100%" }} />
        <div
          className="btn-toolbar justify-content-md-end"
          role="toolbar"
          aria-label="Toolbar with button groups"
        >
          <div className="d-grid gap-2 mx-auto justify-content-md-end">
            <DropdownButton title="서울시 전체">
            {Object.entries(districts).map(([key, district]) => (
          <Dropdown.Item key={key} onClick={() => handleButtonClick(district)}>
            {district}
          </Dropdown.Item>
        ))}
            </DropdownButton>
            <button type="button" className="btn btn-primary" onClick={()=>handleButtonClick(Industry)}>
              산업용
            </button>
            <button type="button" className="btn btn-primary" onClick={()=>handleButtonClick(DomesticAverage)}>
              서울시 평균 사용량(가정용)
            </button>
            <button type="button" className="btn btn-primary" onClick={()=>handleButtonClick(DomesticDistrict)}>
              구 별 사용량(가정용)
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
