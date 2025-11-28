const express = require("express");
const { addEvent }= require ("../Controller/calendarController.js");
const authenticateJWT = require('./authMiddleware.js');
const router = express.Router();

router.post("/add",authenticateJWT, addEvent);

module.exports = router;
