/** 작성자: 정원석
 * mapping으로 판매할 물건 자동 추가, 삭제
 */
import { Container, Button, Card, Row, Col, Modal } from "react-bootstrap";
import Logo from "../../assets/logo.png";
import SeoulMap from "../../../../data/seoul_map/seoulMap.png"; // 나중에 삭제하기
import * as Api from "../../api";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserStateContext } from "../../context/user/UserProvider";
import MallProductSell from "./MallProductSell";
const Mall = () => {
  const [list, setList] = useState([]);
  const [sellModalOpen, setSellModalOpen] = useState(false);
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const handleCloseSellModal = () => setSellModalOpen(false);
  const handleOpenSellModal = () => setSellModalOpen(true);
  const handleClosePurchaseModal = () => setPurchaseModalOpen(false);
  const handleOpenPurchaseModal = () => setPurchaseModalOpen(true);
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

  const handleConfirmPurchase = () => {

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
        .
      </Container>
      <Button variant="primary" style={{ marginBottom: "10px", top: "5" }} onClick={handleOpenSellModal}>
          판매 상품 등록하기
          </Button>
      <Modal show={sellModalOpen} onHide={handleCloseSellModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>상품 등록</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <MallProductSell />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="mt-4 mb-4"
            variant="secondary"
            onClick={handleCloseSellModal}
            style={{
              width: "100%",
              borderRadius: "0px",
            }}
          >
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
      
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
                  <Button variant="primary" style={{ marginBottom: "10px", top: "5" }} onClick={handleOpenPurchaseModal}>
          구매
          </Button>
                  {/* onClick={() => handlePurchase(item._id)} */}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        
        <Modal show={purchaseModalOpen} onHide={handleClosePurchaseModal}>
        <Modal.Header closeButton>
          <Modal.Title>구매 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          선택한 상품을 구매하시겠습니까?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePurchaseModal}>취소</Button>
          <Button variant="primary" onClick={handleConfirmPurchase}>구매하기</Button>
          
        </Modal.Footer>
      </Modal>
    </Container>
    </div>
  );
};

export default Mall;
