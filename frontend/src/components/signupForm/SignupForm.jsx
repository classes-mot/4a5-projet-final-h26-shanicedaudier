import { useState, useContext } from "react";
import "./SignupForm.css";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { UTILISATEURS } from "../../data/utilisateurs";

export default function Signup() {

    const [passwordNotEqual, setPasswordNotEqual] = useState(false);
    const [emailExiste, setEmailExiste] = useState(false);
    const auth = useContext(AuthContext)
    const  navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());

        setPasswordNotEqual(false);
        setEmailExiste(false);

        if (data.password !== data["confirmez-mdp"]) {
            setPasswordNotEqual(true);
            return;
        }

        // Vérifier si le courriel existe déjà
        const utilisateurs = JSON.parse(localStorage.getItem("utilisateurs")) || UTILISATEURS;
        if (utilisateurs.find((u) => u.email === data.courriel)) {
            setEmailExiste(true);
            return;
        }

        // Sauvegarder le nouvel utilisateur
        const nouvelUtilisateur = {
            id: "u" + Math.random().toString(36).substring(2, 6),
            email: data.courriel,
            password: data.password,
            prenom: data["first-name"],
            nom: data["last-name"],
        };
        utilisateurs.push(nouvelUtilisateur);
        localStorage.setItem("utilisateurs", JSON.stringify(utilisateurs));

        // Rediriger vers login après inscription
        navigate("/admin/login");
    }

    return (
        <div className="auth_container">
            <form className="form" onSubmit={handleSubmit}>
                <h2 className="title" >Bienvenue !</h2>
                <p className="subtitle">Nous avons besoin de vos informations pour comencer.</p>

                <div className="control">
                    <label htmlFor="email">Courriel</label>
                    <input id="email" type="email" name="courriel" required />
                    {emailExiste && <div className="erreur_msg">Ce courriel est déjà utilisé.</div>}
                </div>

                <div className="control_row">
                    <div className="control">
                        <label htmlFor="password">Mot de passe</label>
                        <input id="password" type="password" name="password" />
                    </div>
                    <div className="control">
                        <label htmlFor="confirmez-mdp">Confirmez le mot de passe</label>
                        <input
                            id="confirmez-mdp"
                            type="password"
                            name="confirmez-mdp"
                            required
                            className={passwordNotEqual ? "input_invalid" : ""}
                        />
                    </div>
                </div>

                {passwordNotEqual && (
                    <div className="erreur_msg">
                        <p>Les mots de passe doivent être pareils ! </p>
                    </div>
                )}

                <hr className="hr_control"/>

                <div className="control_row">
                    <div className="control">
                        <label htmlFor="first-name">Prénom</label>
                        <input id="first-name" type="text" name="first-name" />
                    </div>

                    <div className="control">
                        <label htmlFor="last-name">Nom</label>
                        <input id="last-name" type="text" name="last-name" />
                    </div>
                </div>

                <div className="control checkbox">
                    <label htmlFor="terms-and-conditions">
                        <input type="checkbox" id="terms-and-conditions" name="terms" required />
                        J'accepte les conditions générales de ce site web
                    </label>
                </div>

                <p className="btn_actions">
                    <button type="reset" className="button button_outline">Réinitialiser</button>
                    <button type="submit" className="button button_submit">S'inscrire</button>
                </p>
            </form>
        </div>
    );
}