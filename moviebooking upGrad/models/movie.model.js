const mongoose = require("mongoose");

const ArtistSchema = new mongoose.Schema({
    artistid: Number,
    first_name: String,
    last_name: String,
    wiki_url: String,
    profile_url: String,
    movies: Array
});

const ShowSchema = new mongoose.Schema({
    id: Number,
    theatre: {
        name: String,
        city: String
    },
    language: String,
    show_timing: String,
    available_seats: String,
    unit_price: Number
});

const MovieSchema = new mongoose.Schema({
    movieid: Number,
    title: String,
    published: Boolean,
    released: Boolean,
    poster_url: String,
    release_date: String,
    publish_date: String,
    artists: [ArtistSchema],
    genres: [String],
    duration: Number,
    critic_rating: Number,
    trailer_url: String,
    wiki_url: String,
    story_line: String,
    shows: [ShowSchema]
});

const Movie = mongoose.model("Movie", MovieSchema);
module.exports = Movie;
