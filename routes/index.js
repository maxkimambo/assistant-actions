var express = require("express");
var router = express.Router();
const actions = require("./actions");

router.post("/", actions.decide);
// router.post("/traminfo", actions.tramInfo);
module.exports = router;
