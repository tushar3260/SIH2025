import Appointment from "../models/Appointment.js";
import Practitioner from "../models/Practicioner.js"
import Therapy from "../models/Therapy.js";
import { generateSlots, hasConflict, fitsAvailability } from "../services/scheduling.js";
import { notifyBooking } from "../services/notificationService.js";
import { HttpError } from "../utils/helpers.js";

export const myAppointments = async (req, res, next) => {
  try {
    const items = await Appointment.find({ patient: req.user._id })
      .populate("therapy", "name durationMin")
      .populate({ path:"practitioner", populate:{ path:"user", select:"name email" }})
      .sort({ start: 1 }).lean();
    res.json(items);
  } catch (err) { next(err); }
};

export const slots = async (req, res, next) => {
  try {
    const { practitionerId, therapyId, from, to } = req.query;
    const therapy = await Therapy.findById(therapyId).lean();
    if (!therapy) throw new HttpError(404, "Therapy not found");
    const s = await generateSlots(practitionerId, therapy.durationMin, from, to);
    res.json(s);
  } catch (err) { next(err); }
};

export const book = async (req, res, next) => {
  try {
    const { practitionerId, therapyId, start, notes } = req.body;
    const therapy = await Therapy.findById(therapyId);
    const practitioner = await Practitioner.findById(practitionerId).populate("user","email name").lean();
    if (!therapy || !practitioner) throw new HttpError(400,"Invalid data");

    const startDate = new Date(start);
    const endDate = new Date(startDate.getTime() + therapy.durationMin * 60 * 1000);

    const ok = await fitsAvailability(practitionerId, startDate, endDate);
    if (!ok) throw new HttpError(400,"Outside availability or in break");

    const clash = await hasConflict(practitionerId, startDate, endDate);
    if (clash) throw new HttpError(409,"Slot already booked");

    const appt = await Appointment.create({
      patient: req.user._id,
      practitioner: practitionerId,
      therapy: therapyId,
      start: startDate,
      end: endDate,
      notes,
      status: "confirmed"
    });

    // notify
    notifyBooking({
      patientEmail: req.user.email,
      patientName: req.user.name,
      practitionerEmail: practitioner.user.email,
      when: startDate
    }).catch(()=>{});

    res.status(201).json(appt);
  } catch (err) { next(err); }
};

export const cancel = async (req, res, next) => {
  try {
    const id = req.params.id;
    const appt = await Appointment.findById(id);
    if (!appt) throw new HttpError(404,"Not found");
    if (String(appt.patient) !== String(req.user._id) && req.user.role !== "admin" && req.user.role !== "practitioner")
      throw new HttpError(403,"Forbidden");
    appt.status = "cancelled";
    await appt.save();
    res.json({ ok: true });
  } catch (err) { next(err); }
};
