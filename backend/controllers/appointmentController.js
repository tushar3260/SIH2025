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
// import Appointment from '../models/Appointment.js';
// import Therapy from '../models/Therapy.js';
// import Practitioner from '../models/Practitioner.js';
import User from '../models/User.js';



// import Appointment from '../models/Appointment.js';
// import Therapy from '../models/Therapy.js';
// import Practitioner from '../models/Practitioner.js';
// import User from '../models/User.js';



import { notifyDoctor } from "../server.js"; // 👈 yeh add karna

export const book = async (req, res, next) => {
  try {
    const { patientId, therapyId, start, notes } = req.body;

    // Basic validation
    if (!patientId || !therapyId || !start) {
      return res.status(400).json({ error: "patientId, therapyId, and start are required" });
    }

    // Get patient
    const patient = await User.findById(patientId);
    if (!patient) {
      return res.status(400).json({ error: "Patient not found" });
    }

    // Get therapy with practitioner user
    const therapy = await Therapy.findById(therapyId).populate('practitioner');
    if (!therapy) {
      return res.status(400).json({ error: "Therapy not found" });
    }

    if (!therapy.practitioner) {
      return res.status(400).json({ error: "No practitioner assigned to this therapy" });
    }

    const practitionerUser = therapy.practitioner;
    
    // Check if practitioner user has practitioner role
    if (practitionerUser.role !== 'practitioner') {
      return res.status(400).json({ error: "Assigned user is not a practitioner" });
    }

    // Find or create Practitioner document
    let practitionerDoc = await Practitioner.findOne({ user: practitionerUser._id });
    
    if (!practitionerDoc) {
      // Create practitioner document if not exists
      practitionerDoc = await Practitioner.create({
        user: practitionerUser._id,
        specialty: ["General"],
        availability: [],
        breaks: []
      });
      console.log("Created new practitioner document:", practitionerDoc._id);
    }

    // Start & end time calculation
    const startDate = new Date(start);
    if (isNaN(startDate.getTime())) {
      return res.status(400).json({ error: "Invalid start date" });
    }

    const endDate = new Date(startDate.getTime() + therapy.duration * 60000);

    // Optional: check availability (disabled for now)
    // if (typeof fitsAvailability === "function") {
    //   const ok = await fitsAvailability(practitionerDoc._id, startDate, endDate);
    //   if (!ok) {
    //     return res.status(400).json({ error: "Outside availability or in break" });
    //   }
    // }

    // Optional: check conflicts (disabled for now)
    // if (typeof hasConflict === "function") {
    //   const clash = await hasConflict(practitionerDoc._id, startDate, endDate);
    //   if (clash) {
    //     return res.status(409).json({ error: "Slot already booked" });
    //   }
    // }

    // Create appointment
    const appointment = await Appointment.create({
      patient: patientId,
      practitioner: practitionerDoc._id,
      therapy: therapyId,
      start: startDate,
      end: endDate,
      notes: notes || "",
      status: "confirmed",
    });

    // Populate appointment for response
    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate('patient', 'name email phone')
      .populate({
        path: 'practitioner',
        populate: {
          path: 'user',
          select: 'name email'
        }
      })
      .populate('therapy', 'name duration price description');

    // 🚀 Socket.io Notification (Doctor ko real-time notify karo)
    notifyDoctor(practitionerUser._id, {
      message: `New appointment booked by ${patient.name} for ${therapy.name} on ${startDate.toLocaleString()}`,
      appointment: populatedAppointment
    });

    return res.status(201).json({
      message: "Appointment booked successfully",
      appointment: populatedAppointment
    });

  } catch (err) {
    console.error("Booking error:", err.message);
    return res.status(500).json({ error: "Server error: " + err.message });
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

// Get all patients for a specific doctor
export const getPatientsByDoctorId = async (req, res, next) => {
  try {
    const doctorId = req.params.id;

    // Find all appointments for this doctor and populate patient info
    const appointments = await Appointment.find({ practitioner: doctorId })
      .populate("patient", "name email") // only fetch name & email
      .populate("therapy", "name duration price"); // optional, therapy info

    if (!appointments.length) {
      return res.status(404).json({ message: "No patients found for this doctor" });
    }

    // Extract unique patients (if a patient has multiple appointments)
    const patientMap = {};
    appointments.forEach(app => {
      patientMap[app.patient._id] = app.patient; // key ensures uniqueness
    });

    const patients = Object.values(patientMap);

    res.status(200).json(patients);
  } catch (err) {
    next(err);
  }
};
