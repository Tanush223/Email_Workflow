const express = require("express");
const { getEmails,sendMail } =require ("../Controller/gmailController.js");
const authenticateJWT = require('./authMiddleware.js');
const router = express.Router();

router.get("/messages",authenticateJWT, getEmails);
router.post("/send",authenticateJWT, sendMail);

module.exports = router;
