const express = require('express');
const router = express.Router();

const publicController = require('../controllers/publicController');
const { protect } = require('../middleware/authMiddleware');

router.get('/registered-videos', publicController.listRegisteredVideos);
router.get('/registered-videos/:id', publicController.getRegisteredVideo);
router.post('/registered-videos', publicController.createRegisteredVideo);
router.post('/registered-videos/:id/matches', publicController.addMatch);
router.post('/migrate-external-ids', protect, publicController.migrateExternalIds);

module.exports = router;
module.exports = router
