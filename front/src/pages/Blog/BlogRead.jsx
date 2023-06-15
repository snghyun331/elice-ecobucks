import React, {useContext} from 'react';
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
const BlogRead = ({ blog, onBackToListClick }) => {
    console.log("BlogRead: ", blog);
  return (
    <div style={{ padding: "60px" }}>
        <Container className="mt-5">
        <h2>절약 팁 내용 확인</h2>
        <Card className="m-2">
                <Card.Body className="card-body">
                <Card.Title className="card-title"><span>제목:</span> {blog.title}</Card.Title>
                <Card.Text className="card-text">주제: {blog.topic}</Card.Text>
                <Card.Text className="card-text">설명: {blog.content}</Card.Text>
                <Card.Text className="card-text">작성자: {blog.username}</Card.Text>
                <BlogComment blog={blog} />

            {/* <ChallengeComments challenge={challenge} /> */}

            </Card.Body>
        </Card>
        <Button onClick={onBackToListClick} className="mt-3">
        목록으로
      </Button>
        </Container>
      </div>
  )
};

export default BlogRead;
