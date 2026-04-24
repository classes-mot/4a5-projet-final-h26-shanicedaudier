import jwt from 'jsonwebtoken';
import { User } from '../models/users.js';
import HttpError from '../util/http-error.js';

const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return next(new HttpError('Erreur serveur.', 500));
  }

  if (existingUser) {
    return res.status(422).json({
      message: 'Cet email est déjà utilisé.'
    });
  }

  const createdUser = new User({
    name,
    email,
    password
  });

  try {
    await createdUser.save();
  } catch (err) {
    return next(new HttpError('Authentification échoué.', 500));
  }

  res.status(201).json({
    userId: createdUser.id,
    email: createdUser.email
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let identifiedUser;

  try {
    identifiedUser = await User.findOne({ email });
  } catch (err) {
    return next(new HttpError('Erreur serveur.', 500));
  }

  if (!identifiedUser || identifiedUser.password !== password) {
    return res.status(401).json({
      message: 'Identification échouée.'
    });
  }

  let token;

  try {
    token = jwt.sign(
      {
        userId: identifiedUser.id,
        email: identifiedUser.email
      },
      'shuSH2!', 
      { expiresIn: '1h' }
    );
  } catch (err) {
    return next(new HttpError('Erreur lors de la génération du token.', 500));
  }

  res.status(200).json({
    userId: identifiedUser.id,
    email: identifiedUser.email,
    token: token
  });
};

export default {
    registerUser,
    login
};
