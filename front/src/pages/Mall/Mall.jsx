import { useState } from "react";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import Logo from "../../assets/logo.png";

const Mall = () => {
  return (
    <>
      <Container className="text-center">
        <img src={Logo} className="w-50 mt-5 mb-5" alt="Logo" />
      </Container>
      <Container>
        <Row>
          <Col>
            <Card style={{ width: "18rem" }}>
              <img src={Logo} className="card-img-top" alt="Logo" />
              <Card.Body className="card-body">
                <Card.Title className="card-title">물건 품목</Card.Title>
                <Card.Text className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the cards content.
                </Card.Text>
                <a href="#" className="btn btn-primary">
                  판매하는 매장 위치나 정보 넣기
                </a>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "18rem" }}>
              <img src={Logo} className="card-img-top" alt="Logo" />
              <Card.Body className="card-body">
                <Card.Title className="card-title">물건 품목</Card.Title>
                <Card.Text className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the cards content.
                </Card.Text>
                <a href="#" className="btn btn-primary">
                  판매하는 매장 위치나 정보 넣기
                </a>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "18rem" }}>
              <img src={Logo} className="card-img-top" alt="Logo" />
              <Card.Body className="card-body">
                <Card.Title className="card-title">물건 품목</Card.Title>
                <Card.Text className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the cards content.
                </Card.Text>
                <a href="#" className="btn btn-primary">
                  판매하는 매장 위치나 정보 넣기
                </a>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Mall;
