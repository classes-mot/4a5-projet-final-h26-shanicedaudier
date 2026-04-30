import { useParams } from "react-router-dom";
import ArtisteList from "../components/artisteList/ArtisteList";
import { ARTISTES } from "../data/artistes";

const Cards = () => {

    return <ArtisteList items={ARTISTES} />;
};

export default Cards;