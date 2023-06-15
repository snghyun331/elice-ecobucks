import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { ROUTE } from "../../routes/routes";
import { Navbar } from "react-bootstrap";
const LeftNav = () => {
  return (

    <Navbar.Brand href="/" className="navbar-brand">
          <Link to = {ROUTE.HOME}>
      <img style={{width: '9rem', paddingLeft: '10px', marginBottom: '5px' }} src={logo} />
      </Link>
    </Navbar.Brand>

  );
};

export default LeftNav;
