const express = require("express");
const { getEvent, addEvent } = require("../controller/eventController");

const router = express.Router();

router.get("/", getEvent);

router.post("/", addEvent);

module.exports = router;