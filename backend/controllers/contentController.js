const Movie = require('../models/Movie');
const crypto = require('crypto');

// @desc    Register new movie content
// @route   POST /api/content/register
// @access  Private
const registerContent = async (req, res) => {
  const { movieName, productionHouse, language } = req.body;

  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No video file uploaded' });
    }

    // Generate fingerprint from file buffer (placeholder - in real implementation, use video processing)
    const fingerprint = crypto.createHash('sha256').update(req.file.buffer).digest('hex');

    const movie = await Movie.create({
      externalId: `REG-${Date.now()}`,
      movieName,
      productionHouse,
      language,
      fileName: req.file.originalname,
      fileSize: req.file.size,
      registeredBy: req.user.id,
      fingerprints: [fingerprint],
      status: 'registered'
    });

    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all movies
// @route   GET /api/content/movies
// @access  Private
const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find({}).populate('registeredBy', 'name email');
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get movie by ID
// @route   GET /api/content/movies/:id
// @access  Private
const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate('registeredBy', 'name email');

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerContent, getMovies, getMovieById };
