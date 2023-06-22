import { useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { UserStateContext, DispatchContext } from "../../context/user/UserProvider";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { CurrencyDollarIcon } from "@heroicons/react/20/solid";
import { ROUTE } from "../../routes/routes";
import { LOGOUT } from "../../reducer/action";
import { showSuccess } from "../../assets/alert";

const RightNav = ({ isLogin, user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);

  const logout = () => {
    sessionStorage.removeItem("userToken");
    dispatch({ type: LOGOUT });
    showSuccess("로그아웃하여 홈페이지로 이동합니다.");
    navigate('/')
  };

  const renderNavContent = () => {
    if (isLogin) {
      return (
        <ul className="navbar-nav" style={{ whiteSpace: "nowrap" }}>
          <li className="nav-item" style={{
            fontFamily: "PyeongChang-Bold",
            marginRight: '25px'
          }}>
            <Link
              className="nav-link"
              to={ROUTE.HOME.link}
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
              <CurrencyDollarIcon
                variant="light"
                color="#EABA36"
                style={{
                  width: "25px",
                  height: "27px",
                  cursor: "pointer",
                  marginRight: "5px",
                  marginBottom: "4px",
                }} />
              <span>{user.mileage.toLocaleString()}</span>
            </Link>
          </li>
          <li className="nav-item" style={{ marginRight: '25px' }}>
            <Link
              className="nav-link"
              to={ROUTE.CHALLENGE.link}
              style={{
                color: location.pathname === "/challenge" ? "#00D387" : "",
                fontWeight: location.pathname === "/challenge" ? "900" : "600",
                fontSize: "1.3em",
              }}
            >
              챌린지
            </Link>
          </li>
          <li className="nav-item" style={{ marginRight: '25px' }}>
            <Link
              className="nav-link"
              to={ROUTE.BLOG.link}
              style={{
                color: location.pathname === "/blog" ? "#00D387" : "",
                fontWeight: location.pathname === "/blog" ? "900" : "600",
                fontSize: "1.3em",
              }}
            >
              절약팁
            </Link>
          </li>
          <li className="nav-item" style={{ marginRight: '25px' }}>
            <Link
              className="nav-link"
              to={ROUTE.MALL.link}
              style={{
                color: location.pathname === "/mall" ? "#00D387" : "",
                fontWeight: location.pathname === "/mall" ? "900" : "600",
                fontSize: "1.3em",
              }}
            >
              떠리몰
            </Link>
          </li>
          <li className="nav-item" style={{ marginRight: '25px' }}>
            <Link
              className="nav-link"
              to={ROUTE.MY.link}
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
            <a
              className="nav-link"
              onClick={logout}
              style={{
                fontWeight: "600",
                fontSize: "1.3em",
                cursor: 'pointer'
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
            <Link
              className="nav-link"
              to={ROUTE.HOME.link}
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
                to={ROUTE.CHALLENGE.link}
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
                to={ROUTE.BLOG.link}
                style={{ fontSize: "1.3em", fontWeight: "600" }}
              >
                절약팁
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
                to={ROUTE.MALL.link}
                style={{ fontSize: "1.3em", fontWeight: "600" }}
              >
                떠리몰
              </Link>
            </li>
          </OverlayTrigger>
          <li className="nav-item">
            <Link
              className="nav-link"
              to={ROUTE.REGISTER.link}
              style={{ fontSize: "1.3em", fontWeight: "600" }}
            >
              회원가입
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to={ROUTE.LOGIN.link}
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
