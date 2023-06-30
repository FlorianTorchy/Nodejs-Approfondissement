const { server } = require("../server");
const config = require("../config");
const mongoose = require("mongoose");

mongoose.connect(config.mongoUri);

const db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});

db.on("open", () => {
  console.log("Database connected");
});

server.listen(config.port, () => {
  console.log("app running");
  console.log("http://localhost:"+ config.port)//
});
console.error(new Error("Ceci est une erreur générée à des fins de test."));