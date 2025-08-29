import { Router } from "express";
import { myAppointments, slots, book, cancel } from "../controllers/appointmentController.js";
import { protect, permit } from "../middleware/auth.js";
import { runValidation } from "../middleware/validation.js";
import { bookValidation } from "../utils/validation.js";
import { query } from "express-validator";

const r = Router();

r.get("/me", protect, permit("patient"), myAppointments);

r.get("/slots", protect,
  query("practitionerId").notEmpty(),
  query("therapyId").notEmpty(),
  query("from").notEmpty(),
  query("to").notEmpty(),
  runValidation, slots);

r.post("/", protect, permit("patient"), bookValidation, runValidation, book);

r.post("/:id/cancel", protect, cancel);

export default r;
