import Therapy from "../models/Therapy.js";
import { HttpError } from "../utils/helpers.js";

export const listTherapies = async (req, res, next) => {
  try {
    const items = await Therapy.find().lean();
    res.json(items);
  } catch (err) { next(err); }
};

export const createTherapy = async (req, res, next) => {
  try {
    const data = req.body;
    const t = await Therapy.create(data);
    res.status(201).json(t);
  } catch (err) { next(err); }
};
