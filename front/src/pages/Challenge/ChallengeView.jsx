import { Card, Container, Button } from "react-bootstrap";

const ChallengeView = () => {
  const challenges = [
    {
      title: "돌고래 밥주기",
      description: "돌고래 밥을 줍시다.",
      createDate: "2023-05-01",
      duration: "1주",
      completed: false,
      author: "John Doe",
    },
    {
      title: "코드 뽑고 예비전력 아끼기",
      description: "코드 뽑고 예비전력 아껴봅시다.",
      createDate: "2023-05-10",
      duration: "2주",
      completed: true,
      author: "Michael Johnson",
    },
    {
      title: "텀블러에 음료 테이크아웃",
      description:
        "텀블러에 음료 테이크아웃해봅시다. 용기에 음료 테이크아웃해봅시다...",
      createDate: "2023-05-05",
      duration: "4주",
      completed: false,
      author: "Jane Smith",
    },
    // 더 많은 챌린지 데이터...
  ];

  // 종료일자를 기준으로 챌린지를 정렬
  const sortedChallenges = challenges.sort((a, b) => {
    return new Date(b.createDate) - new Date(a.createDate);
  });

  return (
    <Container className="">
      {sortedChallenges.map((challenge, index) => (
        <Card
          key={index}
          className={`m-2 ${challenge.completed ? "text-muted" : ""}`}
          style={{ width: "16rem" }}
        >
          <div
            style={{
              borderBottom: "solid 1px #878787",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "10rem",
              fontSize: "7rem",
            }}
          >
            🪙
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
            </Card.Text>
            <Button variant="primary" size="sm">
              더보기
            </Button>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default ChallengeView;
