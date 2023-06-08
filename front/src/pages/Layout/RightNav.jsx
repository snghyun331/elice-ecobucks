import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DispatchContext } from "../../context/user/UserProvider";

const RightNav = ({ isLogin, user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  // 로그인 여부에 따라 다른 내용을 렌더링
  const dispatch = useContext(DispatchContext);
  // const navigate = useNavigate();
  const logout = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem("userToken");
    // dispatch 함수를 이용해 로그아웃함.
    dispatch({ type: "LOGOUT" });
    alert("로그아웃하여 홈페이지로 이동합니다.");
    // 기본 페이지로 돌아감.
    navigate('/');
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
          <li className="nav-item">
            <a className="nav-link" href="/challenge">
              챌린지
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/blog">
              블로그
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/mall">
              떠리몰
            </a>
          </li>
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
