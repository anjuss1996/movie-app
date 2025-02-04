const mongoose = require("mongoose");

const db = {};
db.mongoose = mongoose;
db.user = require("./user.model");
db.movie = require("./movie.model");
db.artist = require("./artist.model");
db.genre = require("./genre.model");

module.exports = db;
