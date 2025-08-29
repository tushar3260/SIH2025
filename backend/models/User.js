import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required:true, unique:true, index:true },
  phone: { type: String },
  role: { type: String, enum:["patient","practitioner","admin"], default: "patient" },
  passwordHash: { type: String, required: true }
}, { timestamps: true });

schema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.passwordHash);
};

export default mongoose.model("User", schema);
