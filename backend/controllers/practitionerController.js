import Practitioner from "../models/Practicioner.js";
import User from "../models/User.js";

export const listPractitioners = async (req, res, next) => {
  try {
    const items = await Practitioner.find().populate("user", "name email").lean();
    res.json(items);
  } catch (err) { next(err); }
};

export const createPractitioner = async (req, res, next) => {
  try {
    // expect { user: userId, specialty:[], availability:[] }
    const doc = await Practitioner.create(req.body);
    res.status(201).json(doc);
  } catch (err) { next(err); }
};

export const updateAvailability = async (req, res, next) => {
  try {
    const id = req.params.id;
    const availability = req.body.availability;
    const p = await Practitioner.findByIdAndUpdate(id, { availability }, { new:true }).populate("user","name email").lean();
    res.json(p);
  } catch (err) { next(err); }
};
