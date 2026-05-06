import "./NavLinks.css";
import { NavLink } from "react-router-dom";

const NavLinks = () => {
    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/" end>Artistes</NavLink>
            </li>
        </ul>
    );
};

export default NavLinks;