const express = require("express");
const { findAllMovies, findOne, findShows } = require("../controllers/movie.controller");

const router = express.Router();

// GET /api/movies?status=PUBLISHED
router.get("/", findAllMovies);

// GET /api/movies/:id
router.get("/:id", findOne);

// GET /movies/:id/shows
router.get("/:movieId/shows", findShows);

module.exports = router;
