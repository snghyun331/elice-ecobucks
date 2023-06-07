import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Card,
  Modal,
  Form,
  ListGroup,
} from "react-bootstrap";
import * as Api from "../../api";

import ChallengeParticipate from "./ChallengeParticipate";
import { UserStateContext } from "../../context/user/UserProvider";

import ChallengeUpdate from "./ChallengeUpdate";

const ChallengeRead = ({ challenge, onBackToListClick }) => {
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [comments, setComments] = useState([]);

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
  console.log("리드", userState);
  const isCurrentUserAuthor = userState.user._id === challenge.userId._id;

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

  const handleAddComment = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const content = formData.get("content");
  
    try {
      const response = await Api.post(`challenges/${challenge._id}/comments`, { content });
      setComments([...comments, response.data]);
    } catch (error) {
      console.log("Error adding comment:", error);
    }
  
    event.target.reset();
  };
  
  

  const handleEditComment = async (commentId, content) => {
    try {
      await Api.put(`challenges/${challenge._id}/comments/${commentId}`, {
        content,
      });
      const updatedComments = comments.map((comment) => {
        if (comment._id === commentId) {
          return { ...comment, content };
        }
        return comment;
      });
      setComments(updatedComments);
    } catch (error) {
      console.log("Error editing comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await Api.delete(`challenges/${challenge._id}/comments/${commentId}`);
      const updatedComments = comments.filter(
        (comment) => comment._id !== commentId
      );
      setComments(updatedComments);
    } catch (error) {
      console.log("Error deleting comment:", error);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await Api.get(`challenges/${challenge._id}/comments`);
        setComments(response.data);
      } catch (error) {
        console.log("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [challenge]);

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
            작성자: {challenge.userId._id}
            <br />
            참여인원: {challenge.participantsCount.toLocaleString()} 명
          </Card.Text>

          <h4>댓글</h4>
          <ListGroup>
            {comments.map((comment) => (
              <ListGroup.Item key={comment._id}>
                {comment.content}
                {comment.userId === userState.user._id && (
                  <Button
                    variant="link"
                    className="btn-sm"
                    onClick={() =>
                      handleEditComment(
                        comment._id,
                        prompt("Edit comment", comment.content)
                      )
                    }
                  >
                    수정
                  </Button>
                )}
                {comment.userId === userState.user._id && (
                  <Button
                    variant="link"
                    className="btn-sm text-danger"
                    onClick={() => handleDeleteComment(comment._id)}
                  >
                    삭제
                  </Button>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Form onSubmit={handleAddComment}>
            <Form.Group controlId="content">
              <Form.Control
                name="content"
                as="textarea"
                rows={3}
                placeholder="댓글을 입력하세요..."
                required
              />
            </Form.Group>
            <Button type="submit">댓글 추가</Button>
          </Form>
        </Card.Body>
      </Card>
      <>
        <Button className="mt-3" onClick={handleJoinClick}>
          참가하기
        </Button>
      </>
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
        <ChallengeParticipate
          onClose={handleCloseModal}
          challenge={challenge}
        />
      </Modal>

      <Modal size="lg" show={showUpdateModal} onHide={handleCloseUpdateModal}>
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
