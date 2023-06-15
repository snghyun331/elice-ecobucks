import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import Logo from "../../assets/logo.png";

import * as Api from '../../api'
import { DispatchContext, UserStateContext } from '../../context/user/UserProvider'
import { validateEmail } from "../../util/common";

import { LOGIN_SUCCESS } from "../../reducer/action";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext)
  const userState = useContext(UserStateContext)
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isEmailValid = validateEmail(email);
  const isFormValid = isEmailValid

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Api.post("login", {
        email,
        password,
      });
      const user = res.data;
      const jwtToken = user.token;
      sessionStorage.setItem("userToken", jwtToken);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: user,
      });
      navigate("/", { replace: true });
    } catch (err) {
        alert(err.response.data.message);

    }
  };

  return (
    <>
      <Container>
        <Row className="justify-content-center align-items-center mt-5">
          <Col md={6}>
            <div
              className="p-3"
              style={{
                backgroundColor: "#F3F3F3",
                borderRadius: "5px",
                marginTop: '50px'
              }}
            >
              <Container className="text-center">
                <img src={Logo} className="w-50 mt-5 mb-5" alt="Logo" />
              </Container>
              <Container style={{ width: "95%" }}>
                <Form onSubmit={handleSubmit}>
 <Form.Group controlId="loginEmail">
              <Form.Label style={{ fontWeight: "bold" }}>이메일</Form.Label>
              <Form.Control
                type="email"
                autoComplete="on"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ borderRadius: "0px" }}
              />
              {!isEmailValid && email.length > 0 && (
                <Form.Text className="text-success">
                  형식이 올바르지 않습니다.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="loginPassword" className="mt-4">
              <Form.Label style={{ fontWeight: "bold" }}>비밀번호</Form.Label>
              <Form.Control
                type="password"
                autoComplete="on"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ borderRadius: "0px" }}
              />
            </Form.Group>

            <Form.Group as={Row} className="mt-5 text-center">
              <Col sm={{ span: 20 }}>
                <Button
                  variant="light"
                  type="submit"
                  disabled={!isFormValid}
                  style={{
                    width: "100%",
                    borderRadius: "0px",
                    backgroundColor: "#00D387",
                  }}
                >
                  로그인
                </Button>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mt-4 mb-4 text-center">
              <Col sm={{ span: 20 }}>
                <Button
                  variant="light"
                  onClick={() => navigate("/register")}
                  style={{ width: "100%", borderRadius: "0px" }}
                >
                  회원가입하기
                </Button>
              </Col>
            </Form.Group>
                </Form>
              </Container>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default LoginForm;
