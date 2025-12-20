const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  videoFileName: {
    type: String,
    required: true
  },
  videoFileSize: {
    type: Number,
    required: true
  },
  scanResults: [{
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie',
      required: true
    },
    confidence: {
      type: Number,
      min: 0,
      max: 100,
      required: true
    }
  }],
  status: {
    type: String,
    enum: ['processing', 'completed', 'failed'],
    default: 'processing'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Scan', scanSchema);
