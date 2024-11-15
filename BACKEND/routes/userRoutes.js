const express = require("express");
const router = express.Router();
const { goHome, signup, login } = require("../controllers/user.controller");

router.get("/", goHome);
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
