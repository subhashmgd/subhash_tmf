const mongoose = require('mongoose')
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL); // connect to our database

// db.on('error', console.error.bind(console, 'connection error:'));
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))

module.exports = mongoose