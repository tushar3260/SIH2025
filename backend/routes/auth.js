import { Router } from "express";
import { register, login } from "../controllers/authController.js";
import { registerValidation, loginValidation } from "../utils/validation.js";
import { runValidation } from "../middleware/validation.js";

const r = Router();

r.post("/register", registerValidation, runValidation, register);
r.post("/login", loginValidation, runValidation, login);

export default r;
