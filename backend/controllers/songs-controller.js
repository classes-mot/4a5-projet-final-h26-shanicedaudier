import HttpError from '../util/http-error.js';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { Game } from '../models/games.js';
import { User } from '../models/users.js';

//getGames
const getGames = async (req, res, next) => {
  let games;
  try {
    games = await Game.find();
  }catch(err){
    console.log("Échec de l'opération sur la base de données", err);
    return next(new HttpError("Échec de l'opération sur la base de données", 500))
  }

  res.json({ games: games.map((t) => t.toObject({ getters: true })) });
};

//getById
const getGamesById = async (req, res, next) => {
  const gameId = req.params.id; 
  
  let game;
  try{
    game = await Game.findById(gameId);
  }catch(err){
    console.log("Échec de l'opération sur la base de données", err);
    return next(new HttpError("Échec de l'opération sur la base de données", 500))
  }
  
  if (!game) {
    
    return next(new HttpError('Jeu non trouvée', 404));
  }
  
  res.json({ game: game.toObject({ getters: true }) }); 
};

//post
const createGame = async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return next(
      new HttpError('données saisies invalides valider votre payload', 422)
    );
  }
  const { titre, categorie, nombreJoueurs, duree } = req.body;

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

  const createdGame = new Game({
    titre,
    categorie,
    nombreJoueurs,
    duree,
  });

  try{
    await createdGame.save();
  }catch (err){
    console.log("L'action sur la BD a échoué", err);
    return next(new HttpError("L'action sur la BD a échoué", 500))
  }

  res.status(201).json({ game: createdGame });
};

//put
const updateGame = async(req, res, next) => {
  const { titre, categorie, nombreJoueurs, duree } = req.body;
  const gameId = req.params.id;
  
  let updatedGame 
  try{
    updatedGame = await Game.findById(gameId);
    updatedGame.titre = titre;
    updatedGame.categorie = categorie;
    updatedGame.nombreJoueurs = nombreJoueurs;
    updatedGame.duree = duree;
    await updatedGame.save();
  }catch (err){
    console.log("L'action sur la BD a échoué", err);
    return next(new HttpError("L'action sur la BD a échoué", 500))
  }

  res.status(200).json({ game: updatedGame });
};

//delete
const deleteGame = async (req, res, next) => {
  const gameId = req.params.id;
  try{
    const game = await Game.findByIdAndDelete(gameId);

    if(!game){
      return res.status(404).json({ message: 'Jeu non trouvée' });
    }
    return res.status(200).json({ message: 'Jeu supprimée' })
  }catch(err){
    console.log("Échec de l'opération sur la base de données", err);
    return next(new HttpError("Échec de l'opération sur la base de données", 500))
  }
 
};

export default {
  getGames,
  getGamesById,
  createGame,
  updateGame,
  deleteGame,
};