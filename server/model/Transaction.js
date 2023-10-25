const mongoose = require("mongoose");

const TransSchema = new mongoose.Schema({
  userId: { type: String, required: true},
  date: { type: Date, default: Date.now()},
  cost: { type: Number, required: true},
  merchant: { type: String, required: true},
  category: { type: String, required: true},
});
module.exports = mongoose.model("Transaction", TransSchema);