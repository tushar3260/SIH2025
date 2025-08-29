import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  code: { type: String, required:true, unique:true },
  durationMin: { type: Number, required: true }, // duration in minutes
  price: Number,
  description: String
}, { timestamps: true });

export default mongoose.model("Therapy", schema);
