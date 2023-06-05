import { Button, Card, Container } from "react-bootstrap";

const Blog = () => {
  return (
    <div style={{ padding: "60px"}}>
      <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: "70%",
              background: "#4d9e81",
              zIndex: -1,
            }}
          ></div>
      <h3 style={{ display: "flex", justifyContent: "center" }}>
        블로그페이지.
      </h3>
      <Container
        className="pt-5 pb-5 d-flex flex-column align-items-center justify-content-center"
        style={{
          width: "80%",
          border: "1px solid #c2c2c2",
          justifyContent: "Center",
          alignItems: "Center",
        }}
      >
        <Button variant="primary" style={{ marginBottom: "10px", top: "5" }}>
          팁 작성하기
        </Button>
        <Card>
          <Card.Header>전기 아끼기 팁</Card.Header>
          <Card.Body>
            <Card.Title>Special title treatment</Card.Title>
            <Card.Text>
              With supporting text below as a natural lead-in to additional
              content.
            </Card.Text>
          </Card.Body>
        </Card>
        <br />
        <Card>
          <Card.Header>에어컨 절전모드</Card.Header>
          <Card.Body>
            <Card.Title>Special title treatment</Card.Title>
            <Card.Text>
              With supporting text below as a natural lead-in to additional
              content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Blog;
