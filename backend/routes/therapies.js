import { Router } from "express";
import { listTherapies, createTherapy,getTherapyByTherapyId } from "../controllers/therapyController.js";
import { protect, permit } from "../middleware/auth.js";
import { runValidation } from "../middleware/validation.js";
import { body } from "express-validator";

const r = Router();

r.get("/", listTherapies);
r.get("/:therapyId", getTherapyByTherapyId);
r.post("/",  body("name").notEmpty(), body("durationMin").isInt({min:15}), createTherapy);

export default r;
