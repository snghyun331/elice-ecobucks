import { Link } from "react-router-dom";
import { Container, Button, Dropdown, DropdownButton } from "react-bootstrap";
import map from "../../../../data/seoul_map/seoulMap.png";
// import DomesticAverage from "../../../../data/DomesticAverage.png";
// import DomesticDistrict from "../../../../data/DomesticDistrict.png";
import district1 from "../../../../data/seoul_map/district1.png";
// import district2 from "../../../../data/seoul_map/district2.png";
// import district3 from "../../../../data/seoul_map/district3.png";
// import district4 from "../../../../data/seoul_map/district4.png";
// import district5 from "../../../../data/seoul_map/district5.png";
// import Industry from "../../../../data/Industry.png";
import mallIcon from "../../assets/mallIcon.png";
import blogIcon from "../../assets/blogIcon.png";
import challengeIcon from "../../assets/challengeIcon.png";
import TipCarousel from "./TipCarousel";
import { useState } from "react";
import SeoulDistrictsGraph from "./Data/SeoulDistrictGraph";
import SeoulUsageChart from "./Data/SeoulUsageGraph";
import DistrictChart from "./Data/DistrictChart";
import districtInfo from "../../assets/districtInfo";
const HomePage = () => {

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          flexGrow: 1,
          justifyContent: "center",
          paddingLeft: "140px",
          paddingRight: "140px",
          paddingTop: "150px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: "70%",
            background: "#00D387",
            zIndex: -1,
          }}
        ></div>
        <Container>
          <TipCarousel />
        </Container>
        <Container
          style={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <Link to="/challenge">
            <Button
              type="button"
              style={{
                display: "grid",
                marginRight: "20px",
                backgroundColor: "transparent",
                placeItems: "center",
                border: "0px",
              }}
            >
              <img
                src={challengeIcon}
                style={{ width: "3.5rem" }}
                alt="Challenge"
              />
              <span style={{ color: "black", fontSize: "0.9rem" }}>챌린지</span>
            </Button>
          </Link>
          <Link to="/blog">
            <Button
              type="button"
              style={{
                display: "grid",
                marginRight: "20px",
                backgroundColor: "transparent",
                placeItems: "center",
                border: "0px",
              }}
            >
              <img src={blogIcon} style={{ width: "3.5rem" }} alt="Blog" />
              <span
                style={{
                  color: "black",
                  fontSize: "0.9rem",
                  textDecoration: "none",
                }}
              >
                블로그
              </span>{" "}
            </Button>
          </Link>
          <Link to="/mall">
            <Button
              type="button"
              style={{
                display: "grid",
                backgroundColor: "transparent",
                placeItems: "center",
                border: "0px",
              }}
            >
              <img src={mallIcon} style={{ width: "3.5rem" }} alt="Mall" />
              <span style={{ color: "black", fontSize: "0.9rem" }}>떠리몰</span>
            </Button>
          </Link>
        </Container>

        <Container
          style={{
            width: "100%",
            height: "50vh",
            backgroundColor: "#fff",
            border: "1px solid #d6d6d6",
            borderRadius: "10px",
            boxShadow: "3px 3px 4px #ebebeb",
            padding: "20px",
            marginTop: "50px",
          }}
        >
          <h3>전력통계</h3>
          <div
            style={{
              marginTop: "18px",
              height: "5.5px",
              width: "120px",
              backgroundColor: "#FF6B00",
              borderRadius: "10px",
            }}
          >
            {" "}

          </div>

          <div
            className="btn-toolbar justify-content-md-end"
            role="toolbar"
            aria-label="Toolbar with button groups"
          >
            <div className="d-flex gap-2 mx-auto justify-content-md-end">
              <SeoulDistrictsGraph />
              {/* <DistrictChart /> */}
            </div>
          </div> 
        </Container>

        <Container
          style={{
            width: "100%",
            height: "30vh",
            border: "1px solid #d6d6d6",
            boxShadow: "3px 3px 4px #ebebeb",
            borderRadius: "10px",
            padding: "20px",
            marginTop: "50px",
          }}
        >
          {" "}
          <h3>요즘 뜨는 절약 팁</h3>
          <div
            style={{
              marginTop: "18px",
              height: "5.5px",
              width: "120px",
              backgroundColor: "#FF6B00",
              borderRadius: "10px",
            }}
          >
            {" "}
            {/* <DistrictChart /> */}
          </div> 
  
        </Container>

        <Container
          style={{
            width: "100%",
            height: "30vh",
            backgroundColor: "#fff",
            border: "1px solid #d6d6d6",
            boxShadow: "3px 3px 4px #ebebeb",
            borderRadius: "10px",
            padding: "20px",
            marginTop: "50px",
          }}
        >
          {" "}
          <h3>요즘 뜨는 챌린지</h3>
          <div
            style={{
              marginTop: "18px",
              height: "5.5px",
              width: "120px",
              backgroundColor: "#FF6B00",
              borderRadius: "10px",
            }}
          >
            {" "}

          </div>
        </Container>
      </div>
      <footer
        style={{
          backgroundColor: "#00D387",
          width: "100%",
          padding: "40px 140px",
          marginTop: "50px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "white",
            fontSize: "0.8rem",
          }}
        >
          <div>
            에코벅스
            <br />
            대표이사 벨루가
            <br />
            사업자등록번호 999-99-99999
            <br />
            통신판매업신고번호 9999-999-999999
            <br />
            서울 에코시 벅스구 절약로 777
          </div>
          <div>
            이메일 상담 ecobucks@ecobucks.com
            <br />
            유선 상담 9999-9999
            <br /><a style={{ fontWeight: '900' }}>© ecobucks Co., Ltd.</a>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "white",
            fontSize: "0.8rem",
            textAlign: "center",
            paddingTop: '30px',
            fontStyle: 'italic'
          }}
        >
          에코벅스는 통신판매중개자이며 통신판매 당사자가 아닙니다. 상품,
          상품정보, 거래에 관한 의무와 책임은 판매자에게 있으므로, 각 상품
          페이지에서 구체적인 내용을 확인하시기 바랍니다.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
