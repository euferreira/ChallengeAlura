const bodyParser = require("body-parser");
const receitas = require("./receitaRoute");

module.exports = (app) => {
  app
    .use(
      bodyParser.json(),
      bodyParser.urlencoded({ extended: true }),
      receitas
    );

  app.get("/", (req, res, next) => res.status(200).send({ sending: "OK" }));
};
