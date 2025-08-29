import mongoose from "mongoose";

const schema = new mongoose.Schema({
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", required:true, unique:true },
  therapistNotes: String,
  patientFeedback: String,
  startedAt: Date,
  endedAt: Date
}, { timestamps: true });

export default mongoose.model("Session", schema);
