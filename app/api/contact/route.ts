import {
  EMAIL_RE,
  PHONE_RE,
  companyInbox,
  escapeHtml,
  formField,
  fromAddress,
  isMailerConfigured,
  rowsToHtmlTable,
  transporter,
} from "@/lib/mailer";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isMailerConfigured()) {
    console.error("Contact: SMTP_USER / SMTP_PASS are not set");
    return Response.json({ error: "Email service is not configured." }, { status: 500 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: "Invalid form submission." }, { status: 400 });
  }

  const fullName = formField(form, "fullName", 120);
  const email = formField(form, "emailAddress", 200);
  const phone = formField(form, "phoneNumber", 30);
  const service = formField(form, "serviceRequired", 200);
  const projectDetails = formField(form, "projectDetails", 500);
  const message = formField(form, "message", 5000);

  if (!fullName || !email || !phone || !message) {
    return Response.json({ error: "Please fill in all required fields." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (!PHONE_RE.test(phone)) {
    return Response.json({ error: "Please enter a valid phone number." }, { status: 400 });
  }

  const inbox = companyInbox();
  const from = fromAddress("REDCon Website");

  const rows: [string, string][] = [
    ["Full name", fullName],
    ["Email", email],
    ["Phone", phone],
    ["Service required", service || "-"],
    ["Project details", projectDetails || "-"],
    ["Message", message],
  ];

  try {
    // The request to the company inbox must succeed.
    await transporter.sendMail({
      from,
      to: inbox,
      replyTo: `"${fullName.replace(/"/g, "")}" <${email}>`,
      subject: `Consultation Request: ${service || "General"} - ${fullName}`,
      text: rows.map(([label, value]) => `${label}: ${value}`).join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;font-size:14px;color:#111">
          <h2 style="margin:0 0 12px">New consultation request from the website</h2>
          ${rowsToHtmlTable(rows)}
        </div>`,
    });
  } catch (err) {
    console.error("Contact: failed to send request email", err);
    return Response.json({ error: "Could not send your message. Please try again later." }, { status: 502 });
  }

  try {
    // The thank-you email is best effort: the request already arrived.
    const serviceLine = service ? ` regarding <strong>${escapeHtml(service)}</strong>` : "";
    await transporter.sendMail({
      from,
      to: email,
      replyTo: inbox,
      subject: "Thank you for contacting REDCon",
      text: `Dear ${fullName},\n\nThank you for contacting REDCon${service ? ` regarding ${service}` : ""}. We have received your message, and one of our consultants will get back to you shortly at this email address or at ${phone}.\n\nOur business hours are Saturday - Thursday, 9:00 AM - 6:00 PM.\n\nBest regards,\nREDCon Team`,
      html: `
        <div style="font-family:Arial,sans-serif;font-size:14px;color:#111;line-height:1.6">
          <p>Dear ${escapeHtml(fullName)},</p>
          <p>Thank you for contacting REDCon${serviceLine}. We have received your message,
          and one of our consultants will get back to you shortly at this email address or at ${escapeHtml(phone)}.</p>
          <p>Our business hours are Saturday - Thursday, 9:00 AM - 6:00 PM.</p>
          <p>Best regards,<br/>REDCon Team</p>
        </div>`,
    });
  } catch (err) {
    console.error("Contact: failed to send thank-you email", err);
  }

  return Response.json({ ok: true });
}
