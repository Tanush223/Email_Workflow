const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  accessToken: String,
  refreshToken: String,
  expiryDate: Date,
});

module.exports = mongoose.model("User", userSchema);
