const UnauthorizedError = require("../errors/unauthorized");
const jwt = require("jsonwebtoken");
const config = require("../config");
const usersService = require("../api/users/users.service");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      throw "not token";
    }
    const decoded = jwt.verify(token, config.secretJwtToken);
    req.user = decoded;
    // on récupère les informations utilisateur qu'on sauvegarde dans req.utilisateur pour le droit à la modif/suppression des articles
    req.utilisateur = await usersService.get(req.user.userId);
    next();
  } catch (message) {
    next(new UnauthorizedError(message));
  }
};
