import mongoose from "mongoose";

const schema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index:true },
  practitioner: { type: mongoose.Schema.Types.ObjectId, ref: "Practitioner", required: true, index:true },
  therapy: { type: mongoose.Schema.Types.ObjectId, ref: "Therapy", required: true },
  start: { type: Date, required: true, index:true },
  end: { type: Date, required: true, index:true },
  notes: String,
  status: { type: String, enum:["pending","confirmed","completed","cancelled"], default: "pending", index:true }
}, { timestamps: true });

schema.index({ practitioner:1, start:1, end:1 });

export default mongoose.model("Appointment", schema);
