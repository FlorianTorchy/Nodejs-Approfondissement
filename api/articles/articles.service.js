const Article = require("./articles.model");

class ArticleService {
  create(data) {
    const article = new Article(data); //création instance classe Article
    return article.save(); //retourne l'enregistrement de l'article
  }
  update(id, data) {
    return Article.findByIdAndUpdate(id, data, { new: true });
  }
  delete(id) {
    return Article.deleteOne({ _id: id });
  }

  articlesUser(userId) {
    return Article.find({ user: userId }).populate("user", "-password");
  }
}

module.exports = new ArticleService();
