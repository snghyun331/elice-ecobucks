import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Form, Button, Dropdown, Alert, Image } from "react-bootstrap";
import districtInfo from "../../assets/districtInfo";

import {
  validatePassword,
  validateEmail,
  validateName,
} from "../../util/common";
import { UPDATE_USER } from "../../reducer/action";

import {
  UserStateContext,
  DispatchContext,
} from "../../context/user/UserProvider";
import * as Api from "../../api";
import { showAlert, showSuccess } from "../../assets/alert";

const UserEditForm = ({ onClose, user }) => {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);
  const userState = useContext(UserStateContext);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setErrorMessage("");
    setPreviewURL(URL.createObjectURL(file));
  };

  const [name, setName] = useState(user?.username || ""); // user가 null인 경우를 고려하여 기본값 설정
  const [districtName, setDistrict] = useState(user?.districtName || ""); // user가 null인 경우를 고려하여 기본값 설정
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const isPasswordValid =
    password.length === 0 ? true : validatePassword(password);
  const isPasswordSame = password === confirmPassword;
  const isNameValid = validateName(name);
  const isDistrictValid = districtName != null;

  const isFormValid =
    isPasswordValid && isPasswordSame && isNameValid && isDistrictValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //이미지 전송 통신
      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);
        console.log("폼데이터", formData);
        const imageRes = await Api.postFile(
          "images/profiles/upload",
          formData
        );
        console.log('이미지레스', imageRes);
      }

      //그 외 정보 전송 통신
      const requestData = {
        username: name,
        districtName,
      };

      if (password !== "") {
        requestData.password = password;
      }

      const res = await Api.put(
        `mypage/useredit`,
        requestData
      );

      console.log(res);
      if (res.status === 200) {
        alert("변경된 정보가 저장되었습니다.");

        const userData = await Api.get("current");
        const user = userData.data;

        dispatch({
          type: UPDATE_USER,
          payload: user,
        });

        onClose();
      } else {
        alert("정보 변경에 실패했습니다.");
      }
    } catch (error) {
      alert("정보 변경에 실패했습니다.");
      console.error(error);
    }
  };

  const handleWithdraw = () => {
    setShowConfirm(true);
  };

  const confirmWithdraw = async () => {
    try {
      const res = await Api.delete("mypage/withdraw");
      console.log("탈퇴요청완료", res);

      // 탈퇴 후 리디렉션 등의 작업 수행
      if (res.status === 200) {
        setShowConfirm(false);
        // Display success alert and navigate to login page
        showSuccess("에코벅스를 이용해주셔서 감사합니다. 로그인 창으로 이동합니다.");
        navigate("/login");
      } else {
        // Display error alert
        showAlert("탈퇴 과정에 오류가 발생했습니다.");
      }
    } catch (error) {
      // Display error alert
      showAlert("탈퇴 과정에 오류가 발생했습니다.");
      console.error(error);
    }
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
        <Form.Control
          type="file"
          onChange={handleFileChange}
          style={{ borderRadius: "0px" }}
        />
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      </Form.Group>
      {selectedFile && (
        <div className="mt-3">
          <h6>미리보기</h6>
          <Image src={previewURL} alt="Selected Image" thumbnail />
        </div>
      )}
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
          <Form.Text
            className="text-success d-block"
            style={{ textAlign: "left" }}
          >
            이름은 한글과 알파벳만 사용 가능합니다.
          </Form.Text>
        )}
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
          <Form.Text
            className="text-success d-block"
            style={{ textAlign: "left" }}
          >
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
          <Form.Text
            className="text-success d-block"
            style={{ textAlign: "left" }}
          >
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
      <Button
        variant="light"
        type="submit"
        className="mt-5 mb-3"
        disabled={!isFormValid}
        style={{
          width: "100%",
          borderRadius: "0px",
          backgroundColor: "#00D387",
          color: "white",
          fontWeight: "900",
        }}
      >
        저장
      </Button>{" "}
      <Button
        className="mt-3"
        size="sm"
        variant="dark"
        style={{ width: "100%", fontSize: "15px", borderRadius: "0px" }}
        onClick={handleWithdraw}
      >
        {" "}
        회원 탈퇴
      </Button>
      {/* Confirm 창 */}
      <Alert show={showConfirm} variant="danger" className="mt-3">
        <Alert.Heading>정말로 탈퇴하시겠습니까?</Alert.Heading>
        <p>계속하려면 탈퇴 버튼을 눌러주세요.</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button
            variant="outline-danger"
            onClick={() => setShowConfirm(false)}
          >
            취소
          </Button>
          <Button variant="danger" onClick={confirmWithdraw} className="ms-2">
            탈퇴
          </Button>
        </div>
      </Alert>
    </Form>
  );
};

export default UserEditForm;
