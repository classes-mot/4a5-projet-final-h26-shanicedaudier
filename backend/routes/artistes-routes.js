import express from 'express';
import { check } from 'express-validator';
import checkAuth from '../middleware/check-auth.js';
import artistesController from '../controllers/artistes-controller.js';

const router = express.Router();

//Middleware pour obtenir toutes les jeux
router.get('/', artistesController.getArtistes);

router.get('/:id', artistesController.getArtistesById);

router.use(checkAuth);

router.post(
  '/',
  [
    check('name').not().isEmpty(),
    check('category').not().isEmpty(),
    check('songPop').not().isEmpty(),
    check('image').optional(),
    check('description').not().isEmpty(),
  ],
  artistesController.createArtiste
);

router.patch('/:id', artistesController.updateArtiste);

router.delete('/:id', artistesController.deleteArtiste);

export default router;
