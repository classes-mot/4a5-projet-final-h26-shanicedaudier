import "./NavLinks.css";
import { useTranslation } from 'react-i18next';

const NavLinks = () => {
    const { t } = useTranslation();
    return (
        <ul className="nav-links">
            <li>
                <span className="nav-label">{t('navigation.artistes')}</span>
            </li>
        </ul>
    );
};

export default NavLinks;
