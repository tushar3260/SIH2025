import { Router } from "express";
import { myAppointments, slots, book, cancel,getPatientsByDoctorId } from "../controllers/appointmentController.js";
import { protect, permit } from "../middleware/auth.js";
import { runValidation } from "../middleware/validation.js";
import { bookValidation } from "../utils/validation.js";
import { query } from "express-validator";

const r = Router();

// Patient ke apne appointments
r.get("/me/:userId", myAppointments);
r.get("/:id", getPatientsByDoctorId);
// 
// Practitioner ke slots
r.get(
  "/slots",
  
  query("practitionerId").notEmpty(),
  query("therapyId").notEmpty(),
  query("from").notEmpty(),
  query("to").notEmpty(),
  
  slots
);

// Book new appointment
r.post("/",  book);

// Cancel appointment
r.post("/:id/cancel",  cancel);

export default r;
