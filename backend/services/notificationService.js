// notificationService.js
import nodemailer from "nodemailer";

// ✅ setup transporter (sirf user aur pass chahiye)
const transporter = nodemailer.createTransport({
  service: "Gmail", // ya "Zoho" / "Outlook" / etc.
  auth: {
    user: "tiffintalesh@gmail.com",
    pass: "regf tlvj cxfi hpwg",
  },
});

// ✅ common function to send email
async function sendEmail({ to, subject, html }) {
  // if (!process.env.SMTP_USER) return;
  try {
    await transporter.sendMail({
      from: `AyurSutra <tiffintalesh@gmail.com>`,
      to,
      subject,
      html,
    });
    console.log(`📧 Email sent to ${to}`);
  } catch (err) {
    console.error("Email send failed:", err.message);
  }
}

// ✅ main notification function
export async function notifyBooking({ patientEmail, patientName, practitionerEmail, when }) {
  const time = new Date(when).toLocaleString();

  // to patient
  // ✅ To Patient
await sendEmail({
  to: patientEmail,
  subject: "✅ Appointment Confirmation - AyurSutra",
  html: `
    <div style="font-family: Arial, sans-serif; padding:20px; background:#f4f7fb; color:#333;">
      <h2 style="color:#2c3e50;">Hi ${patientName},</h2>
      <p style="font-size:16px;">Your appointment has been successfully <b>booked</b> 🎉</p>
      
      <div style="background:#fff; padding:15px; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.1); margin:20px 0;">
        <p><b>Date & Time:</b> ${time}</p>
        <p><b>Platform:</b> AyurSutra</p>
      </div>

      <p style="font-size:14px; color:#555;">Please be ready 10 minutes before the session.</p>
      <p style="margin-top:20px;">Best regards,<br/><b>AyurSutra Team</b></p>
    </div>
  `,
});

// ✅ To Practitioner
await sendEmail({
  to: practitionerEmail,
  subject: "📩 New Appointment Scheduled - AyurSutra",
  html: `
    <div style="font-family: Arial, sans-serif; padding:20px; background:#fefefe; color:#333;">
      <h2 style="color:#2c3e50;">Hello,</h2>
      <p style="font-size:16px;">You have received a new <b>appointment booking</b> 🧘</p>
      
      <div style="background:#fff; padding:15px; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.1); margin:20px 0;">
        <p><b>Patient Name:</b> ${patientName}</p>
        <p><b>Date & Time:</b> ${time}</p>
      </div>

      <p style="font-size:14px; color:#555;">Kindly confirm and be available on time.</p>
      <p style="margin-top:20px;">Warm regards,<br/><b>AyurSutra System</b></p>
    </div>
  `,
});

}
