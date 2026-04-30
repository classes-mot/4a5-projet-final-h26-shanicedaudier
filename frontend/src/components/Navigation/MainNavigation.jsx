import { Link } from "react-router-dom";
import { useState } from "react";
import NavLinks from "./NavLinks";
import "./MainNavigation.css";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";

const MainNavigation = (props) => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

     const openDrawer = () => {
        setDrawerIsOpen(true);
    };

    const closeDrawer = () => {
        setDrawerIsOpen(false);
    }

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
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className="main-navigation__title">
                    <Link to="/">Montréal s'exprime</Link>
                </h1>
                <nav className="main-navigation__header-nav">
                    <NavLinks />
                </nav>
            </header>
        </>
    );
};

export default MainNavigation;