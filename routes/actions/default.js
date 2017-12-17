const response = require("./responseUser");

const defaultResponse = (req, res, next) => {
  const answer = response(
    "El patron didnt teach me how to do that. You will have to ask him"
  );
  res.send(answer);
};

module.exports = defaultResponse;
