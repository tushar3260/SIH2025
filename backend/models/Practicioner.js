import mongoose from "mongoose";

/** Simple weekly availability template */
const slotSchema = new mongoose.Schema({
  start: String, // "09:00"
  end: String    // "13:00"
}, { _id: false });

const availabilitySchema = new mongoose.Schema({
  weekday: { type: Number, min:0, max:6, required:true }, // 0 Sun .. 6 Sat
  slots: [slotSchema]
}, { _id: false });

const breakSchema = new mongoose.Schema({
  date: Date,
  start: String,
  end: String,
  reason: String
}, { _id: false });

const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  specialty: [String],
  availability: [availabilitySchema],
  breaks: [breakSchema]
}, { timestamps: true });

export default mongoose.model("Practitioner", schema);
