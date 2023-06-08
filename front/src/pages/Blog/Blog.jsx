import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Container, Modal, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import { useEffect } from "react";
import BlogPost from "./BlogPost";
import { UserStateContext } from "../../context/user/UserProvider";
import { useContext } from "react";
const Blog = () => {
  // const [blogPosts, setBlogPosts] = useState([]);
  const userState = useContext(UserStateContext);
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleOpenModal = () => setShowModal(true);
  const [blogList, setBlogList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // 만약 전역 상태의 user가 null이거나 탈퇴한 회원이라면, 로그인 페이지로 이동함.
    if (!userState.user || !userState.user.is_withdrawed == false) {
      navigate("/login", { replace: true });
      return;
    }
    fetchData();
  }, []);

  useEffect(() => {
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
          title: item.title,
          topic: item.topic,
          username: item.username
        };
      });
      setBlogList(newList);
      // console.log(blogList.map(item => (console.log(item))));
    } catch (err){
      // alert("정보 불러오기를 실패하였습니다.");
      console.log("블로그 불러오기를 실패하였습니다.", err);
    }
  }

  return (
    <div style={{ padding: "60px"}}>
      <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: "70%",
              background: "#4d9e81",
              zIndex: -1,
            }}
          ></div>
      <h3 style={{ display: "flex", justifyContent: "center" }}>
        블로그페이지.
      </h3>
      <Container
        className="pt-5 pb-5 d-flex flex-column align-items-center justify-content-center"
        style={{
          width: "80%",
          border: "1px solid #c2c2c2",
          justifyContent: "Center",
          alignItems: "Center",
        }}
      >
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
          <Button variant="primary" style={{ marginBottom: "10px", top: "5" }} onClick={handleOpenModal}>
          팁 작성하기
          </Button>

          <Container>
        <Row>
        {blogList.map(item => (
            <Col key={item._id}>
              <Card style={{ width: "18rem" }}>
                {/* <img src={item.imageUrl} className="card-img-top" alt="Logo" /> */}
                <Card.Body className="card-body">
                  <Card.Title className="card-title"><span>제목:</span> {item.title}</Card.Title>
                  
                  <Card.Text className="card-text">{item.topic}</Card.Text>
                  {/* <Card.Text className="card-text">위치: {item.place}</Card.Text> */}
                  <Card.Text className="card-text">설명: {item.content}</Card.Text>
                  {/* <a href={item.place} className="btn btn-primary">
                    판매하는 매장 위치나 정보 넣기
                  </a> */}
                  
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
