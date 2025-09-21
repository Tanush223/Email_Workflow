const express = require("express");
const { addEvent }= require ("../Controller/calendarController.js");
const router = express.Router();

router.post("/add", addEvent);

module.exports = router;
