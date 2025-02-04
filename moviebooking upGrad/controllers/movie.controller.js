const Movie = require("../models/movie.model");

// Controller to fetch movies

exports.findAllMovies = async (req, res) => {
    try {
        const { status, title, genres, artists, start_date, end_date } = req.query;

        let filter = {};
        if (status) {
            filter.published = status.toUpperCase() === "PUBLISHED";
        }
        if (title) {
            filter.title = new RegExp(title, "i");
        }
        if (genres) {
            filter.genres = { $in: genres.split(",") };
        }
        if (artists) {
            filter["artists.name"] = { $in: artists.split(",") };
        }
        if (start_date && end_date) {
            filter.releaseDate = { $gte: new Date(start_date), $lte: new Date(end_date) };
        }

        const movies = await Movie.find(filter);
        res.json({
            movies: movies
        });

    } catch (error) {
        res.status(500).json({ message: "Error retrieving movies", error });
    }
};

exports.findOne = async (req, res) => {
    try {
        const { id } = req.params;

        const movie = await Movie.findOne({ movieid: Number(id) });

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        res.json(movie);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving movie", error });
    }
};

// GET /movies/:id/shows
exports.findShows = async (req, res) => {
    try {
        const { movieId } = req.params;
        const movie = await Movie.findOne({ movieid: Number(movieId) });
        if (!movie.shows.length) {
            return res.status(404).json({ message: "No shows found for this movie" });
        }
        res.json(movie.shows);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving shows", error });
    }
};

