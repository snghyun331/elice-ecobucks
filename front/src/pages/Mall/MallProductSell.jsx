import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Api from "../../api";
import DaumPostcode from "react-daum-postcode";
import { useEffect } from "react";
import { Button, ButtonGroup, Container, Form, Alert } from "react-bootstrap";

const MallProductSell = ({ onClose }) => {
  // const [name, setName] = useState("");
  // const [price, setPrice] = useState("");
  // const [place, setPlace] = useState("");
  // const [stock, setStock] = useState("");
  // const [description, setDescription] = useState("");
  const [location, setLocation] = useState({});
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = React.useState({
    name: "",
    price: "",
    place: "",
    stock: "",
    description: "",
  });

  const { name, price, place, stock, description } = form;

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleSearchAddress = () => {
    setShowModal(true);
  };

  const handleAddressModalClose = () => {
    setShowModal(false);
  };

  const handleAddressSelected = (data) => {
    const { address, roadAddress, zonecode } = data;

    // 사용자가 선택한 주소 정보를 처리하는 로직 작성
    setForm((prevForm) => ({
      ...prevForm,
      place: address,
    }));

    setShowModal(false);
  };

  useEffect(() => {
    if (place) {
      // Kakao Maps API를 사용하여 x, y 좌표를 얻어옴
      const ps = new window.kakao.maps.services.Places();
      ps.keywordSearch(place, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const { x, y } = result[0];
          setLocation({ x, y });
        }
      });
    }
  }, [place]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.post("products", {
        name,
        price: Number(price),
        place,
        location,
        stock: Number(stock),
        description,
      });
      console.log(res);
      // window.location.reload();
      onClose();
    } catch (err) {
      alert("모든 값을 입력해주세요.", err);
      console.log("상품 등록에 실패하였습니다.", err);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div
        style={{
          width: "100%",
          maxWidth: "720px",
          padding: "10px",
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          background: "#fff",
          borderRadius: '10px',
        }}
      >
        <Form.Label style={{ alignSelf: 'flex-start', fontSize: '1.2em', fontWeight: 'bold' }}>상품명</Form.Label>
        <Container
          className="text-muted mb-2"
          style={{ fontSize: "0.85rem", textAlign: 'left', padding: 0 }}
        >
          상품명을 적어주세요.
        </Container>
        <Form.Control
          style={{
            width: "100%",
            height: "20px",
            padding: "16px",
            fontSize: "16px",
            lineHeight: "20px",
            marginBottom: "16px",
            borderRadius: "0px"
          }}
          name="name"
          value={name}
          onChange={onChange}
        />
        <Form.Label style={{ alignSelf: 'flex-start', fontSize: '1.2em', fontWeight: 'bold' }}>가격</Form.Label>
        <Container
          className="text-muted mb-2"
          style={{ fontSize: "0.85rem", textAlign: 'left', padding: 0 }}
        >
          판매가격을 적어주세요. 추후에 1마일 : N원으로 교환할 수 있습니다.
        </Container>
        <Form.Control
          style={{
            width: "100%",
            height: "20px",
            padding: "16px",
            fontSize: "16px",
            lineHeight: "20px",
            marginBottom: "16px",
            borderRadius: "0px"
          }}
          name="price"
          value={price}
          onChange={onChange}
        />
        <Form.Label style={{ alignSelf: 'flex-start', fontSize: '1.2em', fontWeight: 'bold' }}>위치</Form.Label>
        <Container
          className="text-muted mb-2"
          style={{ fontSize: "0.85rem", textAlign: 'left', padding: 0 }}
        >
          구매자가 상품을 수령할 수 있는 위치를 지정해주세요.
        </Container>
        <div style={{ display: "flex", marginBottom: "16px", width: '100%' }}>
          <Form.Control
            style={{
              width: "100%",
              height: "20px",
              padding: "16px",
              fontSize: "16px",
              lineHeight: "20px",
              borderRadius: "0px"
            }}
            placeholder="'검색' 버튼을 눌러 검색하세요."
            name="place"
            value={place}
            onChange={onChange}
          />
          <button
            style={{
              width: "70%",
              borderRadius: "0px",
              backgroundColor: "#00D387",
              color: "white",
              fontWeight: "900",
              marginLeft: 5,
              border: '0px'
            }}
            onClick={handleSearchAddress}
          >
            검색
          </button>
        </div>
        <Form.Label style={{ alignSelf: 'flex-start', fontSize: '1.2em', fontWeight: 'bold' }}>수량</Form.Label>
        <Container
          className="text-muted mb-2"
          style={{ fontSize: "0.85rem", textAlign: 'left', padding: 0 }}
        >
          판매 가능한 최대 수량을 적어주세요. 수량이 0에 도달하면 판매가 종료됩니다.
        </Container>
        <Form.Control
          style={{
            width: "100%",
            height: "20px",
            padding: "16px",
            fontSize: "16px",
            lineHeight: "20px",
            marginBottom: "16px",
            borderRadius: 0,
          }}
          name="stock"
          value={stock}
          onChange={onChange}
        />
        <Form.Label style={{ alignSelf: 'flex-start', fontSize: '1.2em', fontWeight: 'bold' }}>설명</Form.Label>
        <Container
          className="text-muted mb-2"
          style={{ fontSize: "0.85rem", textAlign: 'left', padding: 0 }}
        >
          상품에 대한 구체적인 설명을 적어주세요. 유통기한 임박 상품이라면, 유통기한을 함께 기재해주세요.
        </Container>
        <Form.Control
          style={{
            width: "100%",
            height: "100px",
            fontSize: "16px",
            lineHeight: "20px",
            marginBottom: "16px",
            borderRadius: 0
          }}
          as='textarea'
          name="description"
          value={description}
          onChange={onChange}
        />

        <button
          style={{
            width: "100%",
            borderRadius: "0px",
            backgroundColor: "#00D387",
            color: "white",
            fontWeight: "900",
            padding: 5,
            border: '0px'
          }}
          onClick={handleSubmit}
        >
          등록하기
        </button>
      </div>

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <DaumPostcode
            onComplete={handleAddressSelected}
            onClose={handleAddressModalClose}
          />
        </div>
      )}
    </div>
  );

};

export default MallProductSell;
