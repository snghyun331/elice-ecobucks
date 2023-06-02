import React, { useState } from "react";
import { Button, ButtonGroup, Container, Form, Card } from "react-bootstrap";

const ChallengeRead = ({ challenge, onBackToListClick }) => {
  return (
    <Container>
      <h2>챌린지 내용 확인</h2>
      <Card className="m-2">
        <Card.Body>
          <Card.Title>{challenge.title}</Card.Title>
          <Card.Text>{challenge.description}</Card.Text>
          <Card.Text>
            작성일자: {challenge.createDate}
            <br />
            진행 기간: {challenge.duration}
            <br />
            작성자: {challenge.author}
            <br />
            참여인원: {challenge.participantNumber.toLocaleString()} 명
          </Card.Text>
        </Card.Body>
      </Card>
      <Button onClick={onBackToListClick} className="mt-3">
        목록으로
      </Button>
    </Container>
  );
};

export default ChallengeRead;
