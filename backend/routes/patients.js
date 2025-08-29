import { Router } from "express";
import { getProfile, createOrUpdateProfile } from "../controllers/patientController.js";
import { protect, permit } from "../middleware/auth.js";

const r = Router();

r.get("/me", getProfile);
r.post("/me", createOrUpdateProfile);

export default r;
