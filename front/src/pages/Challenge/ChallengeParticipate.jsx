import React, { useState } from "react";
import { Button, Form, Modal, Image, Alert } from "react-bootstrap";

const ChallengeParticipate = ({ onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Perform your upload logic here
      // Replace the alert with your actual logic for handling the uploaded photo

      // Show confirmation dialog for valid photo
      setShowConfirmation(true);
    } else {
      setErrorMessage("Please select a file.");
    }
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    onClose();
  };

  return (
    <Modal.Body>
      <h4>Challenge Participate</h4>
      <Form.Group>
        <Form.Label>Upload a photo:</Form.Label>
        <Form.Control type="file" onChange={handleFileChange} accept="image/*" />
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      </Form.Group>
      <Button variant="primary" onClick={handleUpload}>
        Upload
      </Button>

      <Modal show={showConfirmation} onHide={handleConfirmationClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Photo Upload</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          올바르지 않은 사진이 업로드 된 경우 마일리지 지급이 취소됩니다. 반드시 참여를 인증할 수 있는 사진만 올려주세요.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleConfirmationClose}>
            Close
          </Button>
          {/* Add your logic for confirming the photo upload */}
        </Modal.Footer>
      </Modal>
    </Modal.Body>
  );
};

export default ChallengeParticipate;
