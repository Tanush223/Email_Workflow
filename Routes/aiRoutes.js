const express = require("express");
const { getReplySuggestions, getEventFromEmail }= require ("../Controller/aiController.js");
const authenticateJWT = require('./authMiddleware.js');
const router = express.Router();

router.post("/reply",authenticateJWT, getReplySuggestions);       
router.post("/extract-event", authenticateJWT,getEventFromEmail); 

module.exports = router;
