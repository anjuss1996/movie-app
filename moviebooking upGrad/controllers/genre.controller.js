const Genre = require("../models/genre.model");

// Controller to fetch all genres
exports.findAllGenres = async (req, res) => {
    try {
        const genres = await Genre.find();
        res.json({ genres: genres });
    } catch (err) {
        res.status(500).json({ message: "Error fetching genres", error: err });
    }
};
