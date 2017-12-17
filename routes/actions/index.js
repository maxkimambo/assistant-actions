const tramInfo = require("./tram.info");
const defaultResponse = require("./default");
const joke = require("./joke");

const decide = (req, res, next) => {
  const ACTION = req.body.result.action;
  console.log(ACTION);
  switch (ACTION) {
    case "input.tram":
      return tramInfo(req, res, next);
    case "input.joke":
      return joke(req, res, next);
    default:
      return defaultResponse;
  }
};

module.exports = { decide };
