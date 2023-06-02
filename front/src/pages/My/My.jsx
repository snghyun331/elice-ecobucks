import React, { useState } from "react";
import { Container, Col, Row, Modal, Button } from "react-bootstrap";
import UserEditForm from "../../components/My/UserEditForm";
import UserOrderHistory from "../../components/My/UserOrderHistory";
import UserMileageHistory from "../../components/My/UserMileageHistory";

function My() {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleOpenModal = () => setShowModal(true);

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
            <Container className='p-5' style={{ height: "100%", background: "white" }}>
              <Row>
                <h5>내 주문 이력</h5>
                <UserOrderHistory />
              </Row>
              <Row>
                <h5>마일리지 적립 이력</h5>
                <UserMileageHistory />
              </Row>
              <Row>
                <h5>내 챌린지 이력</h5>
                {/* 내용 추가 */}
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

export default My;
