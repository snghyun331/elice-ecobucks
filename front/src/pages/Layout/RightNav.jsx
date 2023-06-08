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
    navigate("/");
  };
  
  const renderNavContent = () => {
    if (isLogin) {
      return (
        <ul className="navbar-nav" style={{ whiteSpace: "nowrap" }}>
          <li className="nav-item" style={{ paddingRight: "5" }}>
            <a className="nav-link" href="/my">
              🪙
              <a style={{ fontWeight: "900" }}>
                {user.mileage.toLocaleString()}
              </a>
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="/challenge"
              style={{
                color: location.pathname === "/challenge" ? "#00D387" : "",
                fontWeight: location.pathname === "/challenge" ? "900" : "500",
              }}
            >
              챌린지
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="/blog"
              style={{
                color: location.pathname === "/blog" ? "#00D387" : "",
                fontWeight: location.pathname === "/blog" ? "900" : "500",
              }}
            >
              블로그
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="/mall"
              style={{
                color: location.pathname === "/mall" ? "#00D387" : "",
                fontWeight: location.pathname === "/mall" ? "900" : "500",
              }}
            >
              떠리몰
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="/my"
              style={{
                color: location.pathname === "/my" ? "#00D387" : "",
                fontWeight: location.pathname === "/my" ? "900" : "500",
              }}
            >
              마이페이지
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={logout} href="/">
              로그아웃
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="navbar-nav" style={{ whiteSpace: "nowrap" }}>
          <li className="nav-item">
            <a className="nav-link" href="/">
              홈
            </a>
          </li>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip style={{zIndex: '9999'}}>로그인 후 이용 가능합니다.</Tooltip>}
          >
            <li className="nav-item">
              <a className="nav-link disabled" href="/challenge">
                챌린지
              </a>
            </li>
          </OverlayTrigger>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip style={{zIndex: '9999'}}>로그인 후 이용 가능합니다.</Tooltip>}
          >
            <li className="nav-item">
              <a className="nav-link disabled" href="/blog">
                블로그
              </a>
            </li>
          </OverlayTrigger>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip style={{zIndex: '9999'}}>로그인 후 이용 가능합니다.</Tooltip>}
          >
            <li className="nav-item">
              <a className="nav-link disabled" href="/mall">
                떠리몰
              </a>
            </li>
          </OverlayTrigger>
          <li className="nav-item">
            <a className="nav-link" href="/register">
              회원가입
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/login">
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
