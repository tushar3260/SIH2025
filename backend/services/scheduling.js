import dayjs from "dayjs";
import Practitioner from "../models/Practitioner.js";
import Appointment from "../models/Appointment.js";

/** overlap check */
export const hasConflict = async (practitionerId, start, end, excludeId=null) => {
  const q = {
    practitioner: practitionerId,
    status: { $in: ["pending", "confirmed"] },
    $or: [
      { start: { $lt: end }, end: { $gt: start } } // overlap
    ]
  };
  if (excludeId) q._id = { $ne: excludeId };
  const clash = await Appointment.findOne(q).lean();
  return !!clash;
};

export const fitsAvailability = async (practitionerId, start, end) => {
  const p = await Practitioner.findById(practitionerId).lean();
  if(!p) return false;
  const s = dayjs(start);
  const e = dayjs(end);
  const weekday = s.day();
  const dayTemplate = (p.availability||[]).find(a=>a.weekday===weekday);
  if(!dayTemplate) return false;

  const inSlot = dayTemplate.slots.some(slot => {
    const ws = dayjs(s.format("YYYY-MM-DD") + "T" + slot.start + ":00");
    const we = dayjs(s.format("YYYY-MM-DD") + "T" + slot.end + ":00");
    return s.isSameOrAfter(ws) && e.isSameOrBefore(we);
  });
  if(!inSlot) return false;

  const inBreak = (p.breaks||[]).some(b => {
    if (!b.date) return false;
    const bd = dayjs(b.date);
    if (!bd.isSame(s, "day")) return false;
    const bs = dayjs(s.format("YYYY-MM-DD") + "T" + b.start + ":00");
    const be = dayjs(s.format("YYYY-MM-DD") + "T" + b.end + ":00");
    return s.isBefore(be) && e.isAfter(bs);
  });

  return !inBreak;
};

/** generate slots between from..to for a practitioner and a therapy duration */
export const generateSlots = async (practitionerId, therapyDurationMin, fromISO, toISO) => {
  const slots = [];
  const step = 15; // offer every 15 min
  let cursor = dayjs(fromISO);
  const end = dayjs(toISO);
  while (cursor.isBefore(end)) {
    const st = cursor.toDate();
    const en = cursor.add(therapyDurationMin, "minute").toDate();
    if (cursor.add(therapyDurationMin, "minute").isAfter(end)) break;
    if (await fitsAvailability(practitionerId, st, en) && !(await hasConflict(practitionerId, st, en))) {
      slots.push({ start: cursor.toISOString(), end: cursor.add(therapyDurationMin, "minute").toISOString() });
    }
    cursor = cursor.add(step, "minute");
  }
  return slots;
};
