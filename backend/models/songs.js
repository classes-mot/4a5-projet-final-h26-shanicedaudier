import mongoose from "mongoose";

const gameSchemas = new mongoose.Schema({
    titre: { type: String, required: true },
    categorie: { type: String, required: true },
    nombreJoueurs: { type: Number, required: true },
    duree: { type: String, required: true },
})

export const Game = mongoose.model('Game', gameSchemas);