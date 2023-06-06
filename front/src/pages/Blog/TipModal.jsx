import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const TipModal = ({ show, handleCloseModal, handleSaveTip, handleTipChange }) => {
    const [tip, setTip] = useState("");
    const [content, setContent] = useState("");
    const handleInputChange = (e) => {
        handleTipChange(e);
        setTip(e.target.value);
      };
    
    
  return (
    <Modal show={show} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>팁 작성하기</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span>제목</span>
        <input type="text" value={tip} onChange={handleInputChange} />
        <span>내용</span>
        <input type="text" value={content} onChange={handleInputChange} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          닫기
        </Button>
        <Button variant="primary" onClick={handleSaveTip}>
          저장
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TipModal;
