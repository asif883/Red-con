import { EMAIL_RE, PHONE_RE, escapeHtml, formField as field, isMailerConfigured, transporter } from "@/lib/mailer";

export const runtime = "nodejs";

const MAX_CV_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_CV_EXTENSIONS = [".pdf", ".doc", ".docx"];

export async function POST(request: Request) {
  if (!isMailerConfigured()) {
    console.error("Careers apply: SMTP_USER / SMTP_PASS are not set");
    return Response.json({ error: "Email service is not configured." }, { status: 500 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: "Invalid form submission." }, { status: 400 });
  }

  const jobId = field(form, "jobId", 100);
  const jobTitle = field(form, "jobTitle", 200);
  const name = field(form, "name", 120);
  const email = field(form, "email", 200);
  const mobile = field(form, "mobile", 30);
  const currentAddress = field(form, "currentAddress", 500);
  const cv = form.get("cv");

  if (!jobTitle || !name || !email || !mobile || !currentAddress) {
    return Response.json({ error: "Please fill in all required fields." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (!PHONE_RE.test(mobile)) {
    return Response.json({ error: "Please enter a valid mobile number." }, { status: 400 });
  }
  if (!(cv instanceof File) || cv.size === 0) {
    return Response.json({ error: "Please attach your CV." }, { status: 400 });
  }
  if (!ALLOWED_CV_EXTENSIONS.some((ext) => cv.name.toLowerCase().endsWith(ext))) {
    return Response.json({ error: "CV must be a PDF, DOC or DOCX file." }, { status: 400 });
  }
  if (cv.size > MAX_CV_SIZE) {
    return Response.json({ error: "CV must be 5MB or smaller." }, { status: 400 });
  }

  const cvBuffer = Buffer.from(await cv.arrayBuffer());
  const inbox = process.env.CAREERS_INBOX || process.env.SMTP_USER;
  const from = `"Red Con Careers" <${process.env.SMTP_USER}>`;

  const rows: [string, string][] = [
    ["Position", jobTitle],
    ["Job ID", jobId || "-"],
    ["Full name", name],
    ["Email", email],
    ["Mobile", mobile],
    ["Current address", currentAddress],
  ];

  const adminHtml = `
    <div style="font-family:Arial,sans-serif;font-size:14px;color:#111">
      <h2 style="margin:0 0 12px">New job application: ${escapeHtml(jobTitle)}</h2>
      <table cellpadding="8" style="border-collapse:collapse">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="border:1px solid #ddd;font-weight:bold;background:#f6f6f6">${label}</td><td style="border:1px solid #ddd;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
          )
          .join("")}
      </table>
      <p style="margin-top:12px">The applicant's CV is attached.</p>
    </div>`;

  const thankYouHtml = `
    <div style="font-family:Arial,sans-serif;font-size:14px;color:#111;line-height:1.6">
      <p>Dear ${escapeHtml(name)},</p>
      <p>Thank you for applying for the <strong>${escapeHtml(jobTitle)}</strong> position at Red Con.
      We have received your application and CV.</p>
      <p>Our team will review your application, and if your profile matches our requirements,
      we will contact you at this email address or at ${escapeHtml(mobile)}.</p>
      <p>Best regards,<br/>Red Con Careers Team</p>
    </div>`;

  try {
    // The application to the company inbox must succeed.
    await transporter.sendMail({
      from,
      to: inbox,
      replyTo: `"${name.replace(/"/g, "")}" <${email}>`,
      subject: `Job Application: ${jobTitle} - ${name}`,
      text: rows.map(([label, value]) => `${label}: ${value}`).join("\n"),
      html: adminHtml,
      attachments: [{ filename: cv.name, content: cvBuffer, contentType: cv.type || undefined }],
    });
  } catch (err) {
    console.error("Careers apply: failed to send application email", err);
    return Response.json({ error: "Could not send your application. Please try again later." }, { status: 502 });
  }

  try {
    // The thank-you email is best effort: the application already arrived.
    await transporter.sendMail({
      from,
      to: email,
      replyTo: inbox,
      subject: `Thank you for applying - ${jobTitle}`,
      text: `Dear ${name},\n\nThank you for applying for the ${jobTitle} position at Red Con. We have received your application and CV.\n\nOur team will review your application, and if your profile matches our requirements, we will contact you at this email address or at ${mobile}.\n\nBest regards,\nRed Con Careers Team`,
      html: thankYouHtml,
    });
  } catch (err) {
    console.error("Careers apply: failed to send thank-you email", err);
  }

  return Response.json({ ok: true });
}
