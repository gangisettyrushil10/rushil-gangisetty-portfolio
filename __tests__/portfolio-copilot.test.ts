/** @jest-environment node */

import { POST } from "@/app/api/portfolio-copilot/route";
import { buildPortfolioCopilotResponse } from "@/lib/portfolio-copilot";

describe("portfolio copilot", () => {
  it("answers backend-oriented questions with grounded highlights", () => {
    const response = buildPortfolioCopilotResponse(
      "What should a backend recruiter review first on this portfolio?",
    );

    expect(response.mode).toBe("grounded-local");
    expect(response.answer).toMatch(/backend/i);
    expect(response.highlights.some((item) => item.href === "/projects/medscribe")).toBe(true);
  });

  it("rejects questions that are too short", async () => {
    const response = await POST(
      new Request("http://localhost/api/portfolio-copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: "hi" }),
      }),
    );

    expect(response.status).toBe(400);
  });
});
