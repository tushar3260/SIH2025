import Record from "../models/Record.js";
import Patient from "../models/Patient.js";
import Therapy from "../models/Therapy.js";

// Create new Record

import Practitioner from "../models/Practicioner.js"; // doctor validation



import mongoose from "mongoose";


import User from "../models/User.js";  // <- User model import karna zaroori hai

export const createRecord = async (req, res) => {
    try {
        console.log("===== CREATE RECORD START =====");
        console.log("Request Body:", req.body);

        const { patient, therapy, doctor, sessionDate, notes, status, payment } = req.body;

        // Check for missing required fields
        if (!patient || !therapy || !doctor || !sessionDate || !status) {
            console.log("Missing required fields");
            return res.status(400).json({ message: "Patient, therapy, doctor, sessionDate, and status are required" });
        }

        // Convert IDs to ObjectId
        const patientId = mongoose.Types.ObjectId.isValid(patient) ? new mongoose.Types.ObjectId(patient) : null;
        const therapyId = mongoose.Types.ObjectId.isValid(therapy) ? new mongoose.Types.ObjectId(therapy) : null;
        const doctorId = mongoose.Types.ObjectId.isValid(doctor) ? new mongoose.Types.ObjectId(doctor) : null;

        // Validate patient, therapy & doctor exist
        const [patientExists, therapyExists, doctorExists] = await Promise.all([
            User.findOne({ _id: patientId, role: "patient" }),   // <- yaha change
            Therapy.findById(therapyId),
            Practitioner.findById(doctorId)
        ]);

        if (!patientExists) {
            console.log("Patient not found");
            return res.status(404).json({ message: "Patient not found" });
        }
        if (!therapyExists) {
            console.log("Therapy not found");
            return res.status(404).json({ message: "Therapy not found" });
        }
        if (!doctorExists) {
            console.log("Doctor not found");
            return res.status(404).json({ message: "Doctor not found" });
        }

        // Create the record
        const record = await Record.create({
            patient: patientId,
            therapy: therapyId,
            doctor: doctorId,
            sessionDate,
            notes: notes || "",
            status,
            payment: payment || { amount: 0, method: "none", status: "unpaid" }
        });

        console.log("Record created successfully:", record);
        console.log("===== CREATE RECORD END =====");

        res.status(201).json(record);
    } catch (err) {
        console.error("Error creating record:", err);
        res.status(500).json({ message: err.message });
    }
};




// Get all Records
export const getRecords = async (req, res) => {
    try {
        const records = await Record.find()
            .populate("patient", "dob gender medicalHistory")
            .populate("therapy", "name code durationMin price")
            .populate("doctor", "name email role");

        res.json(records);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get Record by ID


export const getRecordById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId to avoid CastError
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({ message: "Invalid record id" });
    }

    const record = await Record.findById(id)
      .populate({
        path: "patient",
        select: "dob gender medicalHistory user",
        populate: { path: "user", select: "name email role" },
      })
      .populate({ path: "therapy", select: "name code durationMin price" })
      .populate({ path: "doctor", select: "name email role" });

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Update Record
export const updateRecord = async (req, res) => {
    try {
        const record = await Record.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (!record) return res.status(404).json({ message: "Record not found" });

        res.json(record);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete Record
export const deleteRecord = async (req, res) => {
    try {
        const record = await Record.findByIdAndDelete(req.params.id);
        if (!record) return res.status(404).json({ message: "Record not found" });

        res.json({ message: "Record deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
