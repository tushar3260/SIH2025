import { Router } from "express";
import { getProfile, createOrUpdateProfile } from "../controllers/patientController.js";
import { protect, permit } from "../middleware/auth.js";

const r = Router();

r.get("/me", protect, permit("patient"), getProfile);
r.post("/me", protect, permit("patient"), createOrUpdateProfile);

export default r;
