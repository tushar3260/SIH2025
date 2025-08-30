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
export const getTherapiesByUserId = async (req, res, next) => {
  try {
    const userId = req.params.userId; // get userId from params
    const therapies = await Therapy.find({ patient: userId }).lean(); // use userId, not patientId

    if (!therapies || therapies.length === 0) {
      return res.status(404).json({ message: "No therapies found for this user." });
    }

    return res.status(200).json(therapies);
  } catch (err) {
    console.error(err);
    next(new HttpError(500, "Failed to fetch therapies for the user"));
  }
};
// ✅ Create a new therapy
export const getTherapiesByPractitionerId = async (req, res, next) => {
  try {
    const practitionerId = req.params.practitionerId; // get practitionerId from params
    const therapies = await Therapy.find({ practitioner: practitionerId }).lean(); // use practitionerId

    if (!therapies || therapies.length === 0) {
      return res.status(404).json({ message: "No therapies found for this practitioner." });
    }

    return res.status(200).json(therapies);
  } catch (err) {
    console.error(err);
    next(new HttpError(500, "Failed to fetch therapies for the practitioner"));
  }
};

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
    const { name, description, code, duration, price, practitionerId } = req.body;

    // ✅ Basic validation
    if (!name || !description || !practitionerId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ✅ Create the therapy
    const therapy = await Therapy.create({
      name,
      description,
      code,
      duration,
      price,
      practitioner: practitionerId,
    });

    // ✅ Populate practitioner details
    const therapyWithPractitioner = await Therapy.findById(therapy._id)
      .populate("practitioner", "name email");

    res.status(201).json(therapyWithPractitioner);
  } catch (err) {
    next(err);
  }
};
