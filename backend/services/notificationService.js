import { sendEmail } from "./emailService.js";
import { sendSMS } from "./smsService.js";

export const notifyBooking = async ({ patientEmail, patientName, practitionerEmail, when }) => {
  // to patient
  await sendEmail({
    to: patientEmail,
    subject: "Appointment booked",
    html: `<p>Hi ${patientName}, your session is booked for ${new Date(when).toLocaleString()}</p>`
  }).catch(()=>{});
  // to practitioner
  await sendEmail({
    to: practitionerEmail,
    subject: "New appointment received",
    html: `<p>New session booked at ${new Date(when).toLocaleString()}</p>`
  }).catch(()=>{});
};
