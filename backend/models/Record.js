import mongoose from "mongoose";

const schema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  therapy: { type: mongoose.Schema.Types.ObjectId, ref: "Therapy", required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // optional if only doctors create records
  sessionDate: { type: Date, required: true },
  notes: String,
  status: {
    type: String,
    enum: ["Scheduled", "Completed", "Cancelled"],
    default: "Scheduled"
  },
  payment: {
    amount: Number,
    paid: { type: Boolean, default: false },
    method: { type: String, enum: ["Cash", "Card", "UPI", "Insurance"], default: "Cash" }
  }
}, { timestamps: true });

export default mongoose.model("Record", schema);
