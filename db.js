const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/chat', {});
const db = mongoose.connection;

// db.on('open', () => {
//   console.log('Connected to the database');
// });
// db.on('close', () => {
//   console.log('Connection closed');
// });

module.exports = mongoose;
