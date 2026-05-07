import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useTranslation } from 'react-i18next';
import "./NavLinks.css";

const AdminNavLinks = () => {
    const auth = useContext(AuthContext);
    const { t } = useTranslation();

    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/admin/artistes" end>{t('navigation.artistes')}</NavLink>
            </li>
            <li>
                <NavLink to="/admin/newArtiste">{t('navigation.ajouter')}</NavLink>
            </li>
            <li className="logout-link">
                <NavLink to="/" onClick={auth.logout}>{t('navigation.deconnexion')}</NavLink>
            </li>
        </ul>
    );
};

export default AdminNavLinks;
