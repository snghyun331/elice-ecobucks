import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Col,
  Row,
  Form,
  Button,
  Image,
  Dropdown,
} from 'react-bootstrap';
import Logo from '../../assets/logo.png';

function RegisterForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [district, setDistrict] = useState(null);

  const districts = [
    '강남구',
    '강동구',
    '강북구',
    '강서구',
    '관악구',
    '광진구',
    '구로구',
    '금천구',
    '노원구',
    '도봉구',
    '동대문구',
    '동작구',
    '마포구',
    '서대문구',
    '서초구',
    '성동구',
    '성북구',
    '송파구',
    '양천구',
    '영등포구',
    '용산구',
    '은평구',
    '종로구',
    '중구',
    '중랑구',
  ];

  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePassword = (password) => {
    return password
      .match(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,18}$/
      )
  }

  const validateName = (name) => {
    return name 
      .match(
        /^[a-zA-Z가-힣\s]{2,20}$/
      )
  }

  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);
  const isPasswordSame = password === confirmPassword;
  const isNameValid = validateName(name);
  const isFormValid =
    isEmailValid && isPasswordValid && isPasswordSame && isNameValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "user/register" 엔드포인트로 post요청함.
      await Api.post('user/register', {
        email,
        password,
        name,
        district: district,
      });

      // 로그인 페이지로 이동함.
      navigate('/login');
    } catch (err) {
      console.log('회원가입에 실패하였습니다.', err);
    }
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
        <img src={Logo} className="w-50 mt-5 mb-5" alt="Logo" />
      </Container>
      <Container style={{ width: '95%' }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="registerEmail">
            <Form.Label
              className="text-right d-block"
              style={{ fontWeight: 'bold' }}
            >
              이메일 주소
            </Form.Label>
            <Form.Control
              type="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ borderRadius: '0px' }}
            />
            {!isEmailValid && email.length > 0 && (
              <Form.Text className="text-success">
                이메일 형식이 올바르지 않습니다.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="registerPassword" className="mt-4">
            <Form.Label
              className="text-right d-block"
              style={{ fontWeight: 'bold' }}
            >
              비밀번호
            </Form.Label>
            <Form.Control
              type="password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ borderRadius: '0px' }}
            />
            {!isPasswordValid && password.length > 0 && (
              <Form.Text className="text-success">
                비밀번호는 알파벳, 숫자, 특수문자를 모두 포함하는 6-18자리어야 합니다.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="registerConfirmPassword" className="mt-4">
            <Form.Label
              className="text-right d-block"
              style={{ fontWeight: 'bold' }}
            >
              비밀번호 재확인
            </Form.Label>
            <Form.Control
              type="password"
              autoComplete="off"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ borderRadius: '0px' }}
            />
            {!isPasswordSame && (
              <Form.Text className="text-success">
                비밀번호가 일치하지 않습니다.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="registerName" className="mt-4">
            <Form.Label
              className="text-right d-block"
              style={{ fontWeight: 'bold' }}
            >
              이름
            </Form.Label>
            <Form.Control
              type="text"
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ borderRadius: '0px' }}
            />
            {!isNameValid && name.length > 0 && (
              <Form.Text className="text-success">
                이름은 한글과 알파벳만 사용 가능합니다.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="registerDistrict" className="mt-4">
            <Form.Label className="d-block" style={{ fontWeight: 'bold' }}>
              거주하시는 구
              <Row className="text-secondary ms-1" style={{ fontSize: '13px' }}>
                현재 서울시만 서비스하고 있습니다.
              </Row>
            </Form.Label>

            <Dropdown>
              <Dropdown.Toggle
                variant="light"
                className="text-start d-block"
                id="dropdown-district"
                style={{
                  backgroundColor: 'white',
                  width: '100%',
                  borderRadius: '0px',
                }}
              >
                {district || '구를 선택해주세요. '}
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {districts.map((district) => (
                  <Dropdown.Item
                    key={district}
                    onClick={() => setDistrict(district)}
                  >
                    {district}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>

          <Form.Group as={Row} className="mt-5 justify-content-center mb-5">
            <Col sm={12}>
              <Button
                variant="success"
                type="submit"
                disabled={!isFormValid}
                style={{ width: '100%', borderRadius: '0px' }}
                onClick={handleSubmit}
              >
                회원가입
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Container>
    </Container>
  );
}

export default RegisterForm;
