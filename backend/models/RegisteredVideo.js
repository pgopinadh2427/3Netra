const mongoose = require('mongoose')

const MatchSchema = new mongoose.Schema({
  id: { type: String },
  platform: { type: String },
  uploader: { type: String },
  uploadDate: { type: String },
  views: { type: Number },
  action: { type: String, enum: ['blocked', 'monetized', 'tracked'] },
  status: { type: String, enum: ['active', 'disputed', 'resolved'] },
})

const FingerprintsSchema = new mongoose.Schema({
  videoHash: String,
  audioHash: String,
  totalFrames: Number,
  duration: String,
}, { _id: false })

const RegisteredVideoSchema = new mongoose.Schema({
  externalId: { type: String, unique: true, index: true },
  movieName: { type: String, required: true },
  productionHouse: { type: String, required: true },
  language: { type: String, required: true },
  fileName: { type: String, required: true },
  fileSize: { type: Number, required: true },
  uploadDate: { type: String },
  status: { type: String, enum: ['processing', 'active', 'ready'], default: 'processing' },
  fingerprints: { type: FingerprintsSchema, default: null },
  detectedMatches: { type: [MatchSchema], default: [] },
}, { timestamps: true })

module.exports = mongoose.models.RegisteredVideo || mongoose.model('RegisteredVideo', RegisteredVideoSchema)
