/** 작성자: 정원석 */
import { Container, Button, Card, Row, Col, Modal } from "react-bootstrap";
import Logo from "../../assets/logo.png";
import * as Api from "../../api";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserStateContext,
  DispatchContext,
} from "../../context/user/UserProvider";
import { UPDATE_USER } from "../../reducer/action";
import MallProductSell from "./MallProductSell";
import MallProductEdit from "./MallProductEdit";
import MapContainer from "./MapContainer";
import PaginationBar from "../Modal/PaginationBar";
import placelocate from "../../assets/placeholder.png";
import { ShoppingBagIcon, MapPinIcon } from "@heroicons/react/20/solid";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { formatDateTime } from "../../util/common";
const Mall = () => {
  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemLocate, setItemLocate] = useState({});

  ///pagination////
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  /////////////////

  const handlePageChange = (newPage) => {
    if (newPage < 1) {
      setCurrentPage(1)
    } else if (newPage > totalPages) {
      setCurrentPage(totalPages)
    } else {
      setCurrentPage(newPage);
    }
  };

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
      console.log("handleOpenSellModal 안에서 selectedItem: ", selectedItem);
    } catch (err) {
      console.log(err);
    }
    setSellModalOpen(true);
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
    } catch (err) {
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

  // useEffect(() => {
  //   // 만약 전역 상태의 user가 null이거나 탈퇴한 회원이라면, 로그인 페이지로 이동함.
  //   if (!userState.user || !userState.user.is_withdrawed == false) {
  //     navigate("/login", { replace: true });
  //     return;
  //   }
  //   fetchData();
  // }, []);
  useEffect(() => {
    if (!userState.user || !userState.user.is_withdrawed == false) {
      navigate("/login", { replace: true });
      return;
    }
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      // "/mypage" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
      const res = await Api.get(`products?page=${currentPage}`);
      // const imageRes = await Api.get(`images/${res.data.products._id}`);

      console.log("db data: ", res.data.newProducts);
      const newList = res.data.newProducts.map((item) => {
        return {
          name: item.name,
          price: item.price,
          place: item.place,
          stock: item.stock,
          description: item.description,
          seller: item.seller,
          sellerName: item.sellerName,
          location: item.location,
          path: item.path,
          createdAt: item.createdAt,
          _id: item._id, //상품 ObjectId
        };
      });
      console.log("newList: ", newList);
      const totalpage = res.data.totalPages;
      setTotalPages(totalpage);
      setList(newList);
      // console.log(list.map(item => (console.log(item))));
    } catch (err) {
      // alert("정보 불러오기를 실패하였습니다.");
      console.log("몰불러오기를 실패하였습니다.", err);
    }
  };

  const extractLocations = () => {
    const locations = list.map((product) => ({
      lat: product.location.y,
      lng: product.location.x,
      name: product.name,
      stock: product.stock,
    }));
    // console.log("extractLocations: ", locations);
    return locations;
  };
  const handleConfirmPurchase = async (selectedItem) => {
    // 물건 구매 버튼, stock, user mileage 줄이기
    try {
      // 마일리지 충분한지 확인하기
      // 유효성 검사: 구매할 수 있는 수량인지. (수량이 0 개이면 db 삭제)
      console.log("함수 안에서 selectedItem: ", selectedItem);
      await Api.post(`orders/`, {
        productId: selectedItem._id,
      });
      fetchData();

      const userData = await Api.get("current");
      const user = userData.data;

      dispatch({
        type: UPDATE_USER,
        payload: user,
      });

      handleClosePurchaseModal();
    } catch (err) {
      alert(err.response.data.message);
      console.log("상품 구매에 실패하였습니다.", err);
    }
  };

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
        description: updatedItem.description,
      };
      console.log("updatedProduct: ", updatedProduct);

      await Api.put(`products/${selectedItem._id}`, updatedProduct);

      const updatedList = list.map((item) => {
        if (item._id === selectedItem._id) {
          return {
            ...selectedItem,
            name: updatedItem.name,
            place: updatedItem.place,
            price: updatedItem.price,
            stock: updatedItem.stock,
            description: updatedItem.description,
          };
        }
        return item;
      });
      setList(updatedList);
      handleCloseEditModal();
    } catch (err) {
      console.log("상품 수정에 실패했습니다", err);
    }
  };

  const handleDeleteProduct = async (selectedItem) => {
    try {
      console.log("삭제할 상품: ", selectedItem);
      await Api.delete(`products/${selectedItem._id}`);
      fetchData();
      handleCloseDeleteModal();
    } catch (err) {
      console.log("상품 삭제에 실패했습니다.", err);
    }
  };
  const handleLocate = (selectedItem) => {
    window.scrollTo(100,100);
    setItemLocate(selectedItem.location);
  };

  return (
    <>
      <div style={{ zIndex: "-1", padding: "60px" }}>
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
        >
        </div>
        <div
          style={{
            position: "absolute",
            top: 80,
            left: "18%",
            right: 0,
            zIndex: 1,
            color: "white",
            fontSize: "2rem",
            fontWeight: "900",
          }}
        >
          떠리몰 :
          <br />
          <span style={{ fontSize: "1.3rem", fontWeight: "400" }}>
            소상공인의 유통기한 임박 상품을 마일리지로 구입할 수 있어요.
          </span>
        </div>
        <Container
          className="pt-5 pb-5 d-flex flex-column align-items-center justify-content-center"
          style={{
            marginTop: "140px",
            width: "80%",
            border: "1px solid #c2c2c2",
            backgroundColor: "white",
            borderRadius: "10px",
            minHeight: "500px",  // height 값을 지정합니다.
            overflow: 'hidden',
            padding: '30px'
          }}
        >
          <Container
            style={{
              alignSelf: "flex-start",
              paddingLeft: "50px",
              fontSize: "1.8em",
              paddingBottom: "20px",
            }}
          >
            매장 위치 안내
          </Container>
          <Container
            className="text-muted mb-2"
            style={{ fontSize: "0.85rem", textAlign: 'left', paddingLeft: '50px', paddingBottom: '20px' }}
          >
            판매 상품의 핀을 클릭하면 위치를 확인할 수 있어요.
          </Container>
          <MapContainer
            locations={extractLocations()}
            selectedItemLocate={itemLocate}
          />
        </Container>


        <Container className="pt-2 pb-10 d-flex flex-column align-items-center justify-content-center">
          <Button
            variant="light"
            style={{
              width: "30%",
              borderRadius: "0px",
              backgroundColor: "#00D387",
              color: "white",
              fontWeight: "900",
              marginBottom: "10px"
            }}
            onClick={handleOpenSellModal}
          >
            상품 등록
          </Button>
          <Modal size='lg' show={sellModalOpen} onHide={handleCloseSellModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>상품 등록</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              <MallProductSell onClose={handleCloseSellModal} />
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
          <Row style={{ display: "flex", alignItems: "center" }}>
            {list.map((item) => (
              <Col key={item._id}>
                <Card
                  style={{ width: "20rem", height: "32rem", marginBottom: 20 }}
                >
                  <Card.Body className="card-body">
                    <img src={item.path} width="200rem" height="200rem"
                    style={{ marginBottom:"10px" }} />
                    <Card.Title className="card-title">
                      {item.name}
                    </Card.Title>
                    <Card.Text className="card-text">
                      가격: {item.price}
                    </Card.Text>
                    <Card.Text
                      className="card-text"
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {/* <Button variant="primary" style={{ borderColor: 'transparent', backgroundColor: "#fff" }} onClick={() => handleLocate(item)}> */}
                      <MapPinIcon
                        onClick={() => handleLocate(item)}
                        alt="위치찾기"
                        color="#009960"
                        style={{
                          width: "25px",
                          marginRight: "5px",
                          marginBottom: "3px",
                          height: "30px",
                          cursor: "pointer",
                        }}
                      />
                      {item.place}
                    </Card.Text>
                  
                    <Card.Text className="card-text">
                      재고: {item.stock}
                    </Card.Text>
                    <Card.Text className="card-text">
                      등록시간: {formatDateTime(item.createdAt)}
                    </Card.Text>
                    <Card.Text className="card-text">
                      설명: {item.description}
                    </Card.Text>

                    {userState.user._id === item.seller && (
                      <>
                        {/* <Button variant="primary" style={{ margin: "10px", top: "5" }} onClick={() => handleOpenEditModal(item._id)}>
                            수정
                          </Button> */}
                        <PencilSquareIcon
                          color="#00D387"
                          onClick={() => handleOpenEditModal(item._id)}
                          style={{
                            width: "30px",
                            height: "30px",
                            cursor: "pointer",
                          }}
                        />
                        <Modal
                          show={editModalOpen}
                          onHide={handleCloseEditModal}
                          centered
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>상품 수정</Modal.Title>
                          </Modal.Header>
                          <Modal.Body className="text-center">
                            <MallProductEdit
                              handleEditProduct={handleEditProduct}
                              selectedItem={selectedItem}
                            />
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
                        {/* <Button variant="primary" style={{ margin: "10px", top: "5" }} onClick={() => handleOpenDeleteModal(item._id)}>
                            삭제
                          </Button> */}
                        <TrashIcon
                          color="#00D387"
                          style={{
                            width: "30px",
                            height: "30px",
                            cursor: "pointer",
                            marginLeft: "10px",
                          }}
                          onClick={() => handleOpenDeleteModal(item._id)}
                        />
                        <Modal
                          show={deleteModalOpen}
                          onHide={handleCloseDeleteModal}
                          centered
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>상품 삭제</Modal.Title>
                          </Modal.Header>
                          <Modal.Body className="text-center">
                            선택한 상품을 삭제하시겠습니까?
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              variant="secondary"
                              onClick={handleCloseDeleteModal}
                            >
                              취소
                            </Button>
                            <Button
                              variant="primary"
                              onClick={() => handleDeleteProduct(selectedItem)}
                            >
                              삭제하기
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </>
                    )}
                    {item.seller !== userState.user._id && (
                      // <Button
                      //   variant="primary"
                      //   style={{ margin: "10px", top: "5", width: "50px", height: "40px" }}
                      //   onClick={() => handleOpenPurchaseModal(item)}
                      //   disabled={item.stock === 0}
                      // >
                      //   <ShoppingBagIcon className="h-6 w-6 text-blue-500" />
                      // </Button>
                      <ShoppingBagIcon
                        color="#00D387"
                        style={{
                          width: "30px",
                          height: "30px",
                          cursor: "pointer",
                          position: "absolute",
                          bottom: 30,
                          right: 15,
                        }}
                        onClick={() => handleOpenPurchaseModal(item)}
                        disabled={item.stock === 0}
                      />
                    )}
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
              <Card.Text className="card-text">
                상품: {selectedItem && selectedItem.name}
              </Card.Text>
              <Card.Text className="card-text">
                가격: {selectedItem && selectedItem.price}
              </Card.Text>
              <Card.Text className="card-text">
                판매처: {selectedItem && selectedItem.place}
              </Card.Text>
              <Card.Text className="card-text">
                설명: {selectedItem && selectedItem.description}
              </Card.Text>
              선택한 상품을 구매하시겠습니까?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClosePurchaseModal}>
                취소
              </Button>
              <Button
                variant="primary"
                onClick={() => handleConfirmPurchase(selectedItem)}
              >
                구매하기
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>

        <PaginationBar
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

export default Mall;
