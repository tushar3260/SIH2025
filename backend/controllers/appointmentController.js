import Appointment from "../models/Appointment.js";
import Practitioner from "../models/Practicioner.js";
import Therapy from "../models/Therapy.js";
import { generateSlots, hasConflict, fitsAvailability } from "../services/scheduling.js";
import { notifyBooking } from "../services/notificationService.js";
import { HttpError } from "../utils/helpers.js";
import dayjs from "dayjs";
// Get patient’s appointments
export const myAppointments = async (req, res, next) => {
  try {
    const userId = req.params.userId || (req.user?._id ? String(req.user._id) : null);

    if (!userId) {
      return res.status(400).json({ error: "Temporary debug userId required in route params" });
    }

    console.log("Temporary Debug User ID for myAppointments:", userId);

    const items = await Appointment.find({ patient: userId })
      .populate("therapy", "name duration")
      .populate({
        path: "practitioner",
        populate: { path: "user", select: "name email" },
      })
      .sort({ start: 1 })
      .lean();

    console.log("Fetched Appointments:", items.length);

    res.json(items);
  } catch (err) {
    console.error("Error in myAppointments:", err);
    next(err);
  }
};


// Get available slots



export const slots = async (req, res, next) => {
  try {
    console.log("===== SLOTS START =====");
    console.log("Request Body:", req.body);

    const { practitionerId, therapyId, from, to } = req.body;

    if (!practitionerId || !therapyId || !from || !to) {
      return res.status(400).json({ error: "practitionerId, therapyId, from, and to are required" });
    }

    const therapy = await Therapy.findById(therapyId).lean();
    console.log("Fetched Therapy:", therapy);

    if (!therapy) throw new HttpError(404, "Therapy not found");

    // Convert dates once
    const fromDate = dayjs(from);
    const toDate = dayjs(to);

    console.log("Converted Dates -> From:", fromDate.format(), "To:", toDate.format());

    const slotsList = await generateSlots(practitionerId, therapy.duration, fromDate, toDate);

    console.log("Generated Slots:", slotsList);
    console.log("===== SLOTS END =====");

    res.json(slotsList);
  } catch (err) {
    console.error("Error in slots:", err);
    next(err);
  }
};;



// Book appointment
export const book = async (req, res, next) => {
  try {
    const { patientId, practitionerId, therapyId, start, notes } = req.body;

    // therapy aur practitioner fetch karo
    const therapy = await Therapy.findById(therapyId).lean();
    const practitioner = await Practitioner.findById(practitionerId)
      .populate("user", "name email") // small 'user' hi use karega
      .lean();

    console.log("Practitioner found:", practitioner);

    if (!practitioner || !practitioner.user) {
      return res.status(400).json({ error: "Practitioner or user not found" });
    }

    if (!therapy) {
      return res.status(400).json({ error: "Invalid therapy" });
    }

    if (!therapy.duration) {
      return res.status(400).json({ error: "Therapy duration missing" });
    }

    // start aur end time calculate
    const startDate = new Date(start);
    const endDate = new Date(startDate.getTime() + therapy.duration * 60000);

    // appointment create
    const appt = await Appointment.create({
      patient: patientId || req.user?._id, // agar patientId body se mila hai
      practitioner: practitionerId,
      therapy: therapyId,
      start: startDate,
      end: endDate,
      notes,
      status: "confirmed",
    });

    // notification (req.user safe check ke sath)
    notifyBooking({
      patientEmail: req.user?.email || "no-reply@example.com",
      patientName: req.user?.name || "Anonymous",
      practitionerEmail: practitioner.user.email,
      when: startDate,
    }).catch((err) => console.error("Notify error:", err.message));

    res.status(201).json(appt);
  } catch (err) {
    console.error("Book error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};




// Cancel appointment

export const cancel = async (req, res, next) => {
  try {
    console.log("===== CANCEL APPOINTMENT START =====");
    console.log("Request Params ID:", req.params.id);
    console.log("Request Body:", req.body);

    // Temporary debug: userId aur role body se le lo
    // Example body: { "userId": "68b17a18078fa810d2412616", "role": "patient" }
    const userId = req.body.userId;
    const userRole = req.body.role || "patient"; // default "patient"

    if (!userId) {
      return res.status(400).json({ error: "Temporary debug userId required in request body" });
    }

    console.log("Temporary Debug User ID:", userId, "Role:", userRole);

    const appt = await Appointment.findById(req.params.id)
      .populate("patient", "name email")
      .populate("practitioner", "user");

    console.log("Fetched Appointment:", appt);

    if (!appt) {
      throw new HttpError(404, "Appointment not found");
    }

    // Role check using temporary debug user
    const isPatient = appt.patient?._id ? String(appt.patient._id) === userId : false;
    const isPractitioner = appt.practitioner?.user ? String(appt.practitioner.user) === userId : false;
    const isAdmin = userRole === "admin";

    console.log("Role Check -> isPatient:", isPatient, "isPractitioner:", isPractitioner, "isAdmin:", isAdmin);

    if (!isPatient && !isPractitioner && !isAdmin) {
      throw new HttpError(403, "You are not allowed to cancel this appointment");
    }

    if (appt.status === "cancelled") {
      return res.status(400).json({ error: "Appointment already cancelled" });
    }

    appt.status = "cancelled";
    await appt.save();

    console.log("Appointment status updated to cancelled for ID:", appt._id);
    console.log("===== CANCEL APPOINTMENT END =====");

    res.json({ ok: true, message: "Appointment cancelled successfully" });
  } catch (err) {
    console.error("Error in cancel:", err);
    next(err);
  }
};

