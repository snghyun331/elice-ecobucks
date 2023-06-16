import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Api from "../../api";
import "./TrendingChallenges.css";

const TrendingChallenges = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Api.get("challenges");
        setBlogs(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const trendingBlogs = blogs
    .sort((a, b) => b.participantsCount - a.participantsCount)
    .slice(0, 6);

  const groupedBlogs = trendingBlogs.reduce((result, value, index) => {
    if (index % 3 === 0) {
      result.push(trendingBlogs.slice(index, index + 3));
    }
    return result;
  }, []);

  return (
    <Container
      style={{
        width: "100%",
        backgroundColor: "#fff",
        border: "1px solid #d6d6d6",
        boxShadow: "3px 3px 4px #ebebeb",
        borderRadius: "10px",
        padding: "20px",
        marginTop: "50px",
        position: "relative",
      }}
    >
      <div className="trending-challenges-container">
        <h3 style={{ marginLeft: "20px" }}>요즘 뜨는 챌린지</h3>
        <div
          style={{
            marginTop: "18px",
            marginBottom: "18px",
            marginLeft: "20px",
            height: "5.5px",
            width: "120px",
            backgroundColor: "#FF6B00",
            borderRadius: "10px",
          }}
        ></div>
        <Link to="/challenge" className="more-link">
          더보기
        </Link>
        <Carousel
          nextIcon={
            <span className="carousel-icon carousel-icon-next">&#8250;</span>
          }
          prevIcon={
            <span className="carousel-icon carousel-icon-prev">&#8249;</span>
          }
        >
          {groupedBlogs.map((group, i) => (
            <Carousel.Item key={`group-${i}`}>
              <Container className="carousel-container">
                  {group.map((blog) => (
                    <Col
                      key={blog.id}
                      className="challenge-item"
                      sm={4}
                    >
                      <Card
                        className="challenge-card ms-3"
                        style={{width:'100%'}}
                      >
                        <Card.Body>
                          <Card.Title>{blog.title}</Card.Title>
                          <Card.Text className="pt-3 pb-3">
                            {blog.content.length > 30
                              ? `${blog.content.slice(0, 30)}...`
                              : blog.content}
                          </Card.Text>
                          <div
                            className="by-author muted-text"
                            style={{ fontSize: "0.8em" }}
                          >
                            {blog.userId.userName}
                          </div>
                          <div className="like-count">
                            <span role="img" aria-label="heart">
                              {blog.icon}
                            </span>{" "}
                            {blog.participantsCount}명 참가
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
              </Container>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </Container>
  );
};

export default TrendingChallenges;
