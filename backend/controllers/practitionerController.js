import Practitioner from "../models/Practicioner.js"; // spelling fix
import User from "../models/User.js";

//  List all practitioners with basic user details
export const listPractitioners = async (req, res, next) => {
  try {
    const items = await Practitioner.find()
      .populate("user", "name email role") // role bhi laa raha hu
      .lean();

    res.json(items);
  } catch (err) {
    next(err);
  }
};

// ✅ Create new practitioner
export const createPractitioner = async (req, res, next) => {
  try {
    // Expected body: { user: userId, specialty: [], availability: [] }
    const { user, specialty = [], availability = [] } = req.body;

    // check if user exists
    const userExists = await User.findById(user);
    if (!userExists) {
      return res.status(400).json({ error: "User not found" });
    }

    const doc = await Practitioner.create({
      user,
      specialty,
      availability,
    });

    // populate user data for response
    const populatedDoc = await doc.populate("user", "name email role");

    res.status(201).json(populatedDoc);
  } catch (err) {
    next(err);
  }
};

// ✅ Update availability for practitioner
export const updateAvailability = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { availability } = req.body;

    if (!Array.isArray(availability)) {
      return res.status(400).json({ error: "Availability must be an array" });
    }

    const updated = await Practitioner.findByIdAndUpdate(
      id,
      { availability },
      { new: true }
    )
      .populate("user", "name email role")
      .lean();

    if (!updated) {
      return res.status(404).json({ error: "Practitioner not found" });
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
};
