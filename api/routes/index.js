const bodyParser = require("body-parser");
const receitas = require("./receitaRoute");
const despesas = require('./despesaRoute');

module.exports = (app) => {
  app
    .use(
      bodyParser.json(),
      bodyParser.urlencoded({ extended: true }),
      receitas, despesas
    );

  app.get("/", (req, res) => res.status(200).send({ sending: "OK" }));
};
