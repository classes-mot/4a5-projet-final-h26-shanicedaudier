import mongoose from 'mongoose';

let isConnected = false;

export const connectMongo= async () => {
  if (isConnected) return;
  let uri = 'mongodb://localhost:27017/tpsynthesedb';
  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.log('Connexion MongoDB réussie');
  } catch (err) {
    console.error('Erreur de connexion MongoDB :', err.message);
    process.exit(1); 
  }
};
