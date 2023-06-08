import logo from "../../assets/logo.png";

import { Navbar } from "react-bootstrap";
const LeftNav = () => {
  return (
    <Navbar.Brand href="/" className="navbar-brand">
      <img style={{width: '15%', paddingLeft: '10px', paddingBottom: '6px' }} src={logo} />
    </Navbar.Brand>
  );
};

export default LeftNav;
