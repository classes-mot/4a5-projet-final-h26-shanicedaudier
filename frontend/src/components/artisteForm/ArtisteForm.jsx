import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../UIElements/Card";
import "./ArtisteForm.css";

const ArtisteForm = () => {
    const navigate = useNavigate();
    const { artisteId } = useParams();

    const [formData, setFormData] = useState(() =>{
       if (artisteId) {
            const storedArtistes = JSON.parse(localStorage.getItem("artistes")) || [];
            const artisteToEdit = storedArtistes.find((artiste) => artiste.id === artisteId);
            if (artisteToEdit) {return artisteToEdit};
       } return {
            name: "",
            category: "Rap",
            songPop: "",
            description: ""
        };
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (artisteId) {
            document.name = `Modification : ${formData.name}`;
        } else {
            document.name = "Ajouter un nouvel artiste";
        }
    }, [artisteId, formData.name]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validate = () => {
        let errs = {};
        if (!formData.name.trim()) errs.name = "Le nom est requis.";
        if (!formData.songPop.trim()) errs.songPop = "La chanson est requise.";
        if (!formData.description.trim()) errs.description  = "La description est requise.";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        let storedArtistes = JSON.parse(localStorage.getItem("artistes")) || [];
        if (artisteId) {
            storedArtistes = storedArtistes.map((artiste) => (artiste.id === artisteId ? { ...formData } : artiste));
        } else {
            const newArtiste = { ...formData, id: "artiste" + Math.random().toString(36).substring(2, 4) };
            storedArtistes.push(newArtiste);
        }
        localStorage.setItem("artistes", JSON.stringify(storedArtistes));
        navigate("/");
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
                        <button type="submit" className="btn_submit">Enregistrer</button>
                        <button type="button" className="btn_cancel" onClick={() => navigate("/")}>Annuler</button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default ArtisteForm;