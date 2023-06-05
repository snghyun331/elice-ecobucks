import { Card, Container, Row, Image } from "react-bootstrap";
import ChallengeRead from "./ChallengeRead";
import { useState, useContext } from "react";
import MegaChallengeCarousel from "./MegaChallengeCarousel";
import { DispatchContext, UserStateContext } from '../../context/user/UserProvider'


const ChallengeView = () => {

  const dispatch = useContext(DispatchContext)
  const userState = useContext(UserStateContext)
  
  console.log(userState)
  
  //더미데이터
  const challenges = [
    {
      title: "돌고래 밥주기",
      description: "돌고래 밥을 줍시다.",
      createDate: "2023-05-01",
      duration: "1주",
      completed: false,
      author: "John Doe",
      icon: "💧",
      participantNumber: 13,
    },
    {
      title: "코드 뽑고 예비전력 아끼기",
      description: "코드 뽑고 예비전력 아껴봅시다.",
      createDate: "2023-05-10",
      duration: "2주",
      completed: true,
      author: "Michael Johnson",
      icon: "🌿",
      participantNumber: 2048,
    },
    {
      title: "텀블러에 음료 테이크아웃",
      description:
        "텀블러에 음료 테이크아웃해봅시다. 용기에 음료 테이크아웃해봅시다...",
      createDate: "2023-05-05",
      duration: "4주",
      completed: false,
      author: "Jane Smith",
      icon: "🌍",
      participantNumber: 571,
    },
    // 더 많은 챌린지 데이터...
  ];

  // 종료일자를 기준으로 챌린지를 정렬
  const sortedChallenges = challenges.sort((a, b) => {
    return new Date(b.createDate) - new Date(a.createDate);
  });

  const [selectedChallenge, setSelectedChallenge] = useState(null);

  const handleReadMoreClick = (challenge) => {
    setSelectedChallenge(challenge);
  };

  const handleBackToListClick = () => {
    setSelectedChallenge(null);
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
              className={`m-2 ${challenge.completed ? "text-muted" : ""}`}
              style={{
                width: "16rem",
                position: "relative",
                cursor: challenge.completed ? "default" : "pointer", // Set cursor style
              }}
              onClick={
                challenge.completed
                  ? null
                  : () => handleReadMoreClick(challenge)
              }
            >
              {challenge.completed && (
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
          ))}
        </Container>
      )}
    </>
  );
};

export default ChallengeView;
