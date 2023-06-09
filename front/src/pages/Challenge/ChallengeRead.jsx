import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Card,
  Modal,
  Form,
  ListGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import * as Api from "../../api";

import ChallengeParticipate from "./ChallengeParticipate";
import { UserStateContext } from "../../context/user/UserProvider";
import ChallengeUpdate from "./ChallengeUpdate";

const ChallengeRead = ({ challenge, onBackToListClick }) => {
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState("");

  const userState = useContext(UserStateContext);
  const navigate = useNavigate();

  const handleJoinClick = () => {
    setShowModal(true);
  };

  const handleUpdateClick = () => {
    if (challenge.participantsCount >= 1) {
      return;
    }
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

  const isCurrentUserAuthor = userState.user._id === challenge.userId._id;

  const handleDeleteClick = async () => {
    if (challenge.participantsCount >= 1) {
      alert("참가자가 1명 이상이므로 수정, 삭제할 수 없습니다");
      return;
    }
    const confirmDelete = window.confirm("챌린지를 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        await Api.delete(`challenges/${challenge._id}`);
        window.location.reload();
      } catch (err) {
        alert(err.res.data);
      }
    }
  };

  const handleAddComment = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const content = formData.get("content");

    try {
      const res = await Api.post(`challenges/${challenge._id}/comments`, {
        userId: userState.user._id,
        challengeId: challenge._id,
        content,
      });
      const newComment = {
        ...res.data,
        userId: {
          _id: userState.user._id,
          username: userState.user.username,
        },
      };
      setComments([...comments, newComment]);
    } catch (error) {
      console.log("Error adding comment:", error);
    }

    event.target.reset();
  };

  const handleEditComment = (commentId, content) => {
    setEditingCommentId(commentId);
    setEditedComment(content);
  };

  const handleUpdateComment = async (commentId) => {
    try {
      await Api.put(`challenges/${challenge._id}/comments/${commentId}`, {
        content: editedComment,
      });
      const updatedComments = comments.map((comment) =>
        comment._id === commentId
          ? { ...comment, content: editedComment }
          : comment
      );
      setComments(updatedComments);
      setEditingCommentId(null);
      setEditedComment("");
    } catch (error) {
      console.log("Error editing comment:", error);
    }
  };

  const handleCancelEditComment = () => {
    setEditingCommentId(null);
    setEditedComment("");
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
        const res = await Api.get(`challenges/${challenge._id}/comments`);
        console.log("코멘트", res.data);
        setComments(res.data);
      } catch (error) {
        console.log("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [challenge]);

  return (
    <Container className="mt-5">
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
            작성자: {challenge.userId.username}
            <br />
            참여인원: {challenge.participantsCount.toLocaleString()} 명
          </Card.Text>

          <h4>댓글</h4>
          <ListGroup>
            {comments.map((comment) => (
              <ListGroup.Item
                key={comment._id}
                className="d-flex flex-column justify-content-between align-items-start"
              >
                <div>
                  <strong>{comment.userId.username}</strong>{" "}
                  <span style={{ color: "gray", fontSize: "0.8em" }}>
                    {formatDate(comment.updatedAt)}
                  </span>
                </div>
                {editingCommentId === comment._id ? (
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleUpdateComment(comment._id);
                    }}
                  >
                    <Form.Control
                      name="content"
                      as="textarea"
                      rows={3}
                      placeholder="댓글을 입력하세요."
                      value={editedComment}
                      onChange={(event) => setEditedComment(event.target.value)}
                      required
                      className="mt-3 mb-2"
                      style={{ width: "282%" }}
                    />
                    <div>
                      <Button
                        type="submit"
                        variant="link"
                        className="btn-sm"
                        style={{ textDecoration: "none" }}
                      >
                        수정완료
                      </Button>
                      <Button
                        variant="link"
                        className="btn-sm text-danger"
                        style={{ textDecoration: "none" }}
                        onClick={handleCancelEditComment}
                      >
                        취소
                      </Button>
                    </div>
                  </Form>
                ) : (
                  <div style={{ flex: 1 }}>
                    <Container className="mt-2 mb-2">
                      {comment.content}
                    </Container>
                    {comment.userId._id === userState.user._id && (
                      <div>
                        <Button
                          variant="link"
                          className="btn-sm"
                          style={{ textDecoration: "none" }}
                          onClick={() =>
                            handleEditComment(comment._id, comment.content)
                          }
                        >
                          수정
                        </Button>
                        <Button
                          variant="link"
                          className="btn-sm text-danger"
                          style={{ textDecoration: "none" }}
                          onClick={() => handleDeleteComment(comment._id)}
                        >
                          삭제
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Form onSubmit={handleAddComment} className="mt-3 mb-3">
            <Form.Group controlId="content">
              <Form.Control
                name="content"
                as="textarea"
                rows={3}
                placeholder="댓글을 입력하세요."
                required
              />
            </Form.Group>
            <Button type="submit" className="mt-3">
              댓글 추가
            </Button>
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
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="tooltip-disabled">
                참가자가 있을 시 수정, 삭제할 수 없습니다.
              </Tooltip>
            }
          >
            <a>
              <Button
                className="mt-3"
                onClick={handleUpdateClick}
                disabled={challenge.participantsCount >= 1}
              >
                수정하기
              </Button>
            </a>
          </OverlayTrigger>

          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="tooltip-disabled">
                참가자가 있을 시 수정, 삭제할 수 없습니다.
              </Tooltip>
            }
          >
            <a>
              <Button
                className="mt-3"
                onClick={handleDeleteClick}
                disabled={challenge.participantsCount >= 1}
              >
                삭제하기
              </Button>

              
            </a>
          </OverlayTrigger>
        </>
      )}
      <Button onClick={onBackToListClick} className="mt-3">
        목록으로
      </Button>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        style={{ zIndex: "9999", marginTop: "200px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>참가하기</Modal.Title>
        </Modal.Header>
        <ChallengeParticipate
          onClose={handleCloseModal}
          challenge={challenge}
        />
      </Modal>

      <Modal
        size="lg"
        show={showUpdateModal}
        onHide={handleCloseUpdateModal}
        style={{ zIndex: "9998", marginTop: "100px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>챌린지 수정</Modal.Title>
        </Modal.Header>
        <ChallengeUpdate
          challenge={challenge}
          onClose={handleCloseUpdateModal}
        />
        <Modal.Footer>
          <Button
            className="mt-4 mb-4"
            variant="secondary"
            onClick={handleCloseUpdateModal}
            style={{
              width: "100%",
              borderRadius: "0px",
            }}
          >
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ChallengeRead;
