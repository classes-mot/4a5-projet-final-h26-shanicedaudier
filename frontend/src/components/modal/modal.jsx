import { createPortal } from "react-dom";
import "./modal.css";
import Card from "../UIElements/Card";
import { useTranslation } from "react-i18next";

const Modal = (props) => {
    const { t } = useTranslation();
    const contenu = (
        <div className="modal" onClick={props.onCancel}>
            <Card className="modal_container" onClick={(event) => event.stopPropagation()}>
                <header className="modal_header">
                    <h2>{props.name || t("modal.confirmation")}</h2>
                </header>
                <div className="modal_body">
                    {props.children}
                </div>
                <footer className="modal_footer">
                    <button className="button_cancel" onClick={props.onCancel}>{t("modal.annuler")}</button>
                    <button className="button_confirm" onClick={props.onConfirm}>{t("modal.confirmer")}</button>
                </footer>
            </Card>
        </div>
    );
    return createPortal(contenu, document.getElementById("dialog"));
};
export default Modal;