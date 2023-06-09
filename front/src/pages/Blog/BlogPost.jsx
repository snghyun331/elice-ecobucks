import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Api from '../../api'
const BlogPost = (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topic, setTopic] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.post("blog/write", {
        title,
        content,
        topic
      });
      console.log("블로그 작성 res: ", res);
      window.location.reload()
    } catch (err) {
      console.log("블로그 글 작성에 실패했습니다.", err);
    }
  }

  return (
    <div style={{ padding: "16px", width: "calc(100% - 32px)", overflow:"auto"}}>
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
              height: "480px",
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
            글 작성하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
