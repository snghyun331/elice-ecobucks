/** 작성자: 정원석
 * mapping으로 판매할 물건 자동 추가, 삭제
 */
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import Logo from "../../assets/logo.png";
import SeoulMap from "../../../../data/seoul_map/seoulMap.png"; // 나중에 삭제하기

const Mall = () => {
  return (
    <div style={{zIndex: "-1", padding:"60px"}}>
      <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: "70%",
            background: "#4d9e81",
            zIndex: -1,
          }}
        ></div>
      <Container className="text-center">
        <img src={Logo} className="w-50 mt-5 mb-5" alt="Logo" />
      </Container>
      <Container
        style={{
          width: "60%",
          height: "30vh",
          backgroundColor: "#fff",
          border: "1px solid #000",
          borderRadius: "10px",
          padding: "10px",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <span>아마 지도 API로 지도가 들어갈 자리</span>
        <br />
        <img src={SeoulMap} style={{ maxWidth: "80%", maxHeight: "80%" }} />
        <Button
          style={{
            position: "fixed",
            right: "10%",
            marginRight: "20px",
            marginTop: "20px",
          }}
        >
          떠리상품 판매하기(사장님이)
        </Button>
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
    </div>
  );
};

export default Mall;
