import { NextResponse } from "next/server";

import { canSendContactEmail, contactSchema, sendContactEmail } from "@/lib/contact";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const result = contactSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        message: "Please provide a valid name, email, and message.",
      },
      { status: 400 },
    );
  }

  if (!canSendContactEmail()) {
    return NextResponse.json(
      {
        message:
          "Contact email is not configured yet. Use the direct email link instead.",
      },
      { status: 503 },
    );
  }

  try {
    await sendContactEmail(result.data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to send message.";

    return NextResponse.json({ message }, { status: 500 });
  }
}
