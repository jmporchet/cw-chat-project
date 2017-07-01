const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const messageSchema = new mongoose.Schema({
  content: String,
  author: String
});

module.exports = mongoose.model('Message', messageSchema);
