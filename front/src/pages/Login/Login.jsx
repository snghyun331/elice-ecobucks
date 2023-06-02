import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import Logo from '../../assets/logo.png';

function LoginForm() {
  const navigate = useNavigate();

  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState('');
  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState('');

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email);
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = password.length >= 4;
  //
  // 이메일과 비밀번호 조건이 동시에 만족되는지 확인함.
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // try {
    //   // "user/login" 엔드포인트로 post요청함.
    //   const res = await Api.post('user/login', {
    //     email,
    //     password,
    //   });
    //   // 유저 정보는 response의 data임.
    //   const user = res.data;
    //   // JWT 토큰은 유저 정보의 token임.
    //   const jwtToken = user.token;
    //   // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
    //   sessionStorage.setItem('userToken', jwtToken);
    //   // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
    //   dispatch({
    //     type: 'LOGIN_SUCCESS',
    //     payload: user,
    //   });

    //   // 기본 페이지로 이동함.
    //   navigate('/', { replace: true });
    // } catch (err) {
    //   console.log('로그인에 실패하였습니다.\n', err);
    // }
  };

  return (
    <Container
      className="position-absolute top-50 start-50 translate-middle pt-3 pb-3"
      style={{
        width: '40%',
        backgroundColor: '#F3F3F3',
        transform: 'translate(-50%, -50%)',
        borderRadius: '5px',
      }}
    >
      <Container className="text-center">
        <img src={Logo} className="w-25 mt-5 mb-5" alt="Logo" />
      </Container>
      <Container style={{ width: '95%' }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="loginEmail">
            <Form.Label style={{ fontWeight: 'bold' }}>이메일</Form.Label>
            <Form.Control
              type="email"
              autoComplete="on"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ borderRadius: '0px' }}
            />
            {!isEmailValid && (
              <Form.Text className="text-success">
                형식이 올바르지 않습니다.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="loginPassword" className="mt-3">
            <Form.Label style={{ fontWeight: 'bold' }}>비밀번호</Form.Label>
            <Form.Control
              type="password"
              autoComplete="on"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ borderRadius: '0px' }}
            />
            {!isPasswordValid && (
              <Form.Text className="text-success">
                비밀번호는 4글자 이상입니다.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button
                variant="light"
                type="submit"
                disabled={!isFormValid}
                style={{
                  width: '100%',
                  borderRadius: '0px',
                  backgroundColor: '#00D387',
                }}
              >
                로그인
              </Button>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button
                variant="light"
                onClick={() => navigate('/register')}
                style={{ width: '100%', borderRadius: '0px' }}
              >
                회원가입하기
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Container>
    </Container>
  );
}

export default LoginForm;
