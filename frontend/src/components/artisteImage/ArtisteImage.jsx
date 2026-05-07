import "./ArtisteImage.css";

const ArtisteImage = (props) => {
    //Si une image est disponible, l'afficher
    if (props.image) {
        return (
            <img
                className="artiste_image"
                src={props.image}
                alt={props.name}
            />
        );
    }

    //Sinon, afficher un placeholder avec la premiere lettre du nom de l'artiste
    return (
        <div className="artiste_image_placeholder">
            <span>{props.name ? props.name.charAt(0).toUpperCase() : "?"}</span>
        </div>
    );
};

export default ArtisteImage;
