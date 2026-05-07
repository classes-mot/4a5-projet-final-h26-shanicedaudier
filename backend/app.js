import express from 'express';
import { connectMongo } from './util/bd.js';
import cors from 'cors';
import errorHandler from "./handler/error-handler.js";
import artistesRoutes from './routes/artistes-routes.js';
import usersRoutes from './routes/users-routes.js';

const PORT = process.env.PORT || 3000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/tpsynthesedb";
//Se connecter à MongoDB
await connectMongo();

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api/artistes', artistesRoutes);

app.use('/api/users', usersRoutes);

app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`serveur écoute au ${PORT}`);
});



