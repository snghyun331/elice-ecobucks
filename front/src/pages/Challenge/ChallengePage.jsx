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
    
    <Container
      className="pt-5 pb-5 d-flex flex-column align-items-center justify-content-center"
      style={{ width: "80%", border: '1px solid #c2c2c2'}}
    >
      
    챌린지를 확인하고 참가해보세요!
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
