import mongoose from "mongoose"

const TransSchema = new mongoose.Schema({
  userId: { type: String, required: true},
  date: { type: Date, default: Date.now()},
  cost: { type: Number, required: true},
  merchant: { type: String, required: true},
  category: { type: String, required: true},
});

const Transaction = mongoose.model('Transaction', TransSchema);

export default Transaction;