import { Outlet, Link } from "react-router-dom";
import logo from "../Images/logo-generic.png";
import "./Layout.css";
import LogIn from "../components/Header-components/LogIn/LogIn";

const Layout = () => {
  return (
    <>
    <div className="headerM">
      <div className="logoImage">
        <Link to="/home" >
        
          <img className="img" src={logo} alt="Image OF"></img>
        </Link>
       
       
      </div>
      <nav className="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Log In</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>

          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

    </div>

      <Outlet />
    </>
  );
};

export default Layout;
