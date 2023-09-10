const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  date_joined: { type: Date, default: () => new Date() },
});

module.exports = mongoose.models.Users || mongoose.model("Users", userSchema);
