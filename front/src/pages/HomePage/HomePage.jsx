import { Container, Row, Col, Card } from "react-bootstrap";
import { useContext } from "react";
import { UserStateContext } from "../../context/user/UserProvider";

import BannerCarousel from "./BannerCarousel";
import TrendingBlogs from "./TrendingBlogs";
import TrendingChallenges from "./TrendingChallenges";
import Intro from "./Intro";

import SeoulDistrictsGraph from "./Data/SeoulDistrictGraph";
import SeoulUsageGraph from "./Data/SeoulUsageGraph";
import SeasonalUsageGraph from "./Data/SeasonalUsageGraph";

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
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

        <Row
          className="justify-content-md-end mt-5"
          style={{ alignItems: "stretch" }}
        >
          <Col xl={6}>
            <Card
              style={{
                border: "1px solid #cccccc",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                boxShadow: "3px 3px 4px #ebebeb",
              }}
            >
              <Card.Body style={{ display: "flex", flexDirection: "column" }}>
                <h3>서울시 가구 당 전력 사용량 평균 (연도별)</h3>
                <h6>(단위 : kWh)</h6>
                <div
                  style={{
                    marginTop: "18px",
                    height: "5.5px",
                    width: "120px",
                    backgroundColor: "#FF6B00",
                    borderRadius: "10px",
                  }}
                ></div>
                <SeoulUsageGraph />
              </Card.Body>
            </Card>
          </Col>

          <Col xl={6}>
            <Card
              style={{
                border: "1px solid #cccccc",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                boxShadow: "3px 3px 4px #ebebeb",
              }}
            >
              <Card.Body style={{ display: "flex", flexDirection: "column" }}>
                <h3>서울시 가구 당 전력 사용량 평균 (계절별)</h3>
                <h6>(단위 : kWh)</h6>
                <div
                  style={{
                    marginTop: "18px",
                    height: "5.5px",
                    width: "120px",
                    backgroundColor: "#FF6B00",
                    borderRadius: "10px",
                  }}
                ></div>
                <SeasonalUsageGraph />
              </Card.Body>
            </Card>
          </Col>
        </Row>

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
          <h3>서울시 가구 당 전력 사용량 평균 (구별)</h3>
          <h6>(단위 : kWh)</h6>
          <h6>구를 선택하여 구별 차이를 확인해보세요.</h6>
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
