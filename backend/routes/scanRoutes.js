const express = require('express');
const multer = require('multer');
const { scanVideo, getScanResults, getScanById } = require('../controllers/scanController');
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

router.post('/', protect, upload.single('video'), scanVideo);
router.get('/results', protect, getScanResults);
router.get('/:id', protect, getScanById);

module.exports = router;
