import "./ArtisteList.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import ArtisteCard from "../artisteCard/ArtisteCard";
import Modal from "../modal/modal";
import { useState, useEffect, useContext } from "react";
import heroBg from "../../assets/city.webp";

const ArtisteList = (props) => {

    const [artistes, setArtistes] = useState(() => {
        const storedArtistes = localStorage.getItem("artistes");
        if (storedArtistes) {
            const parsed = JSON.parse(storedArtistes);
            // Merger avec les images par défaut de artistes.js
            // L'image uploadée (base64 data:) est prioritaire, sinon on prend celle de artistes.js
            return parsed.map((artiste) => {
                const defaut = props.items.find((a) => a.id === artiste.id);
                const imageFinale = artiste.imageUploadee || defaut?.image || null;
                return { ...artiste, image: imageFinale };
            });
        }
        return props.items;
    });


    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
    const auth = useContext(AuthContext);

    useEffect(() => {
        // Sauvegarder sans l'image par défaut (pour ne pas polluer le localStorage avec des chemins Vite)
        const stocker = artistes.map(({ image, ...reste }) => reste);
        localStorage.setItem("artistes", JSON.stringify(stocker));
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
            <div className="hero" style={{ backgroundImage: `url(${heroBg})` }}>
                <div className="hero_overlay" />
                <Link to="/" className="hero_brand">
                    <div className="hero_brand_top">
                        <span className="hero_brand_m">M</span>
                        <span className="hero_brand_icd">IC'D UP</span>
                    </div>
                    <div className="hero_brand_bottom">
                        {"ONTRÉAL".split("").map((l, i) => (
                            <span key={i} className="hero_brand_letter">{l}</span>
                        ))}
                    </div>
                </Link>
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
                {auth.loggedIn && (<Link to="/admin/newArtiste" className="btn">Ajouter un artiste</Link>)}
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
                            image={artiste.image}
                            description={artiste.description}
                            OnDelete={startDeleteHandler}
                        />
                    ))}
                </ul>
            )}
             <div className="admin_link_wrapper">
                <Link to="/admin/login" className="admin_link">Administration</Link>
            </div>
        </div>
    );
};

export default ArtisteList;