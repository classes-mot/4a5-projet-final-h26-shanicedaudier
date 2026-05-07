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
    //recuperer les donnees de session stockees au chargement de la page
    const storedIdUtilisateur = sessionStorage.getItem('idUtilisateur');
    const storedCourrielUtilisateur = sessionStorage.getItem('courrielUtilisateur');
    //etats globaux de l'utilisateur connecte
    const [isLoggedIn, setIsLoggedIn] = useState(!!storedIdUtilisateur);
    const [idUtilisateur, setIdUtilisateur] = useState(storedIdUtilisateur);
    const [courrielUtilisateur, setCourrielUtilisateur] = useState(storedCourrielUtilisateur);
    //fonction de connexion, met a jour l'etat et sauvegarde dans le localStorage
    const login = (userId, email) => {
        setIsLoggedIn(true);
        setIdUtilisateur(userId);
        setCourrielUtilisateur(email);
        localStorage.setItem('idUtilisateur', userId);
        localStorage.setItem('courrielUtilisateur', email);
    };

    //fonction de deconnexion, reinitialise l'etat et supprime du localStorage
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
        //redirection vers la liste admin pour toute route inconnue
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

    //affiche le routeur admin si connecte, sinon le routeur public
    return (
        <AuthContext.Provider value={authContextValue}>
            <RouterProvider router={isLoggedIn ? adminRouter : publicRouter} />
        </AuthContext.Provider>
    )
}

export default App;