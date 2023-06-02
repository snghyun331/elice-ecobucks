import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';

function My() {
  return (
    <div style={{ background: 'linear-gradient(to bottom, #00D387 30%, #F1F8E9)' }}>
      <Container className='pt-5' style={{ width: '80%' }}>
        <Row>
          <Col xs={3}>
            {/* 왼쪽 컬럼 */}
            <Container style={{ height: '100%', background: 'white' }}>
              {/* 내용 추가 */}
            </Container>
          </Col>
          <Col xs={9}>
            {/* 오른쪽 컬럼 */}
            <Container style={{ height: '100%', background: 'white' }}>
              <Row style={{ height: '300px'}}>
                <h2>내 정보 수정</h2>
                {/* 내용 추가 */}
              </Row>
              <Row style={{ height: '300px'}}>
                <h2>내 주문 이력</h2>
                {/* 내용 추가 */}
              </Row>
              <Row style={{ height: '300px'}}>
                <h2>내 마일리지 이력</h2>
                {/* 내용 추가 */}
              </Row>
              <Row style={{ height: '300px'}}>
                <h2>내 챌린지 이력</h2>
                {/* 내용 추가 */}
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default My;
