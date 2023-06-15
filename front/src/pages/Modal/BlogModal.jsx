import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const BlogModal = ({ show, onHide, title, children, handleClose }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="mt-4 mb-4"
          variant="secondary"
          onClick={handleClose}
          style={{
            width: "100%",
            borderRadius: "0px",
          }}
        >
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BlogModal;
