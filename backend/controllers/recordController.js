import Record from "../models/Record.js";
import Patient from "../models/Patient.js";
import Therapy from "../models/Therapy.js";

// Create new Record
export const createRecord = async (req, res) => {
  try {
    const { patient, therapy, doctor, sessionDate, notes, status, payment } = req.body;

    // validate patient & therapy exist
    const patientExists = await Patient.findById(patient);
    const therapyExists = await Therapy.findById(therapy);
    if (!patientExists || !therapyExists) {
      return res.status(404).json({ message: "Patient or Therapy not found" });
    }

    const record = await Record.create({
      patient, therapy, doctor, sessionDate, notes, status, payment
    });

    res.status(201).json(record);
  } catch (err) {
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
    const record = await Record.findById(req.params.id)
      .populate("patient")
      .populate("therapy")
      .populate("doctor");

    if (!record) return res.status(404).json({ message: "Record not found" });

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
