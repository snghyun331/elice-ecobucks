import React, { useState } from "react";
import { Form, Container, ButtonGroup, Button } from "react-bootstrap";
import * as Api from '../../api'
import { showAlert } from "../../assets/alert";
const BlogPost = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topic, setTopic] = useState("");
  const [icon, setIcon] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.post("blog/write", {
        title,
        content,
        topic: icon + topic
      });
      window.location.reload()
      // onClose();
    } catch (err) {
      showAlert("모든 값을 입력해주세요.")
      // console.log("절약 팁 글 작성에 실패했습니다.", err);
    }
  }
  const handleIconSelect = (selectedIcon) => {
    setIcon(selectedIcon);
  };

  return (
    <div style={{ justifyContent: 'center', alignItems: 'center', overflow: "auto" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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
          <Form.Label style={{ alignSelf: 'flex-start', fontSize: '1.2em', fontWeight: 'bold' }}>제목</Form.Label>
          <Container
            className="text-muted mb-2"
            style={{ fontSize: "0.85rem", textAlign: 'left', padding: 0 }}
          >
            공유할 팁의 제목을 적어주세요.
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
            name="title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <Form.Label style={{ alignSelf: 'flex-start', fontSize: '1.2em', fontWeight: 'bold' }}>주제</Form.Label>
          <Container
            className="text-muted mb-2"
            style={{ fontSize: "0.85rem", textAlign: 'left', padding: 0 }}
          >
            공유할 팁의 주제를 적어주세요. 예) 환경, 건강, 기후변화, 대기오염
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
            value={topic}
            onChange={(event) => {
              setTopic(event.target.value);
            }}
          />
          <Form.Label style={{ alignSelf: 'flex-start', fontSize: '1.2em', fontWeight: 'bold' }}>내용</Form.Label>
          <Container
            className="text-muted mb-2"
            style={{ fontSize: "0.85rem", textAlign: 'left', padding: 0 }}
          >팁에 대한 구체적인 설명을 적어주세요.</Container>
          <Form.Control
            style={{
              width: "100%",
              height: "200px",
              fontSize: "16px",
              lineHeight: "20px",
              marginBottom: "16px",
              borderRadius: 0
            }}
            as='textarea'
            name="description"
            value={content}
            onChange={(event) => {
              setContent(event.target.value);
            }}
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
            팁 작성하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;