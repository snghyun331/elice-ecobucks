import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Container, Form, Alert, Modal } from "react-bootstrap";
import * as Api from "../../api";
import { showAlert } from "../../assets/alert";

const ChallengeUpdate = ({ show, onClose, challenge }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [duration, setDuration] = useState("");
  const [icon, setIcon] = useState("");

  useEffect(() => {
    // Set the initial values based on the challenge prop
    setTitle(challenge.title);
    setContent(challenge.content);
    setDuration(challenge.weeks);
    setIcon(challenge.icon);
  }, [challenge]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!title || !content || !duration || !icon) {
        showAlert("모든 값을 입력해주세요.");
        return;
      }

      const res = await Api.put(`challenges/${challenge._id}`, {
        title,
        content,
        icon,
        weeks: duration,
      });
      console.log(res);
      window.location.reload();
    } catch (err) {
      showAlert("챌린지 수정에 실패하였습니다.");
      console.log("챌린지 수정에 실패하였습니다.", err);
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const handleIconSelect = (selectedIcon) => {
    setIcon(selectedIcon);
  };

  return (
    <Modal size='lg' show={show} style={{ zIndex: "1050", marginTop: "20px" }}>
    <div style={{ padding: "20px" }}>
      <Modal.Header closeButton onHide={onClose}>
        <Modal.Title>챌린지 수정</Modal.Title>
      </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>제목</Form.Label>
            <Container
              className="text-muted mb-2"
              style={{ fontSize: "0.85rem" }}
            >
              구체적인 행동을 지정해주세요. (i.e. 예비전력 절약을 위해 전기
              코드를 뽑아요.)
            </Container>
            <Form.Control
              type="text"
              value={title}
              onChange={handleTitleChange}
              maxLength={20}
              placeholder="제목을 입력해주세요 (최대 20자)"
              style={{ borderRadius: "0px", marginBottom: "20px" }}
            />
            {title.length > 20 && (
              <Alert variant="danger" className="mt-2 p-2">
                제목은 최대 20자까지 입력 가능합니다.
              </Alert>
            )}
          </Form.Group>
          <Form.Group controlId="content">
            <Form.Label>설명</Form.Label>
            <Container
              className="text-muted mb-2"
              style={{ fontSize: "0.85rem" }}
            >
              이 행동을 하는 방법이나, 환경에 미치는 영향을 알려주세요.
            </Container>
            <Form.Control
              as="textarea"
              value={content}
              onChange={handleContentChange}
              maxLength={100}
              placeholder="설명을 입력해주세요 (최대 100자)"
              style={{ borderRadius: "0px", marginBottom: "20px" }}
            />
            {content.length > 100 && (
              <Alert variant="danger" className="mt-2 p-2">
                설명은 최대 100자까지 입력 가능합니다.
              </Alert>
            )}
          </Form.Group>
          <Form.Group controlId="duration">
            <Form.Label>진행기간</Form.Label>
            <Container
              className="text-muted"
              style={{ fontSize: "0.85rem" }}
            ></Container>
            <Form.Control
              as="select"
              value={duration}
              onChange={handleDurationChange}
              style={{ borderRadius: "0px", marginBottom: "20px" }}
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
            <Container
              className="text-muted mb-2"
              style={{ fontSize: "0.85rem" }}
            >
              챌린지에 어울리는 테마 아이콘을 설정해주세요. 대표 이미지로
              나타납니다.
            </Container>
            <ButtonGroup style={{ width: "100%" }}>
              <Button
                variant={icon === "♻️" ? "success" : "outline-success"}
                style={{ borderRadius: "0px" }}
                onClick={() => handleIconSelect("♻️")}
              >
                ♻️
              </Button>
              <Button
                variant={icon === "💚" ? "success" : "outline-success"}
                onClick={() => handleIconSelect("💚")}
              >
                💚
              </Button>
              <Button
                variant={icon === "🍃" ? "success" : "outline-success"}
                onClick={() => handleIconSelect("🍃")}
              >
                🍃
              </Button>
              <Button
                variant={icon === "🏞️" ? "success" : "outline-success"}
                onClick={() => handleIconSelect("🏞️")}
              >
                🏞️
              </Button>
              <Button
                variant={icon === "🌱" ? "success" : "outline-success"}
                onClick={() => handleIconSelect("🌱")}
              >
                🌱
              </Button>
              <Button
                variant={icon === "🌍" ? "success" : "outline-success"}
                onClick={() => handleIconSelect("🌍")}
              >
                🌍
              </Button>
              <Button
                variant={icon === "👩‍👦‍👦" ? "success" : "outline-success"}
                onClick={() => handleIconSelect("👩‍👦‍👦")}
              >
                👩‍👦‍👦
              </Button>
              <Button
                variant={icon === "💪🏻" ? "success" : "outline-success"}
                onClick={() => handleIconSelect("💪🏻")}
              >
                💪🏻
              </Button>
              <Button
                variant={icon === "🌈" ? "success" : "outline-success"}
                onClick={() => handleIconSelect("🌈")}
              >
                🌈
              </Button>
              <Button
                variant={icon === "💧" ? "success" : "outline-success"}
                onClick={() => handleIconSelect("💧")}
              >
                💧
              </Button>
              <Button
                variant={icon === "🌿" ? "success" : "outline-success"}
                onClick={() => handleIconSelect("🌿")}
                style={{ borderRadius: "0px" }}
              >
                🌿
              </Button>
            </ButtonGroup>
            <Alert
              variant="warning"
              className="mt-2 p-2 text-muted"
              style={{ fontSize: "0.85rem" }}
            >
              챌린지가 시작되고 참여인원이 1명 이상이 되면 수정, 삭제할 수
              없습니다.
            </Alert>
          </Form.Group>
          <Button
            type="submit"
            variant="light"
            className="mt-2 mb-1"
            style={{
              width: "100%",
              borderRadius: "0px",
              backgroundColor: "#00D387",
              color: "white",
              fontWeight: "900",
            }}
          >
            챌린지 수정
          </Button>
        </Form>
        <Modal.Footer className='ps-0'>
          <Button
            className="mt-2 mb-2"
            variant="secondary"
            onClick={onClose}
            style={{
              width: "100%",
              borderRadius: "0px",
            }}
          >
            닫기
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default ChallengeUpdate;
