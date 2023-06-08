import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DispatchContext } from "../../context/user/UserProvider";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const RightNav = ({ isLogin, user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);

  const logout = () => {
    sessionStorage.removeItem("userToken");
    dispatch({ type: "LOGOUT" });
    alert("로그아웃하여 홈페이지로 이동합니다.");
  };

  const renderNavContent = () => {
    if (isLogin) {
      return (
        <ul className="navbar-nav" style={{ whiteSpace: "nowrap" }}>
          <li className="nav-item" style={{ marginRight: '25px'}}>
            <a
              className="nav-link"
              href="/my"
              style={{
                border: "0px solid grey",
                borderRadius: "13px",
                backgroundColor: "#ffe9b0",
                padding: "2px 14px 2px 14px",
                margin: "8px 15px 0px 0px",
                fontSize: "1.2em",
                fontWeight: "900",
              }}
            >
              🪙
              <a style={{}}>{user.mileage.toLocaleString()}</a>
            </a>
          </li>
          <li className="nav-item" style={{ marginRight: '25px'}}>
            <a
              className="nav-link"
              href="/challenge"
              style={{
                color: location.pathname === "/challenge" ? "#00D387" : "",
                fontWeight: location.pathname === "/challenge" ? "900" : "600",
                fontSize: "1.3em",
              }}
            >
              챌린지
            </a>
          </li>
          <li className="nav-item" style={{ marginRight: '25px'}}>
            <a
              className="nav-link"
              href="/blog"
              style={{
                color: location.pathname === "/blog" ? "#00D387" : "",
                fontWeight: location.pathname === "/blog" ? "900" : "600",
                fontSize: "1.3em",
              }}
            >
              블로그
            </a>
          </li>
          <li className="nav-item" style={{ marginRight: '25px'}}>
            <a
              className="nav-link"
              href="/mall"
              style={{
                color: location.pathname === "/mall" ? "#00D387" : "",
                fontWeight: location.pathname === "/mall" ? "900" : "600",
                fontSize: "1.3em",
              }}
            >
              떠리몰
            </a>
          </li>
          <li className="nav-item" style={{ marginRight: '25px'}}>
            <a
              className="nav-link"
              href="/my"
              style={{
                color: location.pathname === "/my" ? "#00D387" : "",
                fontWeight: location.pathname === "/my" ? "900" : "600",
                fontSize: "1.3em",
              }}
            >
              마이페이지
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              onClick={logout}
              style={{
                fontWeight: "600",
                fontSize: "1.3em",
              }}
            >
              로그아웃
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="navbar-nav" style={{ whiteSpace: "nowrap" }}>
          <li className="nav-item">
            <a
              className="nav-link"
              href="/"
              style={{ fontSize: "1.3em", fontWeight: "600" }}
            >
              홈
            </a>
          </li>
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip style={{ zIndex: "9999" }}>
                로그인 후 이용 가능합니다.
              </Tooltip>
            }
          >
            <li className="nav-item">
              <a
                className="nav-link disabled"
                href="/challenge"
                style={{ fontSize: "1.3em", fontWeight: "600" }}
              >
                챌린지
              </a>
            </li>
          </OverlayTrigger>
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip style={{ zIndex: "9999" }}>
                로그인 후 이용 가능합니다.
              </Tooltip>
            }
          >
            <li className="nav-item">
              <a
                className="nav-link disabled"
                href="/blog"
                style={{ fontSize: "1.3em", fontWeight: "600" }}
              >
                블로그
              </a>
            </li>
          </OverlayTrigger>
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip style={{ zIndex: "9999" }}>
                로그인 후 이용 가능합니다.
              </Tooltip>
            }
          >
            <li className="nav-item">
              <a
                className="nav-link disabled"
                href="/mall"
                style={{ fontSize: "1.3em", fontWeight: "600" }}
              >
                떠리몰
              </a>
            </li>
          </OverlayTrigger>
          <li className="nav-item">
            <a
              className="nav-link"
              href="/register"
              style={{ fontSize: "1.3em", fontWeight: "600" }}
            >
              회원가입
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="/login"
              style={{ fontSize: "1.3em", fontWeight: "600" }}
            >
              로그인
            </a>
          </li>
        </ul>
      );
    }
  };

  return (
    <div className="container-fluid">
      <div
        className="collapse navbar-collapse justify-content-end"
        id="collapsibleNavbar"
      >
        {renderNavContent()}
      </div>
    </div>
  );
};
export default RightNav;
