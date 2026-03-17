import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().min(20).max(2000),
});

export type ContactPayload = z.infer<typeof contactSchema>;

export function canSendContactEmail() {
  return Boolean(
    process.env.RESEND_API_KEY &&
      process.env.CONTACT_FROM_EMAIL &&
      process.env.CONTACT_TO_EMAIL,
  );
}

export function buildContactMessage(payload: ContactPayload) {
  const companyLine = payload.company ? `Company: ${payload.company}\n` : "";
  return [
    `New portfolio contact from ${payload.name}`,
    "",
    `Email: ${payload.email}`,
    companyLine,
    "Message:",
    payload.message,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function sendContactEmail(payload: ContactPayload) {
  if (!canSendContactEmail()) {
    throw new Error("Contact email is not configured.");
  }

  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);
  return resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL!,
    to: process.env.CONTACT_TO_EMAIL!,
    replyTo: payload.email,
    subject: `Portfolio inquiry from ${payload.name}`,
    text: buildContactMessage(payload),
  });
}
