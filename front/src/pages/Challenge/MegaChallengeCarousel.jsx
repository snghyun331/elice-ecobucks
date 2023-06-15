import { useState, useEffect } from 'react';
import { Container, Modal, Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import * as Api from "../../api";

import ChallengeRead from './ChallengeRead';

function MegaChallengeCarousel() {
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const [megaChallenge, setMegaChallenge] = useState(null);
  const [showChallengeRead, setShowChallengeRead] = useState(false);
  const megaChallengeId = "648ab962822996bf1c839be4";

  useEffect(() => {
    if (isFetchCompleted) {
      setShowChallengeRead(true);
    }
  }, [isFetchCompleted]);

  const fetchMegaChallengeData = async () => {
    try {
      const res = await Api.get(`challenges/${megaChallengeId}`);

      setMegaChallenge(res.data);
      setIsFetchCompleted(true);
    } catch (err) {

    }
  };

  const handleFirstCarouselItemClick = () => {
    if (!isFetchCompleted) {
      fetchMegaChallengeData();
    } else {
      setShowChallengeRead(true);
    }
  };

  const handleBackToListClick = () => {
    setShowChallengeRead(false);
  };

  return (
    <>
      {!showChallengeRead && (
        <Carousel style={{ backgroundColor: 'lightGrey' }} className='p-0'>
          <Carousel.Item onClick={handleFirstCarouselItemClick} style={{ cursor: 'pointer' }}>
            <Container style={{ width: '100%', height: '17rem', backgroundColor: '#6e63ff' }}>
            </Container>
            <Carousel.Caption>
              <h3>5월의 메가챌린지</h3>
              <p>
                개발자가 제공하는 챌린지
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Container style={{ width: '100%', height: '17rem', backgroundColor: '#ffa1ee' }}>
            </Container>
            <Carousel.Caption>
              <h3>지금 뜨는 챌린지</h3>
              <p>개발자가 제공하는 챌린지</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Container style={{ width: '100%', height: '17rem', backgroundColor: '#9acc54' }}>
            </Container>
            <Carousel.Caption>
              <h3>절약짱 동네 랭킹</h3>
              <p>모든 챌린지 참가 건에 대하여, 참가자의 구별로 랭킹 보여주기</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      )}
      {showChallengeRead && (
        <Modal show={showChallengeRead} onHide={handleBackToListClick} size="lg" className="mt-5" style={{zIndex: '9999'}}>
          <Modal.Header closeButton>
            <Modal.Title>✨ 지금 뜨는 챌린지를 확인해보세요.</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{megaChallenge.description}</p>
            <ChallengeRead size='xl' challenge={megaChallenge} onBackToListClick={handleBackToListClick} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleBackToListClick}>
              돌아가기
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default MegaChallengeCarousel;
