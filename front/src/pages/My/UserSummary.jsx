import { Card, Row } from "react-bootstrap";
import * as Api from "../../api";
import { useEffect, useState } from "react";

const UserSummary = ({ user }) => {

  const [userCommentsCount, setUserCommentsCount] = useState([]);

  const fetchData = async () => {
    try {
      const res = await Api.get(`users/${user._id}/comments`)
      setUserCommentsCount(res.data.length)
      console.log(userCommentsCount)
    } catch (err) {
      console.error("Failed to fetch user comment history : ", err);
    }
  }

  useEffect( () => {
    fetchData();
  }, [])

  return (
    <>
      <Row className="justify-content-center mb-5">
        <Card style={{ width: "30%", margin: "0 5px" }}>
          <Card.Body className="text-center d-flex flex-column align-items-center">
            <Card.Subtitle className="mb-2 text-muted">챌린지</Card.Subtitle>
            <Card.Title className="my-auto">
              <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>12</span>
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
              <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>8</span>
              <span className="text-muted" style={{ fontSize: "0.9rem" }}>
                {" "}
                건
              </span>
            </Card.Title>
          </Card.Body>
        </Card>
        <Card style={{ width: "30%", margin: "0 5px" }}>
          <Card.Body className="text-center d-flex flex-column align-items-center">
            <Card.Subtitle className="mb-2 text-muted">댓글</Card.Subtitle>
            <Card.Title className="my-auto">
              <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>4</span>
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
