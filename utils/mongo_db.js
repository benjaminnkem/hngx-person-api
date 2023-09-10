const mongoose = require("mongoose");

const connectToDB = async () => mongoose.connect("mongodb://localhost:27017/hngx" || process.env.MONGODB_URI);

module.exports = connectToDB;
