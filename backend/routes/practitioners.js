import { Router } from "express";
import { listPractitioners, createPractitioner, updateAvailability } from "../controllers/practitionerController.js";
import { protect, permit } from "../middleware/auth.js";
import { runValidation } from "../middleware/validation.js";
import { body } from "express-validator";

const r = Router();

r.get("/", listPractitioners);
r.post("/",   body("user").notEmpty(), runValidation, createPractitioner);
r.put("/:id/availability", protect, permit("admin","practitioner"), body("availability").isArray(),  updateAvailability);

export default r;
