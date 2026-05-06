import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./NavLinks.css";

const AdminNavLinks = () => {
    const auth = useContext(AuthContext);

    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/admin/artistes" end>Artistes</NavLink>
            </li>
            <li>
                <NavLink to="/admin/newArtiste">Ajouter un artiste</NavLink>
            </li>
            <li className="logout-link">
                <NavLink to="/" onClick={auth.logout}>Déconnexion</NavLink>
            </li>
        </ul>
    );
};

export default AdminNavLinks;
