import { useContext } from "react";
import { useNavigate, useLocation, Link, redirect } from "react-router-dom";
import { UserStateContext, DispatchContext } from "../../context/user/UserProvider";
import { OverlayTrigger, Tooltip } from "react-bootstrap";


const RightNav = ({ isLogin, user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);

  const logout = () => {
    sessionStorage.removeItem("userToken");
    dispatch({ type: "LOGOUT" });
    alert("로그아웃하여 홈페이지로 이동합니다.");
    if (location.pathname !== '/') {
      window.location.href = '/'
    }
  };

  const renderNavContent = () => {
    if (isLogin) {
      return (
        <ul className="navbar-nav" style={{ whiteSpace: "nowrap" }}>
          <li className="nav-item" style={{ marginRight: '25px'}}>
            <Link
              className="nav-link"
              to="/my"
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
              <span style={{}}>{user.mileage.toLocaleString()}</span>
            </Link>
          </li>
          <li className="nav-item" style={{ marginRight: '25px'}}>
            <Link
              className="nav-link"
              to="/challenge"
              style={{
                color: location.pathname === "/challenge" ? "#00D387" : "",
                fontWeight: location.pathname === "/challenge" ? "900" : "600",
                fontSize: "1.3em",
              }}
            >
              챌린지
            </Link>
          </li>
          <li className="nav-item" style={{ marginRight: '25px'}}>
            <Link
              className="nav-link"
              to="/blog"
              style={{
                color: location.pathname === "/blog" ? "#00D387" : "",
                fontWeight: location.pathname === "/blog" ? "900" : "600",
                fontSize: "1.3em",
              }}
            >
              블로그
            </Link>
          </li>
          <li className="nav-item" style={{ marginRight: '25px'}}>
            <Link
              className="nav-link"
              to="/mall"
              style={{
                color: location.pathname === "/mall" ? "#00D387" : "",
                fontWeight: location.pathname === "/mall" ? "900" : "600",
                fontSize: "1.3em",
              }}
            >
              떠리몰
            </Link>
          </li>
          <li className="nav-item" style={{ marginRight: '25px'}}>
            <Link
              className="nav-link"
              to="/my"
              style={{
                color: location.pathname === "/my" ? "#00D387" : "",
                fontWeight: location.pathname === "/my" ? "900" : "600",
                fontSize: "1.3em",
              }}
            >
              마이페이지
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              onClick={logout}
              style={{
                fontWeight: "600",
                fontSize: "1.3em",
              }}
            >
              로그아웃
            </Link>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="navbar-nav" style={{ whiteSpace: "nowrap" }}>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/"
              style={{ fontSize: "1.3em", fontWeight: "600" }}
            >
              홈
            </Link>
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
              <Link
                className="nav-link disabled"
                to="/challenge"
                style={{ fontSize: "1.3em", fontWeight: "600" }}
              >
                챌린지
              </Link>
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
              <Link
                className="nav-link disabled"
                to="/blog"
                style={{ fontSize: "1.3em", fontWeight: "600" }}
              >
                블로그
              </Link>
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
              <Link
                className="nav-link disabled"
                to="/mall"
                style={{ fontSize: "1.3em", fontWeight: "600" }}
              >
                떠리몰
              </Link>
            </li>
          </OverlayTrigger>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/register"
              style={{ fontSize: "1.3em", fontWeight: "600" }}
            >
              회원가입
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/login"
              style={{ fontSize: "1.3em", fontWeight: "600" }}
            >
              로그인
            </Link>
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
