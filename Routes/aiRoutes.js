const express = require("express");
const { getReplySuggestions, getEventFromEmail }= require ("../Controller/aiController.js");

const router = express.Router();

router.post("/reply", getReplySuggestions);       
router.post("/extract-event", getEventFromEmail); 

module.exports = router;
