/** 작성자: 정원석
 * mapping으로 판매할 물건 자동 추가, 삭제
 */
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import Logo from "../../assets/logo.png";
import SeoulMap from "../../../../data/seoul_map/seoulMap.png"; // 나중에 삭제하기
import * as Api from "../../api";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserStateContext } from "../../context/user/UserProvider";
const Mall = () => {
  const [list, setList] = useState([]);
  const userState = useContext(UserStateContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    // 만약 전역 상태의 user가 null이거나 탈퇴한 회원이라면, 로그인 페이지로 이동함.
    if (!userState.user || !userState.user.is_withdrawed == false) {
      navigate("/login", { replace: true });
      return;
    }
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      // "/mypage" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
      const res = await Api.get("products");
      console.log("db data: ",res.data)
      
      const newList = res.data.map(item => {
        return {
          name: item.name,
          price: item.price,
          place: item.place,
          stock: item.stock,
          description: item.description
        };
      });
      setList(newList);
      console.log(list.map(item => (console.log(item))));
    } catch (err){
      // alert("정보 불러오기를 실패하였습니다.");
      console.log("몰불러오기를 실패하였습니다.", err);
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
            <Col key={item._id}>
              <Card style={{ width: "18rem" }}>
                {/* <img src={item.imageUrl} className="card-img-top" alt="Logo" /> */}
                <Card.Body className="card-body">
                  <Card.Title className="card-title"><span>상품명:</span> {item.name}</Card.Title>
                  
                  <Card.Text className="card-text">가격: {item.price}</Card.Text>
                  <Card.Text className="card-text">위치: {item.place}</Card.Text>
                  <Card.Text className="card-text">설명: {item.description}</Card.Text>
                  {/* <a href={item.place} className="btn btn-primary">
                    판매하는 매장 위치나 정보 넣기
                  </a> */}
                  
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
