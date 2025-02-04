const express = require("express");
const router = express.Router();
const artistController = require("../controllers/artist.controller.js");

// Define the route to get all artists
router.get("/", artistController.findAllArtists);

module.exports = router;
