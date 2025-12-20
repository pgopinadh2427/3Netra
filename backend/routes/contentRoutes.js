const express = require('express');
const multer = require('multer');
const { registerContent, getMovies, getMovieById } = require('../controllers/contentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Configure multer for video uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 * 1024 }, // 10GB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only video files are allowed'));
    }
  }
});

router.post('/register', protect, upload.single('video'), registerContent);
router.get('/movies', protect, getMovies);
router.get('/movies/:id', protect, getMovieById);

module.exports = router;
