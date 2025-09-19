import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    items: [
      { id: "u1", name: "Dana", email: "dana@example.com", role: "admin", locations: ["loc-1", "loc-2"] },
      { id: "u2", name: "Marc", email: "marc@example.com", role: "manager", locations: ["loc-1"] },
      { id: "u3", name: "Iris", email: "iris@example.com", role: "agent", locations: ["loc-3"] }
    ]
  });
}
