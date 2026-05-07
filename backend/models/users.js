import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    artistes: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Artiste', 
        },
    ],
});

export const User = mongoose.model('User', userSchema)
