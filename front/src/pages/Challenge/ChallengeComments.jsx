import React, { useState, useContext, useEffect } from "react";
import { Button, Form, ListGroup, Container } from "react-bootstrap";
import { UserStateContext } from "../../context/user/UserProvider";
import * as Api from "../../api";
import { formatDate } from "../../util/common";

const ChallengeComments = ({ challenge }) => {
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const userState = useContext(UserStateContext);


  const fetchComments = async () => {
    try {
      const res = await Api.get(`challenges/${challenge._id}/comments`);
      setComments(res.data);
    } catch (error) {
      console.log("Error fetching comments:", error);
    }
  };

  const addComment = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const content = formData.get("content");

    try {
      const res = await Api.post(`challenges/${challenge._id}/comments`, {
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

  const editComment = (commentId, content) => {
    setEditingCommentId(commentId);
    setEditedComment(content);
  };

  const updateComment = async (commentId) => {
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

  const cancelEditComment = () => {
    setEditingCommentId(null);
    setEditedComment("");
  };

  const deleteComment = async (commentId) => {
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
    fetchComments();
  }, []);

  return (
    <>
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
                  updateComment(comment._id);
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
                    onClick={cancelEditComment}
                  >
                    취소
                  </Button>
                </div>
              </Form>
            ) : (
              <div style={{ flex: 1 }}>
                <Container className="mt-2 mb-2">{comment.content}</Container>
                {comment.userId._id === userState.user._id && (
                  <div>
                    <Button
                      variant="link"
                      className="btn-sm"
                      style={{ textDecoration: "none" }}
                      onClick={() => editComment(comment._id, comment.content)}
                    >
                      수정
                    </Button>
                    <Button
                      variant="link"
                      className="btn-sm text-danger"
                      style={{ textDecoration: "none" }}
                      onClick={() => deleteComment(comment._id)}
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
      <Form onSubmit={addComment} className="mt-3 mb-3">
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
    </>
  );
};

export default ChallengeComments;
