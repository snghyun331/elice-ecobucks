import React, { useState } from "react";
import { Button, Form, Modal, Image, Alert, Container } from "react-bootstrap";
import * as Api from "../../api";

const ChallengeParticipate = ({ onClose, challenge }) => {
  console.log(challenge)
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [previewURL, setPreviewURL] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setErrorMessage("");
    setPreviewURL(URL.createObjectURL(file));
  };

  const handleUpload = async (e) => {
    if (selectedFile) {
      e.preventDefault();
      
      // Perform your upload logic here
      // Replace the alert with your actual logic for handling the uploaded photo

      // Show confirmation dialog for valid photo
      setShowConfirmation(true);
    } else {
      setErrorMessage("파일을 선택해주세요.");
    }
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
  };

  const confirmUpload = async () => {
    // Replace with your logic for confirming the photo upload
    // For now, we'll just simulate a success message
    const res = await Api.post(`challenges/${challenge._id}/participants`, {
      image: "selectedFile"
    })
    alert("인증사진 업로드가 완료되었습니다.");
    window.location.reload();
    handleConfirmationClose();
    onClose();
  };

  return (
    <Modal.Body>
      <h4>인증사진 업로드</h4>
      <Alert variant="danger" className="small">
        올바르지 않은 사진이 업로드 된 경우 마일리지 지급이 취소됩니다.
        <br />
        반드시 참여를 인증할 수 있는 사진만 올려주세요.
      </Alert>
      <Form.Group>
        <Form.Control
          type="file"
          onChange={handleFileChange}
          accept="image/*"
        />
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      </Form.Group>
      {selectedFile && (
        <div className="mt-3">
          <h6>미리보기</h6>
          <Image src={previewURL} alt="Selected Image" thumbnail />
        </div>
      )}
      <Button variant="light" onClick={handleUpload}>
        인증 완료하기
      </Button>
      <Button variant="light" onClick={onClose}>
        돌아가기
      </Button>

      <Modal show={showConfirmation} onHide={handleConfirmationClose}>
        <Modal.Header closeButton style={{ backgroundColor: "#fffee3" }}>
          <Modal.Title>반드시 확인해주세요.</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#fffee3" }}>
          올바르지 않은 사진이 업로드 된 경우 마일리지 지급이 취소됩니다. <br />{" "}
          진행하시겠습니까?
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#fffee3" }}>
          <Button variant="primary" onClick={confirmUpload}>
            진행
          </Button>
          <Button variant="secondary" onClick={handleConfirmationClose}>
            돌아가기
          </Button>
        </Modal.Footer>
      </Modal>
    </Modal.Body>
  );
};

export default ChallengeParticipate;
