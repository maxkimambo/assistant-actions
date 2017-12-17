const response = require("./responseUser");

const defaultResponse = (req, res, next) => {
  const answer = response("Insert something funny here");
  res.send(answer);
};

module.exports = defaultResponse;
