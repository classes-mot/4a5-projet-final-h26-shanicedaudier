import "./ArtisteList.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import ArtisteCard from "../artisteCard/ArtisteCard";
import Modal from "../modal/modal";
import { useState, useEffect, useContext } from "react";

const ArtisteList = (props) => {

     const [artistes, setArtistes] = useState(() => {
        const storedArtistes = localStorage.getItem("artistes");
        return (storedArtistes && JSON.parse(storedArtistes).length > 0) 
            ? JSON.parse(storedArtistes) 
            : props.items;
    });

    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
    const auth = useContext(AuthContext);

    useEffect(() => {
 
            localStorage.setItem("artistes", JSON.stringify(artistes));

    }, [artistes]);

    const startDeleteHandler = (id) => { 
        setIdToDelete(id);
        setShowModal(true);
    };

    const cancelDeleteHandler = () => {
        setIdToDelete(null);
        setShowModal(false);
    };

    const confirmDeleteHandler = () => {
        setArtistes(prevArtistes => prevArtistes.filter(artiste => artiste.id !== idToDelete));
        cancelDeleteHandler();
    }

    const filtrerArtistes = artistes.filter((artiste) =>
        artiste.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="list_container">
            {showModal && (
                <Modal
                    titre="Confirmer la suppression"
                    onCancel={cancelDeleteHandler}
                    onConfirm={confirmDeleteHandler}
                >
                    <p>Êtes-vous sûr de vouloir supprimer cet artiste?</p>
                </Modal>
            )}
            <div className="hero" style={{ backgroundImage: `url(${city})` }}>
                <div className="hero_overlay" />
                <div className="hero_content">
                    <span className="hero_tag">Scène musicale de Montréal</span>
                    <h1 className="hero_titre">
                        Découvrez les artistes<br />
                        qui font <span className="subtitle">vibrer Montréal</span>
                    </h1>
                    <p className="hero_sub">
                        Explorez la scène musicale montréalaise : rap, R&B, pop et bien plus.
                        Chaque artiste, une histoire unique.
                    </p>
                    <div className="hero_boutons">
                        {auth.loggedIn && (
                            <Link to="/newArtiste" className="btn_ajout">+ Ajouter un artiste</Link>
                        )}
                    </div>
                </div>
                <div className="hero_stats">
                    <div className="hero_stat">
                        <span className="hero_stat_num">MONTRÉAL</span>
                        <span className="stat_nom">Ville</span>
                    </div>
                    <div className="stat_diviseur" />
                    <div className="hero_stat">
                        <span className="hero_stat_num">4+</span>
                        <span className="stat_nom">Genres</span>
                    </div>
                </div>
            </div>

            <div className="list_header">
                <input
                    type="text"
                    placeholder="Rechercher un artiste..."
                    className="search_bar"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {auth.loggedIn && (<Link to="/newArtiste" className="btn">Ajouter un artiste</Link>)}
            </div>

            {filtrerArtistes.length === 0 ? (
                <div className="list_center">
                    <p>Aucun artiste trouvé.</p>
                </div>
            ) : (
                <ul className="artistes_list">
                    {filtrerArtistes.map((artiste) => (
                        <ArtisteCard
                            key={artiste.id}
                            id={artiste.id}
                            name={artiste.name}
                            category={artiste.category}
                            songPop={artiste.songPop}
                            description={artiste.description}
                            OnDelete={startDeleteHandler}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ArtisteList;