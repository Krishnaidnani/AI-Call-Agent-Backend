const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  email: String,
  company: String,
  interactionHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Call' }],
  tags: [String],
  leadScore: Number,
  lastContact: Date
});

module.exports = mongoose.model('Customer', CustomerSchema);