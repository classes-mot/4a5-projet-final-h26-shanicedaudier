import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

export default function LoginForm() {
    const { t } = useTranslation();

    const [mdpVide, setMdpVide] = useState(false);
    const [emailVide, setEmailVide] = useState(false);

    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const authSubmitHandler = (event) => {
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries())

        setEmailVide(false);
        setMdpVide(false);

        let valid = true;
        if (!data.email) {
            setEmailVide(true);
            valid = false;
        }
        if (data.password === "") {
            setMdpVide(true);
            valid = false;
        }

        if (valid) {
            auth.login("ul", data.email);
            navigate("/");
        }

        if (valid) {
            const utilisateurs = JSON.parse(localStorage.getItem("utilisateurs")) || UTILISATEURS;
            const trouve = utilisateurs.find(
                (u) => u.email === data.email && u.password === data.password
            );
            if (!trouve) {
                setEmailVide(true);
                setMdpVide(true);
                return;
            }
            auth.login(trouve.id, trouve.email);
            navigate("/");
        }

    };
    return (
        <div className="auth_container">
            <form className="form" onSubmit={authSubmitHandler}>
                <h2 className="title">Connexion</h2>

                <div className="control_row">
                    <div className="control">
                        <label htmlFor="email">Courriel</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            className={emailVide ? "input_invalid" : ""}
                        />
                        {emailVide && <div className="erreur_msg">Le courriel est requis</div>}
                    </div>

                    <div className="control">
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            className={mdpVide ? "input_invalid" : ""}
                        />
                        {mdpVide && <div className="erreur_msg">Le mot de passe est requis</div>}
                    </div>
                </div>
                <p className="btn_actions">
                    <button type="reset" className="button button_outline">{t("connexion.reinitialiser")}</button>
                    <button type="submit" className="button button_submit">{t("connexion.connecter")}</button>
                </p>
            </form>
        </div>
    );
}






