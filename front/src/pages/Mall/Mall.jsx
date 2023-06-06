/** 작성자: 정원석
 * mapping으로 판매할 물건 자동 추가, 삭제
 */
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import Logo from "../../assets/logo.png";
import SeoulMap from "../../../../data/seoul_map/seoulMap.png"; // 나중에 삭제하기
import * as Api from "../../api";
import { useEffect, useState } from "react";

const Mall = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetchDataAndCreateList();
  }, []);

  async function fetchDataAndCreateList() {
    try {
      // 데이터베이스에서 데이터를 가져옵니다.
      const response = await Api.get("mall"); // "your-endpoint"에 데이터 가져오기에 필요한 엔드포인트를 입력합니다.
      const data = response.data;

      // 데이터를 기반으로 목록을 생성합니다.
      const newList = data.map(item => {
        // 각 항목에 대한 작업 수행
        return item.property; // 예시: 데이터에서 원하는 속성을 추출
      });

      // 생성된 목록을 상태로 설정합니다.
      setList(newList);
    } catch (error) {
      console.error("데이터를 가져오는 중에 오류가 발생했습니다.", error);
    }
  }
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
        {list.map(item => (
            <Col key={item.id}>
              <Card style={{ width: "18rem" }}>
                <img src={item.imageUrl} className="card-img-top" alt="Logo" />
                <Card.Body className="card-body">
                  <Card.Title className="card-title">{item.title}</Card.Title>
                  <Card.Text className="card-text">{item.description}</Card.Text>
                  <a href={item.storeLocation} className="btn btn-primary">
                    판매하는 매장 위치나 정보 넣기
                  </a>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Mall;
