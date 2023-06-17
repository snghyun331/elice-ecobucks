import React, { useContext } from 'react';
import {
  Button,
  Container,
  Card,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { UserStateContext } from "../../context/user/UserProvider";
import BlogModal from "../Modal/BlogModal";
import BlogComment from './BlogComment';
import BlogPostEdit from './BlogPostEdit';
import like from "../../assets/heartfill.png";
import dislike from "../../assets/heartblank.png";
import { formatDate } from '../../util/common';
const BlogRead = ({ blog, onBackToListClick }) => {
  console.log("BlogRead: ", blog);
  return (
    <div style={{ padding: "60px" }}>
      <Container className="mt-1" style={{ paddingLeft: '90px', paddingRight: '90px' }}>
        <Card style={{ backgroundColor: "#DDF7E3" }} className="m-5">
          <Card.Body className="card-body">
            <Card.Title className="card-title"><h4>{blog.title}</h4></Card.Title>
            <Card.Text className="card-text" style={{ color: "#9DC08B" }}>{blog.topic}</Card.Text>
            <Card.Text className="card-text">{blog.content}</Card.Text>
            <Card.Text style={{ fontSize: '0.8em', textAlign: 'right' }}>
              작성일자: {formatDate(blog.createdAt)}
              <br />
              작성자: {blog.userName}
              <br />
            </Card.Text>

            <BlogComment blog={blog} />
          </Card.Body>
        </Card>
        <Button onClick={onBackToListClick} className="btn-default mt-3">
          목록으로
        </Button>
      </Container>
    </div>
  )
};

export default BlogRead;
