import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BlogPost = (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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
          >
            글 작성하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
