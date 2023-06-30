const UnauthorizedError = require("../../errors/unauthorized");
const utilisateurRole = require("../users/users.controller");
const usersService = require("../users/users.service");
const articlesService = require("./articles.service");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const NotFoundError = require("../../errors/not-found");

class ArticlesController {
  async create(req, res, next) {
    // console.log(req)
    try {
      // Je récupère l'ID de l'utilisateur connecté et je le sauvegarde dans req.body.user
      if (req.body.user != null) {
        req.body.user = req.user.userId;
      }
      const article = await articlesService.create(req.body);
      req.io.emit("article:créé", article);
      res.status(201).json(article);
    } catch (err) {
      next(err);
    }
  }
  async update(req, res, next) {
    try {
      // l'utilisateur doit être admin
      if (req.utilisateur.role == "admin") {
        const id = req.params.id;
        const data = req.body;
        const articleModified = await articlesService.update(id, data);
        req.io.emit("article:modifié", articleModified);
        res.status(200).json(articleModified);
      } else {
        console.log("vous n'êtes pas admin");
      }
    } catch (err) {
      next(err);
    }
  }
  async delete(req, res, next) {
    try {
      // l'utilisateur doit être admin
      if (req.utilisateur.role == "admin") {
        const id = req.params.id;
        await articlesService.delete(id);
        req.io.emit("article:delete", { id });
        res.status(204).send();
      } else {
        console.log("vous n'êtes pas admin");
        throw new UnauthorizedError();
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ArticlesController();
