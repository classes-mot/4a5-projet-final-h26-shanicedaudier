class HttpError extends Error {
  constructor(message, statusCode) {
    super(message); 
    this.statusCode = statusCode; // Définit le code de statut HTTP de l'erreur
  }
}

export default HttpError;
