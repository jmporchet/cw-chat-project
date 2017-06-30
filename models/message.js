const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const userSchema = new mongoose.Schema({
  content: String,
  author: String
});

module.exports = mongoose.model('Message', userSchema);
