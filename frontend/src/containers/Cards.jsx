import { useParams } from "react-router-dom";
import GameList from "../components/gameList/GameList";
import { GAMES } from "../data/games";

const Cards = () => {

    return <GameList items={GAMES} />;
};

export default Cards;