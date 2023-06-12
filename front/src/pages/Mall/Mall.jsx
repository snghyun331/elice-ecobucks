/** 작성자: 정원석 */
import { Container, Button, Card, Row, Col, Modal } from "react-bootstrap";
import Logo from "../../assets/logo.png";
import * as Api from "../../api";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserStateContext } from "../../context/user/UserProvider";
import MallProductSell from "./MallProductSell";
import MallProductEdit from "./MallProductEdit";
const Mall = () => {
  const [list, setList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const [sellModalOpen, setSellModalOpen] = useState(false);
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  
  const handleCloseSellModal = () => setSellModalOpen(false);
  const handleOpenSellModal = async (itemId) => {
    try {
      const res = await Api.get(`products/${itemId}`);
      const product = res.data;
      setSelectedItem(product);
      console.log("handleOpenSellModal 안에서 selectedItem: ", selectedItem)
    } catch (err) {
      console.log(err);
    }
    setSellModalOpen(true)
  };

  const handleClosePurchaseModal = () => setPurchaseModalOpen(false);
  const handleOpenPurchaseModal = (item) => {
    setSelectedItem(item);
    console.log(selectedItem);
    setPurchaseModalOpen(true);
  };

  const handleCloseEditModal = () => setEditModalOpen(false);
  const handleOpenEditModal = async (itemId) => {
    try {
      const res = await Api.get(`products/${itemId}`);
      // console.log(res); //res 데이터 잘 받아옴.
      const product = res.data;
      setSelectedItem(product);
      // console.log("selectedItem: ", selectedItem);
    } catch(err) {
      console.log(err);
    }
    
    setEditModalOpen(true);
  };
  const handleCloseDeleteModal = () => setDeleteModalOpen(false);
  const handleOpenDeleteModal = async (itemId) => {
    try {
      const res = await Api.get(`products/${itemId}`);
      const product = res.data;
      console.log(product);
      setSelectedItem(product);
    } catch (err) {
      console.log(err);
    }
    setDeleteModalOpen(true);
  };

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

  // useEffect(() => {
  //   fetchData();
  // }, []);
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
          description: item.description,
          seller: item.seller,
          sellerName: item.sellerName,
          _id: item._id //상품 ObjectId
        };
      });
      setList(newList);
      // console.log(list.map(item => (console.log(item))));
    } catch (err){
      // alert("정보 불러오기를 실패하였습니다.");
      console.log("몰불러오기를 실패하였습니다.", err);
    }
  }

  const handleConfirmPurchase = async (selectedItem) => {
// 물건 구매 버튼, stock, user mileage 줄이기
    try {
      // 마일리지 충분한지 확인하기
      // 유효성 검사: 구매할 수 있는 수량인지. (수량이 0 개이면 db 삭제)
      console.log("함수 안에서 selectedItem: ", selectedItem);
      await Api.post(`orders/`, {
        productId: selectedItem._id,
      });

      const newRes = await Api.get(`products/${selectedItem._id}`);
      const newProduct = newRes.data;
      // console.log(newProduct);
      const updatedList = list.map(item => {
        if (item._id === newProduct._id) {
          return { ...newProduct };
        }
        return item;
      })
      // console.log("updatedList: ", updatedList);
      setList(updatedList);
      handleClosePurchaseModal();
    } catch (err) {
      console.log("상품 구매에 실패하였습니다.", err);
    }
  }

  const handleEditProduct = async (selectedItem, updatedItem) => {
    try {
      console.log("selectedItem: ", selectedItem);
      console.log("updatedItem: ", updatedItem);
      //잘 받아옴.

      const updatedProduct = {
        // ...selectedItem,
        name: updatedItem.name,
        place: updatedItem.place,
        price: updatedItem.price,
        stock: updatedItem.stock,
        description: updatedItem.description
      };
      console.log("updatedProduct: ", updatedProduct);

      await Api.put(`products/${selectedItem._id}`, updatedProduct);

      const updatedList = list.map(item => {
        if (item._id === selectedItem._id) {
          return { ...selectedItem,
            name: updatedItem.name,
            place: updatedItem.place,
            price: updatedItem.price,
            stock: updatedItem.stock,
            description: updatedItem.description
          };
        }
        return item;
      });
      setList(updatedList);
      handleCloseEditModal();

    } catch (err) {
      console.log("상품 수정에 실패했습니다", err);
    }
  }
  
  const handleDeleteProduct = async (selectedItem) => {
    try {
      console.log("삭제할 상품: ", selectedItem);
      await Api.delete(`products/${selectedItem._id}`);
      
      const res = await Api.get("products");
      const newList = res.data.map(item => {
        return {
          name: item.name,
          price: item.price,
          place: item.place,
          stock: item.stock,
          description: item.description,
          seller: item.seller,
          sellerName: item.sellerName,
          _id: item._id //상품 ObjectId
        };
      });
      setList(newList);
      handleCloseDeleteModal();
    } catch (err) {
      console.log("상품 삭제에 실패했습니다.", err);
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
                <Card.Body className="card-body">
                  <Card.Title className="card-title"><span>상품명:</span> {item.name}</Card.Title>
                  
                  <Card.Text className="card-text">가격: {item.price}</Card.Text>
                  <Card.Text className="card-text">위치: {item.place}</Card.Text>
                  <Card.Text className="card-text">판매자: {item.sellerName}</Card.Text>
                  <Card.Text className="card-text">재고: {item.stock}</Card.Text>
                  <Card.Text className="card-text">설명: {item.description}</Card.Text>
                  {userState.user._id === item.seller && (
                    <>
                      <Button variant="primary" style={{ margin: "10px", top: "5" }} onClick={() => handleOpenEditModal(item._id)}>
                        수정
                      </Button>
                      <Modal show={editModalOpen} onHide={handleCloseEditModal} centered>
                        <Modal.Header closeButton>
                          <Modal.Title>상품 수정</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="text-center">
                          <MallProductEdit handleEditProduct={handleEditProduct} selectedItem={selectedItem} />
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            className="mt-4 mb-4"
                            variant="secondary"
                            onClick={handleCloseEditModal}
                            style={{
                              width: "100%",
                              borderRadius: "0px",
                            }}
                          >
                            닫기
                          </Button>
                        </Modal.Footer>
                      </Modal>
                      <Button variant="primary" style={{ margin: "10px", top: "5" }} onClick={() => handleOpenDeleteModal(item._id)}>
                        삭제
                      </Button>
                      <Modal show={deleteModalOpen} onHide={handleCloseDeleteModal} centered>
                        <Modal.Header closeButton>
                          <Modal.Title>상품 삭제</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="text-center">
                          선택한 상품을 삭제하시겠습니까?
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDeleteModal}>취소</Button>
                        <Button variant="primary" onClick={() => handleDeleteProduct(selectedItem)}>삭제하기</Button> 
                        </Modal.Footer>
                      </Modal>
                    </>
                  )}
                  <Button 
                    variant="primary" 
                    style={{ margin: "10px", top: "5" }} 
                    onClick={() => handleOpenPurchaseModal(item)}
                    disabled={item.stock === 0}
                  >
                      구매
                  </Button>
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
          <Card.Text className="card-text">상품: {selectedItem && selectedItem.name}</Card.Text>
          <Card.Text className="card-text">가격: {selectedItem && selectedItem.price}</Card.Text>
          <Card.Text className="card-text">판매처: {selectedItem && selectedItem.place}</Card.Text>
          <Card.Text className="card-text">설명: {selectedItem && selectedItem.description}</Card.Text>
          선택한 상품을 구매하시겠습니까?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePurchaseModal}>취소</Button>
          <Button variant="primary" onClick={() => handleConfirmPurchase(selectedItem)}>구매하기</Button> 
          
        </Modal.Footer>
      </Modal>
    </Container>
    </div>
  );
};

export default Mall;
