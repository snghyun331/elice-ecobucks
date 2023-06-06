import React, { useState } from "react";
import { Button, ButtonGroup, Container, Form, Card, Modal } from "react-bootstrap";
import ChallengeParticipate from './ChallengeParticipate'

const ChallengeRead = ({ challenge, onBackToListClick }) => {
  const [showModal, setShowModal] = useState(false);

  const handleJoinClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Format date as 'YYYY-MM-DD'
  };

  return (
    <Container>
      <h2>챌린지 내용 확인</h2>
      <Card className="m-2">
        <Card.Body>
          <Card.Title>{challenge.title}</Card.Title>
          <Card.Text>{challenge.content}</Card.Text>
          <Card.Text>
            작성일자: {formatDate(challenge.createdAt)}
            <br />
            마감일자: {formatDate(challenge.dueDate)}
            <br />
            작성자: {challenge.user_id}
            <br />
            참여인원: {challenge.participantsCount.toLocaleString()} 명
          </Card.Text>
        </Card.Body>
      </Card>
      <Button className="mt-3" onClick={handleJoinClick}>
        참가하기
      </Button>
      <Button onClick={onBackToListClick} className="mt-3">
        목록으로
      </Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>참가하기</Modal.Title>
        </Modal.Header>
        <ChallengeParticipate onClose={handleCloseModal} />
      </Modal>
    </Container>
  );
};

export default ChallengeRead;
