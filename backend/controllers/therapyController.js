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

// ✅ Create a new therapy - FIXED
export const createTherapy = async (req, res, next) => {
  try {
    // Fixed field names to match your form data
    const { name, description, code, durationMin, price } = req.body;

    console.log('Received data:', req.body); // Debug log

    // Basic validation
    if (!name || !code || !durationMin) {
      throw new HttpError(400, "Name, code and duration are required");
    }

    const therapy = await Therapy.create({
      name,
      description,
      code,
      duration: parseInt(durationMin), // Convert durationMin to duration
      price: price ? parseFloat(price) : 0,
    });

    return res.status(201).json(therapy);
  } catch (err) {
    console.error('Create therapy error:', err);
    if (err.code === 11000) {
      return res.status(400).json({ message: "Therapy name or code already exists" });
    }
    return res.status(500).json({ message: err.message });
  }
};
