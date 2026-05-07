import mongoose from "mongoose";

const artisteSchemas = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    songPop: { type: String, required: true },
    image: { type: String, },
    description: { type: String, required: true },
})

export const Artiste = mongoose.model('Artiste', artisteSchemas);