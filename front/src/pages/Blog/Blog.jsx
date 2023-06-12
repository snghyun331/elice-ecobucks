import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Container, Modal, Row, Col, ListGroup, Form } from "react-bootstrap";
import * as Api from "../../api";
import { UserStateContext } from "../../context/user/UserProvider";
import BlogPost from "./BlogPost";
import BlogPostEdit from "./BlogPostEdit";
import BlogComment from "./BlogComment";
// import BlogLike from "./BlogLike";
const Blog = () => {
  // const [blogPosts, setBlogPosts] = useState([]);
  const userState = useContext(UserStateContext);
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleOpenModal = () => setShowModal(true);
  const [blogList, setBlogList] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  // const [isLiked, setIsLiked] = useState(false);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const handleCloseEditModal = () => setEditModalOpen(false);
  const handleOpenEditModal = async (blogId) => {
    try {
      console.log("blogId: ", blogId);
      const res = await Api.get(`blog/${blogId}`);
      const blog = res.data;
      // console.log("받아온 blog: ", blog);
      console.log("res", res);
      setSelectedBlog(blog);
      // console.log("selectedItem: ", selectedItem);
    } catch(err) {
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
  }, []);

  const fetchData = async () => {
    try {
      // "/mypage" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
      const res = await Api.get("blog");
      // console.log("db data: ",res.data)
      
      const newList = res.data.map(item => {
        return {
          content: item.content,
          likeCount: item.likeCount,
          likeUsers: item.likeUsers,
          title: item.title,
          topic: item.topic,
          username: item.username,
          userId: item.userId, //작성자 아아디
          blogId: item._id //블로그 고유 아이디
        };
      });
      // console.log(newList);
      setBlogList(newList);
      // console.log(blogList.map(item => (console.log(item))));
    } catch (err){
      // alert("정보 불러오기를 실패하였습니다.");
      console.log("블로그 불러오기를 실패하였습니다.", err);
    }
  }

  const handleEditBlog = async (selectedBlog, updatedBlog) => {
    try {
      console.log("selectedBlog: ", selectedBlog);
      console.log("updatedBlog: ", updatedBlog);

      await Api.put(`blog/${selectedBlog.userId}/write`, updatedBlog);
      fetchData();
      // const updatedBlogList = blogList.map(item => {
      //   if (item._id === selectedBlog._id) {
      //     return { ...selectedBlog,
      //       title: updatedBlog.title,
      //       topic: updatedBlog.topic,
      //       content: updatedBlog.content,
      //     };
      //   }
      //   return item;
      // });
      // console.log("updatedBlogList: ", updatedBlogList);
      // setBlogList(updatedBlogList);
      handleCloseEditModal();

    } catch (err) {
      console.log("글 수정에 실패했습니다", err);
    }
  }
  const handleDeleteBlog = async (selectedBlog) => {
    try {
      console.log("삭제할 블로그: ", selectedBlog);
      await Api.delete(`blog/${selectedBlog._id}`);
      fetchData();
      // const res = await Api.get("products");
      // const newList = res.data.map(item => {
      //   return { ...selectedBlog,
      //       title: updatedBlog.title,
      //       topic: updatedBlog.topic,
      //       content: updatedBlog.content,
      //   };
      // });
      // setBlogList(newList);
      handleCloseDeleteModal();
    } catch (err) {
      console.log("블로그 삭제에 실패했습니다.", err);
    }
  }
  
    // 좋아요 버튼 클릭 시 동작
  const handleLike = async (blog) => {
    try {
      // 좋아요 요청을 보내고 업데이트된 블로그 글 정보를 가져옴
      const updatedBlog = await Api.put(`blog/${blog.blogId}/likes`, {
        pressLikeUserId: userState.user._id
      });

      // 업데이트된 블로그 글을 상태에 반영
      setBlogList(prevBlogList => {
        return prevBlogList.map(blog => {
          if (blog._id === updatedBlog._id) {
            return {
              ...blog,
              likeCount: updatedBlog.likeCount // likeCount 업데이트
            };
          }
          return blog;
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
// 좋아요 취소 버튼 클릭 시 동작
  const handleDislike = async (blog) => {
    try {
      // 좋아요 취소 요청을 보내고 업데이트된 블로그 글 정보를 가져옴
      const updatedBlog = await Api.put(`blog/${blog.blogId}/dislikes`, {
        cancelLikeUserId: userState.user._id
      });

      // 업데이트된 블로그 글을 상태에 반영
      setBlogList(prevBlogList => {
        return prevBlogList.map(blog => {
          if (blog._id === updatedBlog._id) {
            return updatedBlog;
          }
          return blog;
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "60px"}}>
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
      >짧로그 :
        <br />
        <span style={{fontSize: '1.3rem', fontWeight: '400' }}>절약 꿀팁 공유해요</span>
      </div>
      <Container
        className="pt-5 pb-5 d-flex flex-column align-items-center justify-content-center"
        style={{ marginTop: '200px', paddingTop: '30px', width: "80%", border: "1px solid #c2c2c2", backgroundColor: 'white', borderRadius: '10px' }}
      >
        <Button variant="primary" style={{ marginBottom: "10px", top: "5" }} onClick={handleOpenModal}>
          팁 작성하기
          </Button>
        <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>팁 작성하기</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <BlogPost />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="mt-4 mb-4"
            variant="secondary"
            onClick={handleCloseModal}
            style={{
              width: "100%",
              borderRadius: "0px",
            }}
          >
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
          

          <Container>
        <Row>
        {blogList.map(item => (
            <Col key={item._id}>
              <Card style={{ width: "18rem" }}>
                <Card.Body className="card-body">
                  <Card.Title className="card-title"><span>제목:</span> {item.title}</Card.Title>
                  
                  <Card.Text className="card-text">주제: {item.topic}</Card.Text>
                  {/* <Card.Text className="card-text">likeCount: {item.likeCount}</Card.Text> */}
                  <Card.Text className="card-text">설명: {item.content}</Card.Text>
                  <Card.Text className="card-text">작성자: {item.username}</Card.Text>
                  {/* <Button variant="primary" onClick={() => handleLike(item)}>좋아요</Button> */}
                  {/* <BlogLike blog={item}/> */}
                  {item.likeUsers.includes(userState.user._id) ? (
                    <button onClick={() => handleDislike(item)}>좋아요 취소</button>
                  ) : (
                    <button onClick={() => handleLike(item)}>좋아요</button>
                  )}
                  <p>좋아요 수: {item.likeCount}</p>
                  <BlogComment blog={item} />
                  {userState.user._id === item.userId && (
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
                      <Button variant="primary" style={{ margin: "10px", top: "5" }} onClick={() => handleOpenDeleteModal(item.blogId)}>
                        삭제
                      </Button>
                      <Modal show={deleteModalOpen} onHide={handleCloseDeleteModal} centered>
                        <Modal.Header closeButton>
                          <Modal.Title>팁 삭제</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="text-center">
                          선택한 팁을 삭제하시겠습니까?
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleCloseDeleteModal}>취소</Button>
                          <Button variant="primary" onClick={() => handleDeleteBlog(selectedBlog)}>삭제하기</Button> 
                        </Modal.Footer>
                      </Modal>
                    </>
                  )}             
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      </Container>
    </div>
  );
};

export default Blog;
