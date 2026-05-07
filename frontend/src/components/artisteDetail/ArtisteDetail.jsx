import { useParams, useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { ARTISTES } from "../../data/artistes";
import { AuthContext } from "../../context/AuthContext";
import "./ArtisteDetail.css";
import { useTranslation } from "react-i18next";

const BrandTitle = () => (
    <Link to="/" className="detail_brand">
        <div className="detail_brand_top">
            <span className="detail_brand_m">M</span>
            <span className="detail_brand_icd">IC'D UP</span>
        </div>
        <div className="detail_brand_bottom">
            {"ONTRÉAL".split("").map((l, i) => (
                <span key={i} className="detail_brand_letter">{l}</span>
            ))}
        </div>
    </Link>
);

const ArtisteDetail = () => {
    const { t } = useTranslation();
    const { artisteId } = useParams();
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    // Toujours prendre les données de artistes.js comme source principale
    const defaut = ARTISTES.find((a) => a.id === artisteId);
    const stored = JSON.parse(localStorage.getItem("artistes")) || [];
    const storedArtiste = stored.find((a) => a.id === artisteId);

    if (!defaut) {
        return <div className="detail_not_found"><p>Artiste introuvable.</p></div>;
    }

    const artiste = {
        ...storedArtiste,
        // Ces champs viennent TOUJOURS de artistes.js pour éviter les données corrompues du localStorage
        id: defaut.id,
        name: defaut.name,
        category: defaut.category,
        songPop: defaut.songPop,
        description: defaut.description,
        musiqueLien: defaut.musiqueLien,
        image: storedArtiste?.imageUploadee || defaut.image,
        imageDetail: storedArtiste?.imageUploadee || defaut.imageDetail || defaut.image,
    };

    // Convertir lien YouTube en embed — bug corrigé (musique.com → youtube.com)
    const getYoutubeEmbed = (url) => {
        if (!url) return null;
        const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        return match ? `https://www.youtube.com/embed/${match[1]}` : null;
    };

    const embedUrl = getYoutubeEmbed(artiste.musiqueLien);

    return (
        <div className="detail_container">
            <div className="detail_topbar">
                <BrandTitle />
                <button className="detail_back" onClick={() => navigate(-1)}>{t("detail.retour")}</button>
            </div>

            <div className="detail_hero">
                {artiste.imageDetail && (
                    <img
                        src={artiste.imageDetail}
                        alt={artiste.name}
                        className="detail_image"
                    />
                )}
                <div className="detail_overlay">
                    <span className="detail_category">{artiste.category}</span>
                    <h1 className="detail_name">{artiste.name}</h1>
                    <p className="detail_songpop">🎵 {artiste.songPop}</p>
                </div>
            </div>

            <div className="detail_body">
                <div className="detail_description">
                    <h2>{t("detail.apropos")}</h2>
                    <p>{artiste.description}</p>
                </div>

                {embedUrl && (
                    <div className="detail_musique">
                        <h2>{t("detail.chansonPop")}</h2>
                        <div className="detail_video_wrapper">
                            <iframe
                                src={embedUrl}
                                title={`${artiste.name} - ${artiste.songPop}`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                )}

                {auth.loggedIn && (
                    <div className="detail_actions">
                        <Link to={`/admin/artistes/edit/${artiste.id}`}>
                            <button className="btn-pink">{t("carte.modifier")}</button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArtisteDetail;
