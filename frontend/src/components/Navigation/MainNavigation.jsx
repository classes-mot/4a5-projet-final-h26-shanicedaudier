import { useState } from "react";
import NavLinks from "./NavLinks";
import "./MainNavigation.css";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";
import LanguageSwitcher from "../languageSwitcher/LanguageSwitcher";

const MainNavigation = () => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const openDrawer = () => setDrawerIsOpen(true);
    const closeDrawer = () => setDrawerIsOpen(false);

    return (
        <>
            {drawerIsOpen && <Backdrop onClick={closeDrawer} />}
            {drawerIsOpen && (
                <SideDrawer onClick={closeDrawer}>
                    <nav className="main-navigation_MenuDrawer">
                        <NavLinks />
                    </nav>
                </SideDrawer>
            )}
            <header className="main-header">
                <button className="main-navigation_MenuButton" onClick={openDrawer}>
                    <span /><span /><span />
                </button>
                <nav className="main-navigation__header-nav">
                    <NavLinks />
                </nav>
                <LanguageSwitcher />
            </header>
        </>
    );
};

export default MainNavigation;
