import { Navbar } from "react-bootstrap";

const RightNav = ({ isLogin }) => {
  // 로그인 여부에 따라 다른 내용을 렌더링
  const renderNavContent = () => {
    if (isLogin) {
      return (
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/blog">
              블로그
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/mall">
              쇼핑몰
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/Logout">
              로그아웃
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/">
              홈
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/blog">
              블로그
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/mall">
              쇼핑몰
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
    // <Navbar
    //   className="bg-light"
    //   style={{
    //     position: "absolute",
    //     top: "0",
    //     right: "0",
    //     width: "100%",
    //     backgroundColor: "dark",
    //     backdropFilter: "blur(10px)",
    //   }}
    // >
      <div className="container-fluid">
        <div
          className="collapse navbar-collapse justify-content-end"
          id="collapsibleNavbar"
        >
          {renderNavContent()}
        </div>
      </div>
    // </Navbar>
  );
};
export default RightNav;
