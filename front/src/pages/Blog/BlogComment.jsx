import { useState, useContext, useEffect } from "react";
import { ListGroup, Form, Button, Container } from "react-bootstrap";
import * as Api from "../../api";
import { UserStateContext } from "../../context/user/UserProvider";
import { showAlert } from "../../assets/alert";

const BlogComment = ({ blog }) => {
  const userState = useContext(UserStateContext);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [isContentValid, setContentValid] = useState(true);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState("");

  const handleAddComment = async (e) => {
    e.preventDefault();
    // const formData = new FormData(e.target);
    // const content = formData.get("content");
    const content = commentContent.trim();
    if (content.length <= 20) {
      try {
        const res = await Api.post(`blog/${blog.blogId}/comment/write`, {
          comment: content,
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

    } else {
      showAlert("댓글은 20글자 이하여야 합니다.");
    }
    e.target.reset();
  };
  const handleCommentChange = (e) => {
    const content = e.target.value;
    console.log(content.length);
    setCommentContent(content);

    if (content.length > 20) {
      setContentValid(false);
    } else {
      setContentValid(true);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const fetchComments = async () => {
    try {
      const res = await Api.get(`blog/${blog.blogId}`);
      const fetchedComments = res.data.commentList;
      // console.log('a', fetchedComments)
      return fetchedComments;
    } catch (error) {
      console.log("Error fetching comments:", error);
      return [];
    }
  };

  useEffect(() => {
    const getComments = async () => {
      const fetchedComments = await fetchComments();
      setComments(fetchedComments);
    };

    getComments();
  }, [blog]);

  const handleUpdateComment = async (commentId) => {
    try {
      await Api.put(`blog/comment/${commentId}/write`, {
        comment: editedComment,
      });
      const updatedComments = comments.map((comment1) =>
        comment1._id === commentId
          ? { ...comment1, comment: editedComment }
          : comment1
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

  const handleEditComment = (commentId, content) => {
    setEditingCommentId(commentId);
    setEditedComment(content);
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await Api.delete(`blog/comment/${commentId}`);
      const updatedComments = comments.filter(
        (comment) => comment._id !== commentId
      );
      setComments(updatedComments);
    } catch (error) {
      console.log("Error deleting comment:", error);
    }
  };

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
              <strong>{comment.writername}</strong>{" "}
              <span style={{ color: "gray", fontSize: "0.8em" }}>
                {formatDate(comment.updatedAt)}
              </span>
              <p>{comment.comment}</p>
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
                {comment.writer_id === userState.user._id && (
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
      <Form onSubmit={handleAddComment} className="mt-3 mb-3 border-color:red">
        <Form.Group controlId="content">
          <Form.Control
            name="content"
            as="textarea"
            rows={3}
            placeholder="댓글을 입력하세요."
            required
            value={commentContent}
            onChange={handleCommentChange}
            style={!isContentValid ? { borderWidth: "2px", borderColor: "red" } : {}}
          />
          <span>{commentContent.length}/20</span>
        </Form.Group>
        <Button type="submit" className="mt-3 btn-default" >
          댓글 추가
        </Button>
      </Form>
    </>
  );
};

export default BlogComment;