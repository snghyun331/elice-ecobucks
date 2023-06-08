import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as Api from '../../api'
// import { UserStateContext } from "../../context/user/UserProvider";
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
            price: price || selectedItem.price,
            place: place || selectedItem.place,
            stock: stock || selectedItem.stock,
            description: description || selectedItem.description,
          };
          // setList(updatedItem);
          // console.log("updatedItem: ", updatedItem);
          // console.log("바뀐 list: ", list);

          await handleEditProduct(selectedItem, updatedItem);
        //   const res = await Api.post("products", {
        //     name,
        //     price: Number(price),
        //     place,
        //     stock: Number(stock),
        //     description
        //   });
        //   console.log(res);
        //   window.location.reload()

          // const product = res.data;
          // console.log("product: ", product);
          // // JWT 토큰은 유저 정보의 token임.
          // const jwtToken = product.token;
          // console.log("jwtTokenn: ", jwtToken);
          // sessionStorage에 "productToken"이라는 키로 JWT 토큰을 저장함.
          // sessionStorage.setItem("productToken", jwtToken);
     } catch (err) {
          alert("모든 값을 입력해주세요.")
          console.log("상품 등록에 실패하였습니다.", err);
        };
    }

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
        <div style={{ width: "100%", maxWidth: "720px", padding:"60px" }}>
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
          <textarea
            style={{
              width: "100%",
              height: "20px",
              padding: "16px",
              fontSize: "16px",
              lineHeight: "20px",
              marginBottom: "16px",
            }}
            value={place}
            onChange={(event) => {
              setPlace(event.target.value);
            }}
          />
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
            상품 수정하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MallProductEdit;
