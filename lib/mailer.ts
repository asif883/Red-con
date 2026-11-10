import nodemailer from "nodemailer";

// Gmail SMTP transport shared by the careers and contact API routes.
// Credentials come from SMTP_USER / SMTP_PASS in .env (server only).
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const isMailerConfigured = () => Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);

export const companyInbox = () => process.env.CAREERS_INBOX || process.env.SMTP_USER || "";

export const fromAddress = (label: string) => `"${label}" <${process.env.SMTP_USER}>`;

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_RE = /^[0-9+\s-]{7,20}$/;

export const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export const formField = (form: FormData, key: string, max = 500) => {
  const value = form.get(key);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
};

// Renders label/value rows as a simple bordered HTML table for notification emails.
export const rowsToHtmlTable = (rows: [string, string][]) => `
  <table cellpadding="8" style="border-collapse:collapse">
    ${rows
      .map(
        ([label, value]) =>
          `<tr><td style="border:1px solid #ddd;font-weight:bold;background:#f6f6f6;vertical-align:top">${escapeHtml(label)}</td><td style="border:1px solid #ddd;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
      )
      .join("")}
  </table>`;
