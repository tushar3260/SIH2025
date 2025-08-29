import express from "express";
import {
  createRecord,
  getRecords,
  getRecordById,
  updateRecord,
  deleteRecord,
} from "../controllers/recordController.js";

const router = express.Router();

// Create new record
router.post("/", createRecord);

// Get all records
router.get("/", getRecords);

// Get record by ID
router.get("/:id", getRecordById);

// Update record
router.put("/:id", updateRecord);

// Delete record
router.delete("/:id", deleteRecord);

export default router;
3