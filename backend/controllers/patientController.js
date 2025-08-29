import Patient from "../models/Patient.js';
import User from "../models/User.js';

export const getProfile = async (req, res, next) => {
  try {
    const patient = await Patient.findOne({ user: req.user._id }).populate("user","name email phone").lean();
    res.json(patient || { user: req.user });
  } catch (err) { next(err); }
};

export const createOrUpdateProfile = async (req, res, next) => {
  try {
    const doc = await Patient.findOneAndUpdate({ user: req.user._id }, { ...req.body, user: req.user._id }, { upsert:true, new:true });
    res.json(doc);
  } catch (err) { next(err); }
};
