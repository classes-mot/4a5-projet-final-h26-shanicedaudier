import "./ArtisteCard.css";
import ArtisteImage from "../artisteImage/ArtisteImage";
import Card from "../UIElements/Card";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ArtisteCard = (props) => {
  //acceder au contexte pour verifier si utilisateur connecté
  const auth = useContext(AuthContext);
  //crochet de traduction pour les etiquettes (categorie, chanson, etc.)
  const { t } = useTranslation();

  return (
    <li className="ArtisteCard">
      <Card className="ArtisteCard_content">
       <Link to={`/artistes/${props.id}`} className="ArtisteCard_header">
          <ArtisteImage image={props.image} name={props.name}/>
        </Link>
        {/*Informations sur l'Artiste */}
        <div className="ArtisteCard_info">
          <h2>{props.name}</h2>
          <p>{t("carte.categorie")} : {props.category}</p>
          <p>{t("carte.chanson")} : {props.songPop}</p>
          <p>{t("carte.description")} : {props.description}</p>
        </div>
        {/*boutons visibles juste pr l'admin*/}
        {auth.loggedIn && 
        <div className="ArtisteCard_actions">
          <Link to={`/admin/artistes/edit/${props.id}`}>
            <button className="btn-pink">{t("carte.modifier")}</button>
          </Link>
          <button className="btn-pink-outline" onClick={() => props.OnDelete(props.id)}>{t("carte.supprimer")}</button>
        </div>
        }
      </Card>
    </li>
  );
};

export default ArtisteCard;