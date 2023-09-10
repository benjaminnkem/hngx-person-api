const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  gender: { type: String, default: "Male" },
  age: { type: Number, default: () => Math.floor(Math.random() * 50) },
  height: { type: Number, default: Math.floor(Math.random() * 10) },
  date_joined: { type: Date, default: () => new Date() },
});

module.exports = mongoose.models.Users || mongoose.model("Users", userSchema);
