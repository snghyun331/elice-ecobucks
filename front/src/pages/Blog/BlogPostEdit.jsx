import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as Api from '../../api'
// import { UserStateContext } from "../../context/user/UserProvider";
const BlogPostEdit = ({ handleEditProduct, selectedBlog }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [topic, setTopic] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const updatedBlog = {
            _id: selectedBlog._id,
            title: title || selectedBlog.title,
            content: content || selectedBlog.content,
            topic: topic || selectedBlog.topic
          };
          // setList(updatedItem);
          // console.log("updatedItem: ", updatedItem);
          // console.log("바뀐 list: ", list);

          await handleEditProduct(selectedBlog, updatedBlog);


      } catch (err) {
          alert("모든 값을 입력해주세요.")
          console.log("상품 등록에 실패하였습니다.", err);
      }
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
            <span>제목</span>
          <textarea
            style={{
              width: "100%",
              height: "20px",
              padding: "16px",
              fontSize: "16px",
              lineHeight: "20px",
              marginBottom: "16px",
            }}
            value={title}
            onChange={(event) => {
                setTitle(event.target.value);
            }}
          />
          <span>주제</span>
          <textarea
            style={{
              width: "100%",
              height: "20px",
              padding: "16px",
              fontSize: "16px",
              lineHeight: "20px",
              marginBottom: "16px",
            }}
            value={topic}
            onChange={(event) => {
              setTopic(event.target.value);
            }}
          />
          <span>내용</span>
          <textarea
            style={{
              width: "100%",
              height: "20px",
              padding: "16px",
              fontSize: "16px",
              lineHeight: "20px",
              marginBottom: "16px",
            }}
            value={content}
            onChange={(event) => {
              setContent(event.target.value);
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
            글 수정하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPostEdit;
