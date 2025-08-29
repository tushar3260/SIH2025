import Appointment from "../models/Appointment.js";

export const stats = async (req, res, next) => {
  try {
    const totalAppts = await Appointment.countDocuments();
    const upcoming = await Appointment.countDocuments({ status: "confirmed", start: { $gte: new Date() } });
    res.json({ totalAppts, upcoming });
  } catch (err) { next(err); }
};
