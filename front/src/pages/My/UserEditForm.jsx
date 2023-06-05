import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Form, Button, Dropdown, Container } from "react-bootstrap";

import * as Api from "../../api";
import { DispatchContext, UserStateContext } from "../../App";

const UserEditForm = () => {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);
  const userState = useContext(UserStateContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [district, setDistrict] = useState(null);

  const [greeting, setGreeting] = useState("");

  const districts = [
    "강남구",
    "강동구",
    "강북구",
    "강서구",
    "관악구",
    "광진구",
    "구로구",
    "금천구",
    "노원구",
    "도봉구",
    "동대문구",
    "동작구",
    "마포구",
    "서대문구",
    "서초구",
    "성동구",
    "성북구",
    "송파구",
    "양천구",
    "영등포구",
    "용산구",
    "은평구",
    "종로구",
    "중구",
    "중랑구",
  ];

  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePassword = (password) => {
    return password.match(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,18}$/
    );
  };

  const validateName = (name) => {
    return name.match(/^[a-zA-Z가-힣\s]{2,20}$/);
  };

  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);
  const isPasswordSame = password === confirmPassword;
  const isNameValid = validateName(name);
  const isDistrictValid = district != null;

  const isFormValid =
    isEmailValid &&
    isPasswordValid &&
    isPasswordSame &&
    isNameValid &&
    isDistrictValid;

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에서 변경된 정보를 처리하는 로직을 구현합니다.
    // 예를 들어, 서버로 변경된 정보를 전송하거나 상태를 업데이트하는 등의 작업을 수행할 수 있습니다.
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Greeting:", greeting);
    console.log("District:", district);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label
          className="d-block"
          style={{ fontWeight: "bold", textAlign: "left" }}
        >
          프로필 사진
        </Form.Label>
        <Form.Control type="file" style={{ borderRadius: "0px" }} />
      </Form.Group>

      <Form.Group controlId="registerName" className="mt-4">
        <Form.Label
          className="text-right d-block"
          style={{ fontWeight: "bold", textAlign: "left" }}
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

      <Form.Group controlId="formGreeting">
        <Form.Label
          className="d-block mt-4"
          style={{ fontWeight: "bold", textAlign: "left" }}
        >
          인사말
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={greeting}
          onChange={(e) => setGreeting(e.target.value)}
          placeholder="인사말을 입력하세요"
          style={{ borderRadius: "0px" }}
        />
      </Form.Group>

      <Form.Group controlId="registerPassword" className="mt-4">
        <Form.Label
          className="text-right d-block"
          style={{ fontWeight: "bold", textAlign: "left" }}
        >
          비밀번호 수정
        </Form.Label>
        <Form.Control
          type="password"
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ borderRadius: "0px" }}
        />
          {!isPasswordValid && password.length > 0 && (
            <Form.Text className="text-success d-block" style={{ textAlign: "left" }}>
              비밀번호는 알파벳, 숫자, 특수문자를 모두 포함하는 6-18자리어야
              합니다.
            </Form.Text>
          )}
      </Form.Group>

      <Form.Group controlId="registerConfirmPassword" className="mt-4">
        <Form.Label
          className="text-right d-block"
          style={{ fontWeight: "bold", textAlign: "left" }}
        >
          비밀번호 수정 확인
        </Form.Label>
        <Form.Control
          type="password"
          autoComplete="off"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{ borderRadius: "0px" }}
        />
        {!isPasswordSame && (
            <Form.Text className="text-success d-block" style={{ textAlign: "left" }}>
            비밀번호가 일치하지 않습니다.
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group controlId="registerDistrict" className="mt-4">
        <Form.Label
          className="d-block mt-4"
          style={{ fontWeight: "bold", textAlign: "left" }}
        >
          거주하시는 구
          <Row className="text-secondary ms-1" style={{ fontSize: "13px" }}>
            현재 서울시만 서비스하고 있습니다.
          </Row>
        </Form.Label>

        <Dropdown>
          <Dropdown.Toggle
            className="text-start d-block"
            variant="light"
            id="dropdown-district"
            style={{
              backgroundColor: "white",
              width: "100%",
              borderRadius: "0px",
            }}
          >
            {district || "구를 선택해주세요. "}
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ maxHeight: "200px", overflowY: "auto" }}>
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

      <Button
        variant="light"
        type="submit"
        className="mt-5 mb-3"
        disabled={!isFormValid}
        style={{
          width: "100%",
          borderRadius: "0px",
          backgroundColor: "#00D387",
        }}
      >
        저장
      </Button>
    </Form>
  );
};

export default UserEditForm;
