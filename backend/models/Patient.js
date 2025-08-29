import mongoose from "mongoose";

const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  dob: Date,
  gender: String,
  medicalHistory: [String]
}, { timestamps: true });

export default mongoose.model("Patient", schema);
