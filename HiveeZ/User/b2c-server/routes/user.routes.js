const express = require("express");
const { registerUser, verifyOtp } = require("../controllers/user.controller");

const router = express.Router();

router.post("/register", registerUser)
router.post("/verify", verifyOtp);

module.exports = router;