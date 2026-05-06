import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import AdminNavLinks from "./AdminNavLinks";
import "./MainNavigation.css";

export default function AdminNavigation() {
    const auth = useContext(AuthContext);

    if (!auth.loggedIn) {
        return <Navigate to="/admin/login" replace />;
    }

    return (
        <>
            <header className="main-header">
                <span className="main-navigation__title" style={{ flex: 1 }}>
                    Administration
                </span>
                <nav className="main-navigation__header-nav">
                    <AdminNavLinks />
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
}
