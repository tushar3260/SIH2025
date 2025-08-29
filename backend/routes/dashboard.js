import { Router } from "express";
import { stats } from "../controllers/dashboardController.js";
import { protect, permit } from "../middleware/auth.js";

const r = Router();

r.get("/stats", protect, permit("admin"), stats);

export default r;
