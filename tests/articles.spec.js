const request = require("supertest");
const { app } = require("../server");
const jwt = require("jsonwebtoken");
const config = require("../config");
const mongoose = require("mongoose");
const mockingoose = require("mockingoose");
const Article = require("../api/articles/articles.model");
const User = require("../api/users/users.model");

describe("tester API articles", () => {
  let token;
  const MOCKUSER = {
    role: "admin"
  }
  const USER_ID = "fake";
  
  const MOCK_DATA_CREATED = {
    title: "hello",
    content: "contenu dispo",
    statut: "published",
  };
  const MOCK_DATA_CREATED_ARTICLE = {
    title: "hellooo",
    content: "contenu dispo",
    statut: "published",
  };
  const MOCK_ARTICLE = {
    title: "newtitre",
  };
  const MOCK_ARTICLE_MODIFIED = {
    _id: "649c5a1646ba58c661e833cd",
  title: "new titreee",
  content: "blablablabla",
  user: "646f17ea821f656362e7f1a8",
  statut: "published",
  };
  const MOCK_DELETE_USER = {

  }

  // avant chaque test
  beforeEach(() => {
    token = jwt.sign({ userId: USER_ID }, config.secretJwtToken);
    // permet de créer req.utilisateur pour valider la condition role "admin"
    mockingoose(User).toReturn(MOCKUSER, "findOne"); 
    mockingoose(Article).toReturn(MOCK_DATA_CREATED_ARTICLE, "save");
    mockingoose(Article).toReturn(MOCK_ARTICLE_MODIFIED, "findOneAndUpdate");
  });

  test("[Article] Création", async () => {
    const res = await request(app)
      .post("/api/articles")
      .send(MOCK_DATA_CREATED)
      .set("x-access-token", token);
      console.log(res.body)
    expect(res.status).toBe(201);
    expect(res.body.statut).toBe("published");
  });

  test("[Article] MAJ", async () => {
    const res = await request(app)
      .put("/api/articles/649c5a1646ba58c661e833cd")
      .send(MOCK_ARTICLE)
      .set("x-access-token", token);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(MOCK_ARTICLE_MODIFIED);
  });

  test("[Article] Delete", async () => {
    const res = await request(app)
      .delete("/api/articles/649c5a1646ba58c661e833cd")
      .send(MOCK_ARTICLE)
      .set("x-access-token", token);
    expect(res.status).toBe(204);
  });

  

  afterEach(() => {
    jest.restoreAllMocks();

  });
});
