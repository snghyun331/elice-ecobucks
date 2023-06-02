import React, { useState } from "react";
import { Button, ButtonGroup, Container, Form } from "react-bootstrap";

const ChallengeCreate = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [icon, setIcon] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const handleIconSelect = (selectedIcon) => {
    setIcon(selectedIcon);
  };

  return (
    <div>
      <h2>챌린지 시작하기</h2>
      <Form>
        <Form.Group controlId="title">
          <Form.Label>제목</Form.Label>
          <Container className="text-muted" style={{fontSize:'0.85rem'}}>
            구체적인 행동을 지정해주세요. (i.e. 예비전력 절약을 위해 전기 코드를 뽑아요.)
          </Container>
          <Form.Control
            type="text"
            value={title}
            onChange={handleTitleChange}
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>설명</Form.Label>
          <Container className="text-muted" style={{fontSize:'0.85rem'}}>
            이 행동을 하는 방법이나, 환경에 미치는 영향을 알려주세요.
          </Container>
          <Form.Control
            as="textarea"
            value={description}
            onChange={handleDescriptionChange}
          />
        </Form.Group>
        <Form.Group controlId="duration">
          <Form.Label>진행기간</Form.Label>
          <Container className="text-muted" style={{fontSize:'0.85rem'}}>
          </Container>
          <Form.Control
            as="select"
            value={duration}
            onChange={handleDurationChange}
          >
            <option value="">진행 기간을 선택해주세요.</option>
            <option value="7">7일</option>
            <option value="14">14일</option>
            <option value="28">28일</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="icon">
          <Form.Label>아이콘</Form.Label>
          <Container className="text-muted" style={{fontSize:'0.85rem'}}>
            챌린지에 어울리는 테마 아이콘을 설정해주세요.
          </Container>
          <ButtonGroup>
            <Button
              variant={icon === "♻️" ? "primary" : "outline-primary"}
              onClick={() => handleIconSelect("♻️")}
            >
              ♻️
            </Button>
            <Button
              variant={icon === "💚" ? "primary" : "outline-primary"}
              onClick={() => handleIconSelect("💚")}
            >
              💚
            </Button>
            <Button
              variant={icon === "🍃" ? "primary" : "outline-primary"}
              onClick={() => handleIconSelect("🍃")}
            >
              🍃
            </Button>
            <Button
              variant={icon === "🏞️" ? "primary" : "outline-primary"}
              onClick={() => handleIconSelect("🏞️")}
            >
              🏞️
            </Button>
            <Button
              variant={icon === "🌱" ? "primary" : "outline-primary"}
              onClick={() => handleIconSelect("🌱")}
            >
              🌱
            </Button>
            <Button
              variant={icon === "🌍" ? "primary" : "outline-primary"}
              onClick={() => handleIconSelect("🌍")}
            >
              🌍
            </Button>
            <Button
              variant={icon === "👩‍👦‍👦" ? "primary" : "outline-primary"}
              onClick={() => handleIconSelect("👩‍👦‍👦")}
            >
              👩‍👦‍👦
            </Button>
            <Button
              variant={icon === "💪🏻" ? "primary" : "outline-primary"}
              onClick={() => handleIconSelect("💪🏻")}
            >
              💪🏻
            </Button>
            <Button
              variant={icon === "🌈" ? "primary" : "outline-primary"}
              onClick={() => handleIconSelect("🌈")}
            >
              🌈
            </Button>
            <Button
              variant={icon === "💧" ? "primary" : "outline-primary"}
              onClick={() => handleIconSelect("💧")}
            >
              💧
            </Button>
            <Button
              variant={icon === "🌿" ? "primary" : "outline-primary"}
              onClick={() => handleIconSelect("🌿")}
            >
              🌿
            </Button>
          </ButtonGroup>
        </Form.Group>
        <Button type="submit">챌린지 게시</Button>
        <Button>목록으로</Button>
      </Form>
    </div>
  );
};

export default ChallengeCreate;
