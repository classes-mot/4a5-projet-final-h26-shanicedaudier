import "./ArtisteCard.css";
import ArtisteImage from "../artisteImage/ArtisteImage";
import Card from "../UIElements/Card";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";



import { Link } from "react-router-dom";

const ArtisteCard = (props) => {
  const auth = useContext(AuthContext)

  return (
    <li className="ArtisteCard">
      <Card className="ArtisteCard_content">
        <div className="ArtisteCard_header">
          <GameIcon categorie={props.category} />
        </div>

        <div className="ArtisteCard_info">
          <h2>{props.name}</h2>
          <p>Catégorie : {props.category}</p>
          <p>Chanson la plus populaire : {props.popSong}</p>
          <p>Description : {props.description}</p>
        </div>

        {auth.loggedIn && 
        <div className="GameCard_actions">
          <Link to={`/edit/${props.id}`}>
            <button className="btn-pink">Modifier</button>
          </Link>
          <button className="btn-pink-outline" onClick={() => props.OnDelete(props.id)}>Supprimer</button>
        </div>
        }
      </Card>
    </li>
  );
};

export default ArtisteCard;