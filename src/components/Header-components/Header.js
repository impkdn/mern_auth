import logo from "../../Images/logo-generic.png"
import Search from "./Search/search";
import LogIn from "./LogIn/LogIn";
import BecomeSeller from "./BecomeSeller/BecomeSeller";
import MoreDropDown from "./MoreDropDown/MoreDropDown";
import Cart from "./Cart/Cart";
import "./Header.css"


function Header() {
    return (
        <header className="header__wrapper">
            <div>
                <a href="../Images/logo-generic.png"><img src={logo} alt="Image OF" width="40px" height="70px" ></img></a>
            </div>
            <Search></Search>
            <LogIn/>
            <BecomeSeller/>
            <MoreDropDown/>
            <Cart/>
        </header>
    );
}

export default Header;