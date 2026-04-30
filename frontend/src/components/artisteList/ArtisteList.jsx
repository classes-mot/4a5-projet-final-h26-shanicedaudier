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