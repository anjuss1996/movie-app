const express = require("express");
const { findAllGenres } = require("../controllers/genre.controller");


const router = express.Router();

// Dummy response for genres
router.get("/", findAllGenres);

module.exports = router;
