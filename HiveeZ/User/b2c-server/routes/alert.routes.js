const express = require("express");
const { createAlert, getAlerts } = require("../controllers/alert.controller");

const router = express.Router();

router.post("/create", createAlert)
router.get("/", getAlerts)

module.exports = router;