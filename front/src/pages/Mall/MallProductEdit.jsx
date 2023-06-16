import React, { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import { Form, Container } from "react-bootstrap"
import { showAlert } from "../../assets/alert";

const MallProductEdit = ({ handleEditProduct, selectedItem }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [place, setPlace] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedItem = {
        name: name || selectedItem.name, //selectedItem이 하나만 들어오는게 아님
        price: Number(price) || Number(selectedItem.price),
        place: place || selectedItem.place,
        stock: Number(stock) || Number(selectedItem.stock),
        description: description || selectedItem.description,
      };

      await handleEditProduct(selectedItem, updatedItem);

    } catch (err) {
      showAlert("모든 값을 입력해주세요.")
      console.log("상품 등록에 실패하였습니다.", err);
    }
  }

  return (
    <div style={{ padding: "16px" }}>
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
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
          className="form-control-small"
          name="title"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          placeholder={selectedItem.name}
        />
        <Form.Label style={{ alignSelf: 'flex-start', fontSize: '1.2em', fontWeight: 'bold' }}>가격</Form.Label>
        <Container
          className="text-muted mb-2"
          style={{ fontSize: "0.85rem", textAlign: 'left', padding: 0 }}
        >
          가격을 적어주세요.
        </Container>
        <Form.Control
          className="form-control-small"
          name="price"
          value={price}
          onChange={(event) => {
            setPrice(event.target.value);
          }}
          placeholder={selectedItem.price}
        />
        <Form.Label style={{ alignSelf: 'flex-start', fontSize: '1.2em', fontWeight: 'bold' }}>수량</Form.Label>
        <Container
          className="text-muted mb-2"
          style={{ fontSize: "0.85rem", textAlign: 'left', padding: 0 }}
        >
          수량을 적어주세요.
        </Container>
        <Form.Control
          className="form-control-small"
          name="stock"
          value={stock}
          onChange={(event) => {
            setStock(event.target.value);
          }}
          placeholder={selectedItem.stock}
        />
        <Form.Label style={{ alignSelf: 'flex-start', fontSize: '1.2em', fontWeight: 'bold' }}>설명</Form.Label>
        <Container
          className="text-muted mb-2"
          style={{ fontSize: "0.85rem", textAlign: 'left', padding: 0 }}
        >
          설명을 적어주세요.
        </Container>
        <Form.Control
          as='textarea'
          className="form-control-small"
          name="description"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
          placeholder={selectedItem.description}
        />


        <button
          onClick={handleSubmit}
                  style={{
          width: "100%",
          borderRadius: "0px",
          backgroundColor: "#00D387",
          color: "white",
          fontWeight: "900",
          padding: 5,
          border: "0px",
        }}
        >
          수정하기
        </button>
      </div>
    </div>
  );
};

export default MallProductEdit;
