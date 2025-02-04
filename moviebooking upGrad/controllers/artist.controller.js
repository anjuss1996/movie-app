const Artist = require("../models/artist.model");

// Controller to fetch all artists
exports.findAllArtists = async (req, res) => {
    try {
        const artists = await Artist.find();
        res.status(200).json(artists);
    } catch (error) {
        res.status(500).json({ message: "Error fetching artists", error: error.message });
    }
};
