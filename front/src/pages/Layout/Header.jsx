import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, BrowserRouter } from "react-router-dom";

const Header = () => {
  return (
    <nav
      className="navbar navbar-expand-sm bg-dark navbar-dark"
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
      }}
    >
      <div className="container-fluid">
        <a className="nav-brand" href="/">
          Logo
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="collapsibleNavbar"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Resiter
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Header;
