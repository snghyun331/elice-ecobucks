import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { Navbar } from "react-bootstrap";
const LeftNav = () => {
  return (
    <Navbar
      className="bg-light"
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        backgroundColor: "dark",
      }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          LOGO
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </Navbar>
  );
};

export default LeftNav;
