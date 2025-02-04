const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8085;

app.use(cors());

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("DB Connection Error:", err));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Upgrad Movie booking application development." });
});

// Routes
const authRoutes = require("./routes/user.routes");
app.use("/api/auth", authRoutes);
const genreRoutes = require("./routes/genre.routes");
app.use("/api/genres", genreRoutes);
const artistRoutes = require("./routes/artist.routes");
app.use("/api/artists", artistRoutes);
const moviesRoutes = require("./routes/movie.routes");
app.use("/api/movies", moviesRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
