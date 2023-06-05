import React, { useState } from "react";
import { Row, Form, Button, Dropdown } from "react-bootstrap";

const UserEditForm = () => {
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [district, setDistrict] = useState(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에서 변경된 정보를 처리하는 로직을 구현합니다.
    // 예를 들어, 서버로 변경된 정보를 전송하거나 상태를 업데이트하는 등의 작업을 수행할 수 있습니다.
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Greeting:", greeting);
    console.log("District:", district);
  };

  const isNameValid = name.length >= 2;
  const isFormValid = isNameValid;

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

      <Form.Group controlId="formName">
        <Form.Label
          className="d-block mt-4"
          style={{ fontWeight: "bold", textAlign: "left" }}
        >
          이름
        </Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력하세요"
          style={{ borderRadius: "0px" }}
        />
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

      <Form.Group controlId="registerDistrict" className="mt-4">
      <Form.Label
          className="d-block mt-4"
          style={{ fontWeight: "bold", textAlign: "left" }}
        >거주하시는 구
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
