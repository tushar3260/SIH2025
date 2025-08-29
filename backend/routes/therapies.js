import { Router } from "express";
import { listTherapies, createTherapy } from "../controllers/therapyController.js";
import { protect, permit } from "../middleware/auth.js";
import { runValidation } from "../middleware/validation.js";
import { body } from "express-validator";

const r = Router();

r.get("/", listTherapies);
r.post("/", 
  body("name").notEmpty().withMessage("Name is required"),
  body("code").notEmpty().withMessage("Code is required"), 
  body("durationMin").isInt({min: 15}).withMessage("Duration must be at least 15 minutes"), // Fixed field name
  runValidation, // Make sure to add validation middleware
  createTherapy
);

export default r;
