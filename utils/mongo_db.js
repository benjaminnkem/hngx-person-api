const mongoose = require("mongoose");

const connectToDB = async () => mongoose.connect(process.env.MONGODB_URI);

module.exports = connectToDB;
