// Intro.js
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Button,
  Container,
  Card,
  OverlayTrigger,
  Tooltip,
  Badge,
} from "react-bootstrap";
const Intro = () => {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true,
    });
  }, []);

  const style = {
    minHeight: "100vh",
    minWidth: "100vw",
  };

  const introStyle = {
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    overflow: "-moz-scrollbars-none hidden",
  };

  return (
    <Container className="container" style={introStyle}>
      <style>
        {`
        ::-webkit-scrollbar {
          display: none;
        }
        .container {
          margin: 0;
          padding: 0;
        }
        .page {
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
      `}
      </style>

      <div className="page" style={{ ...style, backgroundColor: "#00D387" }}>
        <h1 data-aos="fade-up">ECOBUCKS : 절약하고 쇼핑해요</h1>
      </div>

      <div className="page" style={{ ...style, backgroundColor: "#00A36B " }}>
        <Container className="d-flex">
          <h1
            data-aos="fade-up"
            style={{
              color: "white",
              fontSize: "4em",
              textAlign: "left",
              marginBottom: "50px",
              lineHeight: '150%'
            }}
          >
            절약 인증하고
            <br />
            마일리지를 모아요
          </h1>
        </Container>
        {/* 카드예시데이터 */}
        <Container
          className="d-flex justify-content-between overflow-hidden mt-4"
          style={{
            maxWidth: "60vw",
            position: "absolute",
            right: "-90px",
            display: "flex",
          }}
          data-aos="fade-left"
        >
          <Card
            className="mb-4 mt-4 ms-0 ps-0"
            style={{
              width: "17rem",
              position: "relative",
              boxShadow: "8px 8px 15px 1px #7a7a7a",
            }}
          >
            <div
              style={{
                border: "solid 1px #878787",
                borderRadius: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "7rem",
                paddingBottom: "7px",
                margin: "20px",
                background: "linear-gradient(to right, beige, lightblue)",
              }}
            >
              🍃
            </div>
            <Card.Body>
              <Card.Title style={{ textAlign: "left", fontWeight: "900" }}>
                텀블러 사용 인증하기
              </Card.Title>
              <Card.Text style={{ textAlign: "left" }}>
                텀블러를 사용하고 플라스틱 사용을 줄여요.
              </Card.Text>
              <Card.Text style={{ textAlign: "left" }}>
                <span style={{ fontWeight: "900", fontSize: "0.9em" }}>
                  마감 일자
                </span>{" "}
                <span style={{ fontSize: "0.8em" }}>2023-07-14</span>
                <br />
                <span style={{ fontWeight: "900", fontSize: "0.9em" }}>
                  참여 인원
                </span>{" "}
                <span style={{ fontSize: "0.8em" }}>32 명</span>
                <br />
              </Card.Text>
            </Card.Body>
            <Badge
              bg="info"
              className="position-absolute bottom-0 end-0 m-3"
              style={{ zIndex: 1 }}
            >
              댓글 18
            </Badge>
          </Card>
          <Card
            className="mb-4 mt-4 ms-0 ps-0"
            style={{
              width: "17rem",
              position: "relative",
              boxShadow: "8px 8px 15px 1px #7a7a7a",
            }}
          >
            <div
              style={{
                border: "solid 1px #878787",
                borderRadius: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "7rem",
                paddingBottom: "7px",
                margin: "20px",
                background: "linear-gradient(to right, beige, lightblue)",
              }}
            >
              ♻️
            </div>
            <Card.Body>
              <Card.Title style={{ textAlign: "left", fontWeight: "900" }}>
                장바구니 사용 인증하기
              </Card.Title>
              <Card.Text style={{ textAlign: "left" }}>
                장바구니를 사용하고 1회용 비닐을 줄여요.
              </Card.Text>
              <Card.Text style={{ textAlign: "left" }}>
                <span style={{ fontWeight: "900", fontSize: "0.9em" }}>
                  마감 일자
                </span>{" "}
                <span style={{ fontSize: "0.8em" }}>2023-06-30</span>
                <br />
                <span style={{ fontWeight: "900", fontSize: "0.9em" }}>
                  참여 인원
                </span>{" "}
                <span style={{ fontSize: "0.8em" }}>26 명</span>
                <br />
              </Card.Text>
            </Card.Body>
            <Badge
              bg="info"
              className="position-absolute bottom-0 end-0 m-3"
              style={{ zIndex: 1 }}
            >
              댓글 7
            </Badge>
          </Card>
          <Card
            className="mb-4 mt-4 ms-0 ps-0"
            style={{
              width: "16.5rem",
              position: "relative",
              boxShadow: "8px 8px 15px 1px #7a7a7a",
              marginLeft: "-25%",
            }}
          >
            <div
              style={{
                border: "solid 1px #878787",
                borderRadius: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "7rem",
                paddingBottom: "7px",
                margin: "20px",
                background: "linear-gradient(to right, beige, lightblue)",
              }}
            >
              🏞️
            </div>
            <Card.Body>
              <Card.Title style={{ textAlign: "left", fontWeight: "900" }}>
                코드 뽑고 예비전력 아끼기
              </Card.Title>
              <Card.Text style={{ textAlign: "left" }}>
                쓰지 않는 가전제품의 코드를 뽑고 예비 전력을 아껴요.
              </Card.Text>
              <Card.Text style={{ textAlign: "left" }}>
                <span style={{ fontWeight: "900", fontSize: "0.9em" }}>
                  마감 일자
                </span>{" "}
                <span style={{ fontSize: "0.8em" }}>2023-07-21</span>
                <br />
                <span style={{ fontWeight: "900", fontSize: "0.9em" }}>
                  참여 인원
                </span>{" "}
                <span style={{ fontSize: "0.8em" }}>14 명</span>
                <br />
              </Card.Text>
            </Card.Body>
            <Badge
              bg="info"
              className="position-absolute bottom-0 end-0 m-3"
              style={{ zIndex: 1 }}
            >
              댓글 9
            </Badge>
          </Card>
        </Container>
      </div>

      <div className="page" style={{ ...style, backgroundColor: "#00D387" }}>
        <h1 data-aos="fade-up">ECOBUCKS : 절약하고 쇼핑해요</h1>
      </div>
    </Container>
  );
};

export default Intro;
