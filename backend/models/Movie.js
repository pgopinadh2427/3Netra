const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  externalId: {
    type: String,
    index: true,
    unique: false,
  },
  movieName: {
    type: String,
    required: false
  },
  productionHouse: {
    type: String,
    required: false
  },
  language: {
    type: String,
    required: false
  },
  fileName: {
    type: String,
    required: false
  },
  fileSize: {
    type: Number,
    required: false
  },
  releaseYear: {
    type: Number,
    required: false
  },
  sourceUrl: {
    type: String,
    required: false
  },
  notes: {
    type: String,
    required: false
  },
  duration: {
    type: Number,
    required: false
  },
  detectedMatches: { type: mongoose.Schema.Types.Mixed, default: [] },
  registeredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  fingerprints: { type: mongoose.Schema.Types.Mixed, default: null },
  fingerprints: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },
  status: { type: String, enum: ['processing', 'registered', 'failed', 'active', 'ready'], default: 'processing' },
}, {
  timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema);
