import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import RootLayout from "../containers/Roots";
import ErrorPage from "../containers/ErrorPage";
import Auth from "../containers/Auth";
import Cards from "../containers/Cards";
import NewGame from "../containers/NewGame";
import UpdateGame from "../containers/UpdateGame";
import Subscribe from "../containers/Subscribe";



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
        sessionStorage.setItem('idUtilisateur', userId);
        sessionStorage.setItem('courrielUtilisateur', email);

    };

    const logout = () => {
        setIsLoggedIn(false);
        setIdUtilisateur(null);
        setCourrielUtilisateur(null);
        sessionStorage.removeItem('idUtilisateur');
        sessionStorage.removeItem('courrielUtilisateur');
    }

        const routerIsLoggedIn = createBrowserRouter([
        {
            path: "/",
            element: <RootLayout />,
            errorElement: <ErrorPage />,
            children: [
                { path: "", element: <Cards /> },
                { path: "newGame", element: <NewGame /> },
                { path: "edit/:gameId", element: <UpdateGame /> },
                { path: "auth", element: <Navigate to="/" replace /> },
                { path: "subscribe", element: <Navigate to="/" replace /> },
            ],
        },
    ]);

    const routerIsNotLoggedIn = createBrowserRouter([
        {
            path: "/",
            element: <RootLayout />,
            errorElement: <ErrorPage />,
            children: [
                { path: "", element: <Cards /> },
                { path: "auth", element: <Auth /> },
                { path: "subscribe", element: <Subscribe /> },
                { path: "newGame", element: <Navigate to="/auth" replace /> },
                { path: "edit/:gameId", element: <Navigate to="/auth" replace /> },
            ],
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
            <RouterProvider router={isLoggedIn ? routerIsLoggedIn : routerIsNotLoggedIn} />;
        </AuthContext.Provider>
    )
}

export default App;