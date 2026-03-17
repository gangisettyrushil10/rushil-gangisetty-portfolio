/** @jest-environment node */

import { POST } from "@/app/api/contact/route";
import { buildContactMessage, canSendContactEmail, contactSchema } from "@/lib/contact";

describe("contact flow", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env.RESEND_API_KEY;
    delete process.env.CONTACT_FROM_EMAIL;
    delete process.env.CONTACT_TO_EMAIL;
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("validates the payload shape", () => {
    const result = contactSchema.safeParse({
      name: "Rushil",
      email: "rushil@example.com",
      company: "Copart",
      message: "I wanted to reach out about an engineering role that fits your profile.",
    });

    if (!result.success) {
      throw new Error("Expected the contact payload to validate.");
    }

    expect(result.success).toBe(true);
    expect(buildContactMessage(result.data)).toContain("Copart");
  });

  it("detects when resend is not configured", () => {
    expect(canSendContactEmail()).toBe(false);
  });

  it("returns 400 for invalid payloads", async () => {
    const response = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "R", email: "bad", message: "short" }),
      }),
    );

    expect(response.status).toBe(400);
  });

  it("returns 503 when email delivery is not configured", async () => {
    const response = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Rushil Gangisetty",
          email: "rushil@example.com",
          message:
            "I wanted to reach out about a software engineering role and schedule a call.",
        }),
      }),
    );

    expect(response.status).toBe(503);
  });
});
