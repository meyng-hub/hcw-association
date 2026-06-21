import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const { name, email, role } = body;

    if (!name || !email || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // TODO: send notification email via Resend (body carries name/email/motivation).
    // Do not log PII (name/email) to server logs — GDPR.
    console.log("Volunteer application received", { role });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("[volunteer] failed:", error);
    return NextResponse.json(
      { error: "An internal error occurred" },
      { status: 500 },
    );
  }
}
