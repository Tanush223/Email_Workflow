const express = require("express");
const { loginWithGoogle, callback } = require("../Controller/authController");
const router = express.Router();

router.get("/google", loginWithGoogle);
router.get("/callback", callback);

module.exports = router;
