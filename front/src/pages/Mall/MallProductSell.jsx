import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Api from "../../api";
import DaumPostcode from "react-daum-postcode";
import { useEffect } from "react";
import {
  Button,
  ButtonGroup,
  Container,
  Form,
  Alert,
  Image,
} from "react-bootstrap";
import { showAlert } from "../../assets/alert";

const MallProductSell = ({ onClose }) => {
  const [location, setLocation] = useState({ "x": "127.0664922836648", "y": "37.5460168946624" });
  const [showModal, setShowModal] = useState(false);
  const [isPriceInvalid, setIsPriceInvalid] = useState(false);
  const [isStockInvalid, setIsStockInvalid] = useState(false);
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
    if (name === 'price') {
      setIsPriceInvalid(isNaN(value));
    } else if (name === 'stock') {
      setIsStockInvalid(isNaN(value));
    }
  };
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setErrorMessage("");
    setPreviewURL(URL.createObjectURL(file));
  };

  useEffect(() => {
    console.log("selectedFile: ", selectedFile);
    console.log("errorMessage: ", errorMessage);
    console.log("previewURL: ", previewURL);
  }, [handleFileChange]);

  const navigate = useNavigate();

  const handleSearchAddress = (e) => {
    e.preventDefault();
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
      // 이미지 전송 하기

      const formData = new FormData();
      formData.append("image", selectedFile);

      const imageRes = await Api.postFile("images/products/upload", formData);

      const res = await Api.post("products", {
        name,
        price: Number(price),
        place,
        location,
        stock: Number(stock),
        description,
        imageId: imageRes.data._id,
      });
      console.log(res);
      // window.location.reload();
      onClose();

    } catch (err) {
      if (!selectedFile) {
        showAlert("사진을 업로드해주세요");
      } else if (!name || !price || !place || !stock || !description) {
        showAlert("모든 값을 입력해주세요.");
      } else if (isPriceInvalid) {
        showAlert("가격을 잘못 입력했습니다.");
      } else if (isStockInvalid) {
        showAlert("수량을 잘못 입력했습니다.");
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label
          className="d-block"
          style={{ fontWeight: "bold", fontSize: "1.2em", textAlign: "left" }}
        >
          상품 사진
        </Form.Label>
        <Form.Control
          type="file"
          onChange={handleFileChange}
          style={{ borderRadius: "0px" }}
        />
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      </Form.Group>
      {selectedFile && (
        <div>
          <h6>미리보기</h6>
          <Image src={previewURL} alt="Selected Image" thumbnail />
        </div>
      )}
      <Form.Label
        className="d-block"
        style={{
          fontSize: "1.2em",
          fontWeight: "bold",
          textAlign: "left",
        }}
      >
        상품명
      </Form.Label>
      <Container
        className="text-muted mb-2"
        style={{ fontSize: "0.85rem", textAlign: "left", padding: 0 }}
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
          borderRadius: "0px",
        }}
        name="name"
        value={name}
        onChange={onChange}
      />
      <Form.Label
        className="d-block"
        style={{
          fontSize: "1.2em",
          fontWeight: "bold",
          textAlign: "left",
        }}
      >
        가격
      </Form.Label>
      <Container
        className="text-muted mb-2"
        style={{ fontSize: "0.85rem", textAlign: "left", padding: 0 }}
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
          borderRadius: "0px",
        }}
        placeholder="숫자만 입력하세요"
        name="price"
        value={price}
        onChange={onChange}
      />
      <Form.Label
        className="d-block"
        style={{
          fontSize: "1.2em",
          fontWeight: "bold",
          textAlign: "left",
        }}
      >
        위치
      </Form.Label>
      <Container
        className="text-muted mb-2"
        style={{ fontSize: "0.85rem", textAlign: "left", padding: 0 }}
      >
        구매자가 상품을 수령할 수 있는 위치를 지정해주세요.
      </Container>
      <Container
        style={{ display: "flex", marginBottom: "16px", width: "100%" }}
      >
        <Form.Control
          style={{
            width: "100%",
            height: "20px",
            padding: "16px",
            fontSize: "16px",
            lineHeight: "20px",
            borderRadius: "0px",
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
            border: "0px",
          }}
          onClick={handleSearchAddress}
        >
          검색
        </button>
      </Container>
      <Form.Label
        className="d-block"
        style={{
          fontSize: "1.2em",
          fontWeight: "bold",
          textAlign: "left",
        }}
      >
        수량
      </Form.Label>
      <Container
        className="text-muted mb-2"
        style={{ fontSize: "0.85rem", textAlign: "left", padding: 0 }}
      >
        판매 가능한 최대 수량을 적어주세요. 수량이 0에 도달하면 판매가
        종료됩니다.
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
        placeholder="숫자만 입력하세요."
        name="stock"
        value={stock}
        onChange={onChange}
      />
      <Form.Label
        className="d-block"
        style={{
          fontSize: "1.2em",
          fontWeight: "bold",
          textAlign: "left",
        }}
      >
        설명
      </Form.Label>
      <Container
        className="text-muted mb-2"
        style={{ fontSize: "0.85rem", textAlign: "left", padding: 0 }}
      >
        상품에 대한 구체적인 설명을 적어주세요. 유통기한 임박 상품이라면,
        유통기한을 함께 기재해주세요.
      </Container>
      <Form.Control
        style={{
          width: "100%",
          height: "100px",
          fontSize: "16px",
          lineHeight: "20px",
          marginBottom: "16px",
          borderRadius: 0,
        }}
        as="textarea"
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
          border: "0px",
        }}
      >
        등록하기
      </button>

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div style={{ position: "relative" }}>
            <button
              style={{
                position: "absolute",
                top: "-1.65rem",
                right: "0px",
                borderRadius: "30%",
                backgroundColor: "#00D387",
                color: "black",
                border: "none",
                display: "flex",
                cursor: "pointer",
              }}
              onClick={handleAddressModalClose}
            >
              닫기
            </button>
            <DaumPostcode
              style={{ border: '3px solid #00D387' }}
              onComplete={handleAddressSelected}
              onClose={handleAddressModalClose}
            />
          </div>
        </div>
      )}
    </Form>
  );
};

export default MallProductSell;
