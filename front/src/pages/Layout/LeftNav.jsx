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
      }}
    >
      <img
        src={Logo}
        alt="logo"
        style={{
          width: "10%",
        }}
      />

      <Navbar.Toggle
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavbar"
      >
        <Navbar.Toggle icon></Navbar.Toggle>
      </Navbar.Toggle>
    </Navbar>
  );
};

export default LeftNav;
