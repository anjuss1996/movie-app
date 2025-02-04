const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
    artistid: { type: Number, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    wiki_url: { type: String, required: true },
    profile_url: { type: String, required: true },
    movies: { type: [String], default: [] }
});

const Artist = mongoose.model("Artist", artistSchema, "artists");
module.exports = Artist;
