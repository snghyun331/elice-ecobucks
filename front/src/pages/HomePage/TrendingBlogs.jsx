import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Carousel } from "react-bootstrap";
import * as Api from "../../api";
import "./TrendingBlogs.css";

const TrendingBlogs = () => {
  const [blogs, setBlogs] = useState([]);

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
    .slice(0, 6);

  const groupedBlogs = trendingBlogs.reduce((result, value, index) => {
    if (index % 3 === 0) {
      result.push(trendingBlogs.slice(index, index + 3));
    }
    return result;
  }, []);

  return (
    <div className="trending-blogs-container">
<Carousel
  nextIcon={<span className="carousel-icon carousel-icon-next">&#8250;</span>}
  prevIcon={<span className="carousel-icon carousel-icon-prev">&#8249;</span>}
>

        {groupedBlogs.map((group, i) => (
          <Carousel.Item key={`group-${i}`}>
            <Container fluid className="carousel-container">
              <Row className="d-flex justify-content-center">
                {group.map((blog) => (
                  <Col key={blog.id} xs={4} className="blog-item">
                    <Card className="blog-card">
                      <Card.Body>
                        <Card.Title>{blog.title}</Card.Title>
                        <Card.Text>
                          {blog.content.length > 30
                            ? `${blog.content.slice(0, 30)}...`
                            : blog.content}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default TrendingBlogs;
