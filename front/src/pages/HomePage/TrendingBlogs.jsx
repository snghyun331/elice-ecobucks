import React, { useEffect, useState, useRef } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import * as Api from "../../api";

const TrendingBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Api.get("blog");
        setBlogs(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const trendingBlogs = blogs
    .sort((a, b) => b.likeCount - a.likeCount)
    .slice(0, 5);

  return (
    <div style={{ overflowX: "scroll" }}>
      <Container ref={containerRef} className="scrollable-container">
        <Row style={{ flexWrap: "nowrap" }}>
          {trendingBlogs.map((blog) => (
            <Col key={blog.id} xs={4} className="blog-item" style={{ minWidth: '33.3333%' }}>
              <Card style={{ height: "100%" }}>
                <Card.Body>
                  <Card.Title>{blog.title}</Card.Title>
                  <Card.Text>
                    {blog.content.length > 15
                      ? `${blog.content.slice(0, 15)}...`
                      : blog.content}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default TrendingBlogs;