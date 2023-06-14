import { Card, Row } from "react-bootstrap";
import * as Api from "../../api";
import { useEffect, useState } from "react";

const UserSummary = ({ user }) => {

  return (
    <>
      <Row className="justify-content-center mb-5">
        <Card style={{ width: "30%", margin: "0 5px" }}>
          <Card.Body className="text-center d-flex flex-column align-items-center">
            <Card.Subtitle className="mb-2 text-muted">챌린지 참가</Card.Subtitle>
            <Card.Title className="my-auto">
              <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>{user.participantsList.length}</span>
              <span className="text-muted" style={{ fontSize: "0.9rem" }}>
                {" "}
                건
              </span>
            </Card.Title>
          </Card.Body>
        </Card>
        <Card style={{ width: "30%", margin: "0 5px" }}>
          <Card.Body className="text-center d-flex flex-column align-items-center">
            <Card.Subtitle className="mb-2 text-muted">주문</Card.Subtitle>
            <Card.Title className="my-auto">
              <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>{user.orderCount}</span>
              <span className="text-muted" style={{ fontSize: "0.9rem" }}>
                {" "}
                건
              </span>
            </Card.Title>
          </Card.Body>
        </Card>
        <Card style={{ width: "30%", margin: "0 5px" }}>
          <Card.Body className="text-center d-flex flex-column align-items-center">
            <Card.Subtitle className="mb-2 text-muted">챌린지 댓글</Card.Subtitle>
            <Card.Title className="my-auto">
              <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>{user.userCommentsList.length}</span>
              <span className="text-muted" style={{ fontSize: "0.9rem" }}>
                {" "}
                건
              </span>
            </Card.Title>
          </Card.Body>
        </Card>
      </Row>
    </>
  );
};

export default UserSummary;
