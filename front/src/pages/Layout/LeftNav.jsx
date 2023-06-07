import ecologo from "../../assets/ecologo.png";
import { Navbar } from "react-bootstrap";
const LeftNav = () => {
  return (
    <Navbar.Brand href="/" className="navbar-brand">
      <img src={ecologo} />
    </Navbar.Brand>
  );
};

export default LeftNav;
