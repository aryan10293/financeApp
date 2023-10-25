const mongoose = require("mongoose");

const TransSchema = new mongoose.Schema({
  userId: { type: String, required: true},
  date: { type: Date, default: Data.now()},
  cost: { type: Number, required: true},
  merchant: { type: String, required: true},
  catagory: { type: String, required: true},
});
module.exports = mongoose.model("Transaction", TransSchema);