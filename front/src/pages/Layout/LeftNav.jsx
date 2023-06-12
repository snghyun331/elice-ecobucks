import logo from "../../assets/logo.png";

import { Navbar } from "react-bootstrap";
const LeftNav = () => {
  return (
    <Navbar.Brand href="/" className="navbar-brand">
      <img style={{width: '9rem', paddingLeft: '10px', marginBottom: '5px' }} src={logo} />
    </Navbar.Brand>
  );
};

export default LeftNav;
