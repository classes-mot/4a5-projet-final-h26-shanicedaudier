import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../UIElements/Card";
import "./ArtisteForm.css";

const ArtisteForm = () => {
    const navigate = useNavigate();
    const { artisteId } = useParams();
    const fileInputRef = useRef();

    //initialisation du formulaire avec les données existantes si en mode modification
    const [formData, setFormData] = useState(() =>{
       if (artisteId) {
            const storedArtistes = JSON.parse(localStorage.getItem("artistes")) || [];
            const artisteToEdit = storedArtistes.find((artiste) => artiste.id === artisteId);
            if (artisteToEdit) {return artisteToEdit};
       } return { //valeurs par défaut
            name: "",
            category: "Rap",
            songPop: "",
            image: null,
            description: ""
        };
    });

    //apercu de l,image selectionnée
    const [preview, setPreview] = useState(formData.image || null);
    //état des messages d'erreur de validation
    const [errors, setErrors] = useState({});
    //état détecter si utilisateur drag and drop
    const [isDragging, setIsDragging] = useState(false);

    //mettre a jour le nom
    useEffect(() => {
        if (artisteId) {
            document.name = `Modification : ${formData.name}`;
        } else {
            document.name = "Ajouter un nouvel artiste";
        }
    }, [artisteId, formData.name]);

    //mettre à jour champ du formulaire pour changement de valeur
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    //convertir image selectionnée en base64 pour la stocker
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result;
            setPreview(base64);
            setFormData((prev) => ({ ...prev, image: base64 }));
        };
        reader.readAsDataURL(file);
    };
    // supprimer l'image et reinitailiser
    const handleRemoveImage = () => {
        setPreview(null);
        setFormData((prev) => ({ ...prev, image: null }));
        if (fileInputRef.current) fileInputRef.current.value = "";
    };
    //gerer le depot d'image par drag and drop
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (!file || !file.type.startsWith("image/")) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result;
            setPreview(base64);
            setFormData((prev) => ({ ...prev, image: base64 }));
        };
        reader.readAsDataURL(file);
    };

    //valider les champs obligatoires
    const validate = () => {
        let errs = {};
        if (!formData.name.trim()) errs.name = "Le nom est requis.";
        if (!formData.songPop.trim()) errs.songPop = "La chanson est requise.";
        if (!formData.description.trim()) errs.description  = "La description est requise.";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    //sauvegarder l'artiste dans local storage
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        let storedArtistes = JSON.parse(localStorage.getItem("artistes")) || [];
        //separer l'image uploadee des autres donnees pour la stocker dans imageUploadee
        const { image, ...donneesSansImage } = formData;
        const donneesAStorager = {
            ...donneesSansImage,
            imageUploadee: image && image.startsWith("data:") ? image : undefined,
        };
        if (artisteId) {
            //mise a jour artiste existant
            storedArtistes = storedArtistes.map((artiste) => (artiste.id === artisteId ? { ...donneesAStorager } : artiste));
        } else {
            //ajout nouvel artiste avec identifiant aléatoire
            const newArtiste = { ...donneesAStorager, id: "artiste" + Math.random().toString(36).substring(2, 4) };
            storedArtistes.push(newArtiste);
        }
        localStorage.setItem("artistes", JSON.stringify(storedArtistes));
        navigate("/admin/artistes");
    };

    return (
        <div className="form_container">
            <Card className="form_card">
                <h2 className="name">{artisteId ? "Modifier l'artiste" : "Ajouter un artiste"}</h2>
                <form onSubmit={handleSubmit}>

                    <div className="control">
                        <label>Nom</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <span className="error">{errors.name}</span>}
                    </div>

                    <div className="control">
                        <label>Catégorie</label>
                        <select name="category" value={formData.category} onChange={handleChange}>
                            <option value="Rap">Rap</option>
                            <option value="RnB">R&B</option>
                            <option value="KonpaTrap">Konpa Trap</option>
                            <option value="Pop">Pop</option>
                        </select>
                    </div>

                    <div className="control">
                        <label>Chanson la plus populaire</label>
                        <input
                            type="text"
                            name="songPop"
                            value={formData.songPop}
                            onChange={handleChange}
                        />
                        {errors.songPop && <span className="error">{errors.songPop}</span>}
                    </div>
                    {/*zone téléchargement d'image avec drag and drop*/}
                    <div className="control">
                        <label>Image de l'artiste</label>
                        <div
                            className={`image_upload_zone${isDragging ? " drag_over" : ""}`}
                            onClick={() => fileInputRef.current.click()}
                            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={handleDrop}
                        >
                            {/*apercu de l'image oiu message dMinvitation*/}
                            {preview ? (
                                <img src={preview} alt="Aperçu" className="image_preview" />
                            ) : (
                                <div className="image_upload_placeholder">
                                    <span>Cliquer ou déposer une image ici</span>
                                </div>
                            )}
                        </div>
                        {/*Input fichier caché, déclenché par le clic sur la zone*/}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: "none" }}
                        />
                        {/*bouton pour supprimer l'image choisie*/}
                        {preview && (
                            <button type="button" className="btn_remove_image" onClick={handleRemoveImage}>
                                Supprimer l'image
                            </button>
                        )}
                    </div>
                    <div className="control">
                        <label>Description</label>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                        {errors.description && <span className="error">{errors.description}</span>}
                    </div>

                    <div className="btn_actions">
                        <button type="button" className="btn_cancel" onClick={() => navigate("/")}>Annuler</button>
                        <button type="submit" className="btn_submit">Enregistrer</button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default ArtisteForm;