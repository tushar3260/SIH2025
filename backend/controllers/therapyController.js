import Therapy from "../models/Therapy.js";
import { HttpError } from "../utils/helpers.js";

// ✅ List all therapies
export const listTherapies = async (req, res, next) => {
  try {
    const items = await Therapy.find().lean();
    return res.status(200).json(items);
  } catch (err) {
    next(new HttpError(500, "Failed to fetch therapies"));
  }
};
export const getTherapyByUserId = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const therapies = await Therapy.find({ userId }).lean();
    if (!therapies) {
      return res.status(404).json({ message: "No therapies found for this user." });
    }
    return res.status(200).json(therapies);
  } catch (err) {
    next(new HttpError(500, "Failed to fetch therapies for the user"));
  }
};
// ✅ Create a new therapy

export const getTherapyByTherapyId = async (req, res, next) => {
  try {
    
    const therapyId = req.params.therapyId;
    const therapy = await Therapy.findById(therapyId).lean();
    if (!therapy) {
      return res.status(404).json({ message: "Therapy not found." });
    }
    return res.status(200).json(therapy);
  } catch (error) {
    next(new HttpError(500, "Failed to fetch therapy by ID"));
  }
}

export const createTherapy = async (req, res, next) => {
  try {
    const { name, description, code, duration, price, patientId, practitionerId } = req.body;

    // Basic validation
    if (!name || !description || !patientId || !practitionerId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create the therapy
    const therapy = await Therapy.create({
      name,
      description,
      code,
      duration,
      price,
      patient: patientId,
      practitioner: practitionerId,
    });

    // Populate patient and practitioner details
    const therapyWithUsers = await Therapy.findById(therapy._id)
      .populate("patient", "name email")
      .populate("practitioner", "name email");

    res.status(201).json(therapyWithUsers);
  } catch (err) {
    next(err);
  }
};
