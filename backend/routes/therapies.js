import { Router } from "express";
import { listTherapies, createTherapy } from "../controllers/therapyController.js";
import { protect, permit } from "../middleware/auth.js";
import { runValidation } from "../middleware/validation.js";
import { body } from "express-validator";

const r = Router();

r.get("/", listTherapies);
r.post("/", protect, permit("admin"), body("name").notEmpty(), body("durationMin").isInt({min:15}), runValidation, createTherapy);

export default r;
