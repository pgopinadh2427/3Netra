const express = require('express');
const { getClaims, createClaim, updateClaim } = require('../controllers/claimController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getClaims);
router.post('/', protect, createClaim);
router.put('/:id', protect, updateClaim);

module.exports = router;