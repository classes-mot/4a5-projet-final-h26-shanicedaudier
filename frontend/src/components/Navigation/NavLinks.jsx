import { useContext } from "react";
import "./NavLinks.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const NavLinks = () => {
    const auth = useContext(AuthContext)

    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/" end>Artistes</NavLink>
            </li>

            {auth.loggedIn && (
                <li>
                    <NavLink to="/newArtiste">Ajouter un artiste</NavLink>
                </li>
            )}

            {!auth.loggedIn ? (
                <>
                    <li>
                        <NavLink to="/auth">Connexion</NavLink>
                    </li>
                    <li>
                        <NavLink to="/subscribe">S'inscrire</NavLink>
                    </li>
                </>
            ) : (
                <li>
                    <NavLink to="/" onClick={auth.logout}>Déconnexion</NavLink>
                </li>
            )}
        </ul>
    );
};

export default NavLinks;