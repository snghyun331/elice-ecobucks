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
    <Container className="pt-5 ps-0 pb-5" style={{ width: "80%" }}>
      {showCreateForm ? <ChallengeCreate /> : <ChallengeView />}
      {buttonClicked ? null : (
        <Button onClick={handleCreateButtonClick}>
          챌린지 모집
        </Button>
      )}
    </Container>
  );
}

export default ChallengePage;
