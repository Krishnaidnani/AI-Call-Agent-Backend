const mongoose = require('mongoose');

const CallSchema = new mongoose.Schema({
  customerId: String,
  timestamp: { type: Date, default: Date.now },
  duration: Number,
  transcript: [{
    speaker: String,
    text: String,
    timestamp: Date
  }],
  outcome: String,
  sentiment: Number,
  nextActionDate: Date,
  audioRecorded: Boolean,
  transcriptionQuality: String,
});

module.exports = mongoose.model('Call', CallSchema);