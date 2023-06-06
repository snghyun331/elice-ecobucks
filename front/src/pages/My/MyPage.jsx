import React, { useState } from "react";
import { Container, Col, Row, Modal, Button } from "react-bootstrap";
import UserEditForm from "./UserEditForm";
import UserOrderHistory from "./UserOrderHistory";
import UserMileageHistory from "./UserMileageHistory";
import UserSummary from "./UserSummary";

function MyPage() {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleOpenModal = () => setShowModal(true);

  return (
    <div>
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
      <Container className="pt-5 ps-0 pb-5" style={{ width: "80%" }}>
        <Row>
          <Col xs={3} className="ps-0">
            {/* 왼쪽 컬럼 */}
            <Container
              className="p-4"
              style={{
                height: "100%",
                background: "white",
                textAlign: "center",
                border: "1px solid lightgray",
              }}
            >
              <Container
                className="pt-5"
                style={{
                  borderRadius: "50%",
                  width: "7rem",
                  height: "7rem",
                  objectFit: "cover",
                  border: "1px solid grey",
                }}
              >
                사진
              </Container>
              <Container className="mt-3">
                <a style={{ fontWeight: "bold" }}>몽구</a> 님
                <br />
                <a
                  style={{ fontSize: "0.8rem", cursor: "pointer" }}
                  onClick={handleOpenModal}
                >
                  나의 정보 수정
                </a>
              </Container>
            </Container>
          </Col>
          <Col className="ps-0" xs={9}>
            {/* 오른쪽 컬럼 */}
            <Container
              className="p-5"
              style={{
                height: "100%",
                background: "white",
                border: "1px solid lightgray",
                borderLeft: "1px solid lightgray",
                marginLeft: "-13px",
              }}
            >
              <Row>
                <h5 style={{ fontWeight: "bold" }}>나의 활동</h5>
                <UserSummary />
              </Row>
              <Row>
                <h5 style={{ fontWeight: "bold" }}>주문 이력</h5>
                <UserOrderHistory />
              </Row>
              <Row>
                <h5 style={{ fontWeight: "bold" }}>마일리지 적립 이력</h5>
                <UserMileageHistory />
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>내 정보 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <UserEditForm />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="mt-4 mb-4"
            variant="secondary"
            onClick={handleCloseModal}
            style={{
              width: "100%",
              borderRadius: "0px",
            }}
          >
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MyPage;