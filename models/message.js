const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const messageSchema = new mongoose.Schema({
  content: String,
  author: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);
