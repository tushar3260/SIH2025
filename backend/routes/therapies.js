import { Router } from "express";
import { listTherapies, createTherapy,getTherapyByTherapyId,getTherapiesByUserId,getTherapiesByPractitionerId } from "../controllers/therapyController.js";
import { protect, permit } from "../middleware/auth.js";
import { runValidation } from "../middleware/validation.js";
import { body } from "express-validator";

const r = Router();

r.get("/", listTherapies);
r.get("/user/:userId", getTherapiesByUserId);
r.get("/practitioner/:practitionerId", getTherapiesByPractitionerId);
r.get("/:therapyId", getTherapyByTherapyId);
r.post("/", createTherapy);

export default r;
