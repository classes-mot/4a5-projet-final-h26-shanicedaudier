import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import RootLayout from "../containers/Roots";
import ErrorPage from "../containers/ErrorPage";
import Auth from "../containers/Auth";
import Cards from "../containers/Cards";
import NewArtiste from "../containers/NewArtiste";
import UpdateArtiste from "../containers/UpdateArtiste";
import Subscribe from "../containers/Subscribe";
import AdminNavigation from "./Navigation/AdminNavigation";
import ArtisteDetailPage from "../containers/ArtisteDetailPage";


const App = () => {
    const storedIdUtilisateur = sessionStorage.getItem('idUtilisateur');
    const storedCourrielUtilisateur = sessionStorage.getItem('courrielUtilisateur');

    const [isLoggedIn, setIsLoggedIn] = useState(!!storedIdUtilisateur);
    const [idUtilisateur, setIdUtilisateur] = useState(storedIdUtilisateur);
    const [courrielUtilisateur, setCourrielUtilisateur] = useState(storedCourrielUtilisateur);

    const login = (userId, email) => {
        setIsLoggedIn(true);
        setIdUtilisateur(userId);
        setCourrielUtilisateur(email);
        localStorage.setItem('idUtilisateur', userId);
        localStorage.setItem('courrielUtilisateur', email);
    };


    const logout = () => {
        setIsLoggedIn(false);
        setIdUtilisateur(null);
        setCourrielUtilisateur(null);
        localStorage.removeItem('idUtilisateur');
        localStorage.removeItem('courrielUtilisateur');
    }

    //Router public - accueil + page de connexion admin
    const publicRouter = createBrowserRouter([
        {
            path: "/",
            element: <RootLayout/>,
            errorElement: <ErrorPage/>,
            children: [
                { index: true, element: <Cards/> },
                { path: "artistes/:artisteId", element: <ArtisteDetailPage/> }
            ],
        },
        { 
            path: "/admin/login", 
            element: <Auth />, 
        },
        { 
            path: "/admin/register", 
            element: <Subscribe />, 
        },
        { 
            path: "*", 
            element: <Navigate to="/" replace/> 
        },
    ]);

    //Router admin - zone protégée
    const adminRouter = createBrowserRouter([
        {
            path: "/",
            element: <AdminNavigation />,
            errorElement: <ErrorPage />,
            children: [
                { index: true, element: <Navigate to="/admin/artistes" replace/> },
                { path: "admin/artistes", element: <Cards/> },
                { path: "admin/newArtiste", element: <NewArtiste/> },
                { path: "admin/artistes/edit/:artisteId", element: <UpdateArtiste/> },
                { path: "artistes/:artisteId", element: <ArtisteDetailPage/> },
            ],
        },
        { 
            path: "*", 
            element: <Navigate to="/admin/artistes" replace /> 
        },
    ]);

    const authContextValue = {
        loggedIn: isLoggedIn,
        userId: idUtilisateur,
        email: courrielUtilisateur,
        login: login,
        logout: logout
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            <RouterProvider router={isLoggedIn ? adminRouter : publicRouter} />
        </AuthContext.Provider>
    )
}

export default App;