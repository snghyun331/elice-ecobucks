import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Card, Modal } from "react-bootstrap";
import * as Api from "../../api";

import ChallengeParticipate from "./ChallengeParticipate";
import { UserStateContext } from "../../context/user/UserProvider";

import ChallengeUpdate from "./ChallengeUpdate";

const ChallengeRead = ({ challenge, onBackToListClick }) => {
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const userState = useContext(UserStateContext);
  const navigate = useNavigate();

  const handleJoinClick = () => {
    setShowModal(true);
  };

  const handleUpdateClick = () => {
    setShowUpdateModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Format date as 'YYYY-MM-DD'
  };

  const isCurrentUserAuthor = userState.user._id === challenge.user_id._id;

  const handleDeleteClick = async () => {
    const confirmDelete = window.confirm("챌린지를 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        await Api.delete(`challenges/${challenge._id}`);
        window.location.reload();
      } catch (err) {
        alert("챌린지 삭제에 실패하였습니다.");
      }
    }
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
            작성자: {challenge.user_id._id}
            <br />
            참여인원: {challenge.participantsCount.toLocaleString()} 명
          </Card.Text>
        </Card.Body>
      </Card>
      <Button className="mt-3" onClick={handleJoinClick}>
        참가하기
      </Button>
      {isCurrentUserAuthor && (
        <>
          <Button className="mt-3" onClick={handleUpdateClick}>
            수정하기
          </Button>
          <Button className="mt-3" onClick={handleDeleteClick}>
            삭제하기
          </Button>
        </>
      )}
      <Button onClick={onBackToListClick} className="mt-3">
        목록으로
      </Button>



      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>참가하기</Modal.Title>
        </Modal.Header>
        <ChallengeParticipate onClose={handleCloseModal} />
      </Modal>



      <Modal size='lg' show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>챌린지 수정</Modal.Title>
        </Modal.Header>
        <ChallengeUpdate
          challenge={challenge}
          onClose={handleCloseUpdateModal}
        />
      </Modal>



    </Container>
  );
};

export default ChallengeRead;
