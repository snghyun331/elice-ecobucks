import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Api from "../../api";
import DaumPostcode from "react-daum-postcode";
import { useEffect } from "react";

const MallProductSell = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [place, setPlace] = useState("");
  const [location, setLocation] = useState({});
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);

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
    setPlace(address);

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
      window.location.reload();
    } catch (err) {
      alert("모든 값을 입력해주세요.");
      console.log("상품 등록에 실패하였습니다.", err);
    }
  };

  return (
    <div style={{ padding: "16px", width: "calc(100% - 32px)" }}>
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
        <div style={{ width: "100%", maxWidth: "720px", padding: "60px" }}>
          <span>상품</span>
          <textarea
            style={{
              width: "100%",
              height: "20px",
              padding: "16px",
              fontSize: "16px",
              lineHeight: "20px",
              marginBottom: "16px",
            }}
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <span>가격</span>
          <textarea
            style={{
              width: "100%",
              height: "20px",
              padding: "16px",
              fontSize: "16px",
              lineHeight: "20px",
              marginBottom: "16px",
            }}
            value={price}
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
          <span>위치</span>
          <div style={{ display: "flex", marginBottom: "16px" }}>
            <textarea
              style={{
                width: "100%",
                height: "20px",
                padding: "16px",
                fontSize: "16px",
                lineHeight: "20px",
              }}
              value={place}
              onChange={(event) => {
                setPlace(event.target.value);
              }}
            />
            <button
              style={{
                marginLeft: "8px",
                padding: "8px 16px",
                fontSize: "16px",
                borderWidth: "1px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
              onClick={handleSearchAddress}
            >
              검색
            </button>
          </div>
          <span>수량</span>
          <textarea
            style={{
              width: "100%",
              height: "20px",
              padding: "16px",
              fontSize: "16px",
              lineHeight: "20px",
              marginBottom: "16px",
            }}
            value={stock}
            onChange={(event) => {
              setStock(event.target.value);
            }}
          />
          <span>설명</span>
          <textarea
            style={{
              width: "100%",
              height: "100px",
              padding: "16px",
              fontSize: "16px",
              lineHeight: "20px",
              marginBottom: "16px",
            }}
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />

          <button
            style={{
              padding: "8px 16px",
              fontSize: "16px",
              borderWidth: "1px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
            onClick={handleSubmit}
          >
            상품 등록하기
          </button>
        </div>
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
