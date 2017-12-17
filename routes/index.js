var express = require("express");
var router = express.Router();
const actions = require("./actions");

router.post("/", actions.tramInfo);
router.post("/traminfo", actions.tramInfo);
module.exports = router;
