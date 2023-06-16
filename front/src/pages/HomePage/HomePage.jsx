import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Dropdown, DropdownButton } from "react-bootstrap";
import { useContext } from "react";
import { UserStateContext } from "../../context/user/UserProvider";

import BannerCarousel from "./BannerCarousel";
import TrendingBlogs from "./TrendingBlogs";
import TrendingChallenges from "./TrendingChallenges";
import Intro from './Intro';

import { useState } from "react";
import SeoulDistrictsGraph from "./Data/SeoulDistrictGraph";
import SeoulUsageGraph from "./Data/SeoulUsageGraph";
import SeasonalUsageGraph from "./Data/SeasonalUsageGraph";
import DistrictChart from "./Data/DistrictChart";
import districtInfo from "../../assets/districtInfo";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const HomePage = () => {
  const { user } = useContext(UserStateContext);

  if (!user) {
    return <Intro />;
  }
  
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
          <BannerCarousel />
        </Container>

        <Row className="justify-content-md-end mt-5">
          <Col>
            <h3>최근 5년 서울 전력 평균</h3>
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
            <SeoulUsageGraph />
          </Col>
          <Col>
            <h3>계절별 전력 사용량</h3>
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
              <SeasonalUsageGraph />
          </Col>
        </Row>
        {/* <Container
          style={{
            width: "100%",
            backgroundColor: "#fff",
            border: "1px solid #d6d6d6",
            borderRadius: "10px",
            boxShadow: "3px 3px 4px #ebebeb",
            padding: "20px",
            marginTop: "50px",
          }}
        >
          <h3>서울 평균</h3>
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

      <Row className="justify-content-md-end">
        <Col>
          <SeoulUsageGraph />
        </Col>
        <Col>
          <SeasonalUsageGraph />
        </Col>
      </Row> */}

          
        {/* </Container> */}

        <Container
          style={{
            width: "100%",
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
            className="btn-toolbar justify-content-center justify-content-md-end"
            role="toolbar"
            aria-label="Toolbar with button groups"
          >
              <SeoulDistrictsGraph />

          </div> 
        </Container>

        <TrendingBlogs />
        <TrendingChallenges />
      </div>
      
    </div>
  );
};

export default HomePage;
