import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Col,
  Row,
  Form,
  Button,
  Image,
  Dropdown,
} from "react-bootstrap";

import Logo from "../../assets/logo.png";
import districtInfo from "../../assets/districtInfo";
import {
  validatePassword,
  validateEmail,
  validateName,
} from "../../util/common";
import { LOGIN_SUCCESS } from "../../reducer/action";

import * as Api from "../../api";
import {
  DispatchContext,
  UserStateContext,
} from "../../context/user/UserProvider";

function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);
  const userState = useContext(UserStateContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [districtName, setDistrict] = useState(null);

  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);
  const isPasswordSame = password === confirmPassword;
  const isNameValid = validateName(name);
  const isDistrictValid = districtName != null;

  const isFormValid =
    isEmailValid &&
    isPasswordValid &&
    isPasswordSame &&
    isNameValid &&
    isDistrictValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "user/register" 엔드포인트로 post요청함.
      await Api.post("register", {
        username: name,
        email,
        password,
        districtName,
      });

      // 회원가입과 동시에 로그인 되도록 함.
      const res = await Api.post("login", {
        email,
        password,
      });
      // 유저 정보는 response의 data임.
      const user = res.data;
      // JWT 토큰은 유저 정보의 token임.
      const jwtToken = user.token;
      // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
      sessionStorage.setItem("userToken", jwtToken);
      // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
      dispatch({
        type: LOGIN_SUCCESS,
        payload: user,
      });

      // 기본 페이지로 이동함.
      navigate("/", { replace: true });
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <Container
      className="position-relative pt-3 pb-3"
      style={{
        width: "40%",
        backgroundColor: "#F3F3F3",
        borderRadius: "5px",
        marginBottom: "20px",
        marginTop: '90px'
      }}
    >
      <Container className="text-center">
        <img src={Logo} className="w-50 mt-5 mb-5" alt="Logo" />
      </Container>
      <Container style={{ width: "95%" }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="registerEmail">
            <Form.Label
              className="text-right d-block"
              style={{ fontWeight: "bold" }}
            >
              이메일 주소
            </Form.Label>
            <Form.Control
              type="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ borderRadius: "0px" }}
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
              style={{ fontWeight: "bold" }}
            >
              비밀번호
            </Form.Label>
            <Form.Control
              type="password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ borderRadius: "0px" }}
            />
            {!isPasswordValid && password.length > 0 && (
              <Form.Text className="text-success">
                비밀번호는 알파벳, 숫자, 특수문자를 모두 포함하는 6-18자리어야
                합니다.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="registerConfirmPassword" className="mt-4">
            <Form.Label
              className="text-right d-block"
              style={{ fontWeight: "bold" }}
            >
              비밀번호 재확인
            </Form.Label>
            <Form.Control
              type="password"
              autoComplete="off"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ borderRadius: "0px" }}
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
              style={{ fontWeight: "bold" }}
            >
              이름
            </Form.Label>
            <Form.Control
              type="text"
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ borderRadius: "0px" }}
            />
            {!isNameValid && name.length > 0 && (
              <Form.Text className="text-success">
                이름은 한글과 알파벳만 사용 가능합니다.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="registerDistrict" className="mt-4">
            <Form.Label className="d-block" style={{ fontWeight: "bold" }}>
              거주하시는 구
              <Row className="text-secondary ms-1" style={{ fontSize: "13px" }}>
                현재 서울시만 서비스하고 있습니다.
              </Row>
            </Form.Label>

            <Dropdown>
              <Dropdown.Toggle
                variant="light"
                className="text-start d-block"
                id="dropdown-districtName"
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  borderRadius: "0px",
                }}
              >
                {districtName || "구를 선택해주세요. "}
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ maxHeight: "200px", overflowY: "auto" }}>
                {districtInfo.map((districtData) => (
                  <Dropdown.Item
                    key={districtData.name}
                    onClick={() => setDistrict(districtData.name)}
                  >
                    {districtData.name}
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
                style={{ width: "100%", borderRadius: "0px" }}
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
