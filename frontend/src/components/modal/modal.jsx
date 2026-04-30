import { createPortal } from "react-dom";
import "./modal.css";
import Card from "../UIElements/Card";

const Modal = (props) => {
    const contenu = (
        <div className="modal" onClick={props.onCancel}>
            <Card className="modal_container" onClick={(event) => event.stopPropagation()}>
                <header className="modal_header">
                    <h2>{props.name || "Confirmation"}</h2>
                </header>
                <div className="modal_body">
                    {props.children}
                </div>
                <footer className="modal_footer">
                    <button className="button_cancel" onClick={props.onCancel}>Annuler</button>
                    <button className="button_confirm" onClick={props.onConfirm}>Confirmer</button>
                </footer>
            </Card>
        </div>
    );
    return createPortal(contenu, document.getElementById("dialog"));
};
export default Modal;