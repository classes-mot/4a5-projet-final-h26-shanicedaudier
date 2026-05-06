import "./ArtisteImage.css";

const ArtisteImage = (props) => {
    if (props.image) {
        return (
            <img
                className="artiste_image"
                src={props.image}
                alt={props.name}
            />
        );
    }

    // Placeholder avec initiale si pas d'image
    return (
        <div className="artiste_image_placeholder">
            <span>{props.name ? props.name.charAt(0).toUpperCase() : "?"}</span>
        </div>
    );
};

export default ArtisteImage;
