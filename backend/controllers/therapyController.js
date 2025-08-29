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

// ✅ Create a new therapy
export const createTherapy = async (req, res, next) => {
  try {
    const { name, description,code, duration, price } = req.body;

    // Basic validation
    if (!name || !description) {
      throw new HttpError(400, "Name and description are required");
    }

    const therapy = await Therapy.create({
      name,
      description,
      code,
      duration,
      price,
    });

    return res.status(201).json(therapy);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
