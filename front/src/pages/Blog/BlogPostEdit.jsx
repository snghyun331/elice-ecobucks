import React, { useState } from "react";
import { useEffect } from "react";
import { Form, Container } from "react-bootstrap";
import { showAlert } from "../../assets/alert";
// import { UserStateContext } from "../../context/user/UserProvider";
const BlogPostEdit = ({ handleEditBlog, selectedBlog }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topic, setTopic] = useState("");
  useEffect(() => {
    console.log("선택된 절약 팁: ", selectedBlog);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedBlog = {
        title: title || selectedBlog.title,
        content: content || selectedBlog.content,
        topic: topic || selectedBlog.topic
      };
      // setList(updatedItem);
      // console.log("updatedItem: ", updatedItem);
      // console.log("바뀐 list: ", list);

      await handleEditBlog(selectedBlog, updatedBlog);


    } catch (err) {
      showAlert("모든 값을 입력해주세요.")
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
        <Form.Label style={{ alignSelf: 'flex-start', fontSize: '1.2em', fontWeight: 'bold' }}>제목</Form.Label>
        <Container
          className="text-muted mb-2"
          style={{ fontSize: "0.85rem", textAlign: 'left', padding: 0 }}
        >
          공유할 팁의 제목을 적어주세요.
        </Container>
        <Form.Control
          className="form-control-small"
          name="title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          placeholder={selectedBlog.title}
        />
        <Form.Label style={{ alignSelf: 'flex-start', fontSize: '1.2em', fontWeight: 'bold' }}>주제</Form.Label>
        <Container
          className="text-muted mb-2"
          style={{ fontSize: "0.85rem", textAlign: 'left', padding: 0 }}
        >
          공유할 팁의 주제를 간단히 적어주세요. 예) 환경, 건강, ... 뭐 적죠?
        </Container>
        <Form.Control
          className="form-control-small"
          name="topic"
          value={topic}
          onChange={(event) => {
            setTopic(event.target.value);
          }}
          placeholder={selectedBlog.topic}
        />
        <Form.Label style={{ alignSelf: 'flex-start', fontSize: '1.2em', fontWeight: 'bold' }}>내용</Form.Label>
        <Container
          className="text-muted mb-2"
          style={{ fontSize: "0.85rem", textAlign: 'left', padding: 0 }}
        >팁에 대한 구체적인 설명을 적어주세요.</Container>
        <Form.Control
          className="form-control-large"
          name="description"
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
          }}
          placeholder={selectedBlog.content}
        />

        <div style={{ width: "100%", maxWidth: "720px", padding: "10px" }}>
          <button
            className="btn-default"
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
