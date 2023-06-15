import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Container, Modal, Row, Col, ListGroup, Form, Badge } from "react-bootstrap";
import * as Api from "../../api";
import { UserStateContext } from "../../context/user/UserProvider";
import BlogModal from "../Modal/BlogModal";
import BlogPost from "./BlogPost";
import BlogPostEdit from "./BlogPostEdit";
import BlogComment from "./BlogComment";
import BlogRead from "./BlogRead";
import PaginationBar from "../Modal/PaginationBar";
import like from "../../assets/heartfill.png";
import dislike from "../../assets/heartblank.png";

const Blog = () => {
  // const [blogPosts, setBlogPosts] = useState([]);
  const userState = useContext(UserStateContext);
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleOpenModal = () => setShowModal(true);
  const [blogList, setBlogList] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [selectedUpdateBlog, setSelectedUpdateBlog] = useState(null);
  // const [isLiked, setIsLiked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  // const sortedList = blogList.sort((a, b) => b.likeCount - a.likeCount)
  // const currentList = sortedList.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );
  const handleReadMoreClick = (blog) => {
    setSelectedBlog(blog);
  };
  const handleBackToListClick = () => {
    setSelectedBlog(null);
  };

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const handleCloseEditModal = () => setEditModalOpen(false);
  const handleOpenEditModal = async (blogId) => {
    try {
      console.log("blogId: ", blogId);
      const res = await Api.get(`blog/${blogId}`);
      const blog = res.data;
      // console.log("받아온 blog: ", blog);
      // console.log("res", res);
      setSelectedUpdateBlog(blog);
      // console.log("selectedItem: ", selectedItem);
    } catch (err) {
      console.log("수정 모달 열 때 에러 ", err);
    }
    // setSelectedItem(item);
    setEditModalOpen(true);
  };
  const handleCloseDeleteModal = () => setDeleteModalOpen(false);
  const handleOpenDeleteModal = async (blogId) => {
    try {
      const res = await Api.get(`blog/${blogId}`);
      const blog = res.data;
      // console.log("삭제 blog: ", blog);
      setSelectedBlog(blog);
    } catch (err) {
      console.log(err);
    }
    setDeleteModalOpen(true);
  };

  const navigate = useNavigate();

  useEffect(() => {
    // 만약 전역 상태의 user가 null이거나 탈퇴한 회원이라면, 로그인 페이지로 이동함.
    if (!userState.user || !userState.user.is_withdrawed == false) {
      navigate("/login", { replace: true });
      return;
    }
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      // "/mypage" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
      const res = await Api.get(`blog?page=${currentPage}`);
      // console.log("db data: ", res.data)

      const newList = res.data.posts.map(item => {
        return {
          content: item.content,
          likeCount: item.likeCount,
          likeUsers: item.likeUsers,
          title: item.title,
          topic: item.topic,
          username: item.username,
          userId: item.userId, //작성자 아아디
          blogId: item._id //절약 팁 고유 아이디
        };
      });
      // console.log(newList);
      setBlogList(newList);
      setTotalPages(res.data.totalPage)
      // console.log(blogList.map(item => (console.log(item))));
    } catch (err) {
      // alert("정보 불러오기를 실패하였습니다.");
      console.log("절약 팁 불러오기를 실패하였습니다.", err);
    }
  }

  const handleEditBlog = async (selectedBlog, updatedBlog) => {
    try {
      console.log("selectedBlog: ", selectedBlog);
      console.log("updatedBlog: ", updatedBlog);

      await Api.put(`blog/${selectedBlog._id}/write`, updatedBlog);
      fetchData();
      handleCloseEditModal();

    } catch (err) {
      console.log("글 수정에 실패했습니다", err);
    }
  }
  const handleDeleteBlog = async (selectedBlog) => {
    try {
      console.log("삭제할 절약 팁: ", selectedBlog);
      await Api.delete(`blog/${selectedBlog._id}`);

      fetchData();
      handleCloseDeleteModal();
    } catch (err) {
      console.log("절약 팁 삭제에 실패했습니다.", err);
    }
  }

  // 좋아요 버튼 클릭 시 동작
  const handleLike = async (blog) => {
    try {
      // 좋아요 요청을 보내고 업데이트된 절약 팁 글 정보를 가져옴
      await Api.put(`blog/${blog.blogId}/likes`, {
        pressLikeUserId: userState.user._id
      });

      fetchData();
    } catch (error) {
      console.log(error);
    }
  };
  // 좋아요 취소 버튼 클릭 시 동작
  const handleDislike = async (blog) => {
    try {
      // 좋아요 취소 요청을 보내고 업데이트된 절약 팁 글 정보를 가져옴
      await Api.put(`blog/${blog.blogId}/dislikes`, {
        cancelLikeUserId: userState.user._id
      });

      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "100px" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: "70%",
          background: "#00D387",
          zIndex: -1,
        }}
      >
      </div>
      <div
        style={{
          position: "absolute",
          top: 80,
          left: '18%',
          right: 0,
          zIndex: 1,
          color: 'white',
          fontSize: '2rem',
          fontWeight: '900',
        }}
      >절약 팁 :
        <br />
        <span style={{ fontSize: '1.3rem', fontWeight: '400' }}>절약 꿀팁을 공유해요.</span>
      </div>
      {selectedBlog ? (
        <BlogRead
          blog={selectedBlog}
          onBackToListClick={handleBackToListClick}
        />
      ) : (
        <Container
          className="pt-5 pb-5 d-flex flex-column align-items-center justify-content-center"
          style={{ marginTop: '200px', paddingTop: '30px', width: "80%", border: "1px solid #c2c2c2", backgroundColor: 'white', borderRadius: '10px' }}
        >
          <Button variant="primary" style={{ marginBottom: "10px", top: "5" }} onClick={handleOpenModal}>
            팁 작성하기
          </Button>
          <BlogModal show={showModal} onHide={handleCloseModal} title="팁 작성하기" handleClose={handleCloseModal}>
            <BlogPost />
          </BlogModal>
          {/* BlogRead 에 해당하는 영역 */}
          <Container>
            <Row>
              {blogList.map(item => (
                <Col key={item._id}>
                  <Card
                    style={{ width: "20rem", height: "20rem" }} >
                    <Card.Body className="card-body">
                      <div className="d-flex align-items-center">
                        <Card.Title className="card-title flex-grow-1">
                          <span>제목:</span> {item.title}
                        </Card.Title>
                        {userState.user._id === item.userId ?
                          <>
                            <Button variant="primary" style={{ margin: "10px", top: "5" }} onClick={() => handleOpenEditModal(item.blogId)}>
                              수정
                            </Button>
                            <Modal show={editModalOpen} onHide={handleCloseEditModal} centered>
                              <Modal.Header closeButton>
                                <Modal.Title>글 수정</Modal.Title>
                              </Modal.Header>
                              <Modal.Body className="text-center">
                                <BlogPostEdit handleEditBlog={handleEditBlog} selectedBlog={selectedBlog} />
                              </Modal.Body>
                              <Modal.Footer>
                                <Button
                                  className="mt-4 mb-4"
                                  variant="secondary"
                                  onClick={handleCloseEditModal}
                                  style={{
                                    width: "100%",
                                    borderRadius: "0px",
                                  }}
                                >
                                  닫기
                                </Button>
                              </Modal.Footer>
                            </Modal>

                          </> : null}

                      </div>
                      <Card.Text className="card-text">주제: {item.topic}</Card.Text>
                      <Card.Text
                        className="card-text"
                        style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>설명: {item.content}</Card.Text>
                      <Card.Text className="card-text">작성자: {item.username}</Card.Text>
                      <Card.Text className="card-text" onClick={() => handleReadMoreClick(item)}>자세히보기</Card.Text>
                      {item.likeUsers.includes(userState.user._id) ? (
                        <button onClick={() => handleDislike(item)}>
                          <img src={like} alt="좋아요" />
                        </button>
                      ) : (
                        <button onClick={() => handleLike(item)}>
                          <img src={dislike} alt="좋아요취소" />
                        </button>
                      )}
                      <Badge
                        bg="info"
                        className="position-absolute bottom-0 end-0 m-3"
                        style={{ zIndex: 1 }}
                      >
                        {item.likeCount > 0 &&
                          `좋아요 ${item.likeCount}`}
                      </Badge>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
          <PaginationBar
            content={blogList}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
          />
        </Container>
      )}

    </div>
  );
};

export default Blog;
