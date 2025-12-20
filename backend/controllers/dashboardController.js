const Scan = require('../models/Scan');
const Claim = require('../models/Claim');
const Movie = require('../models/Movie');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private
const getStats = async (req, res) => {
  try {
    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Get today's scans
    const todaysScans = await Scan.find({
      createdAt: { $gte: today, $lt: tomorrow }
    });

    // Calculate matches detected today
    let matchesDetected = 0;
    todaysScans.forEach(scan => {
      if (scan.scanResults && scan.scanResults.length > 0) {
        matchesDetected += scan.scanResults.length;
      }
    });

    // Get active claims (pending status)
    const activeClaims = await Claim.countDocuments({ status: 'pending' });

    // Get total movies
    const totalMovies = await Movie.countDocuments();

    // Calculate detection rate
    const totalScansToday = todaysScans.length;
    const detectionRate = totalScansToday > 0 ? ((matchesDetected / totalScansToday) * 100).toFixed(1) : 0;

    res.json({
      totalScansToday,
      matchesDetected,
      activeClaims,
      totalMovies,
      detectionRate: parseFloat(detectionRate)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getStats };
