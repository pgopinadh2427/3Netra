const Claim = require('../models/Claim');

// @desc    Get user claims
// @route   GET /api/claims
// @access  Private
const getClaims = async (req, res) => {
  try {
    const claims = await Claim.find({ user: req.user.id });
    res.json(claims);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new claim
// @route   POST /api/claims
// @access  Private
const createClaim = async (req, res) => {
  const { title, description, documents } = req.body;

  try {
    const claim = await Claim.create({
      user: req.user.id,
      title,
      description,
      documents: documents || []
    });

    res.status(201).json(claim);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update claim
// @route   PUT /api/claims/:id
// @access  Private
const updateClaim = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id);

    if (!claim) {
      return res.status(404).json({ message: 'Claim not found' });
    }

    // Check if user owns the claim
    if (claim.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedClaim = await Claim.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedClaim);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getClaims, createClaim, updateClaim };