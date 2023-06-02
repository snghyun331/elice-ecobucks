import React, { useState } from "react";
import { Button, ButtonGroup, Form } from "react-bootstrap";

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
      <h2>Create Challenge</h2>
      <Form>
        <Form.Group controlId="title">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={handleTitleChange}
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            as="textarea"
            value={description}
            onChange={handleDescriptionChange}
          />
        </Form.Group>
        <Form.Group controlId="duration">
          <Form.Label>Duration:</Form.Label>
          <Form.Control
            as="select"
            value={duration}
            onChange={handleDurationChange}
          >
            <option value="">Select duration</option>
            <option value="7">7 days</option>
            <option value="14">14 days</option>
            <option value="28">28 days</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="icon">
          <Form.Label>Icon:</Form.Label>
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
