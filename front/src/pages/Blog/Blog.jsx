import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Container } from "react-bootstrap";
import * as Api from "../../api";
import { useEffect } from "react";

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    Api.get('blog')
      .then(response => {
        // 요청이 성공한 경우
        const blogPosts = response.data;
        setBlogPosts(blogPosts);
      })
      .catch(error => {
        // 요청 중 오류가 발생한 경우
        console.error(error);
      });
  }, []);

  useEffect(() => {
    console.log(blogPosts); // 블로그 게시물 데이터를 처리합니다.
  }, [blogPosts]);

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
        <Link to="/blog/write">
          <Button variant="primary" style={{ marginBottom: "10px", top: "5" }}>
          팁 작성하기
          </Button>
        </Link>
        {blogPosts.map((post) => (
        <Card key={post.id}>
          <Card.Header>카드 헤더</Card.Header>
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.content}</Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      ))}
      </Container>
    </div>
  );
};

export default Blog;
