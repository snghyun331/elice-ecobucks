import { useState, useEffect } from "react";
import { Container, Modal, Button } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import * as Api from "../../api";

import ChallengeRead from "./ChallengeRead";

function MegaChallengeCarousel({ challenges }) {
  const [showChallengeRead, setShowChallengeRead] = useState(false);
  const [megaChallenge, setMegaChallenge] = useState(null);

  useEffect(() => {
    const challengeWithHighestParticipantsCount = getChallengeWithHighestParticipantsCount();
    setMegaChallenge(challengeWithHighestParticipantsCount);
  }, []);

  const handleFirstCarouselItemClick = () => {
    setShowChallengeRead(true);
  };

  const handleBackToListClick = () => {
    setShowChallengeRead(false);
  };

  const getChallengeWithHighestParticipantsCount = () => {
    let maxParticipantsCount = -1;
    let challengeWithHighestParticipantsCount = null;
    challenges.forEach((challenge) => {
      if (challenge.participantsCount > maxParticipantsCount) {
        maxParticipantsCount = challenge.participantsCount;
        challengeWithHighestParticipantsCount = challenge;
      }
    });
    return challengeWithHighestParticipantsCount;
  };

  const getChallengeWithHighestCommentsCount = () => {
    let maxCommentsCount = -1;
    let challengeWithHighestCommentsCount = null;
    challenges.forEach((challenge) => {
      if (challenge.commentsCount > maxCommentsCount) {
        maxCommentsCount = challenge.commentsCount;
        challengeWithHighestCommentsCount = challenge;
      }
    });
    return challengeWithHighestCommentsCount
      ? challengeWithHighestCommentsCount.title
      : "";
  };

  return (
    <>
      {!showChallengeRead && (
        <Carousel style={{ backgroundColor: "lightGrey" }} className="p-0">
          <Carousel.Item
            onClick={handleFirstCarouselItemClick}
            style={{ cursor: "pointer" }}
          >
            <Container
              style={{
                width: "100%",
                height: "17rem",
                backgroundColor: "#6e63ff",
              }}
            ></Container>
            <Carousel.Caption className="mb-5">
              <p>✨ 지금 참가자 수가 가장 높은 챌린지 ✨</p>
              <h1>{megaChallenge ? megaChallenge.title : ""}</h1>
            </Carousel.Caption>
          </Carousel.Item>
          {/* <Carousel.Item>
            <Container style={{ width: '100%', height: '17rem', backgroundColor: '#ffa1ee' }}>
            </Container>
            <Carousel.Caption>
              <h3>{getChallengeWithHighestCommentsCount()}</h3>
              <p>개발자가 제공하는 챌린지</p>
            </Carousel.Caption>
          </Carousel.Item> */}
          {/* <Carousel.Item>
            <Container style={{ width: '100%', height: '17rem', backgroundColor: '#9acc54' }}>
            </Container>
            <Carousel.Caption>
              <h3>절약짱 동네 랭킹</h3>
              <p>모든 챌린지 참가 건에 대하여, 참가자의 구별로 랭킹 보여주기</p>
            </Carousel.Caption>
          </Carousel.Item> */}
        </Carousel>
      )}
      {showChallengeRead && (
        <Modal
          show={showChallengeRead}
          onHide={handleBackToListClick}
          size="xl"
          className="mt-3 ps-0"
          style={{ zIndex: "9999" }}
        >
          <Modal.Header closeButton>
            <Modal.Title>✨ 지금 뜨는 챌린지를 확인해보세요.</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {megaChallenge && (
              <>
                <p>{megaChallenge.description}</p>
                <ChallengeRead
                  size="xl"
                  challenge={megaChallenge}
                  onBackToListClick={handleBackToListClick}
                />
              </>
            )}
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}

export default MegaChallengeCarousel;
