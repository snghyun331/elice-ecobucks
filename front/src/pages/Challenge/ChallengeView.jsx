import { Card, Container, Row, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import ChallengeRead from "./ChallengeRead";
import { useState, useContext, useEffect } from "react";
import MegaChallengeCarousel from "./MegaChallengeCarousel";

import * as Api from "../../api";
import {
  DispatchContext,
  UserStateContext,
} from "../../context/user/UserProvider";

const ChallengeView = () => {
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const dispatch = useContext(DispatchContext);
  const userState = useContext(UserStateContext);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await Api.get("challenges");
      console.log("통신결과", res.data);
      setChallenges(res.data);
      setIsFetchCompleted(true);
    } catch (err) {
      console.log("챌린지 정보 불러오기를 실패하였습니다.", err);
    }
  };

  const [challenges, setChallenges] = useState([]);

  // Fetch data and update the challenges state
  useEffect(() => {
    // 만약 전역 상태의 user가 null이거나 탈퇴한 회원이라면, 로그인 페이지로 이동함.
    if (!userState.user || !userState.user.is_withdrawed == false) {
      navigate("/login", { replace: true });
      return;
    }
    fetchData();
  }, []);

  const [selectedChallenge, setSelectedChallenge] = useState(null);

  const handleReadMoreClick = (challenge) => {
    setSelectedChallenge(challenge);
  };

  const handleBackToListClick = () => {
    setSelectedChallenge(null);
  };

  if (!isFetchCompleted) {
    return "loading...";
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Format date as 'YYYY-MM-DD'
  };

  const sortedChallenges = challenges.sort((a, b) => {
    if (a.isCompleted !== b.isCompleted) {
      return a.isCompleted ? 1 : -1;
    }
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  const isToday = (dateString) => {
    const today = new Date().toLocaleDateString();
    const date = new Date(dateString).toLocaleDateString();
    return today === date;
  };

  return (
    <>
      {selectedChallenge ? (
        <ChallengeRead
          challenge={selectedChallenge}
          onBackToListClick={handleBackToListClick}
        />
      ) : (
        <Container className="d-flex flex-wrap justify-content-center">
          <Row
            style={{
              width: "90%",
              border: "solid 1px #878787",
              borderRadius: "15px",
              height: "17rem",
              overflow: "hidden",
            }}
          >
            <MegaChallengeCarousel />
          </Row>

          {sortedChallenges.map((challenge, index) => (
            <Card
              key={index}
              className={`m-2 ${challenge.isCompleted ? "text-muted" : ""}`}
              style={{
                width: "17rem",
                position: "relative",
                cursor: challenge.isCompleted ? "default" : "pointer", // Set cursor style
              }}
              onClick={
                challenge.isCompleted
                  ? null
                  : () => handleReadMoreClick(challenge)
              }
            >
              {challenge.isCompleted && (
                <div
                  className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center"
                  style={{
                    background: "rgba(0, 0, 0, 0.5)",
                    top: 0,
                    left: 0,
                    zIndex: 2,
                  }}
                >
                  <span
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "1.5rem",
                      textAlign: "center",
                      position: "relative",
                      top: "-28%",
                    }}
                  >
                    종료된 챌린지입니다
                  </span>
                </div>
              )}
              <div
                style={{
                  border: "solid 1px #878787",
                  borderRadius: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "7rem",
                  paddingBottom: "7px",
                  margin: "20px",
                  background: "linear-gradient(to right, beige, lightblue)",
                }}
              >
                {challenge.icon}
              </div>
              <Card.Body>
                <Card.Title>
                  {challenge.title}
                  {isToday(challenge.createdAt) && (
                    <Badge
                      pill
                      bg="warning"
                      text="dark"
                      className="ml-2"
                      style={{ marginLeft: "4px", fontSize: "0.7rem" }}
                    >
                      New
                    </Badge>
                  )}
                </Card.Title>
                <Card.Text>{challenge.content}</Card.Text>
                <Card.Text>
                  <span style={{ fontWeight: "900", fontSize: "0.9em" }}>
                    마감 일자
                  </span>{" "}
                  <span style={{ fontSize: "0.8em" }}>
                    {formatDate(challenge.dueDate)}
                  </span>
                  <br />
                  <span style={{ fontWeight: "900", fontSize: "0.9em" }}>
                    참여 인원
                  </span>{" "}
                  <span style={{ fontSize: "0.8em" }}>
                    {challenge.participantsCount.toLocaleString()} 명
                  </span>
                  <br />
                  <Badge
                    bg="info"
                    className="position-absolute bottom-0 end-0 m-3"
                    style={{ zIndex: 1 }}
                  >
                    {challenge.commentsCount > 0 &&
                      `댓글 ${challenge.commentsCount}`}
                  </Badge>
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Container>
      )}
    </>
  );
};

export default ChallengeView;
