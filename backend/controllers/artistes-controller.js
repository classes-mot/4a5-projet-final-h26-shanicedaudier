import HttpError from '../util/http-error.js';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { Artiste } from '../models/artistes.js';
import { User } from '../models/users.js';

//getArtistes
const getArtistes = async (req, res, next) => {
  let artistes;
  try {
    artistes = await Artiste.find();
  }catch(err){
    console.log("Échec de l'opération sur la base de données", err);
    return next(new HttpError("Échec de l'opération sur la base de données", 500))
  }

  res.json({ artistes: artistes.map((t) => t.toObject({ getters: true })) });
};

//getById
const getArtistesById = async (req, res, next) => {
  const artisteId = req.params.id; 
  
  let artiste;
  try{
    artiste = await Artiste.findById(artisteId);
  }catch(err){
    console.log("Échec de l'opération sur la base de données", err);
    return next(new HttpError("Échec de l'opération sur la base de données", 500))
  }
  
  if (!artiste) {
    
    return next(new HttpError('Artiste non trouvé', 404));
  }
  
  res.json({ artiste: artiste.toObject({ getters: true }) }); 
};

//post
const createArtiste = async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return next(
      new HttpError('données saisies invalides valider votre payload', 422)
    );
  }
  const { name, category, songPop, image, description } = req.body;

  let user;
  const userId = req.userData.userId;
  
    try {
      user = await User.findById(userId);
    } catch (err){
      console.error(err);
        const error = new HttpError(
          'Error server',
          500
        );
        return next(error);
    }

  const createdArtiste = new Artiste({
    name,
    category,
    songPop,
    image,
    description
  });

  try{
    await createdArtiste.save();
  }catch (err){
    console.log("L'action sur la BD a échoué", err);
    return next(new HttpError("L'action sur la BD a échoué", 500))
  }

  res.status(201).json({ artiste: createdArtiste });
};

//put
const updateArtiste = async(req, res, next) => {
  const { name, category, songPop, image, description } = req.body;
  const artisteId = req.params.id;
  
  let updatedArtiste 
  try{
    updatedArtiste = await Artiste.findById(artisteId);
    updatedArtiste.name = name;
    updatedArtiste.category = category;
    updatedArtiste.songPop = songPop;
    updatedArtiste.image = image;
    updatedArtiste.description = description;
    await updatedArtiste.save();
  }catch (err){
    console.log("L'action sur la BD a échoué", err);
    return next(new HttpError("L'action sur la BD a échoué", 500))
  }

  res.status(200).json({ artiste: updatedArtiste });
};

//delete
const deleteArtiste = async (req, res, next) => {
  const artisteId = req.params.id;
  try{
    const artiste = await Artiste.findByIdAndDelete(artisteId);

    if(!artiste){
      return res.status(404).json({ message: 'Artiste non trouvé' });
    }
    return res.status(200).json({ message: 'Artiste supprimé' })
  }catch(err){
    console.log("Échec de l'opération sur la base de données", err);
    return next(new HttpError("Échec de l'opération sur la base de données", 500))
  }
 
};

export default {
  getArtistes,
  getArtistesById,
  createArtiste,
  updateArtiste,
  deleteArtiste,
};