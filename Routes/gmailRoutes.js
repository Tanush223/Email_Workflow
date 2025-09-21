const express = require("express");
const { getEmails,sendMail } =require ("../Controller/gmailController.js");
const router = express.Router();

router.get("/messages", getEmails);
router.post("/send", sendMail);

module.exports = router;
