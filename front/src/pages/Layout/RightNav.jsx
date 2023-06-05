import { Navbar } from "react-bootstrap";
const RightNav = () => {
  return (
    <Navbar
      className="bg-light"
      style={{
        position: "fixed",
        top: "0",
        right: "0",
        width: "100%",
        backgroundColor: "dark",
      }}
    >
      {/* <div
        className="collapse navbar-collapse justify-content-end"
        id="collapsibleNavbar"
      > */}
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
          <a className="nav-link" href="/SignUp">
            회원가입
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/Login">
            로그인
          </a>
        </li>
      </ul>
      {/* </div> */}
    </Navbar>
  );
};

export default RightNav;
