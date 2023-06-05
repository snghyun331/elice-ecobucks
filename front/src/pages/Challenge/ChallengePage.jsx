import React, { useState } from "react";
import { Container, Button, Row } from "react-bootstrap";
import ChallengeView from "./ChallengeView";
import ChallengeCreate from "./ChallengeCreate";

function ChallengePage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleCreateButtonClick = () => {
    setShowCreateForm(true);
    setButtonClicked(true);
  };

  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: "70%",
          background: "#00D387",
          zIndex: -1,
        }}
      ></div>

      <Container
        className="mt-5 mb-5 pt-5 pb-5 d-flex flex-column align-items-center justify-content-center"
        style={{ width: "80%", border: "1px solid #c2c2c2", backgroundColor: 'white' }}
      >
        {showCreateForm ? <ChallengeCreate /> : <ChallengeView />}
        {buttonClicked ? null : (
          <Button onClick={handleCreateButtonClick}>챌린지 모집</Button>
        )}
      </Container>
    </div>
  );
}

export default ChallengePage;
