import React from "react";
import { Container, Col, Row } from "react-bootstrap";

function My() {
  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #00D387, white, white)",
      }}
    >
      <Container className="pt-5 ps-0 pb-5" style={{ width: "80%" }}>
        <Row>
          <Col xs={3}>
            {/* 왼쪽 컬럼 */}
            <Container
              className="p-4"
              style={{
                height: "100%",
                background: "white",
                textAlign: "center",
              }}
            >
              <Container
                className="pt-5"
                style={{
                  borderRadius: "50%",
                  width: "130px",
                  height: "130px",
                  objectFit: "cover",
                  border: "1px solid grey",
                }}
              >
                사진
              </Container>
              <Container className="mt-3">
                <a style={{ fontWeight: "bold" }}>몽구</a> 님
                <br />
                <a style={{ fontSize: "0.8rem" }}>나의 정보 수정</a>
              </Container>
            </Container>
          </Col>
          <Col className="ps-0" xs={9}>
            {/* 오른쪽 컬럼 */}
            <Container style={{ height: "100%", background: "white" }}>
              <Row style={{ height: "300px" }}>
                <h2>내 주문 이력</h2>
                {/* 내용 추가 */}
              </Row>
              <Row style={{ height: "300px" }}>
                <h2>내 마일리지 이력</h2>
                {/* 내용 추가 */}
              </Row>
              <Row style={{ height: "300px" }}>
                <h2>내 챌린지 이력</h2>
                {/* 내용 추가 */}
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default My;
