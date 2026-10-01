import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ ok: true, service: "onyx-tattoo-studio", timestamp: new Date().toISOString() });
}