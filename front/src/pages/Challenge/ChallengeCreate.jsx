import React, { useState } from "react";
import { Button, ButtonGroup, Container, Form, Alert } from "react-bootstrap";
import * as Api from "../../api";

const ChallengeCreate = ({ onBackToListClick }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [duration, setDuration] = useState("");
  const [icon, setIcon] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.post("challenges", {
        title,
        content,
        icon,
        weeks: duration,
      });
      window.location.reload();
    } catch (err) {
      alert("모든 값을 입력해주세요.");
      console.log("챌린지 등록에 실패하였습니다.", err);
    }
  };

  const handleTitleChange = (event) => {
    const { value } = event.target;
    if (value.length <= 20) {
      setTitle(value);
    }
  };

  const handleContentChange = (event) => {
    const { value } = event.target;
    if (value.length <= 100) {
      setContent(value);
    }
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
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>제목</Form.Label>
          <Container className="text-muted" style={{ fontSize: "0.85rem" }}>
            구체적인 행동을 지정해주세요. (i.e. 예비전력 절약을 위해 전기 코드를 뽑아요.)
          </Container>
          <Form.Control
            type="text"
            value={title}
            onChange={handleTitleChange}
            maxLength={20}
            placeholder="제목을 입력해주세요 (최대 20자)"
          />
          {title.length > 20 && (
            <Alert variant="danger" className="mt-2 p-2">
              제목은 최대 20자까지 입력 가능합니다.
            </Alert>
          )}
        </Form.Group>
        <Form.Group controlId="content">
          <Form.Label>설명</Form.Label>
          <Container className="text-muted" style={{ fontSize: "0.85rem" }}>
            이 행동을 하는 방법이나, 환경에 미치는 영향을 알려주세요.
          </Container>
          <Form.Control
            as="textarea"
            value={content}
            onChange={handleContentChange}
            maxLength={100}
            placeholder="설명을 입력해주세요 (최대 100자)"
          />
          {content.length > 100 && (
            <Alert variant="danger" className="mt-2 p-2">
              설명은 최대 100자까지 입력 가능합니다.
            </Alert>
          )}
        </Form.Group>
        <Form.Group controlId="duration">
          <Form.Label>진행기간</Form.Label>
          <Container className="text-muted" style={{ fontSize: "0.85rem" }}>
          </Container>
          <Form.Control
            as="select"
            value={duration}
            onChange={handleDurationChange}
          >
            <option value="">진행 기간을 선택해주세요.</option>
            <option value="1주">1주</option>
            <option value="2주">2주</option>
            <option value="3주">3주</option>
            <option value="4주">4주</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="icon">
          <Form.Label>아이콘</Form.Label>
          <Container className="text-muted" style={{fontSize:'0.85rem'}}>
            챌린지에 어울리는 테마 아이콘을 설정해주세요. 대표 이미지로 나타납니다.
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
          <Alert variant='warning' className="mt-2 p-2 text-muted" style={{fontSize:'0.85rem'}}>
            챌린지가 시작되고 참여인원이 1명 이상이 되면 수정, 삭제할 수 없습니다.
          </Alert>
        </Form.Group>
        <Button type="submit">챌린지 게시</Button>
        <Button onClick={onBackToListClick} className="mt-3">
        목록으로
      </Button>
      </Form>
    </div>
  );
};

export default ChallengeCreate;
