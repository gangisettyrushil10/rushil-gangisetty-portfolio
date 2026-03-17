import { z } from "zod";

import { buildPortfolioCopilotResponse } from "@/lib/portfolio-copilot";

const requestSchema = z.object({
  question: z.string().min(6).max(400),
});

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const result = requestSchema.safeParse(payload);

  if (!result.success) {
    return Response.json(
      {
        error: "Please ask a longer question so the copilot has enough context to answer.",
      },
      { status: 400 },
    );
  }

  return Response.json(buildPortfolioCopilotResponse(result.data.question));
}
