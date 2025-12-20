const Scan = require('../models/Scan');
const Movie = require('../models/Movie');

// @desc    Scan video for copyright matches
// @route   POST /api/scan
// @access  Private
const scanVideo = async (req, res) => {
  const { videoFileName, videoFileSize } = req.body;

  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No video file uploaded' });
    }

    // Create scan record
    const scan = await Scan.create({
      user: req.user.id,
      videoFileName: req.file.originalname,
      videoFileSize: req.file.size,
      status: 'processing'
    });

    // Simulate scanning process (in real implementation, this would be video processing)
    setTimeout(async () => {
      try {
        // Get all movies for matching (in real implementation, use fingerprint matching)
        const movies = await Movie.find({}).limit(2); // Simulate finding 2 matches

        const scanResults = movies.map(movie => ({
          movie: movie._id,
          confidence: Math.floor(Math.random() * 40) + 60 // Random confidence 60-99%
        }));

        await Scan.findByIdAndUpdate(scan._id, {
          scanResults,
          status: 'completed'
        });
      } catch (error) {
        await Scan.findByIdAndUpdate(scan._id, { status: 'failed' });
      }
    }, 5000); // 5 second delay

    res.status(201).json(scan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user scan results
// @route   GET /api/scan/results
// @access  Private
const getScanResults = async (req, res) => {
  try {
    const scans = await Scan.find({ user: req.user.id }).populate('scanResults.movie');
    res.json(scans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get scan by ID
// @route   GET /api/scan/:id
// @access  Private
const getScanById = async (req, res) => {
  try {
    const scan = await Scan.findById(req.params.id).populate('scanResults.movie');

    if (!scan) {
      return res.status(404).json({ message: 'Scan not found' });
    }

    // Check if user owns the scan
    if (scan.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(scan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { scanVideo, getScanResults, getScanById };
