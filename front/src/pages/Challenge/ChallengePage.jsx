import React, { useState, useContext } from "react";
import { Container, Button } from "react-bootstrap";
import ChallengeView from "./ChallengeView";
import ChallengeCreate from "./ChallengeCreate";

import * as Api from "../../api";
import { UserStateContext } from "../../context/user/UserProvider";

function ChallengePage() {
  const userState = useContext(UserStateContext);
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
>
</div>

<div
  style={{
    position: "absolute",
    top: 80,
    left: '18%',
    right: 0,
    zIndex: 1,
    color: 'white',
    fontSize: '2rem',
    fontWeight: '900',
  }}
>챌린지 :
<br />
<span style={{fontSize: '1.3rem', fontWeight: '400' }}>절약 인증하고 마일리지를 모을 수 있어요.</span>
</div>


      <Container
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ marginTop: '200px', paddingTop: '30px', width: "80%", border: "1px solid #c2c2c2", backgroundColor: 'white', borderRadius: '10px' }}
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
